import { readFile } from 'node:fs/promises';
import { publicFile } from '@/server/media/storage';
import { db } from '@/server/db/client';
export const runtime = 'nodejs';
export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!/^[a-f0-9]{64}\.webp$/.test(key)) return new Response(null, { status: 404 });
  const asset = await db.mediaAsset.findUnique({ where: { storageKey: key } });
  if (!asset || asset.uploadState !== 'READY') return new Response(null, { status: 404 });
  try {
    return new Response(await readFile(publicFile(key)), {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
