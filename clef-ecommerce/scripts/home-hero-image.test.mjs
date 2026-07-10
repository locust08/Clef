import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const headerFile = path.resolve('src/components/headers/IndexSectionHeaders1.tsx');
const assetFile = path.resolve('public/coleos-assets/headers/home-hero-clef-model.png');
const source = fs.readFileSync(headerFile, 'utf8');

if (!fs.existsSync(assetFile)) {
  throw new Error('Expected refined homepage hero image to exist in public assets.');
}

const dimensions = execFileSync(
  'powershell',
  [
    '-NoProfile',
    '-Command',
    `Add-Type -AssemblyName System.Drawing; $img=[System.Drawing.Image]::FromFile('${assetFile.replaceAll('\\', '\\\\')}'); "$($img.Width)x$($img.Height)"; $img.Dispose()`,
  ],
  { encoding: 'utf8' },
).trim();

if (dimensions !== '1449x1086') {
  throw new Error(`Expected high-resolution homepage hero image dimensions to be 1449x1086, got ${dimensions}.`);
}

if (!source.includes('/coleos-assets/headers/home-hero-clef-model.png')) {
  throw new Error('Expected homepage hero to use the refined local CLEF model image.');
}

if (source.includes('https://images.unsplash.com/photo-1556228578-8c89e6adf883')) {
  throw new Error('Homepage hero still uses the old Unsplash product image.');
}

if (!source.includes('object-contain')) {
  throw new Error('Homepage hero image should be contained instead of stretched or cropped.');
}

if (source.includes('bg-gray-100')) {
  throw new Error('Homepage hero should not use the cool gray background behind the transparent product image.');
}

if (!source.includes('bg-[#F7F1EA]')) {
  throw new Error('Homepage hero should use a warm neutral background behind the transparent product image.');
}

if (!source.includes('max-w-none') || !source.includes('xl:w-[720px]')) {
  throw new Error('Homepage hero image should render at an HD-friendly size without max-width clipping.');
}

console.log('Homepage hero image is configured.');
