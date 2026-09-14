import { Shell } from '@/shared/components/layout/site-shell';
import Link from 'next/link';
import { eventIds } from './event-content';
import styles from '../community.module.css';
import { PageTitle } from '@/shared/components/layout/page-title';

export function EventPage() {
  return (
    <Shell className={`${styles.newsPage} ${styles.eventPage}`}>
      <PageTitle title="EVENT" className={styles.newsTitle}>
        <nav>
          <Link href="/news">NEWS</Link>
          <Link className={styles.active} href="/event-1">
            EVENT
          </Link>
        </nav>
      </PageTitle>
      <section className={styles.eventFeature}>
        {eventIds.slice(0, 2).map((id, i) => (
          <article key={id}>
            <img
              src={`https://static.wixstatic.com/media/${id}/v1/fill/w_1044,h_630,al_c,q_85,enc_avif,quality_auto/event.jpg`}
              alt=""
            />
            <h2>{i ? '(2025.05) 크리에이터 네트워킹 파티' : '(2025.06) 채널주인부재중 팬미팅'}</h2>
          </article>
        ))}
      </section>
      <EventGallery title="(2025.06) 채널주인부재중 팬미팅" ids={eventIds.slice(2, 8)} />
      <EventGallery title="(2025.05) 크리에이터 네트워킹 파티" ids={eventIds.slice(8)} />
    </Shell>
  );
}

function EventGallery({ title, ids }: { title: string; ids: string[] }) {
  return (
    <section className={styles.eventGallery}>
      <h2>{title}</h2>
      <div>
        {ids.map((id) => (
          <img
            key={id}
            src={`https://static.wixstatic.com/media/${id}/v1/fill/w_686,h_658,al_c,q_85,enc_avif,quality_auto/event.jpg`}
            alt=""
          />
        ))}
      </div>
    </section>
  );
}
