'use client';

import { useEffect, useRef } from 'react';
import { useVisibleVideo } from '@/shared/components/media/use-visible-video';
import styles from './creator.module.css';
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function CreatorFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useVisibleVideo(videoRef);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = section?.firstElementChild as HTMLElement | null;
    if (!section || !sticky) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previousTime = 0;
    let progress = 0;
    let target = 0;
    let start = 0;
    let distance = 1;
    let visible = false;

    const applyProgress = () => {
      const copyIn = clamp((progress - 0.16) / 0.2);
      const copyOut = 1 - clamp((progress - 0.48) / 0.12);
      const outro = clamp((progress - 0.6) / 0.18);
      section.style.setProperty('--title-opacity', String(clamp(1 - progress * 2.7)));
      section.style.setProperty('--title-shift', `${progress * -72}px`);
      section.style.setProperty('--copy-opacity', String(copyIn * copyOut));
      section.style.setProperty('--copy-shift', `${(1 - copyIn) * 38}px`);
      section.style.setProperty('--outro-opacity', String(outro));
      section.style.setProperty('--outro-shift', `${(1 - outro) * 34}px`);
      section.style.setProperty('--media-scale', String(1 + progress * 0.035));
      section.style.setProperty('--film-dim', String(0.12 + progress * 0.24));
    };

    const render = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      // Time-based damping stays consistent at 60 Hz and higher refresh rates.
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16.67;
      previousTime = time;
      progress += (target - progress) * (1 - Math.exp(-elapsed / 90));
      if (Math.abs(target - progress) < 0.0001) progress = target;
      applyProgress();
      if (progress !== target) frame = window.requestAnimationFrame(render);
      else previousTime = 0;
    };

    const updateTarget = () => {
      target = clamp((window.scrollY - start) / distance);
      if (reducedMotion.matches) {
        progress = target;
        applyProgress();
      } else if (visible && !document.hidden && !frame && progress !== target) {
        previousTime = 0;
        frame = window.requestAnimationFrame(render);
      }
    };

    const measure = () => {
      // Geometry is measured only on resize, never inside the animation loop.
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      start = section.getBoundingClientRect().top + window.scrollY - stickyTop;
      distance = Math.max(1, section.offsetHeight - sticky.offsetHeight);
      updateTarget();
    };

    const syncVisibility = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      section.style.setProperty(
        '--glow-play-state',
        visible && !document.hidden ? 'running' : 'paused',
      );
      if (visible && !document.hidden) updateTarget();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncVisibility();
    });
    const resizeObserver = new ResizeObserver(measure);
    measure();
    progress = target;
    applyProgress();
    observer.observe(sticky);
    resizeObserver.observe(section);
    resizeObserver.observe(sticky);
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', syncVisibility);
    reducedMotion.addEventListener('change', measure);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', syncVisibility);
      reducedMotion.removeEventListener('change', measure);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.film} aria-labelledby="creator-film-title">
      <div className={styles.filmSticky}>
        <video
          ref={videoRef}
          className={styles.filmVideo}
          poster="/video/rizz-youtube-showreel/rizz-creators-hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="글로우업리즈 크리에이터 쇼릴"
        >
          <source
            src="/video/rizz-youtube-showreel/rizz-creators-hero-60fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.filmDim} aria-hidden="true" />
        <div className={styles.filmGlow} aria-hidden="true" />

        <p className={styles.filmEyebrow}>RIZZ CREATOR</p>
        <h1 id="creator-film-title" className={styles.filmTitle}>
          <span>GLOW UP</span>
          <span>CREATOR</span>
        </h1>

        <div className={styles.filmCopy}>
          <p>
            YOU ARE NOT JUST
            <br />A CREATOR ANYMORE
          </p>
          <p>
            우리는 크리에이터를 단순한 채널이 아니라
            <br />
            콘텐츠와 트래픽, 비즈니스를 만드는
            <br />
            하나의 브랜드로 성장시킵니다.
          </p>
        </div>

        <div className={styles.filmOutro}>
          <p>1,000만 구독자</p>
          <p>브랜드를 움직이는 영향력</p>
        </div>

        <a className={styles.filmScroll} href="#creator-list">
          <span>SCROLL TO DISCOVER</span>
          <i aria-hidden="true">↓</i>
        </a>
      </div>
    </section>
  );
}
