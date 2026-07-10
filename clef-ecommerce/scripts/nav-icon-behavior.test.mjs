import fs from 'node:fs';
import path from 'node:path';

const customHeaderFiles = [
  'AccountSectionCustomComponents1.tsx',
  'AllSkincareSectionCustomComponents3.tsx',
  'BySkincareSectionCustomComponents1.tsx',
  'ClefEditSectionCustomComponents1.tsx',
  'ClefInfoSectionCustomComponents1.tsx',
  'FavouriteSectionCustomComponents2.tsx',
  'FragranceSectionCustomComponents7.tsx',
  'HistorySectionCustomComponents3.tsx',
  'IndexSectionCustomComponents7.tsx',
  'LoginSectionCustomComponents2.tsx',
  'PaymentSectionCustomComponents3.tsx',
  'ProductsSectionCustomComponents1.tsx',
  'SearchSectionCustomComponents1.tsx',
  'SummarySectionCustomComponents3.tsx',
].map((file) => path.resolve('src/components/custom-components', file));

const requiredFiles = [
  'src/components/layout/HeaderIconActions.tsx',
  'src/context/MockCartContext.tsx',
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.resolve(file)));

if (missing.length) {
  throw new Error(`Missing shared navigation behavior files:\n${missing.join('\n')}`);
}

const appSource = fs.readFileSync(path.resolve('src/pages/_app.tsx'), 'utf8');

if (!appSource.includes('MockCartProvider')) {
  throw new Error('Expected _app.tsx to include MockCartProvider.');
}

const contextSource = fs.readFileSync(path.resolve('src/context/MockCartContext.tsx'), 'utf8');

for (const expected of ['GlobalCartDrawer', 'localStorage', 'addItem', 'openCart']) {
  if (!contextSource.includes(expected)) {
    throw new Error(`Expected MockCartContext.tsx to include ${expected}.`);
  }
}

for (const file of customHeaderFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const label = path.relative(process.cwd(), file);

  if (!source.includes('HeaderIconActions')) {
    throw new Error(`${label} must render shared HeaderIconActions.`);
  }

  if (source.includes('group relative inline-block mr-6" href="#"')) {
    throw new Error(`${label} still has a placeholder cart link.`);
  }

  if (source.includes('inline-block mr-6 text-coolGray-400 hover:text-coolGray-600" href="#"')) {
    throw new Error(`${label} still has a placeholder icon link.`);
  }

  if (source.includes('inline-block mr-10 text-coolGray-400 hover:text-coolGray-600" href="#"')) {
    throw new Error(`${label} still has a placeholder account link.`);
  }
}

const actionsSource = fs.readFileSync(path.resolve('src/components/layout/HeaderIconActions.tsx'), 'utf8');

for (const expected of [
  '/account/favourite',
  '/account',
  '/search',
  '/login',
  'accountHref',
  'openCart',
]) {
  if (!actionsSource.includes(expected)) {
    throw new Error(`HeaderIconActions must include ${expected}.`);
  }
}

for (const removed of ['Open account options', 'isAccountOpen', 'Create Account']) {
  if (actionsSource.includes(removed)) {
    throw new Error(`HeaderIconActions should route the account icon directly, not render ${removed}.`);
  }
}

console.log('Navigation icon behavior contract is present.');
