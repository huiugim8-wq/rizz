'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { contentAction, orderAction } from './actions';
import { Button, Dialog } from './ui';
import { labels, type ContentKind } from '@/domain/content';
export type ListRecord = {
  id: string;
  version: number;
  image: string;
  title: string;
  status: string;
  date?: string;
  deleted: boolean;
  isFeatured?: boolean;
};
export function ContentList({
  kind,
  rows,
  sortItems,
}: {
  kind: ContentKind;
  rows: ListRecord[];
  sortItems?: ListRecord[];
}) {
  const router = useRouter();
  const [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false),
    [sortOpen, setSortOpen] = useState(false),
    [order, setOrder] = useState(sortItems ?? []),
    [drag, setDrag] = useState<number | null>(null);
  async function change(row: ListRecord, op: 'hide' | 'trash' | 'restore') {
    if (op === 'trash' && !confirm('휴지통으로 옮길까요? 나중에 복원할 수 있습니다.')) return;
    setBusy(true);
    const r = await contentAction(kind, row.id, row.version, op);
    setMessage(r.message);
    setBusy(false);
    if (r.ok) router.refresh();
  }
  function move(from: number, to: number) {
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setOrder(next);
  }
  return (
    <div className="adminStack">
      {kind === 'creators' && (
        <div>
          <Button
            onClick={() => {
              setOrder(sortItems ?? []);
              setSortOpen(true);
            }}
          >
            표시 순서 변경
          </Button>
        </div>
      )}
      {message && (
        <p className="adminMessage" role="status">
          {message}
        </p>
      )}
      <div className="adminTableWrap">
        <table className="adminTable adminContentTable">
          <thead>
            <tr>
              <th>사진</th>
              <th>{kind === 'news' ? '뉴스 제목' : '크리에이터'}</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.image && <img className="adminThumb" src={row.image} alt="" />}</td>
                <td>
                  <strong>{row.title}</strong>
                  <br />
                  <small>
                    {row.date}
                    {row.isFeatured ? ' · 대표 뉴스' : ''}
                  </small>
                </td>
                <td>
                  <span className="adminBadge" data-state={row.status}>
                    {row.deleted ? '휴지통' : labels[row.status]}
                  </span>
                </td>
                <td>
                  <div className="adminRow">
                    {!row.deleted && (
                      <>
                        <Link className="adminBtn" href={`/admin/${kind}/${row.id}`}>
                          수정
                        </Link>
                        {row.status === 'PUBLISHED' && (
                          <Button disabled={busy} onClick={() => void change(row, 'hide')}>
                            숨김
                          </Button>
                        )}
                        <Button
                          tone="danger"
                          disabled={busy}
                          onClick={() => void change(row, 'trash')}
                        >
                          삭제
                        </Button>
                      </>
                    )}
                    {row.deleted && (
                      <Button disabled={busy} onClick={() => void change(row, 'restore')}>
                        복원
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="adminEmpty">표시할 항목이 없습니다.</p>}
      </div>
      <Dialog open={sortOpen} onOpenChange={setSortOpen} title="크리에이터 표시 순서">
        <p>끌어서 이동하거나 위·아래 버튼으로 순서를 바꾸세요.</p>
        {order.map((row, i) => (
          <div
            className="adminSortItem"
            draggable
            onDragStart={() => setDrag(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (drag !== null) move(drag, i);
              setDrag(null);
            }}
            key={row.id}
          >
            <img className="adminThumb" src={row.image} alt="" />
            <strong>{row.title}</strong>
            <Button
              aria-label={`${row.title} 위로`}
              disabled={i === 0}
              onClick={() => move(i, i - 1)}
            >
              ↑
            </Button>
            <Button
              aria-label={`${row.title} 아래로`}
              disabled={i === order.length - 1}
              onClick={() => move(i, i + 1)}
            >
              ↓
            </Button>
          </div>
        ))}
        <Button
          tone="primary"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            const result = await orderAction(order.map(({ id, version }) => ({ id, version })));
            setMessage(result.message);
            setBusy(false);
            if (result.ok) {
              setSortOpen(false);
              router.refresh();
            }
          }}
        >
          순서 저장
        </Button>
        {message && <p role="status">{message}</p>}
      </Dialog>
    </div>
  );
}
