import type { StorefrontProduct } from './medusa-products';

export const PRODUCT_A_HANDLE = 'new-launch-all-in-one-deodorant-perfume-mist';
export const PRODUCT_B_HANDLE = 'mix-match-any-2-deodorant-perfume-mist';

export const PRODUCT_A_TITLE =
  '[NEW LAUNCH] All in One Deodorant & Perfume Mist for underarms & feet';

export const PRODUCT_B_TITLE =
  '[Mix & Match Any 2] All in One Deodorant & Perfume Mist for underarms & feet';

export const PRODUCT_A_ITEMS = [
  {
    label: 'FRESH Camellia & Pear Anti-Perspirant Spray',
    shortLabel: 'FRESH Camellia & Pear Anti-Perspirant Spray',
    handle: 'fresh-camellia-pear-anti-perspirant-spray',
    sku: 'CLEF-DEO-FRESH-CAMELLIA-PEAR',
  },
  {
    label: 'FRESH Gardenia & Ylang Ylang Anti-Perspirant Spray',
    shortLabel: 'FRESH Gardenia & Ylang Ylang Anti-Perspirant Spray',
    handle: 'fresh-gardenia-ylang-ylang-anti-perspirant-spray',
    sku: 'CLEF-DEO-FRESH-GARDENIA-YLANG',
  },
  {
    label: 'BRIGHT Cypress & Sandalwood Anti-Odour Spray',
    shortLabel: 'BRIGHT Cypress & Sandalwood Anti-Odour Spray',
    handle: 'bright-cypress-sandalwood-anti-odour-spray',
    sku: 'CLEF-DEO-BRIGHT-CYPRESS-SANDALWOOD',
  },
  {
    label: '1 Camellia + 1 Garden + 1 Cypress',
    shortLabel: '1 Camellia + 1 Garden + 1 Cypress',
    handle: 'set-a-camellia-gardenia-cypress-anti-perspirant-spray',
    sku: 'CLEF-DEO-SET-A-3PCS',
  },
] as const;

export const PRODUCT_B_ITEM = {
  handle: 'set-b-mix-match-any-2-deodorant-perfume-mist',
  sku: 'CLEF-DEO-SET-B-MIX-2',
} as const;

export const MIX_AND_MATCH_SCENTS = PRODUCT_A_ITEMS.slice(0, 3).map((item) => ({
  label: item.label,
  sku: item.sku,
}));

export const getProductAHandles = () =>
  PRODUCT_A_ITEMS.map((item) => item.handle);

export const getProductBHandles = () => [PRODUCT_B_ITEM.handle];

export const getGroupedDeodorantCards = (products: StorefrontProduct[]) => {
  const byHandle = new Map(products.map((product) => [product.handle, product]));
  const productAProducts = PRODUCT_A_ITEMS.map((item) =>
    byHandle.get(item.handle),
  ).filter((product): product is StorefrontProduct => Boolean(product));
  const productB = byHandle.get(PRODUCT_B_ITEM.handle);
  const productA = productAProducts[0];

  return [
    {
      id: PRODUCT_A_HANDLE,
      handle: PRODUCT_A_HANDLE,
      name: PRODUCT_A_TITLE,
      description:
        productA?.description ??
        'Choose your deodorant and perfume mist scent for underarms and feet.',
      priceDisplay: productA?.priceDisplay ?? 'MYR49.00',
      compareAtPriceDisplay: productA?.compareAtPriceDisplay,
      image: productA?.image ?? '',
      href: `/products/${PRODUCT_A_HANDLE}`,
      badge: 'New',
    },
    {
      id: PRODUCT_B_HANDLE,
      handle: PRODUCT_B_HANDLE,
      name: PRODUCT_B_TITLE,
      description:
        productB?.description ??
        'Mix and match any two deodorant and perfume mist sprays.',
      priceDisplay: productB?.priceDisplay ?? 'MYR66.00',
      compareAtPriceDisplay: productB?.compareAtPriceDisplay,
      image: productB?.image ?? productA?.image ?? '',
      href: `/products/${PRODUCT_B_HANDLE}`,
      badge: 'Bundle',
    },
  ];
};
