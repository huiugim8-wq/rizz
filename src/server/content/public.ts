import 'server-only';
import { db } from '@/server/db/client';
import type { Creator } from '@/domain/content/creator';
export async function publishedCreators(): Promise<Creator[]> {
  const rows = await db.creator.findMany({
    where: { status: 'PUBLISHED', deletedAt: null },
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    include: { channels: { orderBy: { id: 'asc' }, select: { platform: true, url: true } } },
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    displayName: r.displayName,
    category: r.category as Creator['category'],
    followers: r.followers,
    image: r.image,
    channels: r.channels,
    focalX: r.focalX,
    focalY: r.focalY,
  }));
}
export async function publishedNews(archive = false) {
  const rows = await db.news.findMany({
    where: { status: 'PUBLISHED', deletedAt: null, ...(archive ? { isArchived: true } : {}) },
    orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
  });
  const featured = rows.find((r) => r.isFeatured) ?? rows[0];
  return {
    articles: rows.map(({ id, title, publishedAt, image, imageAlt, externalUrl }) => ({
      id,
      title,
      publishedAt,
      image,
      imageAlt,
      externalUrl,
    })),
    featured: featured
      ? {
          id: featured.id,
          title: featured.title,
          publishedAt: featured.publishedAt,
          image: featured.featuredImage ?? featured.image,
          imageAlt: featured.imageAlt,
        }
      : undefined,
  };
}
