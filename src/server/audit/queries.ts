import 'server-only';
import { db } from '@/server/db/client';

const actionLabels: Record<string, string> = {
  ACTIVE: '직원 승인·재활성화',
  REJECTED: '가입 신청 거절',
  SUSPENDED: '직원 사용 정지',
  등록: '새 항목 등록',
  수정: '내용 수정',
  '휴지통 이동': '휴지통으로 이동',
  복원: '휴지통에서 복원',
  숨김: '홈페이지에서 숨김',
  '순서 변경': '표시 순서 변경',
  '사진 업로드': '새 사진 업로드',
  '사진 삭제': '사진 영구 삭제',
  '소유권 이전': '최고 관리자 소유권 이전',
  '최초 최고 관리자 지정': '최초 최고 관리자 지정',
};

const fieldLabels: Record<string, string> = {
  title: '제목',
  publishedAt: '표시 날짜',
  image: '사진',
  mediaId: '사진 파일',
  imageAlt: '사진 설명',
  externalUrl: '원문 주소',
  isArchived: '지난 뉴스 표시',
  isFeatured: '대표 뉴스',
  status: '공개 상태',
  name: '이름',
  displayName: '영문 이름',
  category: '분류',
  followers: '팔로워 표시',
  focalX: '사진 가로 초점',
  focalY: '사진 세로 초점',
  followerCount: '팔로워 수',
  measuredAt: '측정일',
  channels: '채널 링크',
  role: '권한',
};

function describeChangedFields(record: {
  action: string;
  entityType: string;
  changedFields: string[];
}) {
  if (record.changedFields.length) {
    return record.changedFields
      .map((field) =>
        record.entityType === '직원' && field === 'status'
          ? '계정 상태'
          : (fieldLabels[field] ?? field),
      )
      .join(', ');
  }
  if (['ACTIVE', 'REJECTED', 'SUSPENDED', '휴지통 이동', '복원', '숨김'].includes(record.action))
    return record.entityType === '직원' ? '계정 상태' : '공개 상태';
  if (record.action === '순서 변경') return '표시 순서';
  if (['사진 업로드', '사진 삭제'].includes(record.action)) return '사진 파일';
  if (['소유권 이전', '최초 최고 관리자 지정'].includes(record.action)) return '관리자 권한';
  return '전체 내용';
}

export async function listAuditEntries(page: number) {
  const records = await db.auditLog.findMany({
    orderBy: { occurredAt: 'desc' },
    skip: (page - 1) * 30,
    take: 31,
  });
  const users = await db.user.findMany({
    where: {
      id: {
        in: records.flatMap((record) =>
          record.entityType === '직원' ? [record.actorId, record.entityId] : [record.actorId],
        ),
      },
    },
    select: { id: true, name: true, email: true },
  });
  const names = new Map(users.map((user) => [user.id, user.name]));
  const staff = new Map(users.map((user) => [user.id, `${user.name} (${user.email})`]));
  const [news, creators, media] = await Promise.all([
    db.news.findMany({
      where: {
        id: {
          in: records
            .filter((record) => record.entityType === '뉴스')
            .map(({ entityId }) => entityId),
        },
      },
      select: { id: true, title: true },
    }),
    db.creator.findMany({
      where: {
        id: {
          in: records
            .filter((record) => record.entityType === '크리에이터' && record.entityId !== '목록')
            .map(({ entityId }) => entityId),
        },
      },
      select: { id: true, name: true, displayName: true },
    }),
    db.mediaAsset.findMany({
      where: {
        id: {
          in: records
            .filter((record) => record.entityType === '사진')
            .map(({ entityId }) => entityId),
        },
      },
      select: { id: true, storageKey: true },
    }),
  ]);
  const targets = new Map<string, string>([
    ...news.map((item) => [`뉴스:${item.id}`, item.title] as const),
    ...creators.map((item) => [`크리에이터:${item.id}`, item.displayName || item.name] as const),
    ...media.map((item) => [`사진:${item.id}`, item.storageKey] as const),
    ...[...staff].map(([id, label]) => [`직원:${id}`, label] as const),
    ['크리에이터:목록', '크리에이터 전체 목록'],
  ]);
  return records.map((record) => ({
    ...record,
    actorName: names.get(record.actorId) ?? '운영 설정',
    actionLabel: actionLabels[record.action] ?? `${record.entityType} ${record.action}`,
    targetLabel:
      targets.get(`${record.entityType}:${record.entityId}`) ??
      `${record.entityType} (${record.entityId.slice(0, 8)})`,
    changedFieldsLabel: describeChangedFields(record),
  }));
}
