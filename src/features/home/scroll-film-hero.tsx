'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useVisibleVideo } from '@/shared/components/media/use-visible-video';
import styles from './film-hero.module.css';

type ScrollFilmHeroProps = {
  film: string;
  poster: string;
};

export function ScrollFilmHero({ film, poster }: ScrollFilmHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playbackBlocked, play } = useVisibleVideo(videoRef);
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const page = section.closest<HTMLElement>('.modern-home-page');
    const header = page?.querySelector<HTMLElement>('.site-header');
    const mobile = window.matchMedia('(max-width: 900px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      if (mobile.matches) {
        setIntroProgress(0);
        page?.style.setProperty('--hero-header-opacity', '1');
        if (page) page.dataset.heroHeader = 'solid';
        return;
      }
      const rect = section.getBoundingClientRect();
      const revealDistance = Math.min(360, Math.max(180, window.innerHeight * 0.25));
      const next = reducedMotion.matches ? 1 : Math.min(1, Math.max(0, -rect.top / revealDistance));
      setIntroProgress((current) => (Math.abs(current - next) > 0.0005 ? next : current));

      // Fade the header only while the expanded film actually passes behind it.
      const headerHeight = header?.offsetHeight ?? 88;
      const entry = Math.min(1, Math.max(0, (headerHeight - rect.top) / headerHeight));
      const expansion = Math.min(1, Math.max(0, (next - 0.7) / 0.3));
      const exit = Math.min(1, Math.max(0, (rect.bottom - headerHeight) / headerHeight));
      const coverage = entry * expansion * exit;
      page?.style.setProperty('--hero-header-opacity', String(1 - coverage));
      if (page) page.dataset.heroHeader = coverage > 0.5 ? 'over-video' : 'solid';
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
      page?.style.removeProperty('--hero-header-opacity');
      if (page) delete page.dataset.heroHeader;
    };
  }, []);

  const introOpacity = Math.max(0, 1 - Math.max(0, introProgress - 0.72) / 0.28);
  const promptOpacity = 1 - introProgress;

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="home-hero-title">
      <link rel="preload" as="image" href={poster} fetchPriority="high" />
      <div
        className={styles.heroSticky}
        style={
          {
            '--hero-expansion': introProgress,
            '--hero-media-top': `calc(clamp(160px, 20.5vw, 330px) * ${1 - introProgress})`,
          } as CSSProperties
        }
      >
        <div
          className={styles.heroCanvas}
          style={
            {
              backgroundImage: `url(${poster})`,
            } as CSSProperties
          }
        >
          <video
            ref={videoRef}
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            aria-hidden="true"
          >
            <source src={film} type="video/mp4" />
          </video>

          {playbackBlocked && (
            <button type="button" className={styles.videoReplay} onClick={play}>
              영상 재생 ↗
            </button>
          )}

          <div
            className={styles.scrollPrompt}
            style={{ opacity: promptOpacity }}
            aria-hidden="true"
          >
            <span>SCROLL TO DISCOVER</span>
            <i />
          </div>
        </div>

        <h1
          id="home-hero-title"
          className={styles.heroTitle}
          style={{
            opacity: introOpacity,
            transform: `translate3d(${-introProgress * 112}vw, 0, 0)`,
          }}
          aria-label="GLOW UP RIZZ"
        >
          GLOW UP RIZZ
        </h1>
      </div>
    </section>
  );
}
