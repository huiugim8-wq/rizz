'use client';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from './ui';
import type { CreatorChannel, EditorData, EditorUpdate } from './editor-types';
export function NewsFields({ data, update }: { data: EditorData; update: EditorUpdate }) {
  return (
    <>
      <label>
        제목 *
        <input
          value={data.title ?? ''}
          onChange={(e) => update('title', e.target.value)}
          required
          maxLength={200}
        />
      </label>
      <label>
        표시 날짜 *
        <input
          type="date"
          value={data.publishedAt}
          onInput={(e) => update('publishedAt', e.currentTarget.value)}
          required
        />
      </label>
    </>
  );
}
export function NewsOptions({ data, update }: { data: EditorData; update: EditorUpdate }) {
  return (
    <>
      <label>
        사진 설명
        <input
          value={data.imageAlt ?? ''}
          onChange={(e) => update('imageAlt', e.target.value)}
          maxLength={200}
        />
      </label>
      <label>
        원문 기사 주소 (선택)
        <input
          type="url"
          placeholder="https://"
          value={data.externalUrl ?? ''}
          onChange={(e) => update('externalUrl', e.target.value)}
        />
      </label>
      <label className="adminCheck">
        <input
          type="checkbox"
          checked={!!data.isFeatured}
          onChange={(e) => update('isFeatured', e.target.checked)}
        />
        대표 뉴스로 표시
      </label>
      <label className="adminCheck">
        <input
          type="checkbox"
          checked={!!data.isArchived}
          onChange={(e) => update('isArchived', e.target.checked)}
        />
        아카이브 목록에도 표시
      </label>
    </>
  );
}
export function CreatorFields({ data, update }: { data: EditorData; update: EditorUpdate }) {
  return (
    <>
      <div className="adminTwo">
        <label>
          이름 *
          <input
            value={data.name ?? ''}
            onChange={(e) => update('name', e.target.value)}
            required
            maxLength={80}
          />
        </label>
        <label>
          표시 이름 *
          <input
            value={data.displayName ?? ''}
            onChange={(e) => update('displayName', e.target.value)}
            required
            maxLength={80}
          />
          <small>예: KIDONG</small>
        </label>
      </div>
      <div className="adminTwo">
        <label>
          카테고리
          <select
            value={data.category ?? 'BUSINESS'}
            onChange={(e) => update('category', e.target.value)}
          >
            {['BUSINESS', 'FITNESS', 'MUSIC', 'BEAUTY', 'LIFESTYLE'].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          구독자 표시 *
          <input
            value={data.followers ?? ''}
            onChange={(e) => update('followers', e.target.value)}
            required
            maxLength={40}
          />
          <small>예: 1.43M 또는 143만</small>
        </label>
      </div>
    </>
  );
}
export function CreatorOptions({
  data,
  update,
  channels,
  setChannels,
  markDirty,
}: {
  data: EditorData;
  update: EditorUpdate;
  channels: CreatorChannel[];
  setChannels: Dispatch<SetStateAction<CreatorChannel[]>>;
  markDirty: () => void;
}) {
  const change = (index: number, field: keyof CreatorChannel, value: string) => {
    setChannels((current) =>
      current.map((channel, i) => (i === index ? { ...channel, [field]: value } : channel)),
    );
    markDirty();
  };
  return (
    <details>
      <summary>사진 초점·채널 정보 (선택)</summary>
      <div className="adminStack">
        <label>
          사진 좌우 초점
          <input
            type="range"
            min={0}
            max={100}
            value={data.focalX}
            onChange={(e) => update('focalX', Number(e.target.value))}
          />
        </label>
        <label>
          사진 상하 초점
          <input
            type="range"
            min={0}
            max={100}
            value={data.focalY}
            onChange={(e) => update('focalY', Number(e.target.value))}
          />
        </label>
        <label>
          확인된 구독자 수
          <input
            type="number"
            min={0}
            value={data.followerCount ?? ''}
            onChange={(e) =>
              update('followerCount', e.target.value ? Number(e.target.value) : null)
            }
          />
        </label>
        <label>
          수치 확인 날짜
          <input
            type="date"
            value={data.measuredAt ?? ''}
            onInput={(e) => update('measuredAt', e.currentTarget.value)}
          />
        </label>
        {channels.map((channel, i) => (
          <div className="adminTwo" key={`${channel.platform}-${i}`}>
            <label>
              채널 종류
              <input
                value={channel.platform}
                onChange={(e) => change(i, 'platform', e.target.value)}
              />
            </label>
            <label>
              채널 주소
              <input
                type="url"
                value={channel.url}
                onChange={(e) => change(i, 'url', e.target.value)}
              />
            </label>
            <Button
              type="button"
              onClick={() => {
                setChannels((current) => current.filter((_, n) => n !== i));
                markDirty();
              }}
            >
              채널 삭제
            </Button>
          </div>
        ))}
        <Button
          type="button"
          disabled={channels.length >= 10}
          onClick={() => {
            setChannels((current) => [...current, { platform: 'YouTube', url: '' }]);
            markDirty();
          }}
        >
          채널 추가
        </Button>
      </div>
    </details>
  );
}
