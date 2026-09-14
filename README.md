# GLOW UP RIZZ

글로우업리즈의 공개 정보와 디자인 언어를 바탕으로 새 코드로 구축한 **기업 홈페이지 겸 콘텐츠 관리 시스템**입니다.

단순한 화면 복제에 머무르지 않고, 영상과 대형 타이포그래피를 활용한 브랜드 경험부터 뉴스·크리에이터·미디어를 운영하는 관리자 기능, PostgreSQL 데이터 모델, 테스트, AWS 배포까지 하나의 Next.js 애플리케이션으로 완성했습니다.

> 이 저장소는 채용 포트폴리오를 목적으로 제작한 비공식 프로젝트입니다. 기존 Wix 코드나 비공개 자료를 복사하지 않았으며, 공개된 회사 정보와 이미지·디자인 특징을 참고해 구조와 코드를 새로 작성했습니다.

## 바로 보기

- **Live Demo:** <https://54-180-95-162.nip.io>
- **Admin Demo:** <https://54-180-95-162.nip.io/admin/login>
- **Repository:** <https://github.com/huiugim8-wq/rizz>

라이브 주소는 EC2 공개 IP를 이용한 임시 HTTPS 주소입니다. 사이트 첫 방문 시 포트폴리오 안내가 한 번 표시되며, 관리자 로그인 화면에서 별도 가입 없이 체험용 최고 관리자 기능을 확인할 수 있습니다.

## 프로젝트 목표

이 프로젝트는 다음 질문에서 시작했습니다.

1. 브랜드 사이트의 강한 시각적 인상을 유지하면서도 사업 구조를 더 명확하게 전달할 수 있는가?
2. 운영자가 개발자 도움 없이 뉴스와 크리에이터 정보를 관리할 수 있는가?
3. 디자인 시안에 머무르지 않고 인증, 데이터베이스, 테스트, 배포와 운영까지 책임질 수 있는가?

이를 위해 공개 홈페이지와 직원용 관리자를 분리된 프로젝트로 만들지 않고, 동일한 도메인 모델과 검증 규칙을 공유하는 하나의 풀스택 애플리케이션으로 설계했습니다.

## 주요 구현

### 브랜드 홈페이지

- 초대형 타이포그래피와 영상을 결합한 스크롤 기반 홈 화면
- `GLOW UP RIZZ` 타이틀 이동, 영상 확장, 가로형 비즈니스 전환 인터랙션
- Management, Commerce, Academy, Property, F&B 사업 페이지
- 크리에이터 디렉터 캐러셀과 크리에이터 영상·목록
- 뉴스, 파트너, 레퍼런스, 채용, 문의 페이지
- 기존에 공유된 외부 링크가 깨지지 않도록 레거시 공개 URL 유지
- 모바일, 노트북, 데스크톱을 구분한 반응형 레이아웃
- 영상 자동 재생 조건, 뷰포트 이탈 시 정지, `prefers-reduced-motion` 대응

### 콘텐츠 관리자

- Google OAuth 및 이메일·비밀번호 로그인
- `OWNER`, `STAFF`, `DEMO` 역할과 `PENDING`, `ACTIVE`, `SUSPENDED` 계정 상태
- 최고 관리자에 의한 직원 승인·거절·정지와 소유권 이전
- 뉴스와 크리에이터 생성·수정·게시·숨김·복원·정렬
- 사진 업로드, 미리보기, 기존 미디어 선택
- 변경 주체·대상·필드를 남기는 감사 로그
- 포트폴리오 방문자가 기능을 확인할 수 있는 제한된 체험 관리자

### 데이터와 미디어

- 크리에이터 37명, 뉴스 29건을 PostgreSQL 초기 데이터로 이관
- 파트너 119개와 레퍼런스 데이터를 단일 구조로 정규화
- 공개 화면에서는 게시 상태이며 삭제되지 않은 콘텐츠만 조회
- 업로드 파일 형식, 용량, 픽셀 수와 요청 Origin 검증
- EXIF 회전 보정 후 최대 1600×1600 WebP 변환
- SHA-256 체크섬을 이용한 중복 파일 방지
- 배포 폴더 밖의 영구 업로드 경로를 사용해 새 배포에서도 파일 보존

## 기술 스택

