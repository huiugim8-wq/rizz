import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
  serverExternalPackages: ['pg', '@prisma/client', '@prisma/adapter-pg', 'sharp'],
  experimental: { serverActions: { bodySizeLimit: '1mb' } },
};
export default nextConfig;
