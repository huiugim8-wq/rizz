export type { Creator, CreatorCategory } from './creator';
export type { NewsArticle } from './news';

export type ContentKind = 'news' | 'creators';

export const labels: Record<string, string> = {
  DRAFT: '임시 저장',
  PUBLISHED: '공개',
  HIDDEN: '숨김',
  PENDING: '승인 대기',
  ACTIVE: '사용 가능',
  REJECTED: '가입 거절',
  SUSPENDED: '사용 정지',
  OWNER: '최고 관리자',
  DEMO: '체험 최고 관리자',
  STAFF: '직원',
};
