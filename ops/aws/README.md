# AWS 60일 운영 계획

## 목표

홈페이지 개발과 로컬 검증을 먼저 끝낸 뒤 AWS 신규 계정 크레딧으로 약 60일 동안 실제 서비스를 운영한다. 이 기간에는 AWS 사용 경험과 운영 기록을 남기는 데 집중한다.

구성은 단순하게 유지한다.

- **EC2 1대**: Next.js, PostgreSQL, Nginx, PM2 실행
- **S3 비공개 버킷 1개**: restic으로 암호화한 DB·업로드 백업 저장
- **Route 53은 선택**: 이미 보유한 도메인의 DNS를 그대로 쓸 수 있으면 새 비용을 만들지 않는다.
- **ECS와 RDS는 제외**: 60일 실습에 필요한 비용과 관리 범위를 줄인다.

AWS 무료 플랜과 크레딧은 계정 생성 시점과 자격에 따라 달라진다. 인스턴스를 만들기 전에 Billing 화면에서 실제 지급 크레딧, 만료일, 적용 가능 서비스를 확인한다.

## 시작 전에 할 일

1. 루트 계정에 MFA를 설정하고 평소 작업은 별도 관리자 IAM 사용자로 한다.
2. AWS Budgets에 월간 예산을 만들고 10달러, 30달러, 50달러 알림을 등록한다.
3. 서울 리전에 Ubuntu EC2를 만든다. 처음에는 2GB 메모리급 한 대와 필요한 최소 EBS만 사용한다.
4. 보안 그룹은 HTTP 80, HTTPS 443을 공개하고 SSH 22는 관리자의 현재 IP만 허용한다.
5. EC2용 IAM 역할에 전용 S3 백업 버킷만 읽고 쓸 수 있는 최소 권한을 부여한다. 장기 Access Key를 서버 파일에 저장하지 않는다.

## 배포 순서

1. EC2에 Node.js 24, PostgreSQL 17, Nginx, PM2, restic을 설치한다.
2. `/opt/rizz/releases`, `/var/lib/rizz/uploads/public`, `/etc/rizz`를 만들고 앱 전용 일반 계정 `rizz`만 필요한 경로를 읽고 쓰게 한다.
3. `.env.example`을 참고해 `/etc/rizz/app.env`를 작성하고 소유자를 `root:rizz`, 권한을 `0640`으로 제한한다. 실제 HTTPS 주소, 고유 인증 비밀값, Google OAuth 값, 최초 OWNER 이메일, 운영 DB 비밀번호를 설정한다.
4. Google Cloud Console의 승인된 원본에 `https://실제도메인`, 리디렉션 URI에 `https://실제도메인/api/auth/callback/google`을 등록한다.
5. EC2와 같은 Linux/CPU 환경에서 `npm ci`, `npm run db:generate`, `npm run check`, `npm test`, `npm run build`, `npm run package:release`를 실행한다. macOS의 `node_modules`나 빌드 결과를 복사하지 않는다.
6. `.release/standalone`을 `/opt/rizz/releases/<버전>`에 복사하고 `/opt/rizz/current` 링크를 새 릴리스로 전환한다.
7. 처음에는 `npm run db:migrate`와 `npm run db:import`를 실행한다. 이때 공개용 체험 최고 관리자도 준비된다. 다음 배포부터는 마이그레이션 전에 DB와 업로드를 먼저 백업한다.
8. `pm2 startOrRestart /opt/rizz/current/ops/aws/ecosystem.config.cjs --update-env`와 `pm2 save`를 실행한다.
9. 도메인 준비 전에는 `nginx-http.conf.example`로 공개 IP 응답을 확인한다. 이후 Nginx HTTPS 예시의 도메인과 인증서 경로를 바꾸고 인증서를 발급한 뒤 `nginx -t`를 통과시킨다.
10. `/api/health`, 공개 페이지, 관리자 로그인, 최초 OWNER 지정, 직원 승인, 콘텐츠 저장, 사진 업로드, 영상 재생을 실제 도메인에서 확인한다.

공개 IP 기반 임시 DNS는 HTTPS와 인증 쿠키를 검증하는 용도로만 사용한다. 인스턴스를 중지·시작해 공개 IP가 바뀌면 주소도 바뀌므로 장기 공개 전에는 고정 IP와 보유 도메인을 연결한다.

## 60일 일정

| 시점   | 할 일                                                                                               |
| ------ | --------------------------------------------------------------------------------------------------- |
| 배포일 | Billing 크레딧·만료일 확인, 예산 알림 설정, 배포와 전체 기능 검사                                   |
| 1~4주  | 오류 로그, CPU·메모리·디스크, 백업 성공 여부를 주 1회 확인                                          |
| 5~7주  | Lighthouse와 실제 모바일·노트북·데스크탑 화면 검사, 운영 기록 정리                                  |
| 55일   | DB와 업로드를 복원 가능한 형태로 백업하고 서비스 유지 여부 결정                                     |
| 60일   | 실습 종료 시 EC2, EBS, Elastic IP, S3 객체·버킷과 유료 스냅샷을 삭제하고 Billing에서 잔여 비용 확인 |

Elastic IP는 EC2에 연결하지 않은 상태에서도 비용이 생길 수 있다. 인스턴스만 종료하고 EBS, 스냅샷, Elastic IP, S3 데이터를 남기면 계속 청구될 수 있으므로 종료 목록을 모두 확인한다.

## 롤백과 백업

배포 전 `ops/backup/README.md` 절차로 PostgreSQL과 업로드를 같은 시점에 백업한다. 앱 오류는 `/opt/rizz/current`를 이전 릴리스로 되돌리고 PM2를 재시작한다. DB 스키마나 데이터 오류는 앱 파일만 되돌려 해결되지 않으므로 검증된 백업으로 별도 복원한다.

S3 백업 버킷은 공개 접근을 차단하고 버전 관리와 수명 주기를 설정한다. 60일 실습 종료 후 보관이 필요하지 않다면 객체 버전까지 모두 삭제해 추가 비용을 막는다.
