import 'server-only';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from './auth';
import { db } from '@/server/db/client';
export async function currentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  return db.user.findUnique({ where: { id: session.user.id } });
}
export async function requireStaff() {
  const user = await currentUser();
  if (!user) redirect('/admin/login');
  if (user.status !== 'ACTIVE') redirect('/admin/pending');
  return user;
}
export async function requireOwner() {
  const user = await requireStaff();
  if (!['OWNER', 'DEMO'].includes(user.role)) throw new Error('최고 관리자만 사용할 수 있습니다.');
  return user;
}
