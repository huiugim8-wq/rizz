import type { ReactNode } from 'react';
import { Shell } from '@/shared/components/layout/site-shell';
import { SideRail } from '@/shared/components/layout/side-rail';
import { fnbRail } from '@/shared/config/navigation';
import { seogyoMenu } from './restaurant-content';
import styles from './restaurant.module.css';

function FnbHero() {
  return (
    <section className={styles.fnbHero}>
      <h1>THE RIZZ ROOM</h1>
      <div>
        <h2>&quot;Our flavor. Our rules.&quot;</h2>
        <p>
          글로우업리즈의 F&amp;B 매장은 우리의 쇼룸입니다.
          <br />
          이곳은 단순한 공간이 아닌, 우리만의 감각과 철학이 응축된 브랜드 무대입니다.
          <br />
          우리는 정해진 매뉴얼보다 감각과 경험으로 채워지는 순간을 더 믿습니다.
          <br />그 무한한 가능성을 위해 오늘도 실험하고, 고민하고, 나아갑니다.
        </p>
      </div>
    </section>
  );
}

function RestaurantLayout({
  active,
  pageClass,
  logoClass,
  logoSrc,
  logoAlt,
  children,
}: {
  active: string;
  pageClass: string;
  logoClass: string;
  logoSrc: string;
  logoAlt: string;
  children: ReactNode;
}) {
  return (
    <Shell className={styles.fnbPage}>
      <FnbHero />
      <SideRail items={fnbRail} active={active} className={styles.sideRail} />
      <section className={`${styles.restaurantPage} ${pageClass}`}>
        <img className={`${styles.restaurantLogo} ${logoClass}`} src={logoSrc} alt={logoAlt} />
        {children}
      </section>
    </Shell>
  );
}

export function FnbPage() {
  const spaceImages = [
    'dc99e3_21a12ea944bf4bb9824458abbd010dab~mv2.jpg',
    'dc99e3_a0f041ffc3294702a825828e166a6ab7~mv2.jpg',
    'dc99e3_b3bcae5862dc4977856503ff00bb8202~mv2.jpg',
    'dc99e3_60f45e34815b479b8f7eb6e5ec430373~mv2.jpg',
    'dc99e3_77717eaa76ce4a87a2102974812ee96f~mv2.jpg',
  ];

  return (
    <Shell className={styles.fnbPage}>
      <FnbHero />
      <SideRail items={fnbRail} active="서교닭매운탕" className={styles.sideRail} />
      <section className={styles.fnbBrand}>
        <img
          className={styles.fnbMark}
          src="https://static.wixstatic.com/media/dc99e3_04119e9f5bde4a51acac39b7a1876f70~mv2.jpg/v1/fill/w_200,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.jpg"
          alt="서교닭매운탕"
        />
        <div>
          <h2>닭요리의 틀을 깨다, 맛의 기준을 바꾸다.</h2>
          <p>
            전통의 깊이를 존중하되, 고정관념에 안주하지 않습니다.
            <br />
            닭볶음탕과 매운탕의 경계를 넘나드는 새로운 해석,
            <br />
            익숙하지만 신선한 조합으로 닭요리의 정체성을 다시 씁니다.
            <br />
            우리는 단순히 음식을 만드는 것이 아니라 새로운 기준과 브랜드 경험을 제시합니다.
          </p>
        </div>
      </section>
      <section className={styles.fnbMenu}>
        <h2>
          끊임없는 메뉴 개발과 맛으로 증명하는 경쟁력,
          <br />
          서교닭매운탕의 성장 엔진입니다.
        </h2>
        <div className={styles.fnbFoodGrid}>
          {seogyoMenu.map(({ name, image }) => (
            <article key={image}>
              <img src={image} alt={name} />
              <span>{name}</span>
            </article>
          ))}
        </div>
        <h3>서교닭매운탕 본점</h3>
        <a href="https://www.instagram.com/" aria-label="Instagram">
          ◎
        </a>
        <div className={styles.fnbSpaceGallery}>
          <img
            src={`https://static.wixstatic.com/media/${spaceImages[0]}/v1/fill/w_809,h_324,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space.jpg`}
            alt="서교닭매운탕 매장"
          />
          {spaceImages.slice(1).map((id) => (
            <img
              src={`https://static.wixstatic.com/media/${id}/v1/fill/w_400,h_243,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/space.jpg`}
              alt="서교닭매운탕 공간"
              key={id}
            />
          ))}
        </div>
      </section>
      <StoreInfo
        items={[
          ['주소', '서울 마포구 독막로 3길 51, 서주빌딩'],
          ['영업시간', '11:00 - 23:00'],
          ['브레이크타임', '15:00 - 17:00'],
          ['라스트오더', '22:00'],
          ['전화번호', '070-7799-6848'],
        ]}
      />
    </Shell>
  );
}

