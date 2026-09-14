import { afterAll, beforeAll, expect, test } from 'vitest';
import { db } from '@/server/db/client';
import { saveContent } from '@/server/content/service';
import { setStaffStatus, transferOwner } from '@/server/users/service';
import {
  closeTestDatabase,
  draftNews,
  ownerId,
  pendingId,
  resetTestDatabase,
  staffId,
} from './test-fixture';

beforeAll(resetTestDatabase);
afterAll(closeTestDatabase);

test('OWNER만 직원을 승인하며 OWNER 계정은 보호한다', async () => {
  await expect(setStaffStatus(staffId, pendingId, 'ACTIVE')).rejects.toThrow('권한');
  await expect(setStaffStatus(ownerId, ownerId, 'SUSPENDED')).rejects.toThrow('최고 관리자');
  await db.user.update({ where: { id: pendingId }, data: { emailVerified: false } });
  await setStaffStatus(ownerId, pendingId, 'ACTIVE');
  expect(await db.user.findUniqueOrThrow({ where: { id: pendingId } })).toMatchObject({
    status: 'ACTIVE',
    emailVerified: false,
  });
});

test('정지 시 세션을 폐기하고 동시 소유권 이전에서 OWNER 한 명을 보존한다', async () => {
  await setStaffStatus(ownerId, pendingId, 'ACTIVE');
  await db.session.create({
    data: {
      id: 'revocation-session',
      userId: pendingId,
      token: 'revocation-token',
      expiresAt: new Date(Date.now() + 60000),
    },
  });
  await setStaffStatus(ownerId, pendingId, 'SUSPENDED');
  expect(await db.session.count({ where: { userId: pendingId } })).toBe(0);
  await expect(saveContent(pendingId, 'news', draftNews)).rejects.toThrow('권한');
  await setStaffStatus(ownerId, pendingId, 'ACTIVE');
  const results = await Promise.allSettled([
    transferOwner(ownerId, staffId, `${staffId}@rizz.test`),
    transferOwner(ownerId, pendingId, `${pendingId}@rizz.test`),
  ]);
  expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
  expect(await db.user.count({ where: { role: 'OWNER', status: 'ACTIVE' } })).toBe(1);
});

test('체험 계정은 최고 관리자처럼 직원 상태를 관리한다', async () => {
  await db.user.update({ where: { id: staffId }, data: { role: 'DEMO', status: 'ACTIVE' } });
  await db.user.update({ where: { id: pendingId }, data: { role: 'STAFF', status: 'ACTIVE' } });

  await setStaffStatus(staffId, pendingId, 'SUSPENDED');

  await expect(transferOwner(staffId, pendingId, `${pendingId}@rizz.test`)).rejects.toThrow(
    '소유권',
  );

  expect(await db.user.findUniqueOrThrow({ where: { id: pendingId } })).toMatchObject({
    status: 'SUSPENDED',
  });
});
