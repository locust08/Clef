import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const read = (path) => readFileSync(join(root, path), 'utf8');

const assertIncludes = (source, needle, message) => {
  if (!source.includes(needle)) {
    throw new Error(message);
  }
};

const assertMatches = (source, pattern, message) => {
  if (!pattern.test(source)) {
    throw new Error(message);
  }
};

const medusaStore = read('src/lib/medusa-store.ts');
const medusaProducts = read('src/lib/medusa-products.ts');
const medusaCart = read('src/lib/medusa-cart.ts');
const favourites = read('src/context/FavouritesContext.tsx');
const customer = read('src/context/CustomerContext.tsx');
const searchPage = read('src/pages/search.tsx');
const checkoutPanel = read('src/components/checkout/CheckoutPanel.tsx');
const favouritesApi = read('src/pages/api/favourites.ts');

assertIncludes(
  medusaStore,
  "formatMyr = (amount: number) => `RM ${amount.toFixed(2)}`",
  'MYR prices must render as RM 49.00.',
);
assertIncludes(
  medusaStore,
  "'x-publishable-api-key'",
  'Store API requests must include the publishable key header.',
);
assertIncludes(
  medusaStore,
  "credentials: 'include'",
  'Store API requests must support credentials/cookies.',
);
assertIncludes(
  medusaProducts,
  'mapMedusaProduct',
  'Product mapping must be reusable.',
);
assertIncludes(
  medusaProducts,
  'getProductsByIds',
  'Favourites must fetch current product data by product IDs.',
);
assertIncludes(
  medusaProducts,
  'searchProducts',
  'Search must use a Medusa product query helper.',
);
assertIncludes(
  medusaStore,
  "CART_ID_STORAGE_KEY = 'clef_medusa_cart_id'",
  'Only the active Medusa cart ID should be stored in the browser.',
);
assertIncludes(
  medusaCart,
  'Math.max(1, quantity)',
  'Cart quantity updates must never go below one.',
);
assertIncludes(
  medusaCart,
  'clearStoredCartId()',
  'Invalid or completed carts must clear the saved cart ID.',
);
assertMatches(
  favourites,
  /Array\.from\(new Set\(/,
  'Favourites must de-duplicate product IDs.',
);
assertIncludes(
  favourites,
  'hasMergedGuestIds',
  'Guest favourites must merge into logged-in favourites once.',
);
assertIncludes(
  favouritesApi,
  '/store/customers/me',
  'Saved favourites API must verify the Medusa customer token.',
);
assertIncludes(
  favouritesApi,
  'DATABASE_URL',
  'Saved favourites API must use a server-side database URL.',
);
assertIncludes(
  customer,
  'normalizeEmail',
  'Registration and login must normalize email.',
);
assertIncludes(
  customer,
  'Password must be at least 8 characters.',
  'Registration must validate password requirements.',
);
assertIncludes(
  customer,
  'Passwords must match.',
  'Registration must validate matching passwords.',
);
assertIncludes(
  searchPage,
  'context.query.q',
  'Search results must be driven by the q query parameter.',
);
assertIncludes(
  searchPage,
  'No products matched your search.',
  'Search must render a no-results state.',
);
assertIncludes(
  checkoutPanel,
  'Your cart is empty',
  'Checkout must guard empty carts.',
);
assertIncludes(
  checkoutPanel,
  'no payment provider is configured',
  'Checkout must not fake successful payment when provider config is missing.',
);

console.log('storefront function regression checks passed');
