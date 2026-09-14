'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { staffAction, transferAction } from './actions';
import { labels } from '@/domain/content';
import { Button, Dialog } from './ui';
export function StaffList({
  users,
  canTransferOwnership,
}: {
  users: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    role: string;
    status: string;
  }[];
  canTransferOwnership: boolean;
}) {
  const router = useRouter();
  const [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false),
    [target, setTarget] = useState<string | null>(null);
  const targetUser = users.find((user) => user.id === target);
  async function change(id: string, status: string) {
    if (!confirm(`${labels[status]} 상태로 변경할까요?`)) return;
    setBusy(true);
    const r = await staffAction(id, status);
    setMessage(r.message);
    setBusy(false);
    if (r.ok) router.refresh();
  }
  return (
    <div className="adminStack">
      {message && (
        <p className="adminMessage" role="status">
          {message}
        </p>
      )}
      <div className="adminTableWrap">
        <table className="adminTable">
          <thead>
            <tr>
              <th>직원</th>
              <th>역할</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <strong>{u.name}</strong>
                  <br />
                  <small>{u.email}</small>
                  <br />
                  <small>{u.emailVerified ? 'Google 확인 계정' : '일반 가입 계정'}</small>
                </td>
                <td>{labels[u.role]}</td>
                <td>
                  <span className="adminBadge" data-state={u.status}>
                    {labels[u.status]}
                  </span>
                </td>
                <td>
                  {!['OWNER', 'DEMO'].includes(u.role) && (
                    <div className="adminRow">
                      {u.status !== 'ACTIVE' && (
                        <Button disabled={busy} onClick={() => void change(u.id, 'ACTIVE')}>
                          승인·재활성화
                        </Button>
                      )}
                      {u.status === 'PENDING' && (
                        <Button disabled={busy} onClick={() => void change(u.id, 'REJECTED')}>
                          거절
                        </Button>
                      )}
                      {u.status === 'ACTIVE' && (
                        <>
                          <Button
                            disabled={busy}
                            tone="danger"
                            onClick={() => void change(u.id, 'SUSPENDED')}
                          >
                            사용 정지
                          </Button>
                          {canTransferOwnership && (
                            <Button disabled={!u.emailVerified} onClick={() => setTarget(u.id)}>
                              소유권 이전
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        open={!!target}
        onOpenChange={(open) => {
          if (!open) setTarget(null);
        }}
        title="최고 관리자 소유권 이전"
      >
        <p>
          선택한 직원이 최고 관리자가 되고, 본인은 일반 직원으로 변경됩니다. 두 계정 모두 다시
          로그인해야 합니다. 확인을 위해 대상 직원의 Google 계정 이메일을 입력해 주세요.
        </p>
        <form
          className="adminStack"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            const f = new FormData(e.currentTarget);
            const r = await transferAction(target!, String(f.get('email')));
            setMessage(r.message);
            setBusy(false);
            if (r.ok) {
              router.push('/admin/login');
              router.refresh();
            }
          }}
        >
          <label>
            대상 직원 이메일 {targetUser && <small>({targetUser.email})</small>}
            <input
              style={{ width: '100%', padding: 12 }}
              name="email"
              type="email"
              required
              autoComplete="off"
            />
          </label>
          {message && <p role="status">{message}</p>}
          <Button tone="danger" disabled={busy}>
            소유권 이전 확정
          </Button>
        </form>
      </Dialog>
    </div>
  );
}
