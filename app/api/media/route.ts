import { NextResponse } from 'next/server';
import { currentUser } from '@/server/auth/guards';
import { MediaUploadError, storeUploadedImage } from '@/server/media/upload';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user || user.status !== 'ACTIVE') {
    return NextResponse.json(
      { message: '로그인한 승인 직원만 사진을 올릴 수 있습니다.' },
      { status: 403 },
    );
  }
  if (request.headers.get('origin') !== process.env.APP_ORIGIN) {
    return NextResponse.json({ message: '잘못된 요청 출처입니다.' }, { status: 403 });
  }
  try {
    return NextResponse.json(await storeUploadedImage(request, user.id));
  } catch (error) {
    if (!(error instanceof MediaUploadError)) {
      console.error('Photo upload failed:', error instanceof Error ? error.name : 'Unknown');
    }
    return NextResponse.json(
      {
        message:
          error instanceof MediaUploadError
            ? error.message
            : '사진을 처리하지 못했습니다. 10MB 이하의 JPEG·PNG·WebP·AVIF 파일인지 확인해 주세요.',
      },
      { status: error instanceof MediaUploadError ? error.status : 400 },
    );
  }
}
