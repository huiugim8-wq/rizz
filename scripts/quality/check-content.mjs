import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const json = (file) => JSON.parse(readFileSync(path.join(root, file), 'utf8'));
const creators = json('src/data/seed/creators.json');
const news = json('src/data/seed/news.json');
const partners = json('src/features/commerce/partners/partner-catalog.json');
const categories = new Set(['BUSINESS', 'FITNESS', 'MUSIC', 'BEAUTY', 'LIFESTYLE']);

function validateRecords(records, fields, label) {
  assert(Array.isArray(records), `${label}: expected an array`);
  const ids = new Set();
  for (const record of records) {
    for (const field of fields) {
      assert(
        typeof record[field] === 'string' && record[field].trim(),
        `${label}: missing ${field}`,
      );
    }
    assert(!ids.has(record.id), `${label}: duplicate ID ${record.id}`);
    ids.add(record.id);
    assert(/^(https:\/\/|\/(?!\/))/.test(record.image), `${record.id}: invalid image URL`);
    if (record.image.startsWith('/')) {
      assert(
        existsSync(path.join(root, 'public', record.image.slice(1))),
        `${record.id}: missing image`,
      );
    }
  }
}

validateRecords(
  creators,
  ['id', 'name', 'displayName', 'followers', 'image', 'category'],
  'creators',
);
for (const creator of creators) {
  assert(categories.has(creator.category), `${creator.id}: unknown category`);
  assert(/^\d+(?:\.\d+)?[KM]?$/.test(creator.followers), `${creator.id}: invalid follower label`);
}

validateRecords(news, ['id', 'title', 'publishedAt', 'image'], 'news');
for (const article of news) {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt), `${article.id}: use YYYY-MM-DD`);
  const date = new Date(`${article.publishedAt}T00:00:00Z`);
  assert(!Number.isNaN(date.valueOf()), `${article.id}: invalid date`);
  assert.equal(
    date.toISOString().slice(0, 10),
    article.publishedAt,
    `${article.id}: invalid calendar date`,
  );
}

assert.equal(creators.length, 37, 'creator seed count changed');
assert.equal(news.length, 29, 'news seed count changed');
assert.equal(partners.length, 119, 'partner catalog count changed');
for (const partner of partners) {
  assert(
    partner.id && partner.name && partner.wordmark,
    'partner catalog has an incomplete record',
  );
  assert(
    Array.isArray(partner.categories) && partner.categories.length,
    `${partner.id}: missing category`,
  );
  if (partner.logo?.src?.startsWith('/')) {
    assert(
      existsSync(path.join(root, 'public', partner.logo.src.slice(1))),
      `${partner.id}: missing logo`,
    );
  }
}

// Catch broken public URLs after moving assets. Relative imports are checked by TypeScript.
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
let assets = 0;
for (const file of [...walk(path.join(root, 'src')), ...walk(path.join(root, 'app'))]) {
  if (!/\.(tsx?|json|css)$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const [, url] of text.matchAll(
    /["'`](\/(?!\/)[^"'`\s]+\.(?:mp4|png|jpe?g|avif|svg|woff2|ttf))["'`]/g,
  )) {
    if (url.includes('${')) continue;
    assert(
      existsSync(path.join(root, 'public', url.slice(1))),
      `${path.relative(root, file)}: missing ${url}`,
    );
    assets++;
  }
}

console.log(
  `Content valid: ${creators.length} creators, ${news.length} news articles, ${partners.length} partners, ${assets} local asset references.`,
);
