import { Shell } from '@/shared/components/layout/site-shell';
import { SideRail } from '@/shared/components/layout/side-rail';
import Link from 'next/link';
import { mcnRail } from '@/shared/config/navigation';
import { mcnHero } from '@/features/mcn/mcn-content';
import styles from '@/features/commerce/business.module.css';

function NumberSection({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.numberSection}>
      <header>
        <b>{num}</b>
        <h2>{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  );
}

export function ManagementPage() {
  const services = [
    '유튜브 성장 지원',
    '광고 영업 및 계약 관리',
    '촬영 장소 지원',
    '제품 협찬 및 지원',
    '전문 교육 및 멘토링 지원',
  ];
  return (
    <Shell className="management-page">
      <SideRail items={mcnRail} active="Management" className={styles.sideRail} />
      <section className={styles.managementContent}>
        <h1>
          “우리는 크리에이터의
          <br />
          지속가능한 비즈니스를 설계합니다.”
        </h1>
        <div className={styles.managementVisual} style={{ backgroundImage: `url(${mcnHero})` }} />
        <NumberSection num="01" title="탑 아티스트와 함께하는 더 큰 성장">
          <h4>Problem</h4>
          <p>
            기존 MCN은 콘텐츠 경험이 부족한 매니저 중심으로 운영되어 크리에이터의 실질적인 성장을
            이끌어 내기 어렵습니다.
          </p>
          <h4>Solution</h4>
          <p>
            RIZZ는 현직 탑티어 크리에이터가 직접 매니지먼트에 참여하여 경험으로 검증된 방향을
            제시합니다.
          </p>
        </NumberSection>
        <NumberSection num="02" title="아티스트에게 필요한 실질적인 지원">
          <div className={styles.serviceGrid}>
            {services.map((service, i) => (
              <article key={service}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <p>{service}</p>
              </article>
            ))}
          </div>
        </NumberSection>
        <NumberSection num="03" title="타사대비 더 높은 광고 단가 제안">
          <p>
            브랜드와 크리에이터 모두에게 합리적인 조건을 설계하고, 콘텐츠의 가치를 단가에
            반영합니다.
          </p>
        </NumberSection>
        <NumberSection num="04" title="네트워킹을 통한 시너지 창출">
          <img
            src="https://static.wixstatic.com/media/dc99e3_ea26e04cbc2d4cec82176285fe5b895f~mv2.jpg/v1/fill/w_900,h_480,al_c,q_85,enc_avif,quality_auto/IMG_2171.JPG"
            alt="Creator networking"
          />
          <p>분야를 넘나드는 크리에이터 네트워크를 통해 새로운 콘텐츠와 협업 기회를 만듭니다.</p>
        </NumberSection>
        <NumberSection num="05" title="새로운 수익 창출 기회 제공">
          <p>
            광고를 넘어 커머스, 브랜드, IP로 확장해 크리에이터의 지속 가능한 수익 구조를 만듭니다.
          </p>
          <Link className={styles.inlinePill} href="/commerce">
            View More ↗
          </Link>
        </NumberSection>
        <NumberSection num="06" title="지속 가능한 PB 브랜드 제안">
          <p>아티스트의 캐릭터와 팬덤을 기반으로 오래가는 제품과 브랜드를 설계합니다.</p>
          <h3>PB 브랜딩 서비스</h3>
          <div className={styles.pbGrid}>
            {[
              ['Branding', '브랜드 정체성\n스토리·콘셉트 개발'],
              ['Creation', '제품 기획\n디자인·생산'],
              ['Commerce', '유통·판매\n콘텐츠 마케팅'],
            ].map(([a, b]) => (
              <article key={a}>
                <h4>{a}</h4>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </NumberSection>
      </section>
    </Shell>
  );
}
