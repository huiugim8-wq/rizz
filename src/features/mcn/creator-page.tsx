import Link from 'next/link';
import { Shell } from '@/shared/components/layout/site-shell';
import { CreatorFilm } from './creator-film';
import type { Creator } from '@/domain/content/creator';
import styles from './creator.module.css';

export default function CreatorPage({ creators }: { creators: readonly Creator[] }) {
  return (
    <Shell className={styles.page}>
      <CreatorFilm />

      <section id="creator-list" className={styles.creators} aria-labelledby="creator-list-title">
        <header className={styles.creatorHeader}>
          <p>
            DISCOVER
            <br />
            OUR CREATORS
          </p>
          <h2 id="creator-list-title">
            RIZZ
            <br />
            CREATORS
          </h2>
          <Link href="/contactus">JOIN RIZZ ↗</Link>
        </header>
        <div className={styles.creatorGrid}>
          {creators.map((artist) => (
            <article className={styles.creatorCard} tabIndex={0} key={artist.id}>
              <div className={styles.creatorImage}>
                <img
                  src={artist.image}
                  style={{ objectPosition: `${artist.focalX ?? 50}% ${artist.focalY ?? 30}%` }}
                  alt={artist.name}
                  loading="lazy"
                  decoding="async"
                  width={816}
                  height={969}
                />
                <div className={styles.creatorOverlay}>
                  <span>{artist.category}</span>
                  <div>
                    <small>FOLLOWERS</small>
                    <strong>{artist.followers}</strong>
                  </div>
                </div>
              </div>
              <h3>{artist.displayName}</h3>
              <p>
                <span>{artist.name}</span>
                <span>{artist.category}</span>
              </p>
              {!!artist.channels?.length && (
                <nav aria-label={`${artist.name} 채널`} className={styles.creatorChannels}>
                  {artist.channels.map((channel, i) => (
                    <a key={i} href={channel.url} target="_blank" rel="noopener noreferrer">
                      {channel.platform} ↗
                    </a>
                  ))}
                </nav>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.join} aria-labelledby="creator-join-title">
        <p>CREATE WHAT&apos;S NEXT</p>
        <h2 id="creator-join-title">
          GLOW UP
          <br />
          TOGETHER
        </h2>
        <div>
          <p>
            자신만의 매력을 콘텐츠와 비즈니스로 확장할
            <br />
            다음 RIZZ 크리에이터를 기다립니다.
          </p>
          <Link href="/contactus">
            JOIN AS A CREATOR <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </Shell>
  );
}
