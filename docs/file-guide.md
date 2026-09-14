# 파일·폴더 용도 안내

이 문서는 프로젝트를 처음 보는 사람이 **어디를 수정해야 하는지** 빠르게 찾도록 만든 지도입니다. 화면 수정은 `src/features`, 공통 UI는 `src/shared`, DB와 인증은 `src/server`, URL 연결은 `app`에서 찾으면 됩니다.

## 요청이 생겼을 때 찾는 순서

| 수정하려는 내용              | 먼저 볼 위치                        |
| ---------------------------- | ----------------------------------- |
| 특정 공개 페이지의 화면·문구 | `src/features/<기능>/`              |
| 헤더·푸터·좌측 메뉴          | `src/shared/components/layout/`     |
| 공개 URL 연결                | `app/(public)/<URL>/page.tsx`       |
| 관리자 화면                  | `src/features/admin/`, `app/admin/` |
| 뉴스·크리에이터 저장/조회    | `src/server/content/`               |
| 로그인·권한                  | `src/server/auth/`                  |
| 이미지 업로드                | `src/server/media/`                 |
| DB 테이블                    | `prisma/schema.prisma`              |
| 최초 콘텐츠 데이터           | `src/data/seed/`                    |
| AWS 60일 배포                | `ops/aws/`                          |

## 루트 파일

| 파일                                  | 용도                                                          |
| ------------------------------------- | ------------------------------------------------------------- |
| `.env.example`                        | 로컬·운영 환경변수의 이름과 예시를 보여주는 템플릿            |
| `.env.local`                          | 현재 컴퓨터의 실제 개발 설정. 비밀값이 있어 Git에 올리지 않음 |
| `.gitignore`                          | 빌드 결과, 업로드, 환경파일 등 Git 제외 규칙                  |
| `.prettierignore`, `.prettierrc.json` | 코드 자동 정렬 제외 대상과 포맷 규칙                          |
| `AGENTS.md`                           | Next.js가 관리하는 개발 에이전트 안내                         |
| `README.md`                           | 설치·실행·검사 방법과 프로젝트 개요                           |
| `compose.yaml`                        | 로컬 PostgreSQL과 테스트용 서비스를 실행하는 Docker 구성      |
| `eslint.config.mjs`                   | 코드 품질 검사 규칙                                           |
| `next-env.d.ts`                       | Next.js TypeScript 타입 연결 파일. 직접 수정하지 않음         |
| `next.config.ts`                      | Next.js 빌드·이미지·서버 설정                                 |
| `package.json`, `package-lock.json`   | 의존성, 실행 명령, 정확한 패키지 버전                         |
| `postcss.config.mjs`                  | CSS 후처리 설정                                               |
| `prisma.config.ts`                    | Prisma CLI와 환경변수 연결 설정                               |
| `tsconfig.json`                       | TypeScript 경로 별칭과 엄격 검사 설정                         |
| `vitest.config.ts`                    | 통합 테스트 실행 설정                                         |

## `app` — URL과 진입점

`app` 파일은 가능한 한 얇게 유지합니다. 실제 화면은 `src/features`에서 가져오고, API는 `src/server` 서비스를 호출합니다.

### 전체 앱

| 파일                         | 용도                                                   |
| ---------------------------- | ------------------------------------------------------ |
| `app/layout.tsx`             | 모든 화면에 적용되는 HTML, 메타데이터, 전역 CSS 진입점 |
| `app/globals.css`            | 공통 기반 스타일을 불러오는 전역 CSS                   |
| `app/uploads/[key]/route.ts` | 저장된 업로드 파일을 검증하여 응답                     |

### 공개 페이지 `app/(public)`

