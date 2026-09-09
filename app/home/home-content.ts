import { artists, news, newsImages } from '../data';

export const homeMedia = {
  film: '/video/rizz-youtube-showreel/rizz-history-film-v8.mp4',
  poster: '/video/rizz-youtube-showreel/rizz-history-film-v8-poster.jpg',
} as const;

export type BusinessTone = 'red' | 'blue' | 'white' | 'charcoal';

export type HomeBusiness = {
  number: string;
  name: string;
  label: string;
  headline: string;
  description: string;
  href: string;
  image: string;
  tone: BusinessTone;
  points: readonly string[];
};

export const featuredCreators = artists.slice(0, 9).map((artist, index) => ({
  ...artist,
  category: ['BUSINESS', 'FITNESS', 'MUSIC', 'BEAUTY', 'FASHION', 'LIFESTYLE'][index % 6],
}));

export const proofMetrics = [
  { value: '481+', label: '커머스 진행' },
  { value: '88만+', label: '누적 주문' },
  { value: '343억+', label: '누적 거래액' },
  { value: '26명', label: '컨설팅 크리에이터' },
] as const;

export const homeBusinesses: readonly HomeBusiness[] = [
  {
    number: '01',
    name: 'MANAGEMENT',
    label: 'CREATOR',
    headline: '크리에이터와 콘텐츠를 성장시킵니다.',
    description: '현직 탑티어 크리에이터가 콘텐츠 방향과 비즈니스 확장을 함께 설계합니다.',
    href: '/mcn',
    image: artists[0].image,
    tone: 'red',
    points: ['콘텐츠 전략과 채널 성장', '광고·IP·브랜드 확장', '전문 매니지먼트'],
  },
  {
    number: '02',
    name: 'COMMERCE',
    label: 'TRAFFIC',
    headline: '발생한 트래픽을 실제 매출로 전환합니다.',
    description: '자사 커머스 플랫폼 YOGO를 중심으로 브랜드와 크리에이터를 연결합니다.',
    href: '/commerce',
    image: 'https://static.wixstatic.com/media/dc99e3_c1b2ac9a73db4ad9a0e2b93d2ac62ecf~mv2.avif',
    tone: 'blue',
    points: ['콘텐츠 커머스 매칭', '성과 기반 캠페인', '제품 소싱부터 CS까지'],
  },
  {
    number: '03',
    name: 'ACADEMY',
    label: 'KNOW-HOW',
    headline: '검증된 성장 방식을 다음 크리에이터에게 전합니다.',
    description: '조회수에 그치지 않고 사업으로 확장하는 실전형 크리에이터 교육을 제공합니다.',
    href: '/academy',
    image: 'https://static.wixstatic.com/media/a3e44e_bad62282522b4da283dcff636b0aff34~mv2.jpg/v1/fill/w_1200,h_1500,fp_0.50_0.30,q_80,enc_avif,quality_auto/academy.jpg',
    tone: 'white',
    points: ['유튜브 기획과 제작', '수익화 구조 설계', '브랜드·사업 확장'],
  },
  {
    number: '04',
    name: 'F&B',
    label: 'BRAND',
    headline: '온라인의 영향력을 오프라인 브랜드로 확장합니다.',
    description: '콘텐츠에서 축적한 취향과 팬덤을 사람들이 직접 경험하는 공간으로 만듭니다.',
    href: '/seogyodak',
    image: 'https://static.wixstatic.com/media/dc99e3_21a12ea944bf4bb9824458abbd010dab~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_80,enc_avif,quality_auto/fnb.jpg',
    tone: 'charcoal',
    points: ['브랜드 기획과 운영', '공간과 메뉴 개발', '콘텐츠 연계 마케팅'],
  },
];

export const latestNews = news.slice(0, 3).map(([title, date], index) => ({
  title,
  date,
  image: newsImages[index],
}));
