import { ListPage } from '@/features/admin/list-page';
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  return <ListPage kind="news" params={await searchParams} />;
}
