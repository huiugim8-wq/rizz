import Link from 'next/link';
import { requireStaff } from '@/server/auth/guards';
import { countPendingStaff } from '@/server/users/service';
import { SignOut } from '@/features/admin/account-actions';
export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await requireStaff();
  const demo = user.role === 'DEMO';
  const owner = ['OWNER', 'DEMO'].includes(user.role);
  const pending = owner ? await countPendingStaff() : 0;
  return (
    <div className="adminFrame">
      <aside className="adminSide">
        <Link className="adminBrand" href="/admin">
          RIZZ <small>관리</small>
        </Link>
        <nav aria-label="관리자 메뉴">
          <Link href="/admin/news">뉴스 관리</Link>
          <Link href="/admin/creators">크리에이터</Link>
          {owner && (
            <>
              <Link href="/admin/users">
                직원 관리 {pending > 0 && <span className="adminBadge">{pending}</span>}
              </Link>
              <Link href="/admin/activity">변경 기록</Link>
            </>
          )}
          <Link href="/admin/account">내 계정</Link>
          <Link href="/" target="_blank">
            홈페이지 보기 ↗
          </Link>
        </nav>
        <div className="adminAccount">
          <p>
            {user.name} ·{' '}
            {demo ? '체험 최고 관리자' : user.role === 'OWNER' ? '최고 관리자' : '직원'}
          </p>
          <SignOut />
        </div>
      </aside>
      <main className="adminMain">
        {demo && (
          <p className="adminDemoBanner">
            포트폴리오 체험 최고 관리자입니다. 소유권 이전을 제외한 콘텐츠·사진·직원 관리 기능을
            직접 사용할 수 있습니다.
          </p>
        )}
        {children}
      </main>
    </div>
  );
}
