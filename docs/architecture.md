# 홈페이지 아키텍처

## 경계와 책임

`app/(public)`의 페이지는 URL과 메타데이터를 유지하고 기능 컴포넌트를 호출합니다. 공개 UI와 콘텐츠는 `src/features/<domain>`에 있으며 페이지별 CSS Module도 같은 폴더에 둡니다. 헤더, 푸터, 측면 메뉴, 페이지 제목과 탐색 동작은 `src/shared`가 담당합니다. `app/globals.css`는 폰트, reset, 색상·간격 토큰, 접근성, 페이지 전환만 불러옵니다.

관리자 UI는 `src/features/admin`에 있습니다. 라우트와 서버 액션은 세션과 권한을 확인한 뒤 `src/server` 서비스에 입력을 넘깁니다. DB 읽기·쓰기, 미디어 변환, 계정 상태, 감사 기록은 페이지 컴포넌트에서 직접 처리하지 않습니다.

## 요청 흐름

```text
공개 요청 → app/(public) → feature page → public content service → PostgreSQL
관리 요청 → app/admin → auth guard → server action/service → PostgreSQL
사진 업로드 → app/api/media → auth/origin 검사 → media service → Sharp → UPLOAD_ROOT + MediaAsset
사진 조회 → app/uploads/[key] → storage key 검증 → 영구 업로드 경로
```

공개 뉴스와 크리에이터는 `PUBLISHED`이고 휴지통에 없는 레코드만 조회합니다. `src/data/seed/creators.json` 37명과 `src/data/seed/news.json` 29건은 최초 이관 자료이며 운영 중 수정은 관리자를 사용합니다. `partner-catalog.json`은 파트너 119개의 이름, 카테고리, 로고, 원본 주소를 한 레코드에서 관리합니다. Reference 45건은 제목, 판매량, 거래액, 이미지와 분류가 하나의 객체에 있어 배열 순서에 의존하지 않습니다.

## 관리자와 권한

직원은 Google OAuth 또는 이메일·비밀번호로 가입하고 로그인합니다. 비밀번호는 Better Auth가 Scrypt 해시로 저장하며 평문을 DB에 보관하지 않습니다. 처음 가입한 사용자는 `PENDING/STAFF`가 되며, 현재 `OWNER`만 계정을 승인, 거절, 정지합니다. 승인된 직원만 뉴스·크리에이터 CRUD, 정렬, 숨김·복원, 사진 업로드를 수행합니다. Google이 이메일을 확인한 승인 직원만 소유권을 이전받을 수 있습니다.

OWNER가 아직 없을 때 `INITIAL_OWNER_EMAIL`과 일치하는 Google 계정이 로그인하면 해당 계정을 `ACTIVE/OWNER`로 지정합니다. OWNER가 만들어진 뒤에는 환경 변수를 바꾸거나 다른 계정으로 로그인해도 두 번째 OWNER가 생성되지 않습니다. 이후 소유권은 관리자 직원 목록에서 승인된 직원의 Google 이메일을 다시 입력해 이전합니다.

## 미디어 정책

고정 홈페이지 에셋은 `public`에 둡니다. 관리자 업로드는 배포 폴더 밖 `UPLOAD_ROOT/public`에 저장합니다. 업로드 API는 10MB 이하 JPEG, PNG, WebP, AVIF 정지 이미지만 받고 픽셀 수를 제한합니다. EXIF 회전을 반영한 뒤 최대 1600×1600 WebP로 변환하고 SHA-256으로 중복을 제거합니다. DB 레코드 생성이 실패하면 새 파일을 정리하며 콘텐츠가 참조하는 미디어는 삭제할 수 없습니다.

## 반응형과 스타일

각 기능의 CSS Module이 모바일 `≤900px`, 노트북 `901–1199px`, 데스크탑 `≥1200px` 규칙을 소유합니다. 공통 헤더, 푸터, 측면 메뉴도 자체 CSS Module을 사용합니다. 페이지는 가로 폭 고정값 대신 `min()`, `clamp()`, Grid의 `minmax(0, 1fr)`를 사용하고 모바일 이미지에는 명시적 비율과 `object-fit`을 적용합니다.

## 검색·성능·품질 검증 계획

공개 페이지는 서버에서 제목과 본문을 렌더링하고 상호작용이 필요한 메뉴, 영상, 캐러셀만 클라이언트 컴포넌트로 둡니다. 배포 도메인이 정해지면 페이지별 제목·설명·canonical URL, `robots.txt`, `sitemap.xml`, Open Graph 이미지와 Organization·Article 구조화 데이터를 추가합니다. 이후 Google Search Console에 도메인을 등록하고 사이트맵을 제출합니다.

성능은 개발 서버가 아닌 `npm run build` 뒤의 운영 서버에서 Lighthouse로 측정합니다. 대표 URL을 모바일과 데스크탑으로 검사하며 목표는 LCP 2.5초 이하, CLS 0.1 이하, 현장 INP 200ms 이하입니다. 대표 이미지에는 크기를 명시하고 첫 화면 이미지만 높은 우선순위로 요청합니다. 나머지는 화면 크기에 맞는 WebP·AVIF와 지연 로딩을 사용합니다. 공통 메뉴는 방문하지 않은 페이지의 대형 미디어를 미리 받지 않습니다.

INP는 Lighthouse 한 번으로 판단하지 않습니다. 배포 후 실제 사용자 Web Vitals를 수집해 75번째 백분위수를 확인합니다. GA4는 환경변수로 측정 ID를 주입하고 페이지 조회, 문의 이동, 외부 기사 이동, 관리자 로그인 실패처럼 의사 결정에 필요한 이벤트만 정의합니다. 개인정보 처리방침과 동의 방식이 정해진 뒤 운영 측정을 활성화합니다.

API는 Vitest PostgreSQL 통합 테스트를 기준으로 인증, OWNER·STAFF 권한, 뉴스·크리에이터 CRUD, 미디어 업로드를 검사합니다. AWS 배포 주소가 정해지면 같은 요청을 담은 Postman 환경과 컬렉션을 만들고 `/api/health`, 인증 거부, 정상 CRUD, 잘못된 입력과 업로드 제한을 운영 전 점검합니다. 배포 후보는 `npm run check`, `npm test`, `npm run build`를 모두 통과해야 합니다.

## F&B 콘텐츠 근거

F&B 포트폴리오와 매장 설명은 글로우업리즈 기존 공개 페이지를 기준으로 편집했습니다: `glowuprizz.com/commerce-1-3`, `/sushijun-1`, `/ekiudon-1`, `/seogyodak`. 원본 사진은 Wix 정적 미디어에서 가져온 서비스 에셋이며 CSS가 크롭과 비율을 제어합니다. 서교닭의 과거 운영 경험은 보조 자료만 확인되어 기업 소유 연혁이나 확정되지 않은 개점 연도·매출·매장 수로 표현하지 않습니다.

## 운영 경계

현재 로컬 PostgreSQL을 사용하며 로그인은 Google OAuth에 연결합니다. 60일 실습 운영은 AWS EC2 한 대에서 Node.js 애플리케이션, PostgreSQL, Nginx, PM2를 실행하고 S3에 암호화 백업을 저장합니다. 비용과 운영 범위를 줄이기 위해 이 기간에는 ECS와 RDS를 사용하지 않습니다. `.env.local`, 업로드 파일, DB 덤프는 릴리스 패키지에 포함하지 않습니다. 상세 절차는 `ops/aws/README.md`와 `ops/backup/README.md`를 따릅니다.
