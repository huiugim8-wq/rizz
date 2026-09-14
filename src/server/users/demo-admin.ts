import { randomUUID } from 'node:crypto';
import { hashPassword, verifyPassword } from 'better-auth/crypto';
import { db } from '@/server/db/client';
import { demoAdmin } from '@/shared/config/demo-admin';

export async function ensureDemoAdmin() {
  const user = await db.user.upsert({
    where: { email: demoAdmin.email },
    create: {
      id: randomUUID(),
      name: demoAdmin.name,
      email: demoAdmin.email,
      emailVerified: true,
      role: 'DEMO',
      status: 'ACTIVE',
      approvedAt: new Date(),
    },
    update: {
      name: demoAdmin.name,
      emailVerified: true,
      role: 'DEMO',
      status: 'ACTIVE',
      approvedAt: new Date(),
    },
  });
  const account = await db.account.findFirst({
    where: { userId: user.id, providerId: 'credential' },
  });
  const passwordMatches =
    account?.password &&
    (await verifyPassword({ hash: account.password, password: demoAdmin.password }));
  if (!passwordMatches) {
    const password = await hashPassword(demoAdmin.password);
    if (account) {
      await db.account.update({ where: { id: account.id }, data: { password } });
    } else {
      await db.account.create({
        data: {
          id: randomUUID(),
          accountId: user.id,
          providerId: 'credential',
          userId: user.id,
          password,
        },
      });
    }
  }
  return user;
}
