import Link from 'next/link';
import { Shell } from '../components/site-shell';
import { homeBusinesses, homeMedia } from './home-content';
import { HorizontalBusinessRail } from './horizontal-business-rail';
import { ScrollFilmHero } from './scroll-film-hero';
import styles from './home.module.css';

export default function HomePage() {
  return (
    <Shell className={`${styles.page} modern-home-page`}>
      <ScrollFilmHero film={homeMedia.film} poster={homeMedia.poster} />

      <section className={styles.manifesto} aria-labelledby="manifesto-title">
        <p>WE ARE NOT ORDINARY ANYMORE</p>
        <h2 id="manifesto-title">
          콘텐츠로 사람을 모으고,<br />
          트래픽으로 시장을 만듭니다.
        </h2>
        <footer>GLOW UP RIZZ</footer>
      </section>

      <section className={styles.creatorCollage} aria-label="Rizz creators">
        <Link className={styles.creatorEntry} href="/mcn" aria-label="크리에이터 페이지로 이동">
          <span>RIZZ<br />CREATOR</span>
          <i aria-hidden="true">→</i>
        </Link>
        <img src="/home-scroll/creator-collage.png" alt="글로우업리즈 크리에이터" />
      </section>

      <section className={styles.directors} aria-label="Creative Directors">
        <img src="/home-scroll/creative-directors.png" alt="글로우업리즈 크리에이티브 디렉터" />
      </section>

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
        <p>YOU ARE NOT JUST<br />A CREATOR ANYMORE</p>
        <h2 id="declaration-title">매력은 콘텐츠가 되고,<br />콘텐츠는 새로운 산업이 됩니다.</h2>
        <span>GLOW UP RIZZ CREATOR BUSINESS GROUP</span>
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
