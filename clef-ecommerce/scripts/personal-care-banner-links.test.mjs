import fs from 'node:fs';
import path from 'node:path';

const pageFile = path.resolve('src/pages/all-personal-care.tsx');
const bannerFile = path.resolve('src/components/banners/AllPersonalCareSectionBanners6.tsx');

if (!fs.existsSync(bannerFile)) {
  throw new Error('Expected personal care subcategory banner component to exist.');
}

const pageSource = fs.readFileSync(pageFile, 'utf8');
const bannerSource = fs.readFileSync(bannerFile, 'utf8');
const combined = `${pageSource}\n${bannerSource}`;

for (const expected of [
  'AllPersonalCareSectionBanners6',
  '/shop/personal-care/deodorant',
  '/shop/personal-care/sunscreen',
  '/shop/personal-care/bath-gel',
  '/shop/personal-care/lotion',
  'Deodorant',
  'Sunscreen',
  'Bath Gel',
  'Lotion',
  'NEW LAUNCH',
]) {
  if (!combined.includes(expected)) {
    throw new Error(`Expected personal care banner content to include ${expected}.`);
  }
}

for (const typo of ['Sunnscreen', 'Lotiion']) {
  if (combined.includes(typo)) {
    throw new Error(`Unexpected typo found in personal care banner content: ${typo}.`);
  }
}

const productGridIndex = pageSource.indexOf('<ProductGrid');
const bannerIndex = pageSource.indexOf('<AllPersonalCareSectionBanners6');
const footerIndex = pageSource.indexOf('<Footer');

if (productGridIndex === -1 || bannerIndex === -1 || footerIndex === -1) {
  throw new Error('Expected product grid, personal care banner, and footer to be rendered.');
}

if (!(productGridIndex < bannerIndex && bannerIndex < footerIndex)) {
  throw new Error('Expected personal care banner to render after product grid and before footer.');
}

console.log('Personal care subcategory banner links and placement are present.');
