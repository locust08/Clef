import * as migration_20260715_054737_initial_cloudflare_d1 from './20260715_054737_initial_cloudflare_d1';
import * as migration_20260716_015539_all_products_pages from './20260716_015539_all_products_pages';
import * as migration_20260731_033318_enable_drafts_live_preview from './20260731_033318_enable_drafts_live_preview';

export const migrations = [
  {
    up: migration_20260715_054737_initial_cloudflare_d1.up,
    down: migration_20260715_054737_initial_cloudflare_d1.down,
    name: '20260715_054737_initial_cloudflare_d1',
  },
  {
    up: migration_20260716_015539_all_products_pages.up,
    down: migration_20260716_015539_all_products_pages.down,
    name: '20260716_015539_all_products_pages',
  },
  {
    up: migration_20260731_033318_enable_drafts_live_preview.up,
    down: migration_20260731_033318_enable_drafts_live_preview.down,
    name: '20260731_033318_enable_drafts_live_preview'
  },
];
