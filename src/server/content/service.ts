import { db } from '@/server/db/client';
import type { Prisma } from '@/generated/prisma/client';
import type { ContentKind } from '@/domain/content';
import { creatorInput, newsInput } from './schema';
export class OperationError extends Error {}
export async function lock(tx: Prisma.TransactionClient) {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(743281)`;
}
export async function checkActor(tx: Prisma.TransactionClient, actorId: string, owner = false) {
  const u = await tx.user.findUnique({ where: { id: actorId } });
  if (
    !u ||
    u.status !== 'ACTIVE' ||
    !['OWNER', 'STAFF', 'DEMO'].includes(u.role) ||
    (owner && !['OWNER', 'DEMO'].includes(u.role))
  )
    throw new OperationError('이 작업을 수행할 권한이 없습니다.');
  return u;
}
export async function audit(
  tx: Prisma.TransactionClient,
  actorId: string,
  action: string,
  entityType: string,
  entityId: string,
  changedFields: string[] = [],
) {
  await tx.auditLog.create({ data: { actorId, action, entityType, entityId, changedFields } });
}
async function validateImage(
  tx: Prisma.TransactionClient,
  data: { image: string; mediaId: string | null; status: string },
  old?: { image: string; mediaId: string | null } | null,
) {
  if (data.mediaId) {
    const asset = await tx.mediaAsset.findUnique({ where: { id: data.mediaId } });
    if (!asset || asset.uploadState !== 'READY' || data.image !== `/uploads/${asset.storageKey}`)
      throw new OperationError('사용할 수 없는 사진입니다. 다시 선택해 주세요.');
  } else if (data.image && data.image !== old?.image)
    throw new OperationError('사진은 업로드하거나 보관함에서 선택해 주세요.');
  if (data.status === 'PUBLISHED' && !data.image)
    throw new OperationError('사진을 선택한 뒤 게시해 주세요.');
}
export async function saveContent(actorId: string, kind: ContentKind, input: unknown) {
  return db.$transaction(async (tx) => {
    await lock(tx);
    await checkActor(tx, actorId);
    if (kind === 'news') {
      const parsed = newsInput.parse(input);
      const { id, version, ...data } = parsed;
      const old = id ? await tx.news.findUnique({ where: { id } }) : null;
      if (id && (!old || old.deletedAt || old.version !== version))
        throw new OperationError(
          '다른 직원이 수정했거나 삭제한 항목입니다. 목록에서 다시 열어 주세요.',
        );
      await validateImage(tx, data, old);
      if (data.isFeatured && data.status !== 'PUBLISHED')
        throw new OperationError('공개 뉴스만 대표로 지정할 수 있습니다.');
      if (data.isFeatured)
        await tx.news.updateMany({
          where: { isFeatured: true, NOT: { id: id ?? '' } },
          data: { isFeatured: false, version: { increment: 1 } },
        });
      const value = {
        ...data,
        externalUrl: data.externalUrl || null,
        featuredImage: null,
        firstPublishedAt:
          old?.firstPublishedAt ?? (data.status === 'PUBLISHED' ? new Date() : null),
      };
      const record = id
        ? await tx.news.update({ where: { id }, data: { ...value, version: { increment: 1 } } })
        : await tx.news.create({ data: value });
      await audit(tx, actorId, id ? '수정' : '등록', '뉴스', record.id, Object.keys(data));
      return record.id;
    }
    const { id, version, channels, ...data } = creatorInput.parse(input);
    const old = id ? await tx.creator.findUnique({ where: { id } }) : null;
    if (id && (!old || old.deletedAt || old.version !== version))
      throw new OperationError(
        '다른 직원이 수정했거나 삭제한 항목입니다. 목록에서 다시 열어 주세요.',
      );
    await validateImage(tx, data, old);
    const value = { ...data, measuredAt: data.measuredAt || null, channels: { create: channels } };
    if (id) await tx.creatorChannel.deleteMany({ where: { creatorId: id } });
    const maxOrder = await tx.creator.aggregate({ _max: { sortOrder: true } });
    const record = id
      ? await tx.creator.update({ where: { id }, data: { ...value, version: { increment: 1 } } })
      : await tx.creator.create({
          data: { ...value, sortOrder: (maxOrder._max.sortOrder ?? -1) + 1 },
        });
    await audit(tx, actorId, id ? '수정' : '등록', '크리에이터', record.id, Object.keys(data));
    return record.id;
  });
}
export async function changeContent(
  actorId: string,
  kind: ContentKind,
  id: string,
  version: number,
  operation: 'trash' | 'restore' | 'hide',
) {
  return db.$transaction(async (tx) => {
    await lock(tx);
    await checkActor(tx, actorId);
    const where = { id, version };
    const data = {
      version: { increment: 1 },
      ...(operation === 'trash'
        ? { deletedAt: new Date() }
        : operation === 'restore'
          ? { deletedAt: null, status: 'DRAFT' }
          : { status: 'HIDDEN' }),
    };
    const result =
      kind === 'news'
        ? await tx.news.updateMany({ where, data: { ...data, isFeatured: false } })
        : await tx.creator.updateMany({ where, data });
    if (!result.count)
      throw new OperationError('항목이 변경되었습니다. 새로고침 후 다시 시도해 주세요.');
    await audit(
      tx,
      actorId,
      { trash: '휴지통 이동', restore: '복원', hide: '숨김' }[operation],
      kind,
      id,
    );
  });
}
export async function reorderCreators(actorId: string, items: { id: string; version: number }[]) {
  return db.$transaction(async (tx) => {
    await lock(tx);
    await checkActor(tx, actorId);
    const current = await tx.creator.findMany({
      where: { deletedAt: null },
      select: { id: true, version: true },
    });
    const versions = new Map(current.map((r) => [r.id, r.version]));
    if (
      items.length !== current.length ||
      new Set(items.map((i) => i.id)).size !== current.length ||
      items.some((i) => versions.get(i.id) !== i.version)
    )
      throw new OperationError('목록이 변경되었습니다. 새로고침 후 다시 정렬해 주세요.');
    for (const [sortOrder, item] of items.entries())
      await tx.creator.update({
        where: { id: item.id },
        data: { sortOrder, version: { increment: 1 } },
      });
    await audit(tx, actorId, '순서 변경', '크리에이터', '목록');
  });
}
