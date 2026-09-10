export const homeMedia = {
  film: '/video/rizz-youtube-showreel/rizz-home-film-v19-motion-web.mp4',
  poster: '/video/rizz-youtube-showreel/rizz-home-film-v19-motion-poster.jpg',
} as const;

export type BusinessTone = 'red' | 'blue' | 'white';

export type HomeBusiness = {
  name: string;
  label: string;
  headline: string;
  description: string;
  href: string;
  image: string;
  tone: BusinessTone;
  points: readonly string[];
};

export const homeBusinesses: readonly HomeBusiness[] = [
  {
    name: 'MANAGEMENT',
    label: 'CREATOR',
    headline: '크리에이터와 콘텐츠를 성장시킵니다.',
    description: '현직 탑티어 크리에이터가 콘텐츠 방향과 비즈니스 확장을 함께 설계합니다.',
    href: '/mcn',
    image: '/home-scroll/creator-business.png',
    tone: 'red',
    points: ['콘텐츠 전략과 채널 성장', '광고·IP·브랜드 확장', '전문 매니지먼트'],
  },
  {
    name: 'COMMERCE',
    label: 'TRAFFIC',
    headline: '트래픽을 실제 매출로 전환합니다.',
    description: '크리에이터의 영향력과 브랜드를 연결해 반복 가능한 성과를 만듭니다.',
    href: '/commerce',
    image: '/home-scroll/traffic-business.png',
    tone: 'blue',
    points: ['콘텐츠 커머스', '성과 기반 캠페인', '제품 소싱과 운영'],
  },
  {
    name: 'ACADEMY',
    label: 'KNOW-HOW',
    headline: '검증된 방식을 다음 크리에이터에게 전합니다.',
    description: '조회수에 그치지 않고 사업으로 확장하는 실전형 크리에이터 교육을 제공합니다.',
    href: '/academy',
    image: '/home-scroll/academy-business.png',
    tone: 'white',
    points: ['유튜브 기획과 제작', '수익화 구조 설계', '브랜드·사업 확장'],
  },
];
