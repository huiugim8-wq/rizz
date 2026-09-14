import { requireStaff } from '@/server/auth/guards';
export default async function Page() {
  const user = await requireStaff();
  return (
    <div className="adminStack">
      <h1>내 계정</h1>
      <p>
        {user.name} · {user.email}
      </p>
      <p>
        Google 계정 또는 이메일·비밀번호로 로그인할 수 있습니다. 일반 가입 계정은 최고 관리자 승인
        후 관리 기능을 사용합니다.
      </p>
    </div>
  );
}
