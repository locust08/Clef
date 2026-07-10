import fs from 'node:fs';
import path from 'node:path';

const routeFile = 'src/pages/shop/[category]/[subcategory].tsx';
const configFile = 'src/data/category-config.ts';
const productFile = 'src/data/mock-products.ts';
const navigationFile = 'src/components/navigations/BySkincareSectionNavigations4.tsx';

const requiredSubcategories = {
  skincare: ['anti-aging', 'ocean-elixir', 'sheet-mask', 'facial-mask'],
  'personal-care': ['sunscreen', 'lotion', 'bath-gel', 'deodorant'],
  fragrance: ['rose-collection', 'little-delights-collection'],
};

for (const file of [routeFile, configFile, productFile, navigationFile]) {
  if (!fs.existsSync(path.resolve(file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const routeSource = fs.readFileSync(path.resolve(routeFile), 'utf8');
const configSource = fs.readFileSync(path.resolve(configFile), 'utf8');
const productSource = fs.readFileSync(path.resolve(productFile), 'utf8');
const navigationSource = fs.readFileSync(path.resolve(navigationFile), 'utf8');

for (const [category, subcategories] of Object.entries(requiredSubcategories)) {
  if (!configSource.includes(`'${category}'`)) {
    throw new Error(`category-config.ts is missing category ${category}.`);
  }

  for (const subcategory of subcategories) {
    const href = `/shop/${category}/${subcategory}`;

    if (!configSource.includes(`'${subcategory}'`)) {
      throw new Error(`category-config.ts is missing subcategory ${subcategory}.`);
    }

    const productPattern = new RegExp(
      `category:\\s*['"]${category}['"][\\s\\S]*?subcategory:\\s*['"]${subcategory}['"]`,
      'g',
    );
    const products = [...productSource.matchAll(productPattern)];

    if (products.length !== 3) {
      throw new Error(`Expected exactly 3 products for ${category}/${subcategory}, found ${products.length}.`);
    }
  }
}

for (const expected of [
  'categoryConfig.subcategories.map',
  'getSubcategoryHref',
  'activeSubcategory',
  'aria-current',
]) {
  if (!navigationSource.includes(expected)) {
    throw new Error(`By-skincare navigation must be data-driven and include ${expected}.`);
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
  if (!productSource.includes(`${field}:`)) {
    throw new Error(`Mock products are missing the "${field}" field.`);
  }
}

const imageMatches = [...productSource.matchAll(/image:\s*['"]([^'"]+)['"]/g)];

for (const [, imagePath] of imageMatches) {
  if (!imagePath.startsWith('/')) {
    throw new Error(`Product image must be a public absolute path: ${imagePath}`);
  }

  if (!fs.existsSync(path.resolve('public', imagePath.slice(1)))) {
    throw new Error(`Product image does not exist: ${imagePath}`);
  }
}

for (const expected of ['getSubcategoryProductsProps', 'BySkincare']) {
  if (!routeSource.includes(expected)) {
    throw new Error(`Dynamic subcategory route must use ${expected}.`);
  }
}

const categoryPageSource = fs.readFileSync(
  path.resolve('src/lib/category-page.ts'),
  'utf8',
);

for (const expected of [
  'getCategoryConfig',
  'getSubcategoryConfig',
  'getProductsByCategoryHandle',
]) {
  if (!categoryPageSource.includes(expected)) {
    throw new Error(`Category page helper must use ${expected}.`);
  }
}

console.log('Subcategory route contract is present.');
