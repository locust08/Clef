import fs from 'node:fs';
import path from 'node:path';

const pageFile = path.resolve('src/pages/fragrance.tsx');
const headerFile = path.resolve('src/components/headers/AllSkincareSectionHeaders1.tsx');

const pageSource = fs.readFileSync(pageFile, 'utf8');
const headerSource = fs.readFileSync(headerFile, 'utf8');

for (const expected of [
  'AllSkincareSectionCustomComponents3',
  'AllSkincareSectionNavigations2',
  'AllSkincareSectionHeaders1',
  'fragranceHeaderPlaceholders',
  '[1, 2, 3].map',
  'backgroundImage="/coleos-assets/headers/bg-image3.png"',
  'products={fragranceHeaderPlaceholders}',
]) {
  if (!pageSource.includes(expected)) {
    throw new Error(`Expected fragrance page shared-header marker: ${expected}`);
  }
}

for (const removed of [
  "import FragranceSectionCustomComponents7",
  "import FragranceSectionHeaders3",
  '<FragranceSectionCustomComponents7',
  '<FragranceSectionHeaders3',
]) {
  if (pageSource.includes(removed)) {
    throw new Error(`Fragrance page still renders old header path: ${removed}`);
  }
}

for (const expected of [
  "product.handle === '#' ? '#' : `/product/${product.handle}`",
  "product.name || 'Top product placeholder'",
]) {
  if (!headerSource.includes(expected)) {
    throw new Error(`Expected shared header placeholder behavior: ${expected}`);
  }
}

console.log('Fragrance page uses the shared header with three blank top-product placeholders.');
