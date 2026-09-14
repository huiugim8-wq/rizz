import Link from 'next/link';
import { Shell } from '@/shared/components/layout/site-shell';
import type { NewsArticle } from '@/domain/content/news';
import { archiveThumbnail, formatNewsDate } from '@/features/community/news/news-presentation';
import styles from '../community.module.css';
import { PageTitle } from '@/shared/components/layout/page-title';

export function NewsPage({
  articles,
  archive = false,
  featured,
}: {
  articles: readonly NewsArticle[];
  archive?: boolean;
  featured?: NewsArticle;
}) {
  const lead = featured ?? articles[0];
  return (
    <Shell className={styles.newsPage}>
      <PageTitle title="NEWS" className={styles.newsTitle}>
        <nav>
          <Link className={styles.active} href="/news">
            NEWS
          </Link>
          <Link href="/event-1">EVENT</Link>
        </nav>
      </PageTitle>
      <section className={styles.newsWrap}>
        {lead && (
          <article className={styles.newsFeature}>
            <img
              src={lead.image}
              alt={lead.imageAlt || lead.title}
              width={1214}
              height={486}
              fetchPriority="high"
            />
            <div>
              <h2>{lead.title}</h2>
              <time dateTime={lead.publishedAt}>{formatNewsDate(lead.publishedAt)}</time>
            </div>
          </article>
        )}
        <div className={styles.newsGrid}>
          {articles.map((article) => (
            <article key={article.id}>
              <img
                src={archive ? archiveThumbnail(article) : article.image}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <h2>
                {article.externalUrl ? (
                  <a href={article.externalUrl} target="_blank" rel="noopener noreferrer">
                    {article.title} ↗
                  </a>
                ) : (
                  article.title
                )}
              </h2>
              <time dateTime={article.publishedAt}>{formatNewsDate(article.publishedAt)}</time>
            </article>
          ))}
        </div>
      </section>
    </Shell>
  );
}
