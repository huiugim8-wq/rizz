import 'server-only';
import { createHash } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { db } from '@/server/db/client';
import { audit, checkActor, lock } from '@/server/content/service';
import { publicFile } from './storage';

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_REQUEST_BYTES = 11 * 1024 * 1024;
let processing = 0;

export class MediaUploadError extends Error {
  constructor(
    message: string,
    readonly status = 400,
  ) {
    super(message);
  }
}

export async function storeUploadedImage(request: Request, userId: string) {
  if (processing >= 2) {
    throw new MediaUploadError('다른 사진을 처리하고 있습니다. 잠시 후 다시 시도해 주세요.', 429);
  }
  if (Number(request.headers.get('content-length') ?? 0) > MAX_REQUEST_BYTES) {
    throw new MediaUploadError('10MB 이하의 사진을 선택해 주세요.', 413);
  }
  processing += 1;
  try {
    const body = await readLimitedBody(request);
    const form = await new Response(body, {
      headers: { 'content-type': request.headers.get('content-type') ?? '' },
    }).formData();
    const file = form.get('file');
    if (!(file instanceof File) || file.size > MAX_FILE_BYTES || form.getAll('file').length !== 1) {
      throw new MediaUploadError('10MB 이하의 사진 한 장을 선택해 주세요.');
    }
    const input = sharp(Buffer.from(await file.arrayBuffer()), {
      limitInputPixels: 20_000_000,
      animated: false,
    });
    const metadata = await input.metadata();
    if (
      !['jpeg', 'png', 'webp', 'avif', 'heif'].includes(metadata.format ?? '') ||
      (metadata.pages ?? 1) > 1
    ) {
      throw new MediaUploadError('JPEG·PNG·WebP·AVIF 정지 이미지만 사용할 수 있습니다.');
    }
    const { data, info } = await input
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 86 })
      .toBuffer({ resolveWithObject: true });
    const checksum = createHash('sha256').update(data).digest('hex');
    const storageKey = `${checksum}.webp`;
    const asset = await db.$transaction(async (transaction) => {
      await lock(transaction);
      await checkActor(transaction, userId);
      const existing = await transaction.mediaAsset.findUnique({ where: { checksum } });
      if (existing?.uploadState === 'READY') return existing;
      const filename = publicFile(storageKey);
      await mkdir(path.dirname(filename), { recursive: true });
      await writeFile(filename, data, { flag: 'wx' }).catch((error: NodeJS.ErrnoException) => {
        if (error.code !== 'EEXIST') throw error;
      });
      try {
        const item = await transaction.mediaAsset.create({
          data: {
            storageKey,
            checksum,
            mimeType: 'image/webp',
            byteSize: data.length,
            width: info.width,
            height: info.height,
            createdBy: userId,
            uploadState: 'READY',
          },
        });
        await audit(transaction, userId, '사진 업로드', '사진', item.id);
        return item;
      } catch (error) {
        await unlink(filename).catch(() => undefined);
        throw error;
      }
    });
    return {
      id: asset.id,
      url: `/uploads/${asset.storageKey}`,
      width: asset.width,
      height: asset.height,
    };
  } finally {
    processing -= 1;
  }
}

async function readLimitedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new MediaUploadError('파일이 없습니다.');
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > MAX_REQUEST_BYTES) {
      await reader.cancel();
      throw new MediaUploadError('10MB 이하의 사진을 선택해 주세요.', 413);
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
