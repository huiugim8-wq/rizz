import { z } from 'zod';

const calendarDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜를 확인해 주세요.')
  .refine(
    (value) =>
      !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value,
    '올바른 날짜를 입력해 주세요.',
  );

const optionalHttpUrl = z
  .string()
  .trim()
  .max(2000)
  .refine(
    (value) => !value || (/^https?:\/\//i.test(value) && URL.canParse(value)),
    'http 또는 https 주소를 입력해 주세요.',
  );

const commonContentFields = {
  id: z.string().max(100).optional(),
  version: z.number().int().min(1).optional(),
  image: z.string().max(2500),
  mediaId: z.string().max(100).nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'HIDDEN']),
};

export const newsInput = z.object({
  ...commonContentFields,
  title: z.string().trim().min(1, '제목을 입력해 주세요.').max(200),
  publishedAt: calendarDate,
  imageAlt: z.string().trim().max(200),
  externalUrl: optionalHttpUrl,
  isArchived: z.boolean(),
  isFeatured: z.boolean(),
});

export const creatorInput = z.object({
  ...commonContentFields,
  name: z.string().trim().min(1).max(80),
  displayName: z.string().trim().min(1).max(80),
  category: z.enum(['BUSINESS', 'FITNESS', 'MUSIC', 'BEAUTY', 'LIFESTYLE']),
  followers: z.string().trim().min(1).max(40),
  focalX: z.number().int().min(0).max(100),
  focalY: z.number().int().min(0).max(100),
  followerCount: z.number().int().min(0).max(2147483647).nullable(),
  measuredAt: calendarDate.or(z.literal('')),
  channels: z
    .array(
      z.object({
        platform: z.string().trim().min(1).max(30),
        url: optionalHttpUrl.refine(Boolean, '채널 주소를 입력해 주세요.'),
      }),
    )
    .max(10),
});
