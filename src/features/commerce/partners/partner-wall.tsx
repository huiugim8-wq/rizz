'use client';

import { useRef, useState } from 'react';
import { Shell } from '@/shared/components/layout/site-shell';
import { CommerceSectionLayout } from '@/features/commerce/commerce-section-layout';
import { partnerCategories, partners, type PartnerCategory } from './partner-catalog';
import styles from './partners.module.css';

export default function PartnerWall() {
  const [category, setCategory] = useState<PartnerCategory | 'All'>('All');
  const filterStart = useRef<HTMLDivElement>(null);
  const visible =
    category === 'All'
      ? partners
      : partners.filter((partner) => partner.categories.includes(category));
  const selectCategory = (next: PartnerCategory | 'All') => {
    setCategory(next);
    if (filterStart.current && filterStart.current.getBoundingClientRect().top < 88) {
      filterStart.current.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
    }
  };

  return (
    <Shell className={styles.page}>
      <CommerceSectionLayout active="Partners" className={styles.layout}>
        <section className={styles.content} aria-labelledby="partners-title">
          <header className={styles.intro}>
            <p>GLOW UP RIZZ</p>
            <h1 id="partners-title">OUR PARTNERS</h1>
          </header>
          <div ref={filterStart} className={styles.filterStart} aria-hidden="true" />
          <div className={styles.filters} role="group" aria-label="파트너 카테고리">
            {(['All', ...partnerCategories] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                aria-controls="partner-grid"
                onClick={() => selectCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <p className={styles.status} aria-live="polite">
            {category === 'All' ? '전체' : category} 파트너 {visible.length}개
          </p>
          <ul className={styles.grid} id="partner-grid" aria-label={`${category} partners`}>
            {visible.map((partner) => (
              <li
                key={partner.id}
                className={styles.partner}
                aria-label={partner.name}
                title={partner.name}
              >
                {partner.logo ? (
                  <svg
                    className={styles.logo}
                    viewBox={partner.logo.viewport?.join(' ') ?? '0 0 200 100'}
                    role="img"
                    aria-label={partner.name}
                    data-dark={partner.logo.dark || undefined}
                    data-invert={partner.logo.invert || undefined}
                  >
                    <image
                      href={partner.logo.src}
                      width={partner.logo.width ?? 200}
                      height={partner.logo.height ?? 100}
                    />
                  </svg>
                ) : (
                  <span className={styles.partnerName}>{partner.wordmark}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </CommerceSectionLayout>
    </Shell>
  );
}
