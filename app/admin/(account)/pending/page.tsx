import { currentUser } from '@/server/auth/guards';
import { redirect } from 'next/navigation';
import { SignOut } from '@/features/admin/account-actions';
import { labels } from '@/domain/content';
import { hasOwner } from '@/server/users/service';
export default async function Page() {
  const user = await currentUser();
  if (!user) redirect('/admin/login');
  if (user.status === 'ACTIVE') redirect('/admin/news');
  const ownerReady = await hasOwner();
  return (
    <div className="adminAuth">
      <div className="adminCard adminStack">
        <h1>{labels[user.status] ?? '계정 확인'}</h1>
        <p>
          {user.name}님,{' '}
          {user.status === 'PENDING' && !ownerReady
            ? '최초 관리자 설정이 필요합니다. 서버의 INITIAL_OWNER_EMAIL을 이 Google 이메일로 지정한 뒤 로그아웃하고 다시 로그인해 주세요.'
            : user.status === 'PENDING'
              ? '최고 관리자가 승인하면 홈페이지 관리를 시작할 수 있습니다.'
              : '현재 관리자 기능을 사용할 수 없습니다. 회사 최고 관리자에게 문의해 주세요.'}
        </p>
        <p>{user.email}</p>
        <a className="adminBtn" href="/admin">
          승인 상태 다시 확인
        </a>
        <SignOut />
      </div>
    </div>
  );
}