| 영역               | 기술                                                        |
| ------------------ | ----------------------------------------------------------- |
| Frontend           | TypeScript, React 19, Next.js 16 App Router, CSS Modules    |
| Backend            | Next.js Route Handlers, Server Actions, Node.js 24          |
| Database           | PostgreSQL 17, Prisma 7                                     |
| Authentication     | Better Auth, Google OAuth, Email/Password                   |
| Validation & Media | Zod, Sharp, SHA-256                                         |
| Test & Quality     | Vitest, TypeScript, ESLint, Prettier, custom content checks |
| Infrastructure     | AWS EC2 ARM64, EBS gp3, Nginx, PM2, systemd, Let's Encrypt  |

## 아키텍처

```text
Browser
  │
  ├─ Public pages ───────────────┐
  └─ Admin / Auth / Uploads ─────┤
                                 ▼
                         Nginx · HTTPS
                                 │
                                 ▼
                     Next.js standalone server
                       │        │         │
                       │        │         └─ Sharp image pipeline
                       │        └─ Better Auth · role guards
                       └─ Prisma services
                                 │
                                 ▼
                      PostgreSQL on localhost

Persistent media: /var/lib/rizz/uploads/public
Application env:  /etc/rizz/app.env
Current release:  /opt/rizz/current → /opt/rizz/releases/<commit>/app
```

라우트 컴포넌트는 URL과 메타데이터만 담당하고, 화면 기능은 `src/features`, 공통 UI는 `src/shared`, 인증·DB·미디어·권한 처리는 `src/server`에 배치했습니다. 페이지가 Prisma나 파일 시스템을 직접 다루지 않도록 경계를 두어 화면 변경과 서버 규칙 변경을 분리했습니다.

### 요청 흐름

```text
공개 요청 → app/(public) → feature page → public content service → PostgreSQL
관리 요청 → app/admin → auth guard → server action/service → PostgreSQL
사진 업로드 → app/api/media → auth/origin 검사 → Sharp → storage + MediaAsset
사진 조회 → app/uploads/[key] → storage key 검증 → 영구 업로드 경로
```

## 설계 판단과 트레이드오프

### 한 대의 EC2를 선택한 이유

이 프로젝트의 목표는 대규모 트래픽 대응보다 **제한된 AWS 크레딧 안에서 실제 서비스를 직접 운영하는 경험**을 만드는 것이었습니다. 따라서 초기 운영은 EC2 한 대에서 Next.js, PostgreSQL, Nginx를 실행하도록 구성했습니다.

- 장점: 낮은 비용, 단순한 장애 지점, 배포와 로그를 직접 이해하기 쉬움
- 한계: 애플리케이션과 DB 장애 영역이 분리되지 않고 수평 확장이 어려움
- 확장 방향: RDS 분리, S3 미디어 저장, CloudFront, 무중단 배포 파이프라인, IaC 적용

### 고정 에셋과 운영 데이터 분리

브랜드 영상과 로고처럼 코드 배포와 함께 바뀌는 파일은 `public`에 두고, 관리자가 올린 이미지는 릴리스 외부 경로에 저장합니다. 이 구조는 Git으로 관리할 자료와 운영 중 생성되는 자료를 구분하며, 릴리스 링크를 되돌릴 때 사용자 업로드가 사라지는 문제를 방지합니다.

### 공개 데모와 실제 권한 분리

체험 관리자는 CRUD와 감사 로그를 보여주기 위한 역할이지만 서비스 소유권 이전은 할 수 없습니다. 실제 직원은 가입 직후 `PENDING` 상태가 되며, 승인된 계정만 관리 기능을 사용할 수 있습니다.

## 보안 기준

- 운영 비밀값은 Git이 아닌 `/etc/rizz/app.env`에 저장
- 인증 쿠키에 `HttpOnly`, `Secure`, `SameSite=Lax` 적용
- 비밀번호는 Better Auth가 Scrypt 해시로 저장
- 로그인·가입 요청별 rate limit 적용
- 서버 액션과 API에서 세션, 역할, 계정 상태 재검증
- 업로드 요청의 Origin, MIME, 크기, 이미지 픽셀 수 검증
- PostgreSQL과 Next.js 포트는 외부에 공개하지 않고 localhost에만 바인딩
- SSH는 보안 그룹에서 관리 IP만 허용
- Nginx에서 TLS 종료와 정적 파일 캐시 담당

## 검증 결과

현재 배포 후보는 다음 검증을 통과했습니다.

```text
npm run check   ✓ TypeScript, ESLint, Prettier, 콘텐츠·에셋 구조 검사
npm test        ✓ 4 test files, 14 integration tests
npm run build   ✓ 31 routes production build
```

통합 테스트는 실제 PostgreSQL 테스트 DB를 사용해 다음을 확인합니다.

