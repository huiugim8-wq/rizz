import { db } from '../../src/server/db/client';
import creators from '../../src/data/seed/creators.json';
import news from '../../src/data/seed/news.json';
import { newsFeaturedImage } from '../../src/features/community/news/news-presentation';
import { ensureDemoAdmin } from '../../src/server/users/demo-admin';
await db.$transaction(async (tx) => {
  for (const [sortOrder, r] of creators.entries())
    await tx.creator.upsert({
      where: { id: r.id },
      update: {},
      create: { ...r, sortOrder, status: 'PUBLISHED' },
    });
  for (const [i, r] of news.entries())
    await tx.news.upsert({
      where: { id: r.id },
      update: {},
      create: {
        ...r,
        status: 'PUBLISHED',
        isArchived: r.publishedAt <= '2025-07-24',
        isFeatured: i === 0,
        featuredImage: i === 0 ? newsFeaturedImage : null,
        firstPublishedAt: new Date(),
      },
    });
});
console.log(
  `기존 ID 보존: 크리에이터 ${creators.length}개 / 뉴스 ${news.length}개. 기존 DB 레코드는 덮어쓰지 않았습니다.`,
);
await ensureDemoAdmin();
console.log('포트폴리오 체험 관리자 계정을 준비했습니다.');
await db.$disconnect();
