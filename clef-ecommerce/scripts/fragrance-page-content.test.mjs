import fs from 'node:fs';
import path from 'node:path';

const files = [
  'src/components/headers/FragranceSectionHeaders3.tsx',
  'src/components/product-blocks/FragranceSectionProductBlocks4.tsx',
  'src/components/banners/FragranceSectionBanners5.tsx',
];

const combined = files
  .map((file) => fs.readFileSync(path.resolve(file), 'utf8'))
  .join('\n');

for (const expected of [
  'awaken your sense of ritual',
  'Live a little and your life will come alive',
  'https://www.youtube.com/embed/_9VUPq3SxOc',
  'Rose Collection',
  '/shop/fragrance/rose-collection',
  'Little Delights Collection',
  '/shop/fragrance/little-delights-collection',
]) {
  if (!combined.includes(expected)) {
    throw new Error(`Expected fragrance page content to include ${expected}.`);
  }
}

for (const removed of [
  'White Label Cap',
  'Summer Slim Shorts',
  'Brown Original Jacket',
  'https://www.w3schools.com/html/mov_bbb.mp4',
]) {
  if (combined.includes(removed)) {
    throw new Error(`Fragrance page still contains placeholder content: ${removed}.`);
  }
}

console.log('Fragrance page official content and collection links are present.');