const sushiImgs = [
  'dc99e3_04ab4479eab44f509021d431461f9ee2~mv2.jpg',
  'dc99e3_69124c11094645758dbe9067342266b8~mv2.jpg',
  'dc99e3_de1158987f834c019d202a180c092fe8~mv2.jpg',
  'dc99e3_158ba8f6b9d44cb79b878634b1d1109f~mv2.jpg',
  'dc99e3_592c1c0d297a4a5da494ab0a56d78d44~mv2.jpg',
  'dc99e3_5cf5d859b87e4ae78adcc78899c30a5f~mv2.jpg',
  'dc99e3_a9617563901547d193dc489d268fbbba~mv2.jpg',
  'dc99e3_91ff7bafaf814267b80d6ccf2dc26530~mv2.jpg',
  'dc99e3_22f63b800f1f4e2b80612f204ac3f0a7~mv2.jpg',
];

const udonImgs = [
  'dc99e3_61d71d0c35ce4960b7a45caca9638021~mv2.jpg',
  'dc99e3_de06f507e6d240efb10b585609ba56e5~mv2.jpg',
  'dc99e3_efd5f7250cae4695b464b1113e3d8c58~mv2.jpg',
  'dc99e3_10ecd0560efa455eb02b8cc2fe028b3b~mv2.jpg',
  'dc99e3_51760e0d391442e5a3cd09eb8e90688f~mv2.jpg',
  'dc99e3_42160739030244189fa278f1f3ebe90a~mv2.jpg',
  'dc99e3_6ee1e6825fd545d8a183b60e222c501d~mv2.jpg',
];

const dogoutImgs = [
  'dc99e3_c32f877a969f44ca8c16eb9daddcf6cb~mv2.png',
  'dc99e3_1e505220162f466aa4cca0010978e92c~mv2.png',
  'dc99e3_3adefad6080848bf9bb317046ff61e38~mv2.png',
  'dc99e3_6d0ea899fef549afb307d68009f57e0c~mv2.png',
  'dc99e3_93062a6281df4b31a2de0f1e40063f00~mv2.png',
  'dc99e3_3957acdf01be4939b16e9960df01662e~mv2.png',
  'dc99e3_5a7c8bd5a8b64e7fb2a8b75ae72df756~mv2.png',
  'dc99e3_a36d285b4e0d40fa88b3c8044b75988d~mv2.png',
];

export function SushiPage() {
  return (
    <RestaurantLayout
      active="스시준"
      pageClass={styles.sushiPage}
      logoClass={styles.sushiLogo}
      logoSrc="https://static.wixstatic.com/media/dc99e3_8cd41ebb0cc141fe8403f613aeccb6e2~mv2.png/v1/fill/w_438,h_482,al_c,q_85,enc_avif,quality_auto/sushijun.png"
      logoAlt="스시준"
    >
      <h1>한 접시의 정성으로 브랜드의 깊이를 전하는 곳</h1>
      <p>
        공덕역 뒷골목에서 시작하여 14년 경력의 셰프가 이끌어온 스시준,
        <br />
        글로우업리즈 사옥에서 새롭게 출발합니다.
      </p>
      <h3>Chef. 이준엽</h3>
      <p>
        매일 새벽 직접 선별한 재료와 정교한 손길로 완성된 오마카세는 단순한 식사를 넘어 깊은 신뢰를
        쌓아왔습니다. 단골들의 오랜 재방문과 찬사는 스시준이 하나의 브랜드로 자리 잡은 이유입니다.
        <br />
        <br />
        지금, 스시준은 우리 글로우업리즈를 대표하는 하이퀄리티 F&amp;B 오마카세 브랜드입니다.
      </p>
      <ImageGrid ids={sushiImgs} square={false} />
      <h2>스시준 성수</h2>
      <div className={styles.restaurantDetails}>
        <img
          src="https://static.wixstatic.com/media/dc99e3_44f71267fdb644fbb233243e5e0af176~mv2.png/v1/fill/w_809,h_480,al_c,q_85,enc_avif,quality_auto/menu.png"
          alt="스시준 메뉴"
        />
        <img
          src="https://static.wixstatic.com/media/dc99e3_0df149c040d64489914357454445eb6d~mv2.png/v1/fill/w_809,h_283,al_c,q_85,enc_avif,quality_auto/info.png"
          alt="스시준 안내"
        />
      </div>
      <StoreInfo
        items={[
          ['주소', '서울 성동구 연무장19길 6, RIZZ'],
          ['예약타임', '런치 - 12:00, 13:30  |  디너 - 18:00, 20:00'],
          ['영업시간', '10:00 - 21:00 (매주 월요일 정기 휴무)'],
          ['브레이크 타임', '15:00 ~ 17:00'],
          ['전화번호', '02-2205-4889'],
        ]}
        inner
      />
      <a className={styles.reserve} href="tel:0222054889">
        예약하기
      </a>
    </RestaurantLayout>
  );
}

