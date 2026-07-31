import fs from 'node:fs';
import path from 'node:path';

const headerFile = path.resolve('src/components/headers/IndexSectionHeaders1.tsx');
const source = fs.readFileSync(headerFile, 'utf8');

const assets = [
  'home-promo-mega-saver.png',
  'home-promo-facial-serums.png',
  'home-promo-hydrating-masks.png',
  'home-promo-daily-essentials.png',
];

for (const asset of assets) {
  const assetFile = path.resolve('public/coleos-assets/banners', asset);
  if (!fs.existsSync(assetFile)) {
    throw new Error(`Expected promo carousel asset to exist: ${asset}`);
  }

  if (!source.includes(`/coleos-assets/banners/${asset}`)) {
    throw new Error(`Expected homepage promo carousel to reference ${asset}`);
  }
}

for (const oldUrl of [
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881',
  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b',
]) {
  if (source.includes(oldUrl)) {
    throw new Error(`Homepage promo carousel still includes old image URL: ${oldUrl}`);
  }
}

for (const expected of [
  'PromoCarouselCard',
  'AUTO_CHANGE_MS = 4500',
  'TRANSITION_MS = 700',
  'onMouseEnter',
  'onMouseLeave',
  'prefers-reduced-motion: reduce',
  'translate-x-6',
  'scale-105',
  'opacity-100',
  'opacity-0',
]) {
  if (!source.includes(expected)) {
    throw new Error(`Expected promo carousel implementation marker: ${expected}`);
  }
}

for (const previousDesignMarker of ['h-[236px]', 'object-cover']) {
  if (!source.includes(previousDesignMarker)) {
    throw new Error(
      `Expected previous promotion banner design marker: ${previousDesignMarker}`,
    );
  }
}

if (source.includes('style={{ aspectRatio }}')) {
  throw new Error('Promotion banners should not use image-driven card heights.');
}

for (const cmsMarker of [
  'content.promotionBanners',
  "cmsPromotionCards.length === 2",
  "promotionSource",
  "'payload'",
  "'controlled-fallback'",
]) {
  if (!source.includes(cmsMarker)) {
    throw new Error(`Expected Payload promotion carousel marker: ${cmsMarker}`);
  }
}

if (!source.includes('<PromoCarouselCard slides={card.slides} />')) {
  throw new Error('Expected the two-card renderer to receive Payload or fallback slides.');
}

const leftPairPattern =
  /leftPromoSlides[\s\S]*home-promo-facial-serums\.png[\s\S]*home-promo-hydrating-masks\.png/;
const rightPairPattern =
  /rightPromoSlides[\s\S]*home-promo-mega-saver\.png[\s\S]*home-promo-daily-essentials\.png/;

if (!leftPairPattern.test(source)) {
  throw new Error('Expected left promo card to rotate Facial Serums and Hydrating Masks.');
}

if (!rightPairPattern.test(source)) {
  throw new Error('Expected right promo card to rotate Mega Saver and Daily Essentials.');
}

console.log('Homepage promo carousel assets and behavior are configured.');
