# 백업·복구 운영 절차

`backup.mjs`는 pg_dump와 업로드 복사 동안 앱과 같은 PostgreSQL advisory lock을 잡아 DB·파일 참조 시점을 맞춘다. 복사가 끝나면 잠금을 풀고 restic으로 외부 저장소에 암호화해 올린다. 운영 업로드가 커지면 이 잠금 구간의 편집 대기를 측정해 스냅샷 저장소 방식으로 변경한다.

별도 `rizz-backup` 계정에 DB 읽기, 공개 업로드 읽기, 스테이징 쓰기 권한만 부여한다. pg_dump 17 이상, restic, Node 24, npm `pg` 패키지가 필요하다. 도구와 잠금 파일은 검증된 앱 소스의 버전과 함께 관리한다. `/etc/rizz/backup.env`는 0600, RESTIC_PASSWORD_FILE은 별도 안전한 위치에 둔다. 저장소 최초 초기화는 운영자가 `restic init`으로 수행하고 비밀번호 복구 사본을 서버 밖에 보관한다.

실패 시 스테이징을 남기고 비정상 종료하므로 systemd 실패/외부 모니터 알림을 운영 담당자에게 연결한다. 비밀값이나 덤프를 public 폴더에 두지 않는다. 외부 저장소는 운영 서버와 다른 장애 영역에 있어야 한다. 초기 보관은 일별 14개이며 회사 정책에 맞춰 조정한다.

복원 연습:

1. 운영과 분리된 빈 PostgreSQL DB와 빈 업로드 경로를 준비한다. 운영 DB를 대상으로 복원하지 않는다.
2. `restic snapshots --tag rizz-homepage`에서 복원할 시점을 선택하고 `restic restore <스냅샷> --target <격리 경로>`로 내려받는다.
3. 해당 `database.dump`를 `pg_restore --no-owner --no-acl --dbname=<복구 DB>`로 복구한다.
4. 같은 스냅샷의 uploads를 복구 앱 UPLOAD_ROOT/public에 복사한다. 서로 다른 날짜의 DB·파일을 혼합하지 않는다.
5. 콘텐츠/계정 개수, 로그인, 게시 상태, 모든 MediaAsset 파일 체크섬·참조, 임시 저장 비공개, 영상 재생을 확인한다.
6. 소요 시간과 확인 결과를 기록한다. 실제 운영 반영 시 편집을 중지하고 최신 백업·DB/파일 전환·세션 정책을 담당자가 승인한 절차로 수행한다.

현재 AWS 계정과 S3 저장소가 준비되지 않아 외부 암호화 백업·운영 복구는 실행하지 않았다. 배포할 때 EC2 인스턴스 역할에 전용 S3 버킷의 최소 권한만 부여하고 `RESTIC_REPOSITORY`를 연결한다. 로컬 PostgreSQL 덤프 복원 결과는 구현 검증 문서에 별도로 기록한다.
