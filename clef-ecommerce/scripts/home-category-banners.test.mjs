import fs from 'node:fs';
import path from 'node:path';

const bannerFile = path.resolve('src/components/banners/IndexSectionBanners2.tsx');
const source = fs.readFileSync(bannerFile, 'utf8');

const expectedLinks = [
  ['/all-skincare', 'src/pages/all-skincare.tsx'],
  ['/all-personal-care', 'src/pages/all-personal-care.tsx'],
  ['/fragrance', 'src/pages/fragrance.tsx'],
];

for (const [href, pageFile] of expectedLinks) {
  if (!source.includes(`href="${href}"`)) {
    throw new Error(`Expected homepage category banner to link to ${href}.`);
  }

  if (!fs.existsSync(path.resolve(pageFile))) {
    throw new Error(`Expected destination page ${pageFile} to exist.`);
  }
}

const anchorCount = [...source.matchAll(/<a\b/g)].length;

if (anchorCount < expectedLinks.length) {
  throw new Error('Expected each homepage category banner to be wrapped in a clickable anchor.');
}

console.log('Homepage category banner links are present.');
