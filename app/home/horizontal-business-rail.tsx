'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { HomeBusiness } from './home-content';
import styles from './home.module.css';

function BusinessPanel({ business }: { business: HomeBusiness }) {
  return (
    <article className={styles.businessPanel} data-tone={business.tone}>
      <div className={styles.businessVisual}>
        <img src={business.image} alt="" />
        <strong>{business.label}</strong>
      </div>
      <div className={styles.businessCopy}>
        <header><span>{business.name}</span></header>
        <div>
          <p>{business.label}</p>
          <h3>{business.headline}</h3>
          <p>{business.description}</p>
          <ul>
            {business.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
        <Link href={business.href}>VIEW BUSINESS</Link>
      </div>
    </article>
  );
}

export function HorizontalBusinessRail({ businesses }: { businesses: readonly HomeBusiness[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const headerHeight = window.innerWidth <= 900 ? 72 : 88;
      const viewportHeight = window.innerHeight - headerHeight;
      const travel = Math.max(1, section.offsetHeight - viewportHeight);
      const next = Math.min(1, Math.max(0, (headerHeight - bounds.top) / travel));
      setProgress((current) => Math.abs(current - next) > 0.0005 ? next : current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const distance = Math.max(0, businesses.length - 1) * 100;

  return (
    <section ref={sectionRef} className={styles.businessRail} aria-label="Our business">
      <div className={styles.businessRailSticky}>
        <div
          className={styles.businessTrack}
          style={{
            width: `${businesses.length * 100}vw`,
            transform: `translate3d(${-progress * distance}vw, 0, 0)`,
          }}
        >
          {businesses.map((business) => <BusinessPanel business={business} key={business.name} />)}
        </div>
        <div className={styles.businessProgress} aria-hidden="true">
          <i style={{ transform: `scaleX(${Math.max(0.02, progress)})` }} />
        </div>
      </div>
    </section>
  );
}
