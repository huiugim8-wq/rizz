import { requireOwner } from '@/server/auth/guards';
import { listStaff } from '@/server/users/service';
import { StaffList } from '@/features/admin/staff-list';
export default async function Page() {
  const user = await requireOwner();
  const users = await listStaff();
  return (
    <div className="adminStack">
      <h1>직원 관리</h1>
      <p className="adminMuted">
        이메일을 확인한 직원만 승인할 수 있습니다. 최고 관리자 계정은 정지할 수 없습니다.
        {user.role === 'DEMO' && ' 체험 계정에서는 소유권 이전이 제공되지 않습니다.'}
      </p>
      <StaffList users={users} canTransferOwnership={user.role === 'OWNER'} />
    </div>
  );
}
