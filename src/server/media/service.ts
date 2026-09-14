import 'server-only';
import { unlink } from 'node:fs/promises';
import { db } from '@/server/db/client';
import { audit, checkActor, lock, OperationError } from '@/server/content/service';
import { publicFile } from './storage';

export async function listMedia() {
  const rows = await db.mediaAsset.findMany({
    where: { uploadState: 'READY' },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return rows.map((row) => ({ id: row.id, url: `/uploads/${row.storageKey}` }));
}

export async function removeMedia(actorId: string, id: string) {
  const key = await db.$transaction(async (transaction) => {
    await lock(transaction);
    await checkActor(transaction, actorId);
    const asset = await transaction.mediaAsset.findUnique({
      where: { id },
      include: { _count: { select: { news: true, creators: true } } },
    });
    if (!asset) throw new OperationError('사진을 찾지 못했습니다.');
    if (asset._count.news + asset._count.creators > 0) {
      throw new OperationError(
        '콘텐츠에서 사용 중인 사진입니다. 휴지통에 있는 항목도 먼저 확인해 주세요.',
      );
    }
    await transaction.mediaAsset.delete({ where: { id } });
    await audit(transaction, actorId, '사진 삭제', '사진', id);
    return asset.storageKey;
  });
  await unlink(publicFile(key)).catch(() => undefined);
}
