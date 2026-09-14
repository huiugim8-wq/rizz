import { config } from 'dotenv';
import pg from 'pg';
import { spawn } from 'node:child_process';
import { open, mkdir, cp, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
config({ path: '.env.local', quiet: true });
const source = new URL(process.env.DATABASE_URL);
if (
  source.hostname !== '127.0.0.1' ||
  source.port !== '55437' ||
  source.pathname !== '/rizz_homepage'
)
  throw new Error('프로젝트의 로컬 Compose DB에서만 실행할 수 있습니다.');
const name = `rizz_restore_${Date.now()}_test`;
const folder = path.resolve('.local', name);
await mkdir(folder, { recursive: true });
const run = (args, io = ['ignore', 'pipe', 'pipe']) =>
  new Promise((resolve, reject) => {
    const child = spawn('docker', ['compose', 'exec', '-T', 'db', ...args], { stdio: io });
    let err = '';
    child.stderr?.on('data', (chunk) => (err += chunk));
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`로컬 복원 명령 실패: ${err}`)),
    );
  });
const original = new pg.Client({ connectionString: source.href });
await original.connect();
const tables = [
  'User',
  'News',
  'Creator',
  'CreatorChannel',
  'MediaAsset',
  'AuditLog',
  'SiteControl',
];
const counts = async (client) => {
  const result = {};
  for (const table of tables)
    result[table] = Number((await client.query(`SELECT count(*) FROM "${table}"`)).rows[0].count);
  return result;
};
let before;
await original.query('SELECT pg_advisory_lock(743281)');
try {
  before = await counts(original);
  const dump = await open(path.join(folder, 'database.dump'), 'w', 0o600);
  try {
    await run(['pg_dump', '-U', 'rizz_dev', '-Fc', 'rizz_homepage'], ['ignore', dump.fd, 'pipe']);
  } finally {
    await dump.close();
  }
  await cp(path.join(process.env.UPLOAD_ROOT, 'public'), path.join(folder, 'uploads'), {
    recursive: true,
  });
} finally {
  await original.query('SELECT pg_advisory_unlock(743281)');
  await original.end();
}
await run(['createdb', '-U', 'rizz_dev', name]);
try {
  const dump = await open(path.join(folder, 'database.dump'), 'r');
  try {
    await run(
      ['pg_restore', '-U', 'rizz_dev', '--no-owner', '--no-acl', '--exit-on-error', '-d', name],
      [dump.fd, 'pipe', 'pipe'],
    );
  } finally {
    await dump.close();
  }
  const restoredUrl = new URL(source);
  restoredUrl.pathname = '/' + name;
  const restored = new pg.Client({ connectionString: restoredUrl.href });
  await restored.connect();
  try {
    const after = await counts(restored);
    if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error('복원 개수 불일치');
    const media = (await restored.query('SELECT "storageKey",checksum FROM "MediaAsset"')).rows;
    for (const asset of media) {
      const bytes = await readFile(path.join(folder, 'uploads', asset.storageKey));
      if (createHash('sha256').update(bytes).digest('hex') !== asset.checksum)
        throw new Error('사진 체크섬 불일치');
    }
    const result = {
      runtime: process.version,
      checkedAt: new Date().toISOString(),
      counts: after,
      mediaChecksums: media.length,
      result: 'PASS',
    };
    await writeFile(path.join(folder, 'verification.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result));
  } finally {
    await restored.end();
  }
} finally {
  await run(['dropdb', '-U', 'rizz_dev', name]);
}
