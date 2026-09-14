import Image from 'next/image';
import { Shell } from '@/shared/components/layout/site-shell';
import { PropertyProjectShowcase } from './property-project-showcase';
import styles from './property.module.css';

export function PropertyPage() {
  return (
    <Shell className={styles.propertyPage}>
      <section className={styles.hero} aria-labelledby="property-title">
        <div className={styles.heroPhoto}>
          <Image
            className={styles.heroImage}
            src="/property/unsplash-edgar-xalyj0z5bgw.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className={styles.heroCopy}>
          <h1 id="property-title">SPACE BRANDING</h1>
          <span>전략적 개발과 브랜딩은 공간의 가치를 극대화시킵니다.</span>
        </div>
      </section>

      <PropertyProjectShowcase />
    </Shell>
  );
}
