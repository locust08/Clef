import * as migration_20260715_054737_initial_cloudflare_d1 from './20260715_054737_initial_cloudflare_d1';
import * as migration_20260716_015539_all_products_pages from './20260716_015539_all_products_pages';

export const migrations = [
  {
    up: migration_20260715_054737_initial_cloudflare_d1.up,
    down: migration_20260715_054737_initial_cloudflare_d1.down,
    name: '20260715_054737_initial_cloudflare_d1',
  },
  {
    up: migration_20260716_015539_all_products_pages.up,
    down: migration_20260716_015539_all_products_pages.down,
    name: '20260716_015539_all_products_pages'
  },
];
