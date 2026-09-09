import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Shell } from '../components/site-shell';
import { featuredCreators, homeBusinesses, homeMedia, latestNews, proofMetrics, type HomeBusiness } from './home-content';
import styles from './home.module.css';

function BusinessPanel({ business, index }: { business: HomeBusiness; index: number }) {
  return (
    <article
      className={styles.businessPanel}
      data-tone={business.tone}
      style={{ '--panel-index': index + 1 } as CSSProperties}
    >
      <div className={styles.businessImage}>
        <img src={business.image} alt="" />
        <span>{business.label}</span>
      </div>
      <div className={styles.businessCopy}>
        <header>
          <p>{business.name}</p>
          <span>{business.number}</span>
        </header>
        <div className={styles.businessBody}>
          <p>{business.label}</p>
          <h3>{business.headline}</h3>
          <p>{business.description}</p>
          <ul>
            {business.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
        <Link className={styles.textLink} href={business.href}>VIEW BUSINESS <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <Shell className={`${styles.page} modern-home-page`}>
      <section
        className={styles.hero}
        aria-labelledby="home-hero-title"
        style={{ backgroundImage: `url(${homeMedia.poster})` }}
      >
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={homeMedia.poster}
          aria-hidden="true"
        >
          <source src={homeMedia.film} type="video/mp4" />
        </video>
        <div className={styles.heroShade} />
        <h1 id="home-hero-title" className={styles.heroTitle}>
          <span>GLOW UP</span><span> RIZZ</span>
        </h1>
        <div className={styles.heroBottom}>
          <p>크리에이터의 트래픽을<br />지속 가능한 비즈니스로 전환합니다.</p>
          <Link href="#business">DISCOVER RIZZ <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <p>WE ARE NOT ORDINARY ANYMORE</p>
        <h2 id="manifesto-title">
          콘텐츠로 사람을 모으고,<br />
          트래픽으로 시장을 만듭니다.
        </h2>
        <div>
          <span>GLOW UP RIZZ</span>
          <p>우리는 크리에이터의 매력을 발견하고 성장시켜<br />콘텐츠, 커머스, 교육, 브랜드로 연결합니다.</p>
        </div>
      </section>

      <section className={styles.creators} aria-labelledby="creators-title">
        <header className={styles.sectionHeader}>
          <p>MAKE UP THE WORLD<br />MORE INTERESTING</p>
          <h2 id="creators-title">RIZZ CREATORS</h2>
          <Link href="/mcn">VIEW ALL <span aria-hidden="true">↗</span></Link>
        </header>
        <div className={styles.creatorTrack}>
          {featuredCreators.map((creator) => (
            <Link className={styles.creatorCard} href="/mcn" key={creator.en}>
              <div>
                <img src={creator.image} alt={creator.ko} />
                <span>{creator.followers}</span>
              </div>
              <p>{creator.category}</p>
              <h3>{creator.ko}</h3>
              <span>{creator.en}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.platform} aria-labelledby="platform-title">
        <div className={styles.platformIntro}>
          <p>INFLUENCE VALUE CHAIN</p>
          <h2 id="platform-title">TRAFFIC<br />TO BUSINESS</h2>
          <div className={styles.cycle} aria-label="글로우업리즈 사업 순환">
            <span>CREATOR</span><i>→</i><span>CONTENT</span><i>→</i><span>TRAFFIC</span><i>→</i><span>COMMERCE</span><i>→</i><span>IP</span>
          </div>
        </div>
        <div className={styles.metrics}>
          {proofMetrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
          <small>공개 성과 자료 기준 · 2025년 6월</small>
        </div>
      </section>

      <section id="business" className={styles.businesses} aria-labelledby="business-title">
        <div className={styles.businessesIntro}>
          <p>ONE CONNECTED PLATFORM</p>
          <h2 id="business-title">OUR BUSINESS</h2>
          <p>하나의 영향력이 다음 사업을 만드는 구조</p>
        </div>
        {homeBusinesses.map((business, index) => (
          <BusinessPanel business={business} index={index} key={business.number} />
        ))}
      </section>

      <section className={styles.declaration} aria-labelledby="declaration-title">
        <img src={featuredCreators[0].image} alt="크리에이터 권기동" />
        <div />
        <p>YOU ARE NOT JUST<br />A CREATOR ANYMORE</p>
        <h2 id="declaration-title">매력은 콘텐츠가 되고,<br />콘텐츠는 새로운 산업이 됩니다.</h2>
        <span>GLOW UP RIZZ CREATOR BUSINESS GROUP</span>
      </section>

      <section className={styles.news} aria-labelledby="news-title">
        <header className={styles.sectionHeader}>
          <p>WHAT IS HAPPENING<br />AT GLOW UP RIZZ</p>
          <h2 id="news-title">RIZZ NEWS</h2>
          <Link href="/news">VIEW ALL <span aria-hidden="true">↗</span></Link>
        </header>
        <div className={styles.newsGrid}>
          {latestNews.map((item) => (
            <Link href="/news" key={item.title}>
              <div><img src={item.image} alt="" /></div>
              <time>{item.date}</time>
              <h3>{item.title}</h3>
              <span>READ MORE ↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="contact-title">
        <p>LET&apos;S BUILD WHAT&apos;S NEXT</p>
        <h2 id="contact-title">GROW WITH<br />RIZZ</h2>
        <div>
          <p>크리에이터 합류, 브랜드 협업, 채용에 관한<br />모든 가능성을 함께 이야기합니다.</p>
          <Link href="/contactus">CONTACT US <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </Shell>
  );
}
