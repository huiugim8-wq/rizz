import { AdminAuthEntry } from '@/features/admin/auth-entry';
import { demoAdmin } from '@/shared/config/demo-admin';
import { ensureDemoAdmin } from '@/server/users/demo-admin';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  await ensureDemoAdmin();
  return (
    <AdminAuthEntry
      configured={Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)}
      failed={error === 'google'}
      demo={demoAdmin}
    />
  );
}
