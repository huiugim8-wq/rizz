'use client';

import { memo, useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import type { HomeBusiness } from './home-content';
import styles from './business-rail.module.css';

const BusinessPanel = memo(function BusinessPanel({
  business,
  index,
  inactive,
}: {
  business: HomeBusiness;
  index: number;
  inactive: boolean;
}) {
  return (
    <article
      className={styles.businessPanel}
      data-tone={business.tone}
      inert={inactive}
      aria-label={business.name}
    >
      <div className={styles.businessVisual}>
        <img src={business.image} alt="" />
        <strong>{business.label}</strong>
      </div>
      <div className={styles.businessCopy}>
        <header>
          <span>{business.name}</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </header>
        <div>
          <p>{business.label}</p>
          <h3>
            {business.headline.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h3>
          <p>{business.description}</p>
          <ul>
            {business.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <Link
          href={business.href}
          prefetch={false}
          aria-label={`VIEW BUSINESS: ${business.name} 자세히 보기`}
        >
          VIEW BUSINESS <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
});

export function HorizontalBusinessRail({ businesses }: { businesses: readonly HomeBusiness[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [staticLayout, setStaticLayout] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const media = window.matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)');
    const update = () => {
      frame = 0;
      setStaticLayout(media.matches);
      if (media.matches) {
        const track = trackRef.current;
        if (window.innerWidth <= 900 && track) {
          setProgress(track.scrollLeft / Math.max(1, track.clientWidth * (businesses.length - 1)));
        }
        return;
      }
      const bounds = section.getBoundingClientRect();
      const headerHeight = window.innerWidth <= 900 ? 56 : 72;
      const viewportHeight = window.innerHeight - headerHeight;
      const travel = Math.max(1, section.offsetHeight - viewportHeight);
      const raw = Math.min(1, Math.max(0, (headerHeight - bounds.top) / travel));
      const stops = Math.max(1, businesses.length - 1);
      const nearestStop = Math.round(raw * stops) / stops;
      // Browser scroll positions round to pixels. Align a settled panel exactly
      // so a fractional translation cannot expose a sliver of its neighbour.
      setProgress(Math.abs(raw - nearestStop) * travel < 1 ? nearestStop : raw);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', schedule);
    };
  }, [businesses.length]);

  const distance = Math.max(0, businesses.length - 1) * 100;
  const activeIndex = Math.round(progress * (businesses.length - 1));
  const selectPanel = (index: number) => {
    if (window.matchMedia('(max-width: 900px)').matches) {
      const track = trackRef.current;
      track?.scrollTo({
        left: index * track.clientWidth,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    const headerHeight = window.innerWidth <= 900 ? 56 : 72;
    const travel = section.offsetHeight - (window.innerHeight - headerHeight);
    window.scrollTo({
      top:
        section.getBoundingClientRect().top +
        window.scrollY -
        headerHeight +
        (index / Math.max(1, businesses.length - 1)) * travel,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.businessRail}
      aria-label="Our business"
      style={{ '--business-travel': `${distance}vw` } as CSSProperties}
    >
      <div className={styles.businessRailSticky}>
        <div
          ref={trackRef}
          className={styles.businessTrack}
          onScroll={(event) => {
            if (!window.matchMedia('(max-width: 900px)').matches) return;
            const track = event.currentTarget;
            setProgress(
              track.scrollLeft / Math.max(1, track.clientWidth * (businesses.length - 1)),
            );
          }}
          style={{
            transform: `translate3d(${-progress * distance}%, 0, 0)`,
          }}
        >
          {businesses.map((business, index) => (
            <BusinessPanel
              business={business}
              index={index}
              inactive={!staticLayout && activeIndex !== index}
              key={business.name}
            />
          ))}
        </div>
        <nav className={styles.businessControls} aria-label="사업 소개 선택">
          {businesses.map((business, index) => (
            <button
              key={business.name}
              type="button"
              aria-label={`${String(index + 1).padStart(2, '0')} ${business.name} 보기`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => selectPanel(index)}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </nav>
        <div className={styles.businessProgress} aria-hidden="true">
          <i style={{ transform: `scaleX(${Math.max(0.02, progress)})` }} />
        </div>
      </div>
    </section>
  );
}