| 파일                                         | 연결되는 화면                                        |
| -------------------------------------------- | ---------------------------------------------------- |
| `layout.tsx`                                 | 모든 공개 페이지의 공통 레이아웃                     |
| `error.tsx`                                  | 공개 페이지 렌더링 오류 화면                         |
| `page.tsx`, `aboutus/page.tsx`               | 메인 홈페이지. 기존 `/aboutus` 주소도 같은 화면 유지 |
| `mcn/page.tsx`                               | MCN 크리에이터 페이지                                |
| `management/page.tsx`                        | MCN 매니지먼트 소개                                  |
| `voice-artist/page.tsx`                      | 크리에이터 인터뷰                                    |
| `commerce/page.tsx`                          | 커머스 사업 소개                                     |
| `partners/page.tsx`                          | 파트너 로고 목록                                     |
| `reference/page.tsx`                         | 커머스 사례 목록                                     |
| `voice-brand/page.tsx`                       | 브랜드 인터뷰                                        |
| `academy/page.tsx`                           | 아카데미 소개                                        |
| `property/page.tsx`                          | 부동산 사업 소개                                     |
| `seogyodak/page.tsx`, `seogyodak-2/page.tsx` | F&B 메인. 과거 주소 호환을 위해 두 URL 유지          |
| `sushijun-1/page.tsx`                        | 스시준 상세                                          |
| `ekiudon-1/page.tsx`                         | 에끼우동 상세                                        |
| `news/page.tsx`, `news-2/page.tsx`           | 최신 뉴스와 과거 뉴스 URL                            |
| `event-1/page.tsx`                           | 이벤트 갤러리                                        |
| `career/page.tsx`                            | 채용 안내                                            |
| `contactus/page.tsx`                         | 문의·회사 연락처                                     |

### 관리자 `app/admin`

| 파일·폴더                            | 용도                                                |
| ------------------------------------ | --------------------------------------------------- |
| `layout.tsx`, `admin.css`            | 관리자 전용 레이아웃과 스타일                       |
| `page.tsx`                           | 로그인 상태와 권한에 맞는 관리자 시작 화면으로 이동 |
| `error.tsx`                          | 관리자 오류 화면                                    |
| `(auth)/login/page.tsx`              | Google·일반 가입/로그인 진입점                      |
| `(account)/pending/page.tsx`         | 최초 로그인 후 직원 승인 대기 화면                  |
| `(protected)/layout.tsx`             | 승인된 직원만 접근하도록 보호하는 관리자 레이아웃   |
| `(protected)/account/page.tsx`       | 내 계정 설정                                        |
| `(protected)/activity/page.tsx`      | 관리자 작업 기록                                    |
| `(protected)/users/page.tsx`         | 직원 승인·권한 관리                                 |
| `(protected)/news/page.tsx`          | 뉴스 목록·정렬·숨김 관리                            |
| `(protected)/news/new/page.tsx`      | 뉴스 생성                                           |
| `(protected)/news/[id]/page.tsx`     | 뉴스 수정                                           |
| `(protected)/creators/page.tsx`      | 크리에이터 목록·정렬·숨김 관리                      |
| `(protected)/creators/new/page.tsx`  | 크리에이터 생성                                     |
| `(protected)/creators/[id]/page.tsx` | 크리에이터 수정                                     |

### API `app/api`

| 파일                     | 용도                                         |
| ------------------------ | -------------------------------------------- |
| `auth/[...all]/route.ts` | Better Auth Google·일반 계정·세션 API 진입점 |
| `health/route.ts`        | 배포 서버와 DB 상태 확인                     |
| `media/route.ts`         | 관리자 이미지 업로드·조회 API                |

## `src/features` — 화면 기능

같은 기능의 컴포넌트, 문구 데이터, CSS Module을 한 폴더에 둡니다. `*-page.tsx`는 화면 조립, `*-content.ts`는 고정 문구·이미지 데이터, `*.module.css`는 해당 기능 전용 스타일입니다.

### 홈페이지 `home`

| 파일                                                       | 용도                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------ |
| `home-page.tsx`                                            | 메인 화면의 모든 구역 조립                             |
| `home-page.module.css`                                     | 선언문·사업 소개·문의 등 메인 레이아웃                 |
| `home-content.ts`                                          | 메인 영상과 3개 사업 소개 데이터                       |
| `scroll-film-hero.tsx`, `film-hero.module.css`             | 메인 영상과 스크롤 연동 효과                           |
| `directors-carousel.tsx`, `directors.module.css`           | 디렉터 가로 목록과 이동 동작                           |
| `directors-content.ts`                                     | 디렉터 이름·직책·사진 데이터                           |
| `horizontal-business-rail.tsx`, `business-rail.module.css` | 사업 3개를 데스크탑 스크롤·모바일 좌우 스와이프로 표시 |

