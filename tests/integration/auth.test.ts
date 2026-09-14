import { afterAll, beforeEach, expect, test } from 'vitest';
import { auth } from '@/server/auth/auth';
import { claimInitialOwner } from '@/server/users/service';
import { ensureDemoAdmin } from '@/server/users/demo-admin';
import { db } from '@/server/db/client';
import { closeTestDatabase, ownerId, pendingId, resetTestDatabase, staffId } from './test-fixture';

beforeEach(async () => {
  await resetTestDatabase();
  process.env.INITIAL_OWNER_EMAIL = 'first-owner@rizz.test';
});

afterAll(async () => {
  delete process.env.INITIAL_OWNER_EMAIL;
  await closeTestDatabase();
});

test('Google OAuth 로그인 시작 URL을 만든다', async () => {
  const response = await auth.handler(
    new Request('http://localhost:3000/api/auth/sign-in/social', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' },
      body: JSON.stringify({ provider: 'google', callbackURL: '/admin' }),
    }),
  );
  expect(response.status).toBe(200);
  const payload = (await response.json()) as { url: string };
  expect(payload.url).toContain('accounts.google.com');
});

test('일반 회원가입은 해시된 비밀번호와 승인 대기 계정을 만든다', async () => {
  const password = 'portfolio-password';
  const response = await auth.handler(
    new Request('http://localhost:3000/api/auth/sign-up/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' },
      body: JSON.stringify({
        name: '포트폴리오 방문자',
        email: 'portfolio@rizz.test',
        password,
        callbackURL: '/admin',
      }),
    }),
  );

  expect(response.status).toBe(200);
  expect(await db.user.findUnique({ where: { email: 'portfolio@rizz.test' } })).toMatchObject({
    role: 'STAFF',
    status: 'PENDING',
    emailVerified: false,
  });
  const account = await db.account.findFirstOrThrow({
    where: { user: { email: 'portfolio@rizz.test' }, providerId: 'credential' },
  });
  expect(account.password).toBeTruthy();
  expect(account.password).not.toBe(password);

  const login = await auth.handler(
    new Request('http://localhost:3000/api/auth/sign-in/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' },
      body: JSON.stringify({ email: 'portfolio@rizz.test', password, callbackURL: '/admin' }),
    }),
  );
  expect(login.status).toBe(200);
});

test('공개된 체험 계정을 체험 최고 관리자로 준비하고 로그인한다', async () => {
  const demo = await ensureDemoAdmin();
  expect(demo).toMatchObject({ role: 'DEMO', status: 'ACTIVE', emailVerified: true });

  const login = await auth.handler(
    new Request('http://localhost:3000/api/auth/sign-in/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' },
      body: JSON.stringify({
        email: 'demo-admin@glowuprizz.com',
        password: 'GlowUpRizz!2026',
        callbackURL: '/admin',
      }),
    }),
  );
  expect(login.status).toBe(200);
});

test('지정된 Google 이메일만 최초 OWNER가 된다', async () => {
  await db.user.update({
    where: { id: ownerId },
    data: {
      email: 'first-owner@rizz.test',
      emailVerified: true,
      role: 'STAFF',
      status: 'PENDING',
    },
  });

  await claimInitialOwner(ownerId);

  const owner = await db.user.findUniqueOrThrow({ where: { id: ownerId } });
  expect(owner.role).toBe('OWNER');
  expect(owner.status).toBe('ACTIVE');
  expect(owner.approvedAt).toBeInstanceOf(Date);
  expect(await db.siteControl.findUnique({ where: { id: 'site' } })).toMatchObject({ ownerId });
  expect(await db.auditLog.count({ where: { action: '최초 최고 관리자 지정' } })).toBe(1);
});

test('미확인·불일치 계정과 두 번째 OWNER 생성을 차단한다', async () => {
  await db.user.update({ where: { id: ownerId }, data: { role: 'STAFF', status: 'PENDING' } });
  await db.user.update({
    where: { id: pendingId },
    data: { email: 'first-owner@rizz.test', emailVerified: false },
  });

  await claimInitialOwner(pendingId);
  expect(await db.user.count({ where: { role: 'OWNER' } })).toBe(0);

  await db.user.update({ where: { id: pendingId }, data: { emailVerified: true } });
  process.env.INITIAL_OWNER_EMAIL = 'someone-else@rizz.test';
  await claimInitialOwner(pendingId);
  expect(await db.user.count({ where: { role: 'OWNER' } })).toBe(0);

  process.env.INITIAL_OWNER_EMAIL = 'first-owner@rizz.test';
  await claimInitialOwner(pendingId);
  process.env.INITIAL_OWNER_EMAIL = `${staffId}@rizz.test`;
  await claimInitialOwner(staffId);

  expect(await db.user.count({ where: { role: 'OWNER' } })).toBe(1);
  expect((await db.user.findUniqueOrThrow({ where: { id: pendingId } })).role).toBe('OWNER');
  expect((await db.user.findUniqueOrThrow({ where: { id: staffId } })).role).toBe('STAFF');
});
