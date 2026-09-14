'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { requireOwner, requireStaff } from '@/server/auth/guards';
import {
  saveContent,
  changeContent,
  reorderCreators,
  OperationError,
} from '@/server/content/service';
import { setStaffStatus, transferOwner } from '@/server/users/service';
import { listMedia, removeMedia } from '@/server/media/service';
import type { ContentKind } from '@/domain/content';
const kindSchema = z.enum(['news', 'creators']);
function failure(error: unknown) {
  return {
    ok: false as const,
    message:
      error instanceof z.ZodError
        ? (error.issues[0]?.message ?? '입력값을 확인해 주세요.')
        : error instanceof OperationError
          ? error.message
          : '처리하지 못했습니다. 새로고침 후 다시 시도해 주세요.',
  };
}
function refresh(kind: ContentKind) {
  revalidatePath(`/admin/${kind}`);
  revalidatePath(kind === 'news' ? '/news' : '/mcn');
  if (kind === 'news') revalidatePath('/news-2');
}
export async function saveAction(kind: ContentKind, input: unknown) {
  const user = await requireStaff();
  try {
    kindSchema.parse(kind);
    const id = await saveContent(user.id, kind, input);
    refresh(kind);
    return { ok: true as const, id, message: '저장했습니다.' };
  } catch (e) {
    return failure(e);
  }
}
export async function contentAction(
  kind: ContentKind,
  id: string,
  version: number,
  operation: 'trash' | 'restore' | 'hide',
) {
  const user = await requireStaff();
  try {
    kindSchema.parse(kind);
    z.enum(['trash', 'restore', 'hide']).parse(operation);
    await changeContent(
      user.id,
      kind,
      z.string().max(100).parse(id),
      z.number().int().positive().parse(version),
      operation,
    );
    refresh(kind);
    return { ok: true as const, message: '변경했습니다.' };
  } catch (e) {
    return failure(e);
  }
}
export async function orderAction(items: { id: string; version: number }[]) {
  const user = await requireStaff();
  try {
    await reorderCreators(
      user.id,
      z
        .array(z.object({ id: z.string().max(100), version: z.number().int().positive() }))
        .max(1000)
        .parse(items),
    );
    refresh('creators');
    return { ok: true as const, message: '순서를 저장했습니다.' };
  } catch (e) {
    return failure(e);
  }
}
export async function staffAction(id: string, status: string) {
  const user = await requireOwner();
  try {
    await setStaffStatus(user.id, id, status);
    revalidatePath('/admin/users');
    return { ok: true as const, message: '직원 상태를 변경했습니다.' };
  } catch (e) {
    return failure(e);
  }
}
export async function transferAction(id: string, confirmationEmail: string) {
  const user = await requireOwner();
  if (user.role === 'DEMO') {
    return { ok: false as const, message: '체험 최고 관리자는 소유권을 이전할 수 없습니다.' };
  }
  try {
    await transferOwner(user.id, id, z.string().email().parse(confirmationEmail));
    return { ok: true as const, message: '소유권을 이전했습니다. 다시 로그인해 주세요.' };
  } catch {
    return {
      ok: false as const,
      message: '선택한 직원의 확인된 Google 계정 이메일을 정확히 입력해 주세요.',
    };
  }
}
export async function mediaList() {
  await requireStaff();
  return listMedia();
}
export async function deleteMedia(id: string) {
  const user = await requireStaff();
  try {
    await removeMedia(user.id, id);
    return { ok: true as const, message: '사진을 삭제했습니다.' };
  } catch (e) {
    return failure(e);
  }
}
