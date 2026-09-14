import { Shell } from '@/shared/components/layout/site-shell';
import { brands } from './brand-content';
import styles from './fnb.module.css';

const fnbHero =
  'https://images.unsplash.com/photo-1745066113900-2dc0a449702b?auto=format&fit=crop&fm=jpg&q=85&w=2400';

export const metadata = {
  title: 'F&B',
  description: '권기준 대표의 직접 운영 경험에서 시작해 네 개의 브랜드로 확장한 RIZZ F&B.',
};

export default function Page() {
  return (
    <Shell className={styles.page}>
      <div className={styles.content}>
        <link rel="preload" as="image" href={fnbHero} fetchPriority="high" />
        <section
          className={styles.intro}
          aria-labelledby="fnb-title"
          style={{ backgroundImage: `url(${fnbHero})` }}
        >
          <div className={styles.introTitle}>
            <h1 id="fnb-title">더 리즈 룸</h1>
            <p>우리만의 맛. 우리만의 규칙.</p>
          </div>
          <p className={styles.introStory}>
            <strong>권기준 대표</strong>의 F&amp;B 경험은 합정의 주점·다이닝바 <b>‘술술’</b>에서
            시작했습니다. 같은 공간을 와인·양식 다이닝 <b>‘기러기둥지 합정점’</b>으로 바꾸고, 다시
            한식 닭요리 전문점 <b>‘서교닭매운탕’</b>으로 전환하며 메뉴와 서비스, 공간의 기준을
            현장에서 쌓았습니다. 이 경험은 지금의 도그아웃·스시준·에끼우동·서교닭매운탕, 네 개
            브랜드로 이어집니다.
          </p>
        </section>

        <section id="fnb-brands" className={styles.brands} aria-labelledby="brands-title">
          <h2 id="brands-title" className={styles.screenReader}>
            F&amp;B 브랜드
          </h2>
          <ol className={styles.brandList}>
            {brands.map((brand, index) => (
              <li key={brand.id} id={brand.id}>
                <a
                  className={styles.brandCard}
                  href={brand.href}
                  aria-label={`${brand.name} 자세히 보기`}
                >
                  <figure className={styles.brandVisual}>
                    <img
                      src={brand.image}
                      alt={brand.alt}
                      width={brand.imageWidth}
                      height={brand.imageHeight}
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />
                    <img
                      className={styles.brandLogo}
                      src={brand.logo}
                      alt={`${brand.name} 로고`}
                      width={brand.logoWidth}
                      height={brand.logoHeight}
                      data-brand={brand.id}
                    />
                    <span className={styles.brandArrow} aria-hidden="true">
                      ↗
                    </span>
                  </figure>
                  <h3 className={styles.brandTitle}>
                    <strong>{brand.name}</strong>
                    <span aria-hidden="true"> : </span>
                    {brand.title}
                  </h3>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.contact}>
          <span>F&amp;B PARTNERSHIP</span>
          <div>
            <h2>다음 브랜드를 함께 만듭니다.</h2>
            <a href="mailto:contact@glowuprizz.com">
              협업 문의 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </div>
    </Shell>
  );
}
