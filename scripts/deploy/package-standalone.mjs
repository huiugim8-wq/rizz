import { access, cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
const output = path.resolve('.release/standalone');
await access('.next/standalone/server.js');
await rm(path.dirname(output), { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp('.next/standalone', output, {
  recursive: true,
  filter: (source) => !path.basename(source).startsWith('.env'),
});
await cp('.next/static', path.join(output, '.next/static'), { recursive: true });
await cp('public', path.join(output, 'public'), { recursive: true });
await mkdir(path.join(output, 'ops/aws'), { recursive: true });
for (const file of ['ecosystem.config.cjs', 'nginx.conf.example', 'start.sh']) {
  await cp(path.join('ops/aws', file), path.join(output, 'ops/aws', file));
}
await cp('prisma', path.join(output, 'prisma'), { recursive: true });
console.log(
  '.release/standalone 생성 완료. 소스·문서·테스트·업로드·환경 비밀값은 포함하지 않았습니다.',
);