### MCN `mcn`

| 파일                      | 용도                            |
| ------------------------- | ------------------------------- |
| `creator-page.tsx`        | 크리에이터 목록 화면            |
| `creator-film.tsx`        | 60fps 영상과 스크롤 진행률 연결 |
| `creator.module.css`      | MCN 영상·목록·합류 구역 스타일  |
| `mcn-content.ts`          | MCN 히어로와 이미지 데이터      |
| `management-page.tsx`     | 매니지먼트 서비스 설명 조립     |
| `artist-voice-page.tsx`   | 아티스트 인터뷰 조립            |
| `artist-voice-content.ts` | 인터뷰 문구·통계·이미지 데이터  |

### 커머스 `commerce`

| 파일                                       | 용도                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| `commerce-page.tsx`                        | 커머스 메인 조립                                             |
| `commerce-content.ts`                      | 커머스 카드·통계·문구 데이터                                 |
| `business.module.css`                      | 커머스·매니지먼트 본문과 공통 커머스 레이아웃                |
| `commerce-section-layout.tsx`              | Partners·Reference·Voice의 동일한 좌측 메뉴와 최대 너비 제공 |
| `reference-page.tsx`, `reference-cases.ts` | 커머스 사례 화면과 사례 객체 데이터                          |
| `voices.module.css`                        | 아티스트·브랜드 인터뷰 공통 카드와 반응형 스타일             |
| `partners/partner-wall.tsx`                | 파트너 필터와 로고 벽                                        |
| `partners/partner-catalog.ts`              | JSON 파트너 데이터를 타입과 함께 제공                        |
| `partners/partner-catalog.json`            | 119개 파트너 이름·분류·로고·원본 주소                        |
| `partners/partners.module.css`             | 파트너 화면 스타일                                           |
| `brand-voice/brand-voice-page.tsx`         | 브랜드 인터뷰 화면 조립                                      |
| `brand-voice/voice-content.ts`             | 브랜드 인터뷰 문구·통계·사진 데이터                          |
| `brand-voice/brand-voice.module.css`       | 브랜드 인터뷰 전용 보정 스타일                               |

### 나머지 공개 기능

| 폴더·파일                                                     | 용도                                   |
| ------------------------------------------------------------- | -------------------------------------- |
| `academy/academy-page.tsx`, `academy.module.css`              | 아카데미 소개와 강사 프로필            |
| `property/property-page.tsx`, `property.module.css`           | 부동산 개발 과정과 전후 사례           |
| `food-beverage/fnb-page.tsx`, `fnb.module.css`                | F&B 브랜드 랜딩                        |
| `food-beverage/brand-content.ts`                              | F&B 브랜드 문구와 카드 데이터          |
| `food-beverage/restaurant-pages.tsx`, `restaurant.module.css` | 서교닭매운탕·스시준·에끼우동 상세 화면 |
| `food-beverage/restaurant-content.ts`                         | 식당 메뉴·공간 이미지 데이터           |
| `community/news/news-page.tsx`                                | 뉴스 목록과 대표 뉴스                  |
| `community/news/news-presentation.ts`                         | 날짜·썸네일 표시 변환                  |
| `community/events/events-page.tsx`                            | 이벤트 대표 카드와 갤러리              |
| `community/events/event-content.ts`                           | 이벤트 이미지 식별자                   |
| `community/community.module.css`                              | 뉴스·이벤트 공통 스타일                |
| `career/career-page.tsx`, `career.module.css`                 | 채용 안내 이미지 화면                  |
| `contact/contact-page.tsx`, `contact.module.css`              | 회사 연락처와 문의 화면                |
| `contact/contact-form.tsx`, `contact-form.module.css`         | 문의 입력 폼과 클라이언트 상태         |

### 관리자 기능 `admin`

