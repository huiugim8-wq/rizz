import { requireOwner } from '@/server/auth/guards';
import { listAuditEntries } from '@/server/audit/queries';
import Link from 'next/link';
export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireOwner();
  const page = Math.max(1, Math.min(10000, Number((await searchParams).page) || 1));
  const rows = await listAuditEntries(page);
  return (
    <div className="adminStack">
      <h1>변경 기록</h1>
      <div className="adminTableWrap">
        <table className="adminTable">
          <thead>
            <tr>
              <th>시각</th>
              <th>작업자</th>
              <th>변경 내용</th>
              <th>변경 항목</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 30).map((r) => (
              <tr key={r.id}>
                <td>{r.occurredAt.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
                <td>{r.actorName}</td>
                <td>
                  <strong>{r.actionLabel}</strong>
                  <br />
                  <small>{r.targetLabel}</small>
                </td>
                <td>{r.changedFieldsLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="adminEmpty">아직 변경 기록이 없습니다.</p>}
      </div>
      <div className="adminRow">
        {page > 1 && (
          <Link className="adminBtn" href={`?page=${page - 1}`}>
            이전
          </Link>
        )}
        {rows.length > 30 && (
          <Link className="adminBtn" href={`?page=${page + 1}`}>
            다음
          </Link>
        )}
      </div>
    </div>
  );
}
