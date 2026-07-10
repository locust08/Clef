import fs from 'node:fs';
import path from 'node:path';

const helperPath = path.resolve('src/lib/medusa-cart.ts');

if (!fs.existsSync(helperPath)) {
  throw new Error('Missing Medusa cart helper: src/lib/medusa-cart.ts');
}

const helperSource = fs.readFileSync(helperPath, 'utf8');

for (const exportName of ['addMedusaLineItem', 'getMedusaCartId']) {
  if (!helperSource.includes(`export const ${exportName}`)) {
    throw new Error(`medusa-cart.ts must export ${exportName}.`);
  }
}

for (const requiredText of [
  'NEXT_PUBLIC_MEDUSA_BACKEND_URL',
  'NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY',
  'x-publishable-api-key',
  '/store/carts',
  '/line-items',
  'metadata',
  'currency_code',
  'myr',
]) {
  if (!helperSource.includes(requiredText)) {
    throw new Error(`Medusa cart helper must include ${requiredText}.`);
  }
}

if (helperSource.includes('/admin')) {
  throw new Error('Cart helper must not call Admin API routes.');
}

console.log('Medusa cart helper contract is present.');
