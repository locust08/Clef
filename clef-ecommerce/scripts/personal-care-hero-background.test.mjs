import fs from 'node:fs';
import path from 'node:path';

const pageFile = path.resolve('src/pages/all-personal-care.tsx');
const headerFile = path.resolve('src/components/headers/AllSkincareSectionHeaders1.tsx');
const assetFile = path.resolve('public/coleos-assets/headers/personal-care-hero.png');

const pageSource = fs.readFileSync(pageFile, 'utf8');
const headerSource = fs.readFileSync(headerFile, 'utf8');

if (!fs.existsSync(assetFile)) {
  throw new Error('Expected personal care hero background image to exist in public assets.');
}

if (!headerSource.includes('backgroundImage')) {
  throw new Error('Expected shared header to support a dynamic backgroundImage prop.');
}

if (!pageSource.includes('backgroundImage="/coleos-assets/headers/personal-care-hero.png"')) {
  throw new Error('Expected personal care page to pass the dedicated hero background image.');
}

console.log('Personal care hero background image is configured.');
