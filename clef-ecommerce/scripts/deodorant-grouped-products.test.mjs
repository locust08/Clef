import fs from 'node:fs';
import path from 'node:path';

const groupedDataPath = path.resolve('src/lib/deodorant-groups.ts');
const groupPagePath = path.resolve('src/components/product/GroupedDeodorantProductPage.tsx');
const categoryPagePath = path.resolve('src/pages/personal-care/deodorant.tsx');
const productAPagePath = path.resolve(
  'src/pages/products/new-launch-all-in-one-deodorant-perfume-mist.tsx',
);
const productBPagePath = path.resolve(
  'src/pages/products/mix-match-any-2-deodorant-perfume-mist.tsx',
);

for (const requiredPath of [
  groupedDataPath,
  groupPagePath,
  categoryPagePath,
  productAPagePath,
  productBPagePath,
]) {
  if (!fs.existsSync(requiredPath)) {
    throw new Error(`Missing grouped deodorant file: ${requiredPath}`);
  }
}

const groupedData = fs.readFileSync(groupedDataPath, 'utf8');
const groupPage = fs.readFileSync(groupPagePath, 'utf8');
const categoryPage = fs.readFileSync(categoryPagePath, 'utf8');

for (const handle of [
  'fresh-camellia-pear-anti-perspirant-spray',
  'fresh-gardenia-ylang-ylang-anti-perspirant-spray',
  'bright-cypress-sandalwood-anti-odour-spray',
  'set-a-camellia-gardenia-cypress-anti-perspirant-spray',
  'set-b-mix-match-any-2-deodorant-perfume-mist',
]) {
  if (!groupedData.includes(handle)) {
    throw new Error(`Grouped deodorant data must include handle ${handle}.`);
  }
}

for (const sku of [
  'CLEF-DEO-FRESH-CAMELLIA-PEAR',
  'CLEF-DEO-FRESH-GARDENIA-YLANG',
  'CLEF-DEO-BRIGHT-CYPRESS-SANDALWOOD',
  'CLEF-DEO-SET-A-3PCS',
  'CLEF-DEO-SET-B-MIX-2',
]) {
  if (!groupedData.includes(sku)) {
    throw new Error(`Grouped deodorant data must include SKU ${sku}.`);
  }
}

for (const requiredText of [
  'Scent 1',
  'Scent 2',
  'bundle_type',
  'mix_and_match',
  'Shipping',
  'calculated at checkout.',
]) {
  if (!groupPage.includes(requiredText)) {
    throw new Error(`Grouped product page must include ${requiredText}.`);
  }
}

if (!groupPage.includes('Math.max(1')) {
  throw new Error('Quantity selector must prevent values below 1.');
}

if (!categoryPage.includes('getGroupedDeodorantCards')) {
  throw new Error('Deodorant category page must use grouped product cards.');
}

console.log('Grouped deodorant product contract is present.');
