import fs from 'node:fs';
import path from 'node:path';

const bannerFile = path.resolve('src/components/banners/AllSkincareSectionBanners6.tsx');
const source = fs.readFileSync(bannerFile, 'utf8');

const expectedLinks = [
  '/shop/skincare/anti-aging',
  '/shop/skincare/ocean-elixir',
  '/shop/skincare/facial-mask',
  '/shop/skincare/sheet-mask',
];

for (const href of expectedLinks) {
  if (!source.includes(`href="${href}"`)) {
    throw new Error(`Expected all-skincare banner tile to link to ${href}.`);
  }
}

const anchorCount = [...source.matchAll(/<a\b/g)].length;

if (anchorCount < expectedLinks.length) {
  throw new Error('Expected all four skincare banner tiles to be clickable anchors.');
}

console.log('All-skincare banner links are present.');
