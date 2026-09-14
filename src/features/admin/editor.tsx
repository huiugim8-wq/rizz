'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ContentKind } from '@/domain/content';
import { saveAction } from './actions';
import { MediaPicker } from './media-picker';
import { Button } from './ui';
import { CreatorFields, CreatorOptions, NewsFields, NewsOptions } from './editor-fields';
import { EditorPreview } from './editor-preview';
import type { EditorData, EditorRecord } from './editor-types';
import { useUnsavedChanges } from './use-unsaved-changes';
export type { EditorRecord } from './editor-types';

export function Editor({ kind, initial = {} }: { kind: ContentKind; initial?: EditorRecord }) {
  const router = useRouter();
  const [data, setData] = useState<EditorData>({
    ...initial,
    publishedAt:
      initial.publishedAt ?? new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' }),
    image: initial.image ?? '',
    mediaId: initial.mediaId ?? null,
    focalX: initial.focalX ?? 50,
    focalY: initial.focalY ?? 30,
  });
  const [channels, setChannels] = useState(initial.channels ?? []);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [message, setMessage] = useState('');
  useUnsavedChanges(dirty);
  const update = (key: keyof EditorData, value: unknown) => {
    setDirty(true);
    setData((current) => ({ ...current, [key]: value }));
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (uploadBusy || busy) return;
    setBusy(true);
    setMessage('');
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const status = submitter?.getAttribute('value') ?? data.status ?? 'DRAFT';
    try {
      const input =
        kind === 'news'
          ? {
              id: data.id,
              version: data.version,
              title: data.title ?? '',
              publishedAt: data.publishedAt,
              image: data.image,
              mediaId: data.mediaId,
              imageAlt: data.imageAlt ?? '',
              externalUrl: data.externalUrl ?? '',
              isArchived: !!data.isArchived,
              isFeatured: !!data.isFeatured,
              status,
            }
          : {
              id: data.id,
              version: data.version,
              name: data.name ?? '',
              displayName: data.displayName ?? '',
              category: data.category ?? 'BUSINESS',
              followers: data.followers ?? '',
              image: data.image,
              mediaId: data.mediaId,
              focalX: data.focalX,
              focalY: data.focalY,
              followerCount: data.followerCount ?? null,
              measuredAt: data.measuredAt ?? '',
              channels,
              status,
            };
      const result = await saveAction(kind, input);
      setMessage(result.message);
      if (result.ok) {
        setDirty(false);
        router.push(`/admin/${kind}`);
        router.refresh();
      }
    } catch {
      setMessage('저장하지 못했습니다. 연결 상태를 확인하고 다시 시도해 주세요.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="adminTop">
        <div>
          <h1>
            {kind === 'news' ? '뉴스' : '크리에이터'} {data.id ? '수정' : '등록'}
          </h1>
          <p className="adminMuted">내용과 사진을 확인한 뒤 홈페이지에 올려 주세요.</p>
        </div>
        <Link className="adminBtn" href={`/admin/${kind}`}>
          목록으로
        </Link>
      </div>
      <div className="adminEditor">
        <form className="adminCard adminForm" onSubmit={submit}>
          <fieldset disabled={busy} className="adminStack">
            {kind === 'news' ? (
              <NewsFields data={data} update={update} />
            ) : (
              <CreatorFields data={data} update={update} />
            )}
            <MediaPicker
              onBusyChange={setUploadBusy}
              image={data.image}
              onChange={(image, mediaId) => {
                setData((current) => ({ ...current, image, mediaId }));
                setDirty(true);
              }}
            />
            {kind === 'news' ? (
              <NewsOptions data={data} update={update} />
            ) : (
              <CreatorOptions
                data={data}
                update={update}
                channels={channels}
                setChannels={setChannels}
                markDirty={() => setDirty(true)}
              />
            )}
            {message && (
              <p className="adminMessage" data-error role="alert">
                {message}
              </p>
            )}
            <div className="adminActions">
              <Button
                disabled={busy || uploadBusy}
                type="submit"
                value={data.status === 'PUBLISHED' ? 'HIDDEN' : 'DRAFT'}
              >
                {data.status === 'PUBLISHED' ? '숨김으로 저장' : '임시 저장'}
              </Button>
              <Button disabled={busy || uploadBusy} type="submit" value="PUBLISHED" tone="primary">
                {busy
                  ? '저장 중…'
                  : data.status === 'PUBLISHED'
                    ? '수정 내용 반영'
                    : '홈페이지에 올리기'}
              </Button>
            </div>
          </fieldset>
        </form>
        <EditorPreview kind={kind} data={data} />
      </div>
    </>
  );
}
