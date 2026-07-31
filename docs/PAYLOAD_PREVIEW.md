# Payload Draft, Preview, and Live Preview

## Architecture

Payload 3.86 stores published records in the primary D1 tables and draft/autosave
revisions in the generated version tables. Public REST reads are constrained to
`_status=published`; globals explicitly reject public `draft=true` reads.

The Payload Admin generates a five-minute HMAC grant only for an authenticated
editor. The grant contains `path`, `expires`, and `signature`, but never the
shared secret or the editor's Payload token. The storefront validates the grant
and enables Next.js Pages Router Preview Mode. While Preview Mode is active,
server-side CMS fetches add `draft=true` and authenticate to Payload with the
server-only `PREVIEW_SECRET` header. Public query parameters cannot activate
draft fetching.

Preview pages use private `no-store` caching and a separate URL/cache key from
published reads. Next's Preview Mode cookies are encrypted, HTTP-only, SameSite
Lax, and secure in production. The preview bar exits through
`/api/exit-preview`, which clears the cookies and permits only local redirects.

Payload Live Preview loads the same protected preview entry URL in an iframe.
The storefront listens for Payload document events with
`@payloadcms/live-preview`, verifies the exact Payload origin, and refreshes the
current route after draft save, autosave, or publish.

## Route map

| Payload entity | Storefront preview route |
| --- | --- |
| Homepage global, promotion banners, homepage sections | `/` |
| Video Section global | `/` (canonical) |
| Footer global | `/` (canonical) |
| All Products Pages global | `/all-skincare` (canonical); other rendered tabs are `/all-personal-care` and `/fragrance` |
| Category Page collection | `/shop/{parentCategory}/{slug}` |
| CLEF Edit Article collection | `/clef-edit/{slug}` |

Media is an asset collection and is not independently previewed or versioned.
Medusa product and price loading remains unchanged.

## Environment variables

Server-only:

- `PREVIEW_SECRET` — at least 32 random characters; the same value must be
  available to the Payload and storefront Workers. Never prefix it with
  `NEXT_PUBLIC_`.
- `PAYLOAD_SECRET` — existing Payload authentication secret.

Non-secret origins:

- `PAYLOAD_PUBLIC_SERVER_URL` — canonical Payload origin.
- `PAYLOAD_ADMIN_ORIGIN` — exact Payload Admin origin allowed to frame the
  storefront.
- `STOREFRONT_URL` — exact storefront origin used for Preview URLs and Payload's
  iframe policy.
- `NEXT_PUBLIC_PAYLOAD_URL` — Payload origin used by the storefront for media
  and origin-checked Live Preview messages.
- `PAYLOAD_ALLOWED_ORIGINS` — comma-separated explicit additional origins.

Local defaults are `http://localhost:3001` for Payload and
`http://localhost:3000` for the storefront. Production origins must be HTTPS and
credential-free. Doppler is the source of truth for `PREVIEW_SECRET`; synchronize
it to both Workers with `wrangler secret put PREVIEW_SECRET` via stdin.

## Development

```powershell
doppler run -p locus-t-ai-backend -c dev -- npm run dev:local
```

Then sign in at `http://localhost:3001/admin`, edit a supported entity, save a
draft, and use Preview or Live Preview. Public requests to
`http://localhost:3000` remain published-only. Use the on-page **Exit preview**
control to return to published content.

## Migration

The named migration is
`20260731_033318_enable_drafts_live_preview`. It adds `_status` columns, indexes,
and version tables for the two rendered collections and four rendered globals.
Existing rows are explicitly migrated as `published`.

Before production:

1. Record both active Worker version IDs.
2. Run `wrangler d1 time-travel info clef-payload-db --json` and retain the
   bookmark.
3. Export D1 with
   `wrangler d1 export clef-payload-db --remote --output <backup.sql>`.
4. Hash the export and import it into isolated local Wrangler persistence.
5. Apply the Payload migration to the isolated clone and confirm row counts,
   published statuses, six root version tables, and an empty
   `PRAGMA foreign_key_check`.
6. Run the production migration once with
   `doppler run -p locus-t-ai-backend -c prd -- npm run cf:migrate:apply`.

Never use `migrate:fresh`, `migrate:reset`, `DROP`, or `TRUNCATE` against
production.

## Deployment

From each app directory:

```powershell
doppler run -p locus-t-ai-backend -c prd -- npm ci
doppler run -p locus-t-ai-backend -c prd -- npm test
doppler run -p locus-t-ai-backend -c prd -- npm run cf:build
doppler run -p locus-t-ai-backend -c prd -- npx wrangler deploy
```

Safe order: deploy and smoke-test `clef-ecommerce`; apply the verified D1
migration once; deploy `clef-payload-preview`; then repeat storefront smoke and
security checks. Do not modify the Medusa Worker or its bindings.

## Verification checklist

- Admin login and refresh retain the secure session.
- Collections/globals and R2 media load.
- Save Draft and autosave create version history without changing public output.
- Preview opens the mapped route and displays the latest draft.
- Live Preview refreshes after draft save, autosave, and publish.
- Exit Preview clears preview cookies and published content returns.
- Restore Version is present and can restore a prior revision.
- Public and `?draft=true` requests cannot retrieve unpublished content.
- Invalid and missing Preview grants return 403; external redirects return 400.
- Storefront CSP `frame-ancestors` names only the approved Payload origin.
- Payload CORS/CSRF and iframe `frame-src` use explicit origins.
- Preview responses are private/no-store; published Homepage responses retain
  their CDN cache policy.
- No secret appears in HTML, client bundles, source maps, responses, or logs.
- Storefront and Medusa product behavior remain healthy.

## Rollback

Worker rollback does not revert D1. If code rollback is sufficient:

```powershell
npx wrangler rollback <storefront-version-id> --config clef-ecommerce/wrangler.jsonc --message "Rollback Payload Preview"
npx wrangler rollback <payload-version-id> --config clef-payload/wrangler.jsonc --message "Rollback Payload Preview"
```

If the schema must also be restored, first stop writes and record a fresh export
and bookmark. Then use the pre-migration bookmark:

```powershell
npx wrangler d1 time-travel restore clef-payload-db --bookmark=<pre-migration-bookmark>
```

This restore overwrites D1 in place and is destructive, so it requires an
explicit incident decision. The SQL export is the independent readable backup;
retain it even when Time Travel is available. After D1 restoration, roll both
Workers back to their recorded pre-deployment versions and run the public,
Admin, R2, and Medusa smoke checks again.

## Known limitations

- Server-side Live Preview updates after autosave/save/publish rather than on
  every keystroke.
- The All Products Pages global has one canonical Preview button; editors visit
  the documented Personal Care or Fragrance route when reviewing those tabs.
- Version history begins when this migration is enabled; content created before
  migration remains published but has no historical revisions.
