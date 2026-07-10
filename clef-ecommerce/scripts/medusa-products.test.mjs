import fs from 'node:fs';
import path from 'node:path';

const helperPath = path.resolve('src/lib/medusa-products.ts');
const clientPath = path.resolve('src/lib/medusa.ts');

if (!fs.existsSync(helperPath)) {
  throw new Error('Missing Medusa product helper: src/lib/medusa-products.ts');
}

const helperSource = fs.readFileSync(helperPath, 'utf8');
const clientSource = fs.readFileSync(clientPath, 'utf8');

for (const exportName of [
  'getProducts',
  'getProductByHandle',
  'getProductsByHandles',
  'getCategories',
  'getCategoryByHandle',
  'getProductsByCategoryHandle',
]) {
  if (!helperSource.includes(`export const ${exportName}`)) {
    throw new Error(`medusa-products.ts must export ${exportName}.`);
  }
}

for (const requiredStoreApiCall of [
  'sdk.store.product.list',
  'sdk.store.category.list',
  'sdk.store.region.list',
]) {
  if (!helperSource.includes(requiredStoreApiCall)) {
    throw new Error(`medusa-products.ts must use Store API call ${requiredStoreApiCall}.`);
  }
}

for (const requiredField of ['variants', 'images', 'categories', 'calculated_price']) {
  if (!helperSource.includes(requiredField)) {
    throw new Error(`Product requests must include ${requiredField}.`);
  }
}

if (helperSource.includes('/admin') || clientSource.includes('/admin')) {
  throw new Error('Storefront Medusa code must not call Admin API routes.');
}

if (!clientSource.includes('NEXT_PUBLIC_MEDUSA_BACKEND_URL')) {
  throw new Error('Medusa client must read NEXT_PUBLIC_MEDUSA_BACKEND_URL.');
}

if (!clientSource.includes('NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY')) {
  throw new Error('Medusa client must read NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY.');
}

if (!helperSource.includes('region_id')) {
  throw new Error('Product requests with calculated prices must include a Store API region_id.');
}

if (!helperSource.includes('currency_code') || !helperSource.includes('myr')) {
  throw new Error('Product helper must prefer the MYR Store API region.');
}

if (helperSource.includes('?? undefined')) {
  throw new Error('Server-side product props must use null instead of undefined for JSON serialization.');
}

if (!helperSource.includes('compareAtPrice: variantPrice.compareAtAmount ?? null')) {
  throw new Error('Variant compareAtPrice props must use null instead of undefined for JSON serialization.');
}

if (!helperSource.includes('compareAtPriceDisplay: variantPrice.compareAtDisplay ?? null')) {
  throw new Error('Variant compareAtPriceDisplay props must use null instead of undefined for JSON serialization.');
}

console.log('Medusa product helper contract is present.');
