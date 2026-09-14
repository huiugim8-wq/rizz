import Link from 'next/link';
import { requireStaff } from '@/server/auth/guards';
import { listAdminContent } from '@/server/content/admin-queries';
import { ContentList } from './content-list';
import { labels, type ContentKind } from '@/domain/content';
export async function ListPage({
  kind,
  params,
}: {
  kind: ContentKind;
  params: { q?: string; status?: string; page?: string };
}) {
  await requireStaff();
  const { q, status, page, take, total, rows, sortItems } = await listAdminContent(kind, params);
  const href = (n: number) =>
    `/admin/${kind}?${new URLSearchParams({ q, status, page: String(n) })}`;
  return (
    <>
      <div className="adminTop">
        <div>
          <h1>{kind === 'news' ? '뉴스 관리' : '크리에이터 관리'}</h1>
          <p className="adminMuted">{total}개 항목 · 저장한 내용이 홈페이지에 반영됩니다.</p>
        </div>
        <Link className="adminBtn" data-tone="primary" href={`/admin/${kind}/new`}>
          + {kind === 'news' ? '뉴스' : '크리에이터'} 등록
        </Link>
      </div>
      <form className="adminFilters">
        <input
          name="q"
          aria-label="검색어"
          placeholder={kind === 'news' ? '제목으로 검색' : '이름으로 검색'}
          defaultValue={q}
        />
        <select name="status" defaultValue={status} aria-label="공개 상태">
          <option value="">전체 상태</option>
          {['DRAFT', 'PUBLISHED', 'HIDDEN'].map((s) => (
            <option value={s} key={s}>
              {labels[s]}
            </option>
          ))}
          <option value="TRASH">휴지통</option>
        </select>
        <button className="adminBtn">검색</button>
      </form>
      <ContentList kind={kind} rows={rows} sortItems={sortItems} />
      <div className="adminRow" style={{ marginTop: 20 }}>
        {page > 1 && (
          <Link className="adminBtn" href={href(page - 1)}>
            이전
          </Link>
        )}
        <span>
          {page} / {Math.max(1, Math.ceil(total / take))}
        </span>
        {page * take < total && (
          <Link className="adminBtn" href={href(page + 1)}>
            다음
          </Link>
        )}
      </div>
    </>
  );
}