export function UdonPage() {
  return (
    <RestaurantLayout
      active="에끼우동"
      pageClass={styles.udonPage}
      logoClass={styles.udonLogo}
      logoSrc="https://static.wixstatic.com/media/dc99e3_e22f6a046abe404ebf1af122aacda996~mv2.png/v1/fill/w_716,h_202,al_c,q_85,enc_avif,quality_auto/ekiudon.png"
      logoAlt="에끼우동"
    >
      <h1>간판만 있는 식당이 아닌, 브랜드가 살아있는 공간</h1>
      <p>
        단순하지만 깊은 맛, 우동 본질에 대한 진심이 담긴 한 그릇이 짧은 시간 수많은 재방문과 따뜻한
        고객 리뷰로 진정성을 증명했습니다.
        <br />
        <br />그 깊이를 고스란히 담아낼 공간까지 직접 설계했고, 직접 기획한 브랜드를 우리의 사옥에
        품어 고객이 오롯이 보고, 느끼고, 경험할 수 있도록 준비했습니다.
      </p>
      <ImageGrid ids={udonImgs} square />
      <h2>성수 에끼우동</h2>
      <div className={styles.restaurantDetails}>
        <img
          src="https://static.wixstatic.com/media/dc99e3_bec311eefc9249cc999f8ebb74d7328f~mv2.png/v1/fill/w_809,h_324,al_c,q_85,enc_avif,quality_auto/menu.png"
          alt="에끼우동 메뉴"
        />
        <img
          src="https://static.wixstatic.com/media/dc99e3_f9265339e51e47fdb4952dee92961336~mv2.png/v1/fill/w_809,h_324,al_c,q_85,enc_avif,quality_auto/info.png"
          alt="에끼우동 안내"
        />
      </div>
      <StoreInfo
        items={[
          ['주소', '서울 성동구 연무장19길 6, RIZZ'],
          ['영업시간', '10:00 - 21:00'],
          ['브레이크타임', '15:00 - 17:00'],
          ['라스트오더', '20:30'],
        ]}
        inner
      />
    </RestaurantLayout>
  );
}

export function DogoutPage() {
  return (
    <RestaurantLayout
      active="도그아웃"
      pageClass={styles.dogoutPage}
      logoClass={styles.dogoutLogo}
      logoSrc="https://static.wixstatic.com/media/207b85_577acb1270b1436c9e682b86d7a1f212~mv2.png"
      logoAlt="도그아웃"
    >
      <h1>미식가의 완벽한 소세지</h1>
      <p>
        도그아웃은 단순히 배를 채우는 패스트푸드가 아닙니다.
        <br />
        정직한 재료, 수제 제작, 푸짐한 양, 그리고 먹는 순간 느껴지는 즐거움까지. 이 모든 것이
        어우러진 ‘정성이 담긴 완벽한 소세지’를 만드는 것이 우리의 철학입니다.
      </p>
      <ImageGrid ids={dogoutImgs} square />
      <h2>도그아웃 성수</h2>
      <StoreInfo
        items={[
          ['주소', '서울특별시 성동구 성수동2가 315-39'],
          ['영업시간', '10:00 - 21:00'],
          ['라스트오더', '20:00'],
        ]}
        inner
      />
    </RestaurantLayout>
  );
}

function ImageGrid({ ids, square }: { ids: string[]; square: boolean }) {
  return (
    <div className={`${styles.restaurantGrid} ${square ? styles.square : ''}`}>
      {ids.map((id) => (
        <img
          key={id}
          src={`https://static.wixstatic.com/media/${id}/v1/fill/w_526,h_${square ? '526' : '434'},al_c,q_85,enc_avif,quality_auto/food.jpg`}
          alt=""
        />
      ))}
    </div>
  );
}

function StoreInfo({
  items,
  inner = false,
}: {
  items: readonly (readonly [string, string])[];
  inner?: boolean;
}) {
  return (
    <section className={`${styles.storeInfo} ${inner ? styles.inner : ''}`}>
      {items.map(([label, value]) => (
        <div key={label}>
          <b>{label}</b>
          <span>{value}</span>
        </div>
      ))}
    </section>
  );
}
