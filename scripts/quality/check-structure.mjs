import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ignoredRootDirectories = new Set(['.git', '.next', '.release', 'node_modules']);
const walk = (directory) =>
  existsSync(directory)
    ? readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        if (directory === '.' && entry.isDirectory() && ignoredRootDirectories.has(entry.name)) {
          return [];
        }
        const file = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(file) : [file];
      })
    : [];
const removedPaths = [
  'archive',
  'artifacts',
  'output',
  'design',
  'release',
  'dist',
  '.openai',
  '.vinext',
  '.wrangler',
  'CLAUDE.md',
  'build_august_report.py',
  'build_august_report_pdf.py',
  'src/content',
  'src/contracts',
  'src/styles',
  'app/(site)',
];
for (const item of removedPaths) assert(!existsSync(item), `legacy path remains: ${item}`);

const expectedDocuments = new Set([
  'AGENTS.md',
  'README.md',
  'docs/admin-guide.md',
  'docs/architecture.md',
  'docs/file-guide.md',
  'ops/backup/README.md',
  'ops/aws/README.md',
]);
const documents = walk('.').filter(
  (file) =>
    file.endsWith('.md') &&
    !file.startsWith(`node_modules${path.sep}`) &&
    !file.startsWith(`.git${path.sep}`),
);
assert.deepEqual(new Set(documents), expectedDocuments, 'unexpected Markdown document found');

const sourceExtensions = ['.ts', '.tsx', '.mjs', '.json', '.css'];
const sourceFiles = walk('src').filter(
  (file) =>
    sourceExtensions.includes(path.extname(file)) &&
    !file.startsWith(`src${path.sep}generated${path.sep}`),
);
const entryFiles = [
  ...walk('app').filter((file) => sourceExtensions.includes(path.extname(file))),
  ...walk('scripts').filter((file) => sourceExtensions.includes(path.extname(file))),
  ...walk('tests').filter((file) => sourceExtensions.includes(path.extname(file))),
];
const candidates = (base) =>
  [
    base,
    ...sourceExtensions.map((extension) => `${base}${extension}`),
    ...sourceExtensions.map((extension) => path.join(base, `index${extension}`)),
  ].filter((candidate) => existsSync(candidate) && statSync(candidate).isFile());
const resolveImport = (from, specifier) => {
  if (specifier.startsWith('@/')) return candidates(path.join('src', specifier.slice(2))).at(0);
  if (specifier.startsWith('.'))
    return candidates(path.resolve(path.dirname(from), specifier)).at(0);
};
const reachable = new Set(entryFiles.map((file) => path.resolve(file)));
const queue = [...reachable];
while (queue.length) {
  const file = queue.pop();
  if (!file || !existsSync(file) || !sourceExtensions.includes(path.extname(file))) continue;
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/(?:from\s+|import\s*\(|@import\s+)["']([^"']+)["']/g)) {
    const resolved = resolveImport(file, match[1]);
    if (resolved && !reachable.has(path.resolve(resolved))) {
      reachable.add(path.resolve(resolved));
      queue.push(path.resolve(resolved));
    }
  }
}
const allowedTestStub = path.resolve('tests/integration/server-only-stub.ts');
reachable.add(allowedTestStub);
const orphanSources = sourceFiles.filter((file) => !reachable.has(path.resolve(file)));
assert.deepEqual(orphanSources, [], `unreferenced source files: ${orphanSources.join(', ')}`);

const corpus = [...walk('app'), ...walk('src')]
  .filter((file) => sourceExtensions.includes(path.extname(file)))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');
const publicFiles = walk('public');
const orphanAssets = publicFiles.filter((file) => {
  if (file === 'public/favicon.svg' || file === 'public/og.png') return false;
  if (file.startsWith(`public${path.sep}directors${path.sep}`)) {
    const id = path.basename(file, path.extname(file));
    return !new RegExp(`id:\\s*['\"]${id}['\"]`).test(corpus);
  }
  const publicUrl = `/${path.relative('public', file).split(path.sep).join('/')}`;
  return !corpus.includes(publicUrl);
});
assert.deepEqual(orphanAssets, [], `unreferenced public assets: ${orphanAssets.join(', ')}`);

console.log(
  `Structure valid: ${sourceFiles.length} source files and ${publicFiles.length} public assets are referenced.`,
);