- 회원가입과 로그인, 비밀번호 해시 저장
- 최초 OWNER 지정과 중복 OWNER 방지
- 직원 승인·정지·소유권 이전 권한
- 뉴스와 크리에이터 CRUD 및 동시 수정 충돌
- 잘못된 입력과 권한 없는 요청 거부
- 이미지 형식·용량 검증과 중복 업로드 처리

## AWS 배포

현재 서비스는 서울 리전의 ARM64 EC2에서 운영됩니다.

```text
Internet → HTTPS / Nginx → Next.js :3000 → PostgreSQL :5432
                         └──────────→ persistent uploads
```

- Next.js `standalone` 산출물만 릴리스 디렉터리에 배치
- Git 커밋 단위 릴리스와 `/opt/rizz/current` 심볼릭 링크 전환
- 이전 릴리스를 보존해 애플리케이션 롤백 가능
- PM2와 systemd를 이용한 프로세스 감시 및 재부팅 자동 시작
- `/api/health`를 이용한 배포 후 상태 검사
- Nginx 정적 파일 캐시와 HTTP→HTTPS 리디렉션
- Let's Encrypt 인증서 자동 갱신

현재 구성은 약 60일 동안의 포트폴리오 운영을 기준으로 합니다. 영구 운영 전에는 Elastic IP와 보유 도메인, S3 암호화 백업, CloudWatch 알림을 추가할 계획입니다.

## 로컬 실행

### 준비 사항

- Node.js 24
- Docker

```sh
npm ci
cp .env.example .env.local
docker compose up -d
npm run db:generate
npm run db:migrate
npm run db:import
npm run dev
```

- 홈페이지: <http://localhost:3000>
- 관리자: <http://localhost:3000/admin/login>

`.env.local`에는 충분히 긴 `BETTER_AUTH_SECRET`, PostgreSQL URL과 `UPLOAD_ROOT` 절대 경로를 설정합니다. Google 로그인을 사용할 경우 Google Cloud Console에 OAuth 클라이언트를 만들고 `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`을 추가합니다. 비밀값과 업로드 파일은 Git에 저장하지 않습니다.

### 주요 명령

```sh
npm run dev              # 로컬 개발 서버
npm run check            # 타입·린트·포맷·콘텐츠·에셋 검사
npm test                 # PostgreSQL 통합 테스트
npm run build            # Next.js 프로덕션 빌드
npm run db:migrate       # Prisma 마이그레이션 적용
npm run db:import        # 초기 콘텐츠와 체험 관리자 준비
npm run package:release  # standalone 배포 패키지 생성
```

테스트는 이름이 `_test`로 끝나는 별도 PostgreSQL DB만 허용합니다. 개발 DB나 운영 DB를 `TEST_DATABASE_URL`로 지정하면 테스트가 실행되지 않습니다.

## 폴더 구조

```text
app/
  (public)/            공개 URL과 메타데이터
  admin/               관리자 라우트와 레이아웃
  api/                 인증·미디어·상태 API
  uploads/             검증된 업로드 응답
src/
  features/            도메인별 화면·상호작용·스타일
  shared/              공통 컴포넌트·설정·기반 스타일
  domain/              콘텐츠 타입과 도메인 규칙
  server/              인증·DB·미디어·권한·감사 서비스
  data/seed/           최초 콘텐츠 이관 데이터
prisma/                DB 스키마와 마이그레이션
scripts/               품질검사·이관·배포·복구 도구
tests/integration/     PostgreSQL 통합 테스트
ops/                   AWS, Nginx, PM2, 백업 운영 파일
docs/                  아키텍처와 관리자 문서
public/                버전 관리되는 브랜드 에셋
```

`@/`는 `src/`를 가리킵니다. `news-2`, `event-1`, `seogyodak-2` 같은 기존 공개 URL은 외부 링크 호환성을 위해 유지합니다.

## 추가 문서

- [파일·폴더 용도 안내](docs/file-guide.md)
- [아키텍처와 데이터 흐름](docs/architecture.md)
- [직원용 관리자 안내](docs/admin-guide.md)
- [AWS 운영 계획](ops/aws/README.md)
- [백업·복구 절차](ops/backup/README.md)

## 다음 개선 과제

- 보유 도메인과 고정 IP 연결
- S3 비공개 버킷과 restic 암호화 백업 자동화
- AWS CDK를 이용한 인프라 코드화
- CloudWatch 상태·비용 알림
- 페이지별 metadata, sitemap, robots, 구조화 데이터 보강
- Web Vitals 수집과 Lighthouse 기반 성능 개선
