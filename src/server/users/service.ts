import { db } from '@/server/db/client';
import { lock, checkActor, audit, OperationError } from '@/server/content/service';
export function listStaff() {
  return db.user.findMany({
    where: { role: { in: ['OWNER', 'STAFF', 'DEMO'] } },
    orderBy: { createdAt: 'desc' },
    take: 500,
    select: { id: true, name: true, email: true, emailVerified: true, role: true, status: true },
  });
}
export function countPendingStaff() {
  return db.user.count({ where: { status: 'PENDING' } });
}
export function hasOwner() {
  return db.user.count({ where: { role: 'OWNER' } }).then((count) => count > 0);
}
export async function claimInitialOwner(userId: string) {
  const initialOwnerEmail = process.env.INITIAL_OWNER_EMAIL?.trim().toLowerCase();
  if (!initialOwnerEmail) return;
  await db.$transaction(async (tx) => {
    await lock(tx);
    if (await tx.user.findFirst({ where: { role: 'OWNER' } })) return;
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user || !user.emailVerified || user.email.toLowerCase() !== initialOwnerEmail) return;
    await tx.user.update({
      where: { id: user.id },
      data: { role: 'OWNER', status: 'ACTIVE', approvedAt: new Date() },
    });
    await tx.siteControl.upsert({
      where: { id: 'site' },
      create: { id: 'site', ownerId: user.id },
      update: { ownerId: user.id },
    });
    await audit(tx, user.id, '최초 최고 관리자 지정', '직원', user.id, ['role', 'status']);
  });
}
export async function setStaffStatus(actorId: string, id: string, status: string) {
  if (!['ACTIVE', 'REJECTED', 'SUSPENDED'].includes(status))
    throw new OperationError('잘못된 계정 상태입니다.');
  await db.$transaction(async (tx) => {
    await lock(tx);
    await checkActor(tx, actorId, true);
    const target = await tx.user.findUnique({ where: { id } });
    if (!target || ['OWNER', 'DEMO'].includes(target.role) || id === actorId)
      throw new OperationError('최고 관리자와 체험 계정은 상태를 변경할 수 없습니다.');
    await tx.user.update({
      where: { id },
      data: { status, approvedBy: actorId, approvedAt: status === 'ACTIVE' ? new Date() : null },
    });
    await tx.session.deleteMany({ where: { userId: id } });
    await audit(tx, actorId, status, '직원', id, ['status']);
  });
}
export async function transferOwner(actorId: string, id: string, confirmationEmail: string) {
  await db.$transaction(async (tx) => {
    await lock(tx);
    const actor = await checkActor(tx, actorId, true);
    if (actor.role === 'DEMO')
      throw new OperationError('체험 최고 관리자는 소유권을 이전할 수 없습니다.');
    const target = await tx.user.findUnique({ where: { id } });
    if (
      !target ||
      target.id === actorId ||
      target.status !== 'ACTIVE' ||
      !target.emailVerified ||
      target.role !== 'STAFF' ||
      target.email.toLowerCase() !== confirmationEmail.trim().toLowerCase()
    )
      throw new OperationError('승인된 직원을 선택해 주세요.');
    await tx.user.update({ where: { id: actorId }, data: { role: 'STAFF' } });
    await tx.user.update({ where: { id }, data: { role: 'OWNER' } });
    await tx.siteControl.upsert({
      where: { id: 'site' },
      create: { id: 'site', ownerId: id },
      update: { ownerId: id },
    });
    await tx.session.deleteMany({ where: { userId: { in: [actorId, id] } } });
    await audit(tx, actorId, '소유권 이전', '직원', id, ['role']);
  });
}
