import type { NewsArticle } from '@/domain/content/news';

export function formatNewsDate(date: string) {
  return date.slice(2).replaceAll('-', '.');
}

/** Preserve the existing archive's crop while sharing its article records. */
export function archiveThumbnail(article: NewsArticle) {
  if (!article.image.startsWith('https://static.wixstatic.com/media/')) return article.image;
  const original = article.image.split('/v1/')[0];
  return `${original}/v1/fill/w_690,h_420,al_c,q_85,enc_avif,quality_auto/news.jpg`;
}

export const newsFeaturedImage =
  'https://static.wixstatic.com/media/dc99e3_0a2f9cc26309489dba687d7e6e363717~mv2.jpg/v1/crop/x_0,y_1552,w_3024,h_1210/fill/w_1214,h_486,al_c,q_85,enc_avif,quality_auto/news.jpg';
