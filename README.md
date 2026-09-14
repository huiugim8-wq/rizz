# GLOW UP RIZZ

회사 홈페이지와 직원용 관리자를 함께 운영하는 Next.js 애플리케이션입니다. 공개 회원, 결제, 정산, 계약 기능은 포함하지 않습니다. 현재는 로컬 개발 단계이며, 완성 후 AWS 신규 계정 크레딧을 이용해 약 60일 동안 운영하는 것을 목표로 합니다.

## 기술 구성

- TypeScript, Next.js 16 App Router, React 19, Node.js 24
- PostgreSQL 17, Prisma 7
- Better Auth Google OAuth·이메일/비밀번호, Sharp, Zod
- CSS Modules와 3단계 반응형 기준: 모바일 `≤900px`, 노트북 `901–1199px`, 데스크탑 `≥1200px`

## 로컬 실행

Node.js 24와 Docker가 필요합니다.

```sh
npm ci
cp .env.example .env.local
docker compose up -d
npm run db:generate
npm run db:migrate
npm run db:import
npm run dev
```

`.env.local`의 `BETTER_AUTH_SECRET`은 충분히 긴 임의 값으로 설정하고 `UPLOAD_ROOT`에는 프로젝트의 `.local/uploads` 절대 경로를 지정합니다. Google Cloud Console에서 웹 애플리케이션 OAuth 클라이언트를 만들고 `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`을 입력합니다. 승인된 리디렉션 URI는 로컬에서 `http://localhost:3000/api/auth/callback/google`, 운영에서 `https://실제도메인/api/auth/callback/google`입니다. 비밀값은 Git에 저장하지 않습니다.

- 홈페이지: <http://localhost:3000>
- 관리자: <http://localhost:3000/admin>

처음 홈페이지에 들어가면 포트폴리오 데모 안내가 한 번 표시됩니다. 공개 메뉴의 `Admin` 또는 `/admin/login`에서 체험 계정 정보를 복사하거나 한 번의 클릭으로 로그인할 수 있습니다. 체험 계정은 뉴스·크리에이터·사진·직원·변경 기록을 포함한 최고 관리자 기능을 사용할 수 있으며, 서비스 소유권 이전만 제한됩니다. `npm run db:import`가 이 계정을 함께 준비합니다.

최초 최고 관리자로 사용할 Google 이메일을 `INITIAL_OWNER_EMAIL`에 정확히 입력합니다. 아직 OWNER가 없는 상태에서 해당 계정이 처음 Google 로그인을 완료하면 `ACTIVE/OWNER`로 지정됩니다. 그 뒤 Google 로그인 또는 일반 회원가입으로 만든 계정은 `PENDING/STAFF`로 생성되어 OWNER의 승인을 기다립니다. 일반 가입 비밀번호는 8자 이상이며 Better Auth가 해시로 저장합니다.

## 명령

```sh
npm run check          # 타입, ESLint, Prettier, 콘텐츠·에셋 검사
npm test               # 별도 PostgreSQL DB 통합 테스트
npm run build          # Next.js 운영 빌드
npm run package:release
```

통합 테스트는 `.env.local`의 `TEST_DATABASE_URL`을 사용합니다. 로컬 호스트의 이름이 `_test`로 끝나는 별도 DB만 허용하며 해당 테스트 DB의 테이블을 초기화합니다. 일반 개발 DB나 운영 DB를 테스트 URL로 지정하면 안 됩니다.

`package:release`는 `.next/standalone`을 `.release/standalone`에 새로 구성합니다. 소스, 문서, 테스트, 로컬 업로드, 환경 비밀값은 포함하지 않습니다. 실제 배포용 산출물은 AWS EC2와 같은 Linux/CPU 환경에서 생성합니다.

## 폴더 구조

```text
app/
  (public)/            기존 공개 URL의 얇은 라우트
  admin/               직원 계정·관리자 URL과 레이아웃
  api/                 인증·미디어·상태 HTTP API
  uploads/             검증된 업로드 파일 응답
src/
  features/            홈페이지와 관리자 기능 단위 UI·스타일·콘텐츠
  shared/              공통 컴포넌트·설정·전역 기반 스타일
  domain/content/      공개 콘텐츠 DTO와 공통 타입
  server/              인증·DB·콘텐츠·미디어·직원·감사 서비스
  data/seed/           최초 DB 이관용 뉴스·크리에이터 데이터
scripts/
  admin/               최초 콘텐츠 이관
  deploy/              standalone 패키징
  operations/          복원 검증
  quality/             콘텐츠·에셋 검사
tests/integration/     인증·콘텐츠·직원·미디어 통합 테스트
prisma/                DB 스키마와 마이그레이션
ops/                   AWS 배포와 백업 운영 예시
public/                서비스에서 참조하는 고정 에셋
docs/                  현재 아키텍처와 직원 안내
```

`@/`는 `src/`를 가리킵니다. `news-2`, `event-1`, `seogyodak-2`와 같은 기존 공개 URL은 외부 링크 호환성을 위해 유지합니다.

## 문서

- [파일·폴더 용도 안내](docs/file-guide.md)
- [아키텍처와 데이터 흐름](docs/architecture.md)
- [직원용 관리자 안내](docs/admin-guide.md)
- [AWS 60일 운영 계획](ops/aws/README.md)
- [백업·복구 절차](ops/backup/README.md)