| 파일                     | 용도                                       |
| ------------------------ | ------------------------------------------ |
| `actions.ts`             | 뉴스·크리에이터·직원 서버 액션             |
| `account-actions.tsx`    | 로그아웃 UI와 액션 연결                    |
| `auth-card.tsx`          | 인증 화면 공통 카드                        |
| `auth-client.ts`         | 브라우저용 Better Auth 클라이언트          |
| `auth-entry.tsx`         | Google·일반 가입·이메일 로그인 화면        |
| `list-page.tsx`          | 관리자 목록 화면 공통 틀                   |
| `content-list.tsx`       | 콘텐츠 정렬·숨김·복원 목록                 |
| `editor.tsx`             | 편집기 전체 조립과 저장 상태 관리          |
| `editor-fields.tsx`      | 뉴스·크리에이터 입력 필드                  |
| `editor-preview.tsx`     | 저장 전 공개 화면 미리보기                 |
| `editor-types.ts`        | 편집기 상태와 입력 타입                    |
| `media-picker.tsx`       | 이미지 선택·업로드 UI                      |
| `staff-list.tsx`         | 직원 승인·역할 변경 UI                     |
| `ui.tsx`                 | 관리자 버튼·배지·빈 상태 같은 작은 공통 UI |
| `use-unsaved-changes.ts` | 저장하지 않고 나갈 때 경고하는 훅          |

## `src/shared` — 여러 기능이 함께 쓰는 코드

| 파일                                                             | 용도                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------ |
| `components/layout/site-shell.tsx`                               | 공개 페이지에 헤더·본문·푸터 결합                      |
| `components/layout/site-header.tsx`, `site-header.module.css`    | 모든 공개 페이지의 동일한 메뉴와 모바일 메뉴           |
| `components/layout/site-footer.tsx`, `site-footer.module.css`    | 회사 정보 푸터                                         |
| `components/layout/page-title.tsx`, `page-title.module.css`      | News·Event·Career 공통 제목                            |
| `components/layout/side-rail.tsx`, `side-rail.module.css`        | 하위 페이지 좌측 섹션 메뉴                             |
| `components/navigation/slide-navigation.tsx`                     | 내부 링크 페이지 전환 처리                             |
| `components/media/use-visible-video.ts`                          | 화면에 보이는 영상만 재생하는 훅                       |
| `components/portfolio-notice.tsx`, `portfolio-notice.module.css` | 첫 방문 시 포트폴리오 데모 안내를 표시                 |
| `components/ui/copy-button.tsx`, `copy-button.module.css`        | 주소·이메일 복사 버튼                                  |
| `config/navigation.ts`                                           | 상단 메뉴와 하위 메뉴의 이름·URL 단일 원본             |
| `config/demo-admin.ts`                                           | 공개 체험 관리자 아이디·비밀번호의 단일 원본           |
| `styles/base.css`                                                | 폰트, reset, 색상·간격 토큰, body와 접근성 기반 스타일 |

## `src/domain`, `src/server`, `src/data`

### 도메인과 초기 데이터

| 파일                        | 용도                                    |
| --------------------------- | --------------------------------------- |
| `domain/content/creator.ts` | 공개 크리에이터 데이터 타입과 변환 규칙 |
| `domain/content/news.ts`    | 공개 뉴스 데이터 타입과 변환 규칙       |
| `domain/content/index.ts`   | 콘텐츠 타입의 공통 내보내기             |
| `data/seed/creators.json`   | DB 최초 이관용 크리에이터 37명          |
| `data/seed/news.json`       | DB 최초 이관용 뉴스 29건                |

### 서버 코드

| 파일                              | 용도                                            |
| --------------------------------- | ----------------------------------------------- |
| `server/db/client.ts`             | PostgreSQL·Prisma 연결을 한 곳에서 관리         |
| `server/auth/auth.ts`             | Google OAuth·일반 계정과 Better Auth 세션 설정  |
| `server/auth/guards.ts`           | 로그인·승인·OWNER 권한 검사                     |
| `server/content/public.ts`        | 공개 페이지에 노출할 뉴스·크리에이터 조회       |
| `server/content/admin-queries.ts` | 관리자 목록·편집용 조회                         |
| `server/content/schema.ts`        | 관리자 입력 Zod 검증                            |
| `server/content/service.ts`       | 생성·수정·정렬·숨김과 감사 기록 처리            |
| `server/media/upload.ts`          | 업로드 요청의 파일·크기·형식 판독               |
| `server/media/service.ts`         | 이미지 변환·중복 확인·DB 기록                   |
| `server/media/storage.ts`         | 실제 디스크 저장·읽기·삭제                      |
| `server/users/service.ts`         | 최초 OWNER 지정·직원 승인·소유권 이전           |
| `server/users/demo-admin.ts`      | 최고 관리자 권한 포트폴리오 체험 계정 생성·복구 |
| `server/audit/queries.ts`         | 관리자 작업 기록 조회                           |

