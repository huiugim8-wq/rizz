import { Editor } from '@/features/admin/editor';
import { requireStaff } from '@/server/auth/guards';
export default async function Page() {
  await requireStaff();
  return <Editor kind="creators" />;
}
