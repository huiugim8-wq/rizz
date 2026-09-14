#!/usr/bin/env bash
set -euo pipefail
export NODE_ENV=production HOSTNAME=127.0.0.1 PORT=3000
node --env-file=/etc/rizz/app.env --input-type=module -e 'for (const key of ["APP_ORIGIN", "DATABASE_URL", "BETTER_AUTH_SECRET", "UPLOAD_ROOT"]) { if (!process.env[key]) throw new Error(`${key} 설정이 필요합니다.`); }'
exec node --env-file=/etc/rizz/app.env server.js
