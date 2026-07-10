import fs from 'node:fs';
import path from 'node:path';

const pageFile = path.resolve('src/pages/all-personal-care.tsx');
const source = fs.readFileSync(pageFile, 'utf8');

for (const expected of [
  'AllSkincareSectionCustomComponents3',
  'AllSkincareSectionNavigations2',
  'AllSkincareSectionHeaders1',
  'bg-[#F5E9D6]',
  'bg-[#F7F1EA]',
  'Personal Care Malaysia',
  'getCategoryProductsProps',
]) {
  if (!source.includes(expected)) {
    throw new Error(`Expected personal care page to use all-skincare design marker: ${expected}`);
  }
}

if (source.includes('bg-white py-16')) {
  throw new Error('Personal care page still uses the simplified white section instead of all-skincare styling.');
}

console.log('Personal care page follows the all-skincare design structure.');
