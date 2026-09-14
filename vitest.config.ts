import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
config({ path: '.env.local', quiet: true });
if (!process.env.TEST_DATABASE_URL)
  throw new Error('TEST_DATABASE_URL을 지정하세요. 운영 DB에서 테스트하지 않습니다.');
const target = new URL(process.env.TEST_DATABASE_URL);
if (!target.pathname.endsWith('_test') || !['127.0.0.1', 'localhost'].includes(target.hostname))
  throw new Error('로컬 *_test DB만 테스트할 수 있습니다.');
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
process.env.APP_ORIGIN ||= 'http://localhost:3000';
process.env.BETTER_AUTH_SECRET ||= 'test-only-better-auth-secret-at-least-thirty-two-characters';
process.env.GOOGLE_CLIENT_ID ||= 'test-google-client-id';
process.env.GOOGLE_CLIENT_SECRET ||= 'test-google-client-secret';
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'server-only': fileURLToPath(
        new URL('./tests/integration/server-only-stub.ts', import.meta.url),
      ),
    },
  },
  test: { include: ['tests/**/*.test.ts'], fileParallelism: false, testTimeout: 20000 },
});
