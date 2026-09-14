import pg from 'pg';
import { mkdtemp, mkdir, cp, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
const required = [
  'BACKUP_DATABASE_URL',
  'BACKUP_STAGING_ROOT',
  'UPLOAD_ROOT',
  'RESTIC_REPOSITORY',
  'RESTIC_PASSWORD_FILE',
];
for (const key of required) if (!process.env[key]) throw new Error(`${key} 설정이 필요합니다.`);
const run = (command, args, extraEnv = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ['ignore', 'inherit', 'inherit'],
      env: { ...process.env, ...extraEnv },
    });
    child.on('error', reject);
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${command}: ${code}`))));
  });
await mkdir(process.env.BACKUP_STAGING_ROOT, { recursive: true });
const stage = await mkdtemp(path.join(process.env.BACKUP_STAGING_ROOT, 'rizz-'));
const connection = new pg.Client({ connectionString: process.env.BACKUP_DATABASE_URL });
try {
  await connection.connect();
  await connection.query('SELECT pg_advisory_lock(743281)');
  try {
    await run('pg_dump', ['--format=custom', '--file', path.join(stage, 'database.dump')], {
      PGDATABASE: process.env.BACKUP_DATABASE_URL,
    });
    await cp(path.join(process.env.UPLOAD_ROOT, 'public'), path.join(stage, 'uploads'), {
      recursive: true,
    });
  } finally {
    await connection.query('SELECT pg_advisory_unlock(743281)');
    await connection.end();
  }
  await run('restic', ['backup', stage, '--tag', 'rizz-homepage']);
  await run('restic', [
    'forget',
    '--tag',
    'rizz-homepage',
    '--group-by',
    'host,tags',
    '--keep-daily',
    '14',
    '--prune',
  ]);
  await rm(stage, { recursive: true });
  console.log('외부 암호화 백업 완료.');
} catch (error) {
  console.error('백업 실패. 스테이징을 보존했습니다. 운영 담당자 확인이 필요합니다.');
  throw error;
}
