'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Shell } from '../components/site-shell';
import { artists } from '../data';
import styles from './creator.module.css';

const categories = ['ALL', 'BUSINESS', 'FITNESS', 'MUSIC', 'BEAUTY', 'LIFESTYLE'] as const;
const categorySequence = ['BUSINESS', 'FITNESS', 'MUSIC', 'BEAUTY', 'LIFESTYLE'] as const;
const creators = artists.map((artist, index) => ({
  ...artist,
  category: categorySequence[index % categorySequence.length],
}));

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function CreatorFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let frame = 0;
    let progress = 0;
    let visible = true;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      progress = clamp(-rect.top / distance);

      const copyIn = clamp((progress - 0.16) / 0.2);
      const copyOut = 1 - clamp((progress - 0.7) / 0.14);
      const outro = clamp((progress - 0.68) / 0.18);

      section.style.setProperty('--title-opacity', String(clamp(1 - progress * 2.7)));
      section.style.setProperty('--title-shift', `${progress * -72}px`);
      section.style.setProperty('--copy-opacity', String(copyIn * copyOut));
      section.style.setProperty('--copy-shift', `${(1 - copyIn) * 38}px`);
      section.style.setProperty('--outro-opacity', String(outro));
      section.style.setProperty('--outro-shift', `${(1 - outro) * 34}px`);
      section.style.setProperty('--media-scale', String(1 + progress * 0.035));
      section.style.setProperty('--film-dim', String(0.12 + progress * 0.24));
    };

    const drawGloss = (time: number) => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pixelWidth = Math.round(width * ratio);
      const pixelHeight = Math.round(height * ratio);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'screen';

      const drift = Math.sin(time / 1900) * 0.05;
      const pink = context.createRadialGradient(
        width * (0.18 + progress * 0.46 + drift),
        height * (0.2 + progress * 0.35),
        0,
        width * (0.32 + progress * 0.28),
        height * 0.42,
        Math.max(width, height) * 0.7,
      );
      pink.addColorStop(0, `rgba(255, 69, 151, ${0.3 + progress * 0.22})`);
      pink.addColorStop(0.48, `rgba(255, 79, 77, ${0.16 + progress * 0.16})`);
      pink.addColorStop(1, 'rgba(255, 79, 77, 0)');
      context.fillStyle = pink;
      context.fillRect(0, 0, width, height);

      const blue = context.createRadialGradient(
        width * (0.86 - progress * 0.25),
        height * (0.72 - drift),
        0,
        width * 0.72,
        height * 0.58,
        Math.max(width, height) * 0.72,
      );
      blue.addColorStop(0, `rgba(76, 171, 255, ${0.3 + progress * 0.2})`);
      blue.addColorStop(0.5, `rgba(165, 77, 255, ${0.18 + progress * 0.16})`);
      blue.addColorStop(1, 'rgba(76, 171, 255, 0)');
      context.fillStyle = blue;
      context.fillRect(0, 0, width, height);

      const sheen = context.createLinearGradient(0, height, width, 0);
      sheen.addColorStop(0.3, 'rgba(255, 255, 255, 0)');
      sheen.addColorStop(0.52, `rgba(255, 255, 255, ${0.05 + progress * 0.06})`);
      sheen.addColorStop(0.66, 'rgba(255, 255, 255, 0)');
      context.fillStyle = sheen;
      context.fillRect(0, 0, width, height);
    };

    const render = (time: number) => {
      if (visible) drawGloss(time);
      frame = window.requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    updateProgress();
    observer.observe(section);
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    frame = window.requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.film} aria-labelledby="creator-film-title">
      <div className={styles.filmSticky}>
        <video
          className={styles.filmVideo}
          poster="/video/rizz-youtube-showreel/rizz-creators-hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="글로우업리즈 크리에이터 쇼릴"
        >
          <source src="/video/rizz-youtube-showreel/rizz-creators-hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.filmDim} aria-hidden="true" />
        <canvas ref={canvasRef} className={styles.filmCanvas} aria-hidden="true" />

        <p className={styles.filmEyebrow}>RIZZ CREATOR</p>
        <h1 id="creator-film-title" className={styles.filmTitle}>
          <span>GLOW UP</span>
          <span>CREATOR</span>
        </h1>

        <div className={styles.filmCopy}>
          <p>YOU ARE NOT JUST<br />A CREATOR ANYMORE</p>
          <p>우리는 크리에이터를 단순한 채널이 아니라<br />콘텐츠와 트래픽, 비즈니스를 만드는<br />하나의 브랜드로 성장시킵니다.</p>
        </div>

        <div className={styles.filmOutro}>
          <p>37 CREATORS</p>
          <p>ONE BUSINESS PLATFORM</p>
        </div>

        <a className={styles.filmScroll} href="#creator-list">
          <span>SCROLL TO DISCOVER</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
}

export default function CreatorPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('ALL');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const visibleCreators = useMemo(
    () => activeCategory === 'ALL' ? creators : creators.filter((creator) => creator.category === activeCategory),
    [activeCategory],
  );
  const selectCategory = (category: (typeof categories)[number]) => {
    setActiveCategory(category);
    setFiltersOpen(false);
  };

  return (
    <Shell className={styles.page}>
      <CreatorFilm />

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
