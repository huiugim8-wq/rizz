import { Editor } from '@/features/admin/editor';
import { findContentForEditing } from '@/server/content/admin-queries';
import { requireStaff } from '@/server/auth/guards';
import { notFound } from 'next/navigation';
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;
  const item = await findContentForEditing('news', id);
  if (!item || item.deletedAt) notFound();
  return <Editor kind="news" initial={JSON.parse(JSON.stringify(item))} />;
}
