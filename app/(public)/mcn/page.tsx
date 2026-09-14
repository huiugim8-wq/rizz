import CreatorPage from '@/features/mcn/creator-page';
import { publishedCreators } from '@/server/content/public';
export const dynamic = 'force-dynamic';
export default async function Page() {
  return <CreatorPage creators={await publishedCreators()} />;
}
