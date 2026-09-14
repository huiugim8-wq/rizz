import Link from 'next/link';
import { Shell } from '@/shared/components/layout/site-shell';
import { homeBusinesses, homeMedia } from './home-content';
import { HorizontalBusinessRail } from './horizontal-business-rail';
import { ScrollFilmHero } from './scroll-film-hero';
import { DirectorsCarousel } from './directors-carousel';
import { SlideLink } from '@/shared/components/navigation/slide-navigation';
import styles from './home-page.module.css';

export default function HomePage() {
  return (
    <Shell className={`${styles.page} modern-home-page`}>
      <ScrollFilmHero {...homeMedia} />

      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <p>WE ARE NOT ORDINARY ANYMORE</p>
        <div className={styles.manifestoMain}>
          <h2 id="manifesto-title">
            <span>콘텐츠로 사람을 모으고,</span>
            <span>트래픽으로 시장을 만듭니다.</span>
          </h2>
          <SlideLink
            className={styles.creatorEntry}
            href="/mcn"
            aria-label="크리에이터 페이지로 이동"
          >
            <span aria-hidden="true">→</span>
          </SlideLink>
        </div>
        <footer>
          <strong>GLOW UP RIZZ</strong>
          <p>
            우리는 크리에이터의 매력을 발견하고 성장시켜
            <br className={styles.copyBreak} /> 콘텐츠, 커머스, 교육, 브랜드로 연결합니다.
          </p>
        </footer>
      </section>

      <DirectorsCarousel />

      <section id="business" className={styles.businesses} aria-labelledby="business-title">
        <header className={styles.businessesIntro}>
          <p>ONE CONNECTED PLATFORM</p>
          <h2 id="business-title">OUR BUSINESS</h2>
          <footer>하나의 영향력이 다음 사업을 만드는 구조</footer>
        </header>
        <HorizontalBusinessRail businesses={homeBusinesses} />
      </section>

      <section className={styles.declaration} aria-labelledby="declaration-title">
        <img src="/home-scroll/team-declaration.jpg" alt="글로우업리즈 크리에이터와 팀" />
        <div aria-hidden="true" />
        <p>
          YOU ARE NOT JUST
          <br />A CREATOR ANYMORE
        </p>
        <h2 id="declaration-title">
          매력은 콘텐츠가 되고,
          <br />
          콘텐츠는 새로운 산업이 됩니다.
        </h2>
        <span>GLOW UP RIZZ CREATOR BUSINESS GROUP</span>
      </section>

      <section className={styles.contact} aria-labelledby="contact-title">
        <p>LET&apos;S BUILD WHAT&apos;S NEXT</p>
        <h2 id="contact-title">
          GROW WITH <br />
          RIZZ
        </h2>
        <div>
          <p>
            크리에이터 합류, 브랜드 협업, 채용에 관한
            <br />
            모든 가능성을 함께 이야기합니다.
          </p>
          <Link href="/contactus">
            CONTACT US <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </Shell>
  );
}
