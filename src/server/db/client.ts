import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
const globalDb = globalThis as unknown as { rizzDb?: PrismaClient };
export const db =
  globalDb.rizzDb ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      statement_timeout: 10000,
    }),
  });
if (process.env.NODE_ENV !== 'production') globalDb.rizzDb = db;
