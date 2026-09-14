import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '@/server/db/client';
import { claimInitialOwner } from '@/server/users/service';

const googleClientId = process.env.GOOGLE_CLIENT_ID ?? '';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? '';
const googleProviderConfigured = Boolean(googleClientId && googleClientSecret);

export const auth = betterAuth({
  appName: 'GLOW UP RIZZ',
  baseURL: process.env.APP_ORIGIN,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(db, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },
  socialProviders: googleProviderConfigured
    ? { google: { clientId: googleClientId, clientSecret: googleClientSecret } }
    : {},
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google'],
      allowDifferentEmails: false,
    },
  },
  user: {
    additionalFields: {
      role: { type: 'string', defaultValue: 'STAFF', input: false },
      status: { type: 'string', defaultValue: 'PENDING', input: false },
    },
  },
  databaseHooks: {
    session: {
      create: {
        after: async (session) => claimInitialOwner(session.userId),
      },
    },
  },
  session: { expiresIn: 60 * 60 * 8, updateAge: 0, cookieCache: { enabled: false } },
  rateLimit: {
    enabled: true,
    storage: 'database',
    window: 60,
    max: 60,
    customRules: {
      '/sign-in/social': { window: 60, max: 10 },
      '/sign-in/email': { window: 60, max: 10 },
      '/sign-up/email': { window: 60, max: 5 },
    },
  },
  advanced: {
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
});