`src/generated/prisma/`는 `prisma generate`가 자동 생성하는 DB 타입과 클라이언트입니다. 내부 파일은 직접 고치지 않고 `prisma/schema.prisma`를 수정한 뒤 다시 생성합니다.

## DB, 스크립트, 테스트, 운영

| 파일·폴더                                     | 용도                                                 |
| --------------------------------------------- | ---------------------------------------------------- |
| `prisma/schema.prisma`                        | User, News, Creator, MediaAsset, AuditLog 등 DB 모델 |
| `prisma/migrations/*/migration.sql`           | 운영 DB에 순서대로 적용되는 스키마 변경 이력         |
| `prisma/migrations/migration_lock.toml`       | Prisma DB 종류 고정                                  |
| `scripts/admin/import-content.ts`             | seed JSON을 DB로 이관                                |
| `scripts/deploy/package-standalone.mjs`       | 배포용 standalone 결과만 `.release`에 구성           |
| `scripts/operations/verify-local-restore.mjs` | 백업 파일을 로컬에서 복원 검증                       |
| `scripts/quality/check-content.mjs`           | 콘텐츠 수와 이미지 참조 검사                         |
| `scripts/quality/check-structure.mjs`         | 레거시·고아 코드·미사용 에셋·문서 구성을 검사        |
| `tests/integration/auth.test.ts`              | Google 로그인 시작·최초 OWNER 지정                   |
| `tests/integration/content.test.ts`           | 뉴스·크리에이터 CRUD와 정렬·숨김                     |
| `tests/integration/users.test.ts`             | 직원 승인과 권한                                     |
| `tests/integration/media.test.ts`             | 이미지 업로드·중복·삭제                              |
| `tests/integration/test-fixture.ts`           | 테스트 DB와 공통 데이터 준비                         |
| `tests/integration/server-only-stub.ts`       | 테스트 환경의 `server-only` 대체 모듈                |
| `ops/aws/`                                    | EC2·S3·PM2·Nginx 설정과 AWS 60일 운영 안내           |
| `ops/backup/`                                 | 백업 실행 파일, systemd 주기 실행 예시, 복구 안내    |

## 정적 파일 `public`

`public` 아래 파일은 `/폴더/파일명` URL로 바로 제공됩니다.

| 폴더·파일                      | 용도                                   |
| ------------------------------ | -------------------------------------- |
| `favicon.svg`, `og.png`        | 브라우저 아이콘과 SNS 공유 이미지      |
| `fonts/`                       | 사이트 전용 글꼴                       |
| `video/rizz-youtube-showreel/` | 메인·MCN 데스크탑/모바일 영상과 포스터 |
| `home-scroll/`                 | 메인 사업 소개 3개 이미지              |
| `directors/`                   | 디렉터 프로필 사진                     |
| `creator-thumbnails/`          | 크리에이터 목록 썸네일                 |
| `commerce/`                    | 커머스 사업 설명 이미지                |
| `property/`                    | 부동산 과정·전후·가치 이미지           |
| `news/`                        | 뉴스 로컬 썸네일                       |
| `brand-voice/`                 | 브랜드 인터뷰 교체 사진                |
| `fnb/`                         | F&B 랜딩 이미지                        |

새 파일을 추가할 때는 가장 가까운 기능 폴더에 두고, 두 기능 이상이 실제로 함께 사용할 때만 `shared`로 옮깁니다. URL 파일에는 화면 로직을 넣지 않고, DB 코드는 `server` 밖의 React 컴포넌트에서 직접 호출하지 않습니다.
