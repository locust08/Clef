import fs from 'node:fs';
import path from 'node:path';

const requiredPageFiles = [
  'src/pages/index.tsx',
  'src/pages/shop/[category].tsx',
  'src/pages/shop/[category]/[subcategory].tsx',
  'src/pages/search.tsx',
  'src/pages/product/[handle].tsx',
  'src/pages/payments.tsx',
  'src/pages/summary.tsx',
  'src/pages/login.tsx',
  'src/pages/account/index.tsx',
  'src/pages/account/history.tsx',
  'src/pages/account/orders/[id].tsx',
  'src/pages/account/favourite.tsx',
  'src/pages/clef-edit.tsx',
  'src/pages/clef-edit/[slug].tsx',
  'src/pages/clef-info.tsx',
  'src/pages/404.tsx',
];

const reusableComponents = [
  'src/components/layout/Header.tsx',
  'src/components/layout/PromoBanner.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/layout/SearchBar.tsx',
  'src/components/layout/LanguageSwitcher.tsx',
  'src/components/layout/CartDrawer.tsx',
  'src/components/product/ProductCard.tsx',
  'src/components/product/ProductGrid.tsx',
  'src/components/product/ProductGallery.tsx',
  'src/components/product/ProductInfo.tsx',
  'src/components/account/LoginRegisterForm.tsx',
  'src/components/account/AccountDashboard.tsx',
  'src/components/account/OrderHistory.tsx',
  'src/components/account/FavouriteList.tsx',
];

const missing = [
  ...requiredPageFiles,
  ...reusableComponents,
  'src/data/category-config.ts',
  'src/data/mock-products.ts',
]
  .filter((file) => !fs.existsSync(path.resolve(file)));

if (missing.length) {
  throw new Error(`Missing required route/component files:\n${missing.join('\n')}`);
}

const productData = fs.readFileSync(path.resolve('src/data/mock-products.ts'), 'utf8');

const requiredSubcategories = {
  skincare: ['anti-aging', 'ocean-elixir', 'sheet-mask', 'facial-mask'],
  'personal-care': ['sunscreen', 'lotion', 'bath-gel', 'deodorant'],
  fragrance: ['rose-collection', 'little-delights-collection'],
};

for (const [category, subcategories] of Object.entries(requiredSubcategories)) {
  for (const subcategory of subcategories) {
    const matches = [
      ...productData.matchAll(
        new RegExp(
          `category:\\s*['"]${category}['"][\\s\\S]*?subcategory:\\s*['"]${subcategory}['"]`,
          'g',
        ),
      ),
    ];

    if (matches.length !== 3) {
      throw new Error(
        `Expected exactly 3 mock products for ${category}/${subcategory}, found ${matches.length}.`,
      );
    }
  }
}

for (const field of [
  'id',
  'handle',
  'name',
  'category',
  'subcategory',
  'price',
  'salePrice',
  'image',
  'description',
  'isBestSeller',
  'isNewLaunch',
]) {
  if (!productData.includes(`${field}:`)) {
    throw new Error(`Mock products are missing the "${field}" field.`);
  }
}

console.log('Route structure and mock product data contract are present.');
