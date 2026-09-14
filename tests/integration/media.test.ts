import { afterAll, beforeAll, expect, test } from 'vitest';
import { access } from 'node:fs/promises';
import sharp from 'sharp';
import { db } from '@/server/db/client';
import { publicFile } from '@/server/media/storage';
import { removeMedia } from '@/server/media/service';
import { storeUploadedImage } from '@/server/media/upload';
import { closeTestDatabase, resetTestDatabase, staffId } from './test-fixture';

beforeAll(resetTestDatabase);
afterAll(closeTestDatabase);

test('정지 이미지를 변환·중복 제거하고 미사용 파일을 삭제한다', async () => {
  const png = await sharp({
    create: { width: 2, height: 2, channels: 4, background: '#ed002f' },
  })
    .png()
    .toBuffer();
  const form = new FormData();
  form.set('file', new File([png], 'pixel.png', { type: 'image/png' }));
  const first = await storeUploadedImage(
    new Request('http://localhost/api/media', { method: 'POST', body: form }),
    staffId,
  );
  expect(first.url).toMatch(/^\/uploads\/[a-f0-9]{64}\.webp$/);
  const duplicateForm = new FormData();
  duplicateForm.set('file', new File([png], 'pixel.png', { type: 'image/png' }));
  const duplicate = await storeUploadedImage(
    new Request('http://localhost/api/media', { method: 'POST', body: duplicateForm }),
    staffId,
  );
  expect(duplicate.id).toBe(first.id);
  const asset = await db.mediaAsset.findUniqueOrThrow({ where: { id: first.id } });
  await access(publicFile(asset.storageKey));
  await removeMedia(staffId, first.id);
  await expect(access(publicFile(asset.storageKey))).rejects.toThrow();
});
