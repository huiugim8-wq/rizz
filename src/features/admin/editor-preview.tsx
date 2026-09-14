import type { ContentKind } from '@/domain/content';
import type { EditorData } from './editor-types';
export function EditorPreview({ kind, data }: { kind: ContentKind; data: EditorData }) {
  return (
    <aside className="adminCard adminPreview" data-kind={kind}>
      <p className="adminMuted">공개 카드 미리보기</p>
      {data.image ? (
        <img
          src={data.image}
          alt={data.imageAlt ?? data.name ?? '미리보기'}
          style={{ objectPosition: `${data.focalX}% ${data.focalY}%` }}
        />
      ) : (
        <div className="adminEmpty">사진을 선택해 주세요.</div>
      )}
      <h2>{kind === 'news' ? data.title || '뉴스 제목' : data.displayName || '표시 이름'}</h2>
      <p>{kind === 'news' ? data.publishedAt : data.name}</p>
      {kind === 'creators' && (
        <small>
          {data.category ?? 'BUSINESS'} · {data.followers || '구독자 표시'}
        </small>
      )}
    </aside>
  );
}
