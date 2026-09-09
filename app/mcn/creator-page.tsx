'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Shell } from '../components/site-shell';
import { artists } from '../data';
import styles from './creator.module.css';

const categories = ['ALL', 'BUSINESS', 'FITNESS', 'MUSIC', 'BEAUTY', 'LIFESTYLE'] as const;
const categorySequence = ['BUSINESS', 'FITNESS', 'MUSIC', 'BEAUTY', 'LIFESTYLE'] as const;
const creators = artists.map((artist, index) => ({
  ...artist,
  category: categorySequence[index % categorySequence.length],
}));
const heroCreators = [creators[2], creators[0], creators[3]];

export default function CreatorPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('ALL');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const visibleCreators = useMemo(
    () => activeCategory === 'ALL' ? creators : creators.filter((creator) => creator.category === activeCategory),
    [activeCategory],
  );
  const heroCreator = heroCreators[heroIndex];

  const selectCategory = (category: (typeof categories)[number]) => {
    setActiveCategory(category);
    setFiltersOpen(false);
  };

  return (
    <Shell className={styles.page}>
      <section className={styles.hero} aria-labelledby="creator-hero-title">
        <div className={styles.heroVisual}>
          <img key={heroCreator.en} src={heroCreator.image} alt={`RIZZ 크리에이터 ${heroCreator.ko}`} />
          <div />
        </div>
        <p className={styles.eyebrow}>RIZZ CREATOR</p>
        <h1 id="creator-hero-title">GLOW UP RIZZ</h1>
        <p className={styles.heroCaption}>YOU ARE NOT JUST A CREATOR<br />ANYMORE</p>
        <button
          className={styles.heroArrow}
          type="button"
          onClick={() => setHeroIndex((current) => (current + 1) % heroCreators.length)}
          aria-label="다음 대표 크리에이터 보기"
        >
          →
        </button>
        <span className={styles.heroCount}>0{heroIndex + 1} / 0{heroCreators.length}</span>
        <a className={styles.scrollCue} href="#creator-list">SCROLL <span>↓</span></a>
      </section>

      <section id="creator-list" className={styles.creators} aria-labelledby="creator-list-title">
        <header className={styles.creatorHeader}>
          <p>DISCOVER<br />OUR CREATORS</p>
          <h2 id="creator-list-title">RIZZ<br />CREATORS</h2>
          <Link href="/contactus">JOIN RIZZ ↗</Link>
        </header>
        <div className={styles.filterArea}>
          <button
            className={styles.filterTrigger}
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="creator-filters"
          >
            <span>{activeCategory === 'ALL' ? 'SORTING' : activeCategory}</span>
            <i aria-hidden="true">{filtersOpen ? '×' : '⌄'}</i>
          </button>
          <div className={styles.filters} id="creator-filters" data-open={filtersOpen}>
            {categories.map((category) => (
              <button
                className={category === activeCategory ? styles.activeFilter : ''}
                type="button"
                onClick={() => selectCategory(category)}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.creatorGrid} aria-live="polite">
          {visibleCreators.map((artist) => (
            <article className={styles.creatorCard} tabIndex={0} key={artist.en}>
              <div className={styles.creatorImage}>
                <img src={artist.image} alt={artist.ko} />
                <div className={styles.creatorOverlay}>
                  <span>{artist.category}</span>
                  <div>
                    <small>FOLLOWERS</small>
                    <strong>{artist.followers}</strong>
                  </div>
                </div>
              </div>
              <h3>{artist.en}</h3>
              <p><span>{artist.ko}</span><span>{artist.category}</span></p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.join} aria-labelledby="creator-join-title">
        <p>CREATE WHAT&apos;S NEXT</p>
        <h2 id="creator-join-title">GLOW UP<br />TOGETHER</h2>
        <div>
          <p>자신만의 매력을 콘텐츠와 비즈니스로 확장할<br />다음 RIZZ 크리에이터를 기다립니다.</p>
          <Link href="/contactus">JOIN AS A CREATOR <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </Shell>
  );
}
