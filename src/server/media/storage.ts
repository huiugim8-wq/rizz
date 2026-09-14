import path from 'node:path';
export function uploadRoot() {
  if (!process.env.UPLOAD_ROOT) throw new Error('UPLOAD_ROOT 설정이 필요합니다.');
  return path.resolve(process.env.UPLOAD_ROOT);
}
export function publicFile(key: string) {
  if (!/^[a-f0-9]{64}\.webp$/.test(key)) throw new Error('잘못된 파일입니다.');
  return path.join(uploadRoot(), 'public', key);
}
