'use client';

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './home.module.css';

type ScrollFilmHeroProps = {
  film: string;
  poster: string;
};

type Cue = {
  start: number;
  end: number;
  eyebrow?: string;
  title?: string;
  detail?: string;
  layout?: 'center' | 'left' | 'right' | 'proof' | 'logo';
  tone?: 'dark' | 'light';
};

const cues: Cue[] = [
  {
    start: 0.55,
    end: 3.55,
    eyebrow: 'HOW WE GOT HERE',
    title: '모든 시작은\n하나의 채널이었습니다.',
    detail: 'HOTDOG TV',
    layout: 'center',
  },
  {
    start: 4.35,
    end: 7.65,
    eyebrow: 'PEOPLE MAKE POSSIBILITY',
    title: '가능성을 가진 크리에이터들이\n함께하기 시작했습니다.',
  },
  {
    start: 8.25,
    end: 9.85,
    eyebrow: '2018',
    title: '홍대 20평 사무실',
  },
  {
    start: 10.05,
    end: 11.65,
    eyebrow: '2020',
    title: '100평 사무실로 확장',
  },
  {
    start: 12.35,
    end: 15.65,
    eyebrow: 'YOGO',
    title: '크리에이터 트래픽을\n실제 구매로 연결합니다.',
    detail: '누적 거래액 200억+',
  },
  {
    start: 16.35,
    end: 19.65,
    eyebrow: 'OWNED MEDIA',
    title: '11개 자체제작 채널을\n직접 운영합니다.',
  },
  {
    start: 20.35,
    end: 23.65,
    eyebrow: 'RIZZ CREATOR',
    title: '크리에이터의 콘텐츠와\n비즈니스를 함께 성장시킵니다.',
    detail: '1,000만+ 크리에이터 트래픽',
  },
  {
    start: 24.35,
    end: 27.65,
    eyebrow: 'F&B',
    title: '온라인의 영향력을\n실제 브랜드 경험으로 확장합니다.',
    detail: 'SUSHI JUN · DOGOUT',
  },
  {
    start: 28.35,
    end: 31.65,
    eyebrow: '2024  OCT',
    title: '성수동 사옥 매입',
  },
  {
    start: 32.35,
    end: 35.65,
    eyebrow: 'GLOW UP RIZZ ACADEMY',
    title: '글로우업리즈\n아카데미 설립',
    detail: '검증된 경험을 다음 크리에이터의 성장으로 연결합니다.',
  },
  {
    start: 36.35,
    end: 39.65,
    eyebrow: 'THE NEXT GROWTH CYCLE',
    title: '콘텐츠를 성장시키고,\n트래픽을 만들어내는 비즈니스까지.',
  },
  {
    start: 40.35,
    end: 43.65,
    eyebrow: 'TO ONE TEAM',
    title: '아티스트의 매력을 키우고,\n더 큰 트래픽을 만드는 하나의 팀으로.',
    layout: 'right',
  },
  {
    start: 44.25,
    end: 48.15,
    eyebrow: 'GLOW UP',
    title: 'RIZZ',
    detail: '우리는 글로우업리즈입니다.',
    layout: 'logo',
    tone: 'light',
  },
];

function cueOpacity(time: number, cue: Cue) {
  const fade = Math.min(0.5, (cue.end - cue.start) * 0.22);
  const fadeIn = Math.min(1, Math.max(0, (time - cue.start) / fade));
  const fadeOut = Math.min(1, Math.max(0, (cue.end - time) / fade));
  return Math.min(fadeIn, fadeOut);
}

export function ScrollFilmHero({ film, poster }: ScrollFilmHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [introProgress, setIntroProgress] = useState(0);
  const [filmTime, setFilmTime] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const revealDistance = Math.max(180, window.innerHeight * 0.25);
      const next = reducedMotion.matches ? 1 : Math.min(1, Math.max(0, -rect.top / revealDistance));
      setIntroProgress((current) => Math.abs(current - next) > 0.0005 ? next : current);
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
    };
  }, []);

  const introOpacity = Math.max(0, 1 - Math.max(0, introProgress - 0.72) / 0.28);
  const captionVisibility = Math.min(1, Math.max(0, (introProgress - 0.68) / 0.32));
  const promptOpacity = 1 - introProgress;
  const activeCues = useMemo(
    () => cues.map((cue) => ({ cue, opacity: cueOpacity(filmTime, cue) * captionVisibility })),
    [captionVisibility, filmTime],
  );
  const lightCueVisibility = activeCues.reduce(
    (maximum, item) => item.cue.tone === 'light' ? Math.max(maximum, item.opacity) : maximum,
    0,
  );

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="home-hero-title">
      <div
        className={styles.heroSticky}
        style={{ '--hero-media-top': `${295 * (1 - introProgress)}px` } as CSSProperties}
      >
        <div
          className={styles.heroCanvas}
          style={{
            backgroundImage: `url(${poster})`,
          } as CSSProperties}
        >
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            aria-hidden="true"
            onLoadedMetadata={(event) => setFilmTime(event.currentTarget.currentTime)}
            onTimeUpdate={(event) => setFilmTime(event.currentTarget.currentTime)}
          >
            <source src={film} type="video/mp4" />
          </video>

          <div
            className={styles.heroVignette}
            style={{ opacity: captionVisibility * (1 - lightCueVisibility) }}
            aria-hidden="true"
          />

          {activeCues.map(({ cue, opacity }, index) => (
            <div
              className={styles.filmCue}
              data-layout={cue.layout ?? 'left'}
              data-tone={cue.tone ?? 'dark'}
              key={`${cue.start}-${index}`}
              style={{
                '--cue-opacity': opacity,
                '--cue-shift': `${(1 - opacity) * 28}px`,
              } as CSSProperties}
              aria-hidden={opacity < 0.15}
            >
              <div className={styles.filmCueCopy}>
                {cue.eyebrow && <p>{cue.eyebrow}</p>}
                {cue.title && <h2>{cue.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>}
                {cue.detail && <small>{cue.detail}</small>}
              </div>
            </div>
          ))}

          <div className={styles.scrollPrompt} style={{ opacity: promptOpacity }} aria-hidden="true">
            <span>SCROLL TO DISCOVER</span><i />
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
          <img src="/brand/glow-up-rizz-hero-title-v2.svg?v=4" alt="" aria-hidden="true" />
        </h1>
      </div>
    </section>
  );
}
