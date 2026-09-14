import 'server-only';
import type { ContentKind } from '@/domain/content';
import { db } from '@/server/db/client';

export async function findContentForEditing(kind: ContentKind, id: string) {
  return kind === 'news'
    ? db.news.findUnique({ where: { id } })
    : db.creator.findUnique({ where: { id }, include: { channels: true } });
}

export async function listAdminContent(
  kind: ContentKind,
  params: { q?: string; status?: string; page?: string },
) {
  const q = (params.q ?? '').slice(0, 100);
  const status = params.status ?? '';
  const page = Math.max(1, Math.min(10000, Number(params.page) || 1));
  const take = 20;
  const base = {
    deletedAt: status === 'TRASH' ? { not: null } : null,
    ...(['DRAFT', 'PUBLISHED', 'HIDDEN'].includes(status) ? { status } : {}),
  };
  const newsWhere = {
    ...base,
    ...(q ? { title: { contains: q, mode: 'insensitive' as const } } : {}),
  };
  const creatorWhere = {
    ...base,
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' as const } },
            { displayName: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };
  const [records, total] =
    kind === 'news'
      ? await Promise.all([
          db.news.findMany({
            where: newsWhere,
            orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
            skip: (page - 1) * take,
            take,
          }),
          db.news.count({ where: newsWhere }),
        ])
      : await Promise.all([
          db.creator.findMany({
            where: creatorWhere,
            orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
            skip: (page - 1) * take,
            take,
          }),
          db.creator.count({ where: creatorWhere }),
        ]);
  const rows = records.map((record) => ({
    id: record.id,
    version: record.version,
    image: record.image,
    title: 'title' in record ? record.title : `${record.displayName} · ${record.name}`,
    status: record.status,
    deleted: Boolean(record.deletedAt),
    date: 'publishedAt' in record ? record.publishedAt : undefined,
    isFeatured: 'isFeatured' in record ? record.isFeatured : undefined,
  }));
  const sortItems =
    kind === 'creators'
      ? (
          await db.creator.findMany({
            where: { deletedAt: null },
            orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
            take: 1000,
          })
        ).map((record) => ({
          id: record.id,
          version: record.version,
          image: record.image,
          title: record.name,
          status: record.status,
          deleted: false,
        }))
      : undefined;
  return { q, status, page, take, total, rows, sortItems };
}
