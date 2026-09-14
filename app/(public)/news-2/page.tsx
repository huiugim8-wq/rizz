import { NewsPage } from '@/features/community/news/news-page';
import { publishedNews } from '@/server/content/public';
export const dynamic = 'force-dynamic';
export default async function Page() {
  const data = await publishedNews(true);
  return <NewsPage {...data} archive={true} />;
}
