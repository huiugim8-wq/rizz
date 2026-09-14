import Link from 'next/link';

export function AuthCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="adminAuth">
      <Link className="adminBrand" href="/">
        GLOW UP RIZZ
      </Link>
      <div className="adminCard">
        <h1>{title}</h1>
        <p className="adminMuted">홈페이지 관리 기능을 체험하고 운영할 수 있는 공간입니다.</p>
        {children}
      </div>
    </div>
  );
}
