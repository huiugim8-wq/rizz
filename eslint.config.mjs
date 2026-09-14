import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['src/**/*.tsx'],
    // Wix URLs are already transformed/cropped and local assets use native CSS
    // sizing. Keep the existing image pipeline; no Next image proxy is configured.
    rules: { '@next/next/no-img-element': 'off' },
  },
  globalIgnores([
    '.next/**',
    'src/generated/**',
    '.vinext/**',
    '.wrangler/**',
    'dist/**',
    'out/**',
    'build/**',
    '.release/**',
    'tmp/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
