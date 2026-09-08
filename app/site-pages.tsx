import Link from 'next/link';
import { CopyButton, Shell } from './components/site-shell';
import { aboutHero, artists, business, commerceHero, foodImages, homeHero, mcnHero, milestones, news, newsImages } from './data';

const SideRail = ({ items }: { items: string[] }) => <aside className="side-rail">{items.map((item, i) => <a className={i === 0 ? 'active' : ''} href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</aside>;

export function HomePage() {
  return <Shell className="home-page">
    <section className="home-hero" style={{ backgroundImage: `url(${homeHero})` }}>
      <div><h1>GLOW UP</h1><p>매력을 지속 가능한 가치로</p></div>
    </section>
    <section className="home-business">
      <h2>OUR BUSINESS</h2>
      <div className="business-grid">
        {business.map(([title, copy, href, image]) => <Link className="business-card" href={href} key={title} style={{ backgroundImage: `url(${image})` }}><div><h3>{title}</h3><p>{copy}</p></div><span>↗</span></Link>)}
      </div>
    </section>
    <section className="home-artists">
      <div className="section-row"><h2>RIZZ ARTIST</h2><Link href="/mcn">View More</Link></div>
      <div className="home-artist-grid">
        {artists.slice(0, 9).map(artist => <article key={artist.en}><img src={artist.image} alt={artist.ko} /><div><b>{artist.ko}</b><span>{artist.en}</span></div></article>)}
      </div>
    </section>
    <Location />
  </Shell>;
}

function Location() {
  return <section className="location-section"><h2>LOCATION</h2><div className="location-map"><span>GLOW UP RIZZ</span></div><p>서울 성동구 연무장19길 6 RIZZ</p></section>;
}

export function AboutPage() {
  const directors = [
    ['권기준 대표','브랜딩 & 콘텐츠 전략 디렉터','https://static.wixstatic.com/media/a3e44e_bad62282522b4da283dcff636b0aff34~mv2.jpg/v1/crop/x_0,y_101,w_841,h_1020/fill/w_648,h_808,al_c,q_85,enc_avif,quality_auto/profile.jpg','· 연 매출 200억 CEO\n· 유튜브 경력 7년차, 100만 유튜버\n· MCN 설립\n· 보유 유튜브 채널 4개\n· 누적 커머스 430건 이상 진행\n· 컨설팅 크리에이터 26명\n· 10만+ 유튜버 3명 배출'],
    ['윤승준 부사장','경영 혁신과 성장 전략을 선도하는 총괄 리더','https://static.wixstatic.com/media/dc99e3_da13bdabd3b442f283378664d025c6b3~mv2.jpg/v1/fill/w_648,h_808,al_c,q_85,enc_avif,quality_auto/profile.jpg','· 경영·관리 경력 30년\n· 콘텐츠 관련 HR 14년 경력\n· 재무·회계·세무 전문가\n· 스타트업 관리 시스템 및 전략 구축 경험\n· 전략적 비즈니스 플래닝 전문가'],
    ['문석기 이사','크리에이터 매니지먼트 아티스트 디렉터','https://static.wixstatic.com/media/dc99e3_9b13b6fb687e41d3a5fbb21b44f35ae0~mv2.jpg/v1/fill/w_648,h_808,al_c,q_85,enc_avif,quality_auto/profile.jpg','· 유튜브 채널 운영 6년차, 구독자 143만명\n· 국제트레이너 & 스포츠영양코치\n· 미국공인 국제트레이너\n· 혁신벤처기업 (주)핏블리 대표이사\n· 베스트셀러 저자'],
    ['정재열 본부장','콘텐츠 전략 총괄 · 채주부 커머스 마케팅 총괄','https://static.wixstatic.com/media/a3e44e_71a4ffdf1a574bfab3b8967edad776e8~mv2.jpg/v1/fill/w_648,h_808,al_c,q_85,enc_avif,quality_auto/profile.jpg','· 콘텐츠 기획 및 총괄 디렉팅 경력 7년차\n· 멀티 플랫폼 콘텐츠 기획 3,300편+\n· 대표 기획 콘텐츠 누적 조회수 17억+\n· e커머스 매출 규모 월 평균 8억원'],
  ] as const;
  const office = ['dc99e3_2ec0f17fd5ae4b3fb0676ab6ea602f94~mv2.jpg','dc99e3_29d959e63c1846f38379387436dd14a0~mv2.jpg','dc99e3_3c859fe4bb4c4647bfce399802d51ca6~mv2.jpg','dc99e3_6cf1f02470a14bb29f5d895a70979c1d~mv2.jpg','dc99e3_354ec8d2961f4dc09f8634108a83200d~mv2.jpg','dc99e3_e2b05e9ad3964fd6a26ac9824b5550bf~mv2.jpg'].map(id => `https://static.wixstatic.com/media/${id}/v1/fill/w_800,h_600,al_c,q_85,enc_avif,quality_auto/${id}`);
  return <Shell className="about-page">
    <section className="about-hero" style={{ backgroundImage: `url(${aboutHero})` }}><h1>GLOW UP RIZZ</h1><p>우리는 아티스트들의 매력을 더 빛나게 만드는 회사입니다.</p></section>
    <section className="belief-grid">
      <article><span>OUR<br />MISSION</span><h2>OUR<br />MISSION</h2><p>아티스트들의 자유로운 창작활동을<br />지원하지 못한다면 회사는 왜 필요할까요?<br /><br />아티스트를 책임지지 못한다면 MCN이 아닙니다.<br /><br />창작의 자유를 책임지는 MCN<br />그것이 우리의 철학입니다.</p></article>
      <article><span>OUR<br />SLOGAN</span><h2>OUR<br />SLOGAN</h2><p className="slogan">WE WILL<br /><em>GLOW</em> YOU UP</p></article>
      <article><span>OUR<br />VISION</span><h2>OUR<br />VISION</h2><p>우리는 창의성의 힘을 믿습니다.<br /><br />RIZZ는 모든 아티스트가<br />지속 가능한 가치를 창출하고<br />성공을 새롭게 정의할 기회를 제공합니다.</p></article>
    </section>
    <section className="directors"><h2>CREATIVE DIRECTORS</h2>{directors.map(([name, role, image, bio], i) => <article className={i % 2 ? 'reverse' : ''} key={name}><img src={image} alt={name} /><div><h3>{name}</h3><b>{role}</b><p>{bio}</p></div></article>)}</section>
    <section className="office"><h2>OFFICE BUILDING</h2><div>{office.map((src, i) => <img src={src} alt={`Glow Up Rizz office ${i + 1}`} key={src} />)}</div></section>
    <section className="milestones"><h2>MILESTONES</h2>{milestones.map(([date, event]) => <div key={date}><time>{date}</time><p>{event}</p></div>)}</section>
    <Location />
  </Shell>;
}

export function McnPage() {
  return <Shell className="mcn-page">
    <section className="image-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.25),rgba(0,0,0,.05)),url(${mcnHero})` }}><h1>GLOW UP ARTIST</h1><p>아티스트의 창작이 지속 가능한 가치가 되도록 함께합니다.</p></section>
    <SideRail items={['Artist','Management','Voice']} />
    <section className="artist-list" id="artist"><h2>RIZZ ARTIST</h2><div className="artist-grid">{artists.map(artist => <article key={artist.en}><div className="artist-photo"><img src={artist.image} alt={artist.ko} /></div><h3>{artist.ko}</h3><p>{artist.en}</p><span>{artist.followers}</span></article>)}</div></section>
  </Shell>;
}

export function CommercePage() {
  const blocks = [
    ['01  Commerce','초기 브랜드 광고비 0원으로\n매출/브랜드 가치 극대화','많은 MCN이 아티스트 트래픽을 매출로 전환하는 시스템을 갖추지 못해, 브랜디드 콘텐츠에만 의존하며 ROAS 책임을 지지 않습니다. 이로 인해 많은 브랜드가 손해를 보고 온라인 트래픽에 대한 신뢰가 하락했습니다.','RIZZ는 자사몰 ‘YOGO’를 활용하여 RS 정산 방식을 통해 브랜드에 광고비 없는 광고를 제안합니다. 브랜드는 아무 리스크없이 아티스트와 협업할 수 있습니다. 또한 브랜드 관련 영상이 영구적으로 남아있어 무료 홍보 효과까지 볼 수 있습니다.'],
    ['02  Management','탑 아티스트가 직접\n매칭 아티스트를 핸들링','기존 MCN 아티스트 매니저들은 아티스트를 컨트롤 할 수 없습니다. 그에 따른 리스크는 MCN과 브랜드가 지게 됩니다.','RIZZ는 현직 탑티어 아티스트들이 직접 매니지먼트에 참여합니다. 같은 아티스트로서 생기는 공감대를 바탕으로 실질적 도움이 되는 콘텐츠 방향성을 제시하며 브랜드 ROAS에 직·간접적인 도움을 제공합니다.'],
    ['03  PB Branding','탑티어 아티스트가\n귀사의 마케터가 되다','브랜드는 아티스트의 IP를 활용한 PB 상품으로 새로운 수익을 창출하고, 지속 가능한 브랜드 스토리를 만들 기회를 얻습니다.','PB 상품은 아티스트의 고유한 이미지와 브랜드를 더 넓은 시장에 알릴 수 있는 강력한 도구입니다. 브랜드가 아티스트의 정체성과 맞는 제품을 함께 개발함으로써 새로운 고객층을 확보할 수 있습니다.'],
  ] as const;
  return <Shell className="commerce-page">
    <section className="image-hero commerce-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.35),rgba(0,0,0,.08)),url(${commerceHero})` }}><h1>GLOW UP PARTNERS</h1><p>브랜드의 ROAS를 책임지지 않으면 MCN이 아닙니다.</p></section>
    <SideRail items={['Commerce','Partners','Reference','Voice']} />
    <section className="commerce-intro" id="commerce"><p>콘텐츠 커머스 매칭 플랫폼</p><h2>YOGO</h2><p>상품 및 서비스 공급자 브랜드와 콘텐츠 제작자 아티스트를 매칭하여<br />RIZZ 자사몰 YOGO에서 상품 및 서비스를 판매합니다.</p><div>{[['Brand','어떤 비용도 지불하지 않고 원하는 아티스트를 통해 상품 및 서비스 홍보'],['Artist','광고주 없이 자유로운 형태의 콘텐츠 제작과 판매한 만큼의 수익 창출'],['Viewer','콘텐츠에서 노출된 상품과 서비스를 가장 합리적인 금액에 구매']].map(([name, copy]) => <article key={name}><b>{name}</b><p>{copy}</p></article>)}</div></section>
    <section className="commerce-blocks">{blocks.map(([num, title, p1, p2], i) => <article key={num}><header>{num}</header><div><h2>{title}</h2><p>{p1}</p><p>{p2}</p>{i === 0 && <><h3>글로벌 탑티어 유튜브 쇼핑 경험 제공<br />국내 최다 YouTube 쇼핑 성공 사례 - YOGO</h3><div className="stats"><div><span>총 진행 건 수</span><b>481</b></div><div><span>총 주문 건 수</span><b>88만</b></div><div><span>총 거래액</span><b>343억</b></div></div><small>*2025년 6월 기준</small></>}</div></article>)}</section>
  </Shell>;
}

export function AcademyPage() {
  const points = ['유튜브 7년 차, 117만 구독자 보유','연 매출 200억 콘텐츠 기반 비즈니스 운영','11개의 유튜브 채널 보유 및 운영','누적 커머스 협업 430건 이상 진행','크리에이터 컨설팅 26명 진행','10만 유튜버 3명 직접 배출','MCN 설립 및 운영 경험 보유','브랜드와 협업으로 수차례 매출 성공 사례 창출','주요 대학 및 기업 대상 강의 다수 진행'];
  return <Shell className="academy-page">
    <section className="academy-hero"><h1>RIZZ ACADEMY</h1><p>콘텐츠로 시작하여 비즈니스까지.<br />실전으로 증명된 크리에이터들의 성장 전략을 배웁니다.</p></section>
    <section className="academy-intro"><p>글로우업리즈 아카데미는<br /><br />8년간 유튜브로 수많은 실험과 성장을 경험한 크리에이터가 전하는<br /><br />유튜브 기획, 수익화, 브랜드 확장, 그리고 콘텐츠 기반 사업화까지<br /><br />실무 중심으로 설계된 실전형 교육 플랫폼입니다.</p><h2><span>✦</span> 유튜브 하나로 사업까지 확장해낸<br />실전형 CEO가 직접 강의합니다.</h2></section>
    <section className="lecturer"><img src="https://static.wixstatic.com/media/a3e44e_bad62282522b4da283dcff636b0aff34~mv2.jpg/v1/fill/w_800,h_920,fp_0.50_0.44,q_85,enc_avif,quality_auto/profile.jpg" alt="권기동" /><div><p>채널주인부재중 운영자 / 글로우업리즈 대표</p><h2>권기동</h2><ul>{points.map(point => <li key={point}>- {point}</li>)}</ul></div></section>
    <section className="coming"><h2>COMING SOON</h2><p>실무 경험 중심의 콘텐츠 전문가들이<br />순차적으로 합류할 예정입니다.</p><div>{Array.from({ length: 5 }).map((_, i) => <article key={i}><span>COMING<br />SOON</span></article>)}</div></section>
  </Shell>;
}

export function PropertyPage() {
  return <Shell className="property-page">
    <section className="property-hero"><h1>RIZZ PROPERTY</h1></section>
    <section className="development"><h2>부동산 디벨롭</h2><img src="/property/process.png" alt="매입, 리모델링, 브랜딩, 매각 과정" /></section>
    <section className="reference"><h2>Reference</h2><div className="reference-grid"><div className="building-pair"><img className="before" src="/property/before.jpg" alt="매입 당시 건물" /><img src="/property/after.jpg" alt="리모델링 후 건물" /><span>›</span></div><img className="value-image" src="/property/value.png" alt="건물 가치 변화" /></div></section>
  </Shell>;
}

export function FnbPage() {
  const foods = ['얼큰 닭매운탕','엄나무 닭한마리','미나리 닭무침','옛날 닭다리','계육볶음','계장술밥','얼큰 닭 칼국수','맑은 닭 칼국수','계육덮밥','들깨 크림 수제비','닭목살 유린기','닭 된장 전골'];
  return <Shell className="fnb-page">
    <section className="fnb-hero"><h1>THE RIZZ ROOM</h1><div><h2>“Our flavor. Our rules.”</h2><p>글로우업리즈의 F&B 매장은 우리의 쇼룸입니다.<br /><br />이곳은 단순한 공간이 아닌, 우리만의 감각과 철학이 응축된 브랜드 무대입니다.<br /><br />우리는 정해진 매뉴얼보다 감각과 경험으로 채워지는 순간을 더 믿습니다.<br />그 무한한 가능성을 위해 오늘도 실험하고, 고민하고, 나아갑니다.</p></div></section>
    <SideRail items={['도그아웃','스시준','에끼우동']} />
    <section className="fnb-brand"><img className="fnb-mark" src="https://static.wixstatic.com/media/dc99e3_04119e9f5bde4a51acac39b7a1876f70~mv2.jpg/v1/fill/w_404,h_404,al_c,q_85,enc_avif,quality_auto/logo.jpg" alt="서교닭매운탕" /><div><h2>닭요리의 틀을 깨다,<br />맛의 기준을 바꾸다.</h2><p>전통의 깊이를 존중하되, 고정관념에 안주하지 않습니다.<br /><br />닭볶음탕과 매운탕의 경계를 넘나드는 새로운 해석,<br />익숙하지만 신선한 조합으로 닭요리의 정체성을 다시 씁니다.<br /><br />우리는 단순히 음식을 만드는 것이 아니라<br />새로운 기준과 브랜드 경험을 제시합니다.</p></div></section>
    <section className="fnb-menu"><h2>끊임없는 메뉴 개발과 맛으로 증명하는 경쟁력,<br />서교닭매운탕의 성장 엔진입니다.</h2><div>{foodImages.map((src, i) => <article key={src}><img src={src} alt={foods[i]} /><span>{foods[i]}</span></article>)}</div><h3>서교닭매운탕 본점</h3><a href="https://www.instagram.com/" aria-label="Instagram">◎</a></section>
    <section className="store-info">{[['주소','서울 마포구 독막로 3길 51, 서주빌딩'],['영업시간','11:00 - 23:00'],['브레이크타임','15:00 - 17:00'],['라스트오더','22:00'],['전화번호','070-7799-6848']].map(([label, value]) => <div key={label}><b>{label}</b><span>{value}</span></div>)}</section>
  </Shell>;
}

export function NewsPage() {
  return <Shell className="news-page"><section className="page-title"><h1>NEWS</h1></section><section className="news-wrap"><div className="news-tabs"><button>NEWS</button><button>EVENT</button></div><article className="news-feature"><img src="https://static.wixstatic.com/media/dc99e3_0a2f9cc26309489dba687d7e6e363717~mv2.jpg/v1/crop/x_0,y_1552,w_3024,h_1210/fill/w_1214,h_486,al_c,q_85,enc_avif,quality_auto/news.jpg" alt="Glow Up Rizz event" /><div><h2>글로우업리즈, 두 번째 ‘TOP-TIER PRIVATE PARTY’ 개최</h2><time>26.08.04</time></div></article><div className="news-grid">{news.map(([title, date], i) => <article key={`${date}-${i}`}><img src={newsImages[i % newsImages.length]} alt="" /><h2>{title}</h2><time>{date}</time></article>)}</div></section></Shell>;
}

export function CareerPage() {
  const values = [['PROFESSIONAL','자기 분야에서 끊임없이 성장하는 프로'],['LOYALTY','동료와 조직의 성공을 함께 만드는 사람'],['CREATIVE','익숙함을 깨고 새로운 답을 만드는 사람'],['SMART','목표를 명확히 하고 효율적으로 실행하는 사람'],['LEADERSHIP','주도적으로 책임지고 팀을 이끄는 사람']];
  const ways = ['솔직하고 투명하게 소통합니다.','목표를 향해 빠르게 실행합니다.','서로의 전문성을 존중합니다.','성과와 성장에 집중합니다.'];
  return <Shell className="career-page"><section className="page-title"><h1>Career</h1></section><section className="career-content"><p className="red-label">QUALIFICATION</p><div className="value-stack">{values.map(([en, ko]) => <article key={en}><h2>{en}</h2><p>{ko}</p></article>)}</div><p className="red-label">HOW WE WORK</p><div className="work-grid">{ways.map((way, i) => <article key={way}><div className={`work-photo work-${i + 1}`} /><p>{way}</p></article>)}</div><p className="red-label">WELFARE</p><div className="benefits">{['자율과 책임','성장 지원','식사 지원','휴가와 리프레시','최신 장비','팀 문화'].map(item => <article key={item}><span>✦</span><b>{item}</b></article>)}</div><p className="red-label">RECRUIT PROCESS</p><div className="recruit-process"><span>01 서류 전형</span><i>→</i><span>02 인터뷰</span><i>→</i><span>03 최종 합격</span></div><div className="career-mail"><h2>JOIN OUR TEAM</h2><a href="mailto:recruit@glowuprizz.com">recruit@glowuprizz.com</a></div></section></Shell>;
}

export function ContactPage() {
  const contacts = [['아티스트 지원','artist@glowuprizz.com'],['브랜드/광고 파트너십','partner@glowuprizz.com'],['투자 파트너십','contact@glowuprizz.com'],['언론보도','contact@glowuprizz.com']];
  return <Shell className="contact-page"><section className="page-title"><h1>CONTACT US</h1></section><section className="contact-wrap"><aside><a href="#email">E-Mail</a><a href="#homepage">Homepage</a></aside><div><section id="email"><h2>E-Mail CONTACT</h2><div className="email-grid">{contacts.map(([label, email]) => <article key={label}><div><span>{label}</span><a href={`mailto:${email}`}>{email}</a></div><CopyButton value={email} /></article>)}</div></section><section id="homepage" className="homepage-contact"><h2>HOMEPAGE CONTACT</h2><form><select defaultValue=""><option value="" disabled>선택하기</option><option>아티스트 지원</option><option>브랜드/광고 파트너십</option><option>투자 파트너십</option><option>언론보도</option></select><div><input placeholder="이름*" /><input placeholder="회사명" /></div><div><input placeholder="연락처 *" /><input type="email" placeholder="이메일" /></div><textarea placeholder="내용*" rows={8} /><button type="button">제출</button></form></section></div></section></Shell>;
}
