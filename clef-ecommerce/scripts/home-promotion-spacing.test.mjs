import fs from 'node:fs';
import path from 'node:path';

const headerFile = path.resolve('src/components/headers/IndexSectionHeaders1.tsx');
const source = fs.readFileSync(headerFile, 'utf8');

if (source.includes('transform -translate-y-24')) {
  throw new Error('Homepage promotion cards should not be pulled upward over the hero header.');
}

if (!source.includes('className="pt-8 pb-12"')) {
  throw new Error('Homepage promotion cards should use normal top and bottom spacing below the hero.');
}

console.log('Homepage promotion section spacing is configured.');
