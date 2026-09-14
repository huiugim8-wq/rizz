import { db } from '@/server/db/client';

export const ownerId = 'test-owner';
export const staffId = 'test-staff';
export const pendingId = 'test-pending';

export const draftNews = {
  title: '테스트 소식',
  publishedAt: '2026-09-12',
  image: '',
  mediaId: null,
  imageAlt: '',
  externalUrl: '',
  isArchived: false,
  isFeatured: false,
  status: 'DRAFT',
} as const;

export async function resetTestDatabase() {
  if (!(process.env.DATABASE_URL ?? '').includes('_test'))
    throw new Error('테스트 DB만 사용할 수 있습니다.');
  await db.$executeRawUnsafe(
    'TRUNCATE "AuditLog", "CreatorChannel", "News", "Creator", "MediaAsset", "Session", "Account", "Verification", "SiteControl", "User", "RateLimit" CASCADE',
  );
  for (const [id, role, status] of [
    [ownerId, 'OWNER', 'ACTIVE'],
    [staffId, 'STAFF', 'ACTIVE'],
    [pendingId, 'STAFF', 'PENDING'],
  ] as const) {
    await db.user.create({
      data: { id, name: id, email: `${id}@rizz.test`, emailVerified: true, role, status },
    });
  }
}

export function closeTestDatabase() {
  return db.$disconnect();
}
