import { Shell } from '@/shared/components/layout/site-shell';
import styles from './academy.module.css';

export function AcademyPage() {
  const points = [
    '유튜브 7년 차, 117만 구독자 보유',
    '연 매출 200억 콘텐츠 기반 비즈니스 운영',
    '11개의 유튜브 채널 보유 및 운영',
    '누적 커머스 협업 430건 이상 진행',
    '크리에이터 컨설팅 26명 진행',
    '10만 유튜버 3명 직접 배출',
    'MCN 설립 및 운영 경험 보유',
    '브랜드와 협업으로 수차례 매출 성공 사례 창출',
    '주요 대학 및 기업 대상 강의 다수 진행',
  ];
  return (
    <Shell className={styles.academyPage}>
      <section className={styles.academyHero}>
        <div>
          <h1>RIZZ ACADEMY</h1>
          <p className={styles.academyLead}>
            콘텐츠로 시작하여 비즈니스까지.
            <br />
            실전으로 증명된 크리에이터들의 성장 전략을 배웁니다.
          </p>
          <div className={styles.academyCopy}>
            <strong>글로우업리즈 아카데미는</strong>
            <span>
              8년간 유튜브로 수많은 실험과 성장을 경험한 크리에이터가 전하는
              <br />
              유튜브 기획, 수익화, 브랜드 확장, 그리고 콘텐츠 기반 사업화까지
              <br />
              실무 중심으로 설계된 실전형 교육 플랫폼입니다.
            </span>
          </div>
        </div>
      </section>
      <section className={styles.academyTeacher}>
        <h2>
          <span>✦</span>유튜브 하나로 사업까지 확장해낸 실전형 CEO가 직접 강의합니다.
        </h2>
        <div className={styles.lecturer}>
          <img
            src="https://static.wixstatic.com/media/a3e44e_bad62282522b4da283dcff636b0aff34~mv2.jpg/v1/fill/w_400,h_460,fp_0.50_0.44,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1030_%ED%94%84%EB%A1%9C%ED%95%8418116.jpg"
            alt="권기동"
            width={400}
            height={460}
            fetchPriority="high"
          />
          <div>
            <p>채널주인부재중 운영자 / 글로우업리즈 대표</p>
            <h3>권기동</h3>
            <ul>
              {points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.coming}>
        <div className={styles.comingCards}>
          {Array.from({ length: 5 }).map((_, i) => (
            <article key={i} />
          ))}
        </div>
        <div className={styles.comingCopy}>
          <h2>COMING SOON</h2>
          <p>
            실무 경험 중심의 콘텐츠 전문가들이
            <br />
            순차적으로 합류할 예정입니다.
          </p>
        </div>
      </section>
    </Shell>
  );
}
