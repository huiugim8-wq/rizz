import { Shell } from '@/shared/components/layout/site-shell';
import { commerceHero } from '@/features/commerce/commerce-content';
import { CommerceSectionLayout } from './commerce-section-layout';
import styles from './business.module.css';

export function CommercePage() {
  const blocks = [
    [
      '01  Commerce',
      '초기 브랜드 광고비 0원으로\n매출/브랜드 가치 극대화',
      '많은 MCN이 아티스트 트래픽을 매출로 전환하는 시스템을 갖추지 못해, 브랜디드 콘텐츠에만 의존하며 ROAS 책임을 지지 않습니다. 이로 인해 많은 브랜드가 손해를 보고 온라인 트래픽에 대한 신뢰가 하락했습니다.',
      'RIZZ는 자사몰 ‘YOGO’를 활용하여 RS 정산 방식을 통해 브랜드에 광고비 없는 광고를 제안합니다. 브랜드는 아무 리스크없이 아티스트와 협업할 수 있습니다. 또한 브랜드 관련 영상이 영구적으로 남아있어 무료 홍보 효과까지 볼 수 있습니다.',
    ],
    [
      '02  Management',
      '탑 아티스트가 직접\n매칭 아티스트를 핸들링',
      '기존 MCN 아티스트 매니저들은 아티스트를 컨트롤 할 수 없습니다. 그에 따른 리스크는 MCN과 브랜드가 지게 됩니다.',
      'RIZZ는 현직 탑티어 아티스트들이 직접 매니지먼트에 참여합니다. 같은 아티스트로서 생기는 공감대를 바탕으로 실질적 도움이 되는 콘텐츠 방향성을 제시하며 브랜드 ROAS에 직·간접적인 도움을 제공합니다.',
    ],
    [
      '03  PB Branding',
      '탑티어 아티스트가\n귀사의 마케터가 되다',
      '브랜드는 아티스트의 IP를 활용한 PB 상품으로 새로운 수익을 창출하고, 지속 가능한 브랜드 스토리를 만들 기회를 얻습니다.',
      'PB 상품은 아티스트의 고유한 이미지와 브랜드를 더 넓은 시장에 알릴 수 있는 강력한 도구입니다. 브랜드가 아티스트의 정체성과 맞는 제품을 함께 개발함으로써 새로운 고객층을 확보할 수 있습니다.',
    ],
  ] as const;
  return (
    <Shell className={styles.commercePage}>
      <link rel="preload" as="image" href={commerceHero} fetchPriority="high" />
      <section
        className={styles.imageHero}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)),url(${commerceHero})`,
        }}
      >
        <h1>GLOW UP PARTNERS</h1>
        <p>브랜드의 ROAS를 책임지지 않으면 MCN이 아닙니다.</p>
      </section>
      <CommerceSectionLayout active="Commerce" className={styles.commercePrimaryLayout}>
        <section className={styles.commerceIntro}>
          <p>콘텐츠 커머스 매칭 플랫폼</p>
          <h2>YOGO</h2>
          <p>
            상품 및 서비스 공급자 브랜드와 콘텐츠 제작자 아티스트를 매칭하여
            <br />
            RIZZ 자사몰 YOGO에서 상품 및 서비스를 판매합니다.
          </p>
          <div>
            {[
              ['Brand', '어떤 비용도 지불하지 않고 원하는 아티스트를 통해 상품 및 서비스 홍보'],
              ['Artist', '광고주 없이 자유로운 형태의 콘텐츠 제작과 판매한 만큼의 수익 창출'],
              ['Viewer', '콘텐츠에서 노출된 상품과 서비스를 가장 합리적인 금액에 구매'],
            ].map(([name, copy]) => (
              <article key={name}>
                <b>{name}</b>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.commerceBlocks}>
          {blocks.map(([num, title, p1, p2], i) => (
            <article key={num}>
              <header>{num}</header>
              <div>
                <h2>{title}</h2>
                <p>{p1}</p>
                <p>{p2}</p>
                {i === 0 && (
                  <>
                    <h3>
                      글로벌 탑티어 유튜브 쇼핑 경험 제공
                      <br />
                      국내 최다 YouTube 쇼핑 성공 사례 - YOGO
                    </h3>
                    <div className={styles.stats}>
                      <div>
                        <span>총 진행 건 수</span>
                        <b>481</b>
                      </div>
                      <div>
                        <span>총 주문 건 수</span>
                        <b>88만</b>
                      </div>
                      <div>
                        <span>총 거래액</span>
                        <b>343억</b>
                      </div>
                    </div>
                    <small>*2025년 6월 기준</small>
                  </>
                )}
              </div>
            </article>
          ))}
        </section>
      </CommerceSectionLayout>
    </Shell>
  );
}
