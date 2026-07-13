# CLEF Pre-Deployment Checklist

## Required environment variables

### clef-ecommerce

- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_PAYLOAD_URL`
- `DATABASE_URL`
- `FAVOURITES_DATABASE_SCHEMA`

### clef-medusa/apps/backend

- `DATABASE_URL`
- `DATABASE_SCHEMA`
- `STORE_CORS`
- `ADMIN_CORS`
- `AUTH_CORS`
- `JWT_SECRET`
- `COOKIE_SECRET`
- `REDIS_URL`
- payment provider variables required by the enabled Medusa provider

### clef-payload

- `PAYLOAD_DATABASE_URL`
- `PAYLOAD_DATABASE_SCHEMA`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_ADDRESS`
- `SMTP_FROM_NAME`
- `SMTP_SKIP_VERIFY`

## Local commands

- Root all-app dev: `npm run dev`
- Storefront dev: `npm --prefix clef-ecommerce run dev`
- Storefront type check: `npm --prefix clef-ecommerce run type-check`
- Storefront lint: `npm --prefix clef-ecommerce run lint`
- Storefront build: `npm --prefix clef-ecommerce run build`
- Medusa dev: `npm --prefix clef-medusa/apps/backend run dev`
- Medusa build: `npm --prefix clef-medusa/apps/backend run build`
- Medusa unit tests: `npm --prefix clef-medusa/apps/backend run test:unit`
- Payload dev: `npm --prefix clef-payload run dev`
- Payload build: `npm --prefix clef-payload run build`

## Migration commands

- Apply custom favourites SQL to the Supabase database before production launch:
  `psql "%DATABASE_URL%" -f clef-medusa/apps/backend/src/migration-scripts/20260710_create_user_favourites.sql`
- Do not run destructive migrations against production.

## Medusa Admin checks

- Malaysia/MYR region exists and is active.
- Storefront publishable API key is active.
- Sales channel is attached to visible products.
- Products have variants, prices, thumbnails, categories, and inventory/purchasability.
- Shipping options exist for the MYR region.
- A real payment provider is installed and enabled before checkout completion is exposed.

## Payment checks

- Do not expose secret keys in `clef-ecommerce`.
- Configure provider secrets only in Medusa/deployment server env.
- Use the provider secure browser component, such as Stripe Elements, when provider setup is added.
- Verify payment success through Medusa/order lookup before showing `/summary` order details.

## Supabase checks

- `DATABASE_URL` remains server-side.
- `user_favourites` exists in the configured schema.
- Medusa-owned product, cart, customer, order, and payment data are written only through Medusa APIs.

## Payload checks

- Admin opens at the configured `NEXT_PUBLIC_SERVER_URL`.
- Homepage, category, footer, video, and media content load from Payload.
- SMTP is configured before forgot-password emails are expected to work.

## Cloudflare/deployment checks

- No production runtime depends on a hard-coded localhost URL.
- `STORE_CORS` and `AUTH_CORS` include the production storefront origin.
- Cookies and callback URLs use HTTPS production origins.
- Static export is not enabled for the storefront because API routes and server rendering are required.

## Final browser checklist

- Homepage loads without console errors.
- Product cards open real Medusa product pages.
- Favourites add/remove, survive refresh, and merge after login.
- Cart add/update/remove works and cart count updates immediately.
- Search preserves `/search?q=...` on refresh and returns Medusa products.
- Register, login, logout, and account redirect states work.
- Checkout blocks empty carts and does not claim payment success without a configured provider.
