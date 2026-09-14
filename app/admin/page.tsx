import { redirect } from 'next/navigation';
import { requireStaff } from '@/server/auth/guards';
export default async function Page() {
  await requireStaff();
  redirect('/admin/news');
}
