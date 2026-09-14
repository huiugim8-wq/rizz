import { afterAll, beforeAll, expect, test } from 'vitest';
import { db } from '@/server/db/client';
import { changeContent, reorderCreators, saveContent } from '@/server/content/service';
import {
  closeTestDatabase,
  draftNews,
  pendingId,
  resetTestDatabase,
  staffId,
} from './test-fixture';

beforeAll(resetTestDatabase);
afterAll(closeTestDatabase);

test('대기 계정은 차단하고 승인된 일반 가입 계정은 허용한다', async () => {
  await expect(saveContent(pendingId, 'news', draftNews)).rejects.toThrow('권한');
  await db.user.update({
    where: { id: pendingId },
    data: { status: 'ACTIVE', emailVerified: false },
  });
  await expect(saveContent(pendingId, 'news', draftNews)).resolves.toBeTypeOf('string');
});

test('게시 사진·외부 URL·달력 날짜를 검증한다', async () => {
  await expect(saveContent(staffId, 'news', { ...draftNews, status: 'PUBLISHED' })).rejects.toThrow(
    '사진',
  );
  await expect(
    saveContent(staffId, 'news', { ...draftNews, externalUrl: 'javascript:alert(1)' }),
  ).rejects.toThrow();
  await expect(
    saveContent(staffId, 'news', { ...draftNews, publishedAt: '2026-02-30' }),
  ).rejects.toThrow();
  await expect(
    saveContent(staffId, 'news', { ...draftNews, image: 'https://unapproved.test/x.jpg' }),
  ).rejects.toThrow('사진');
});

test('동시 수정 충돌과 휴지통 복원을 처리한다', async () => {
  const id = await saveContent(staffId, 'news', draftNews);
  await saveContent(staffId, 'news', { ...draftNews, id, version: 1, title: '먼저 저장' });
  await expect(
    saveContent(staffId, 'news', { ...draftNews, id, version: 1, title: '뒤늦은 저장' }),
  ).rejects.toThrow('다른 직원');
  await changeContent(staffId, 'news', id, 2, 'trash');
  await changeContent(staffId, 'news', id, 3, 'restore');
  const restored = await db.news.findUniqueOrThrow({ where: { id } });
  expect(restored.deletedAt).toBeNull();
  expect(restored.status).toBe('DRAFT');
});

test('대표 뉴스는 한 건이며 크리에이터 순서 충돌을 감지한다', async () => {
  const asset = await db.mediaAsset.create({
    data: {
      storageKey: 'a'.repeat(64) + '.webp',
      checksum: 'a'.repeat(64),
      mimeType: 'image/webp',
      byteSize: 10,
      width: 10,
      height: 10,
      createdBy: staffId,
      uploadState: 'READY',
    },
  });
  const published = {
    ...draftNews,
    image: `/uploads/${asset.storageKey}`,
    mediaId: asset.id,
    status: 'PUBLISHED',
    isFeatured: true,
  } as const;
  await saveContent(staffId, 'news', published);
  const second = await saveContent(staffId, 'news', { ...published, title: '새 대표' });
  expect(await db.news.count({ where: { isFeatured: true } })).toBe(1);
  await changeContent(staffId, 'news', second, 1, 'hide');
  expect(await db.news.count({ where: { isFeatured: true } })).toBe(0);

  const creator = {
    name: '테스트',
    displayName: 'TEST',
    category: 'BUSINESS',
    followers: '1M',
    image: '',
    mediaId: null,
    status: 'DRAFT',
    focalX: 50,
    focalY: 30,
    followerCount: null,
    measuredAt: '',
    channels: [],
  } as const;
  const firstCreator = await saveContent(staffId, 'creators', creator);
  const secondCreator = await saveContent(staffId, 'creators', { ...creator, name: '두 번째' });
  await reorderCreators(staffId, [
    { id: secondCreator, version: 1 },
    { id: firstCreator, version: 1 },
  ]);
  await expect(
    reorderCreators(staffId, [
      { id: firstCreator, version: 1 },
      { id: secondCreator, version: 1 },
    ]),
  ).rejects.toThrow('목록이 변경');
});

test('포트폴리오 체험 계정은 최고 관리자처럼 콘텐츠를 변경할 수 있다', async () => {
  await db.user.update({ where: { id: staffId }, data: { role: 'DEMO' } });
  await expect(saveContent(staffId, 'news', draftNews)).resolves.toBeTypeOf('string');
});
