# Clef Cloudflare deployment status

Last updated: 2026-07-15 (Asia/Kuala_Lumpur).

## Deployed

- Payload preview runs as the domainless Worker `clef-payload-preview` at `https://clef-payload-preview.easondev.workers.dev`.
- It is bound directly to D1 `clef-payload-db` and R2 `clef-payload-media`.
- No custom domain has been attached.

## Medusa prepared

- The separate Worker/Container service is named `clef-medusa` and uses only its `workers.dev` route.
- Medusa production configuration uses `DATABASE_URL`. `SUPABASE_HYPERDRIVE_ORIGIN_URL` is not referenced or required.
- Redis requires the existing TLS `rediss://` connection.
- The local production container image builds successfully from `clef-medusa/Dockerfile`.
- The runtime is configured for the existing `clef_medusa` PostgreSQL schema and runs `medusa db:migrate` before startup.
- Medusa media uses R2 bucket `clef-medusa-media` and the Doppler `R2_ENDPOINT`.
- The Worker mints seven-day R2 temporary credentials restricted to Object Read & Write on `clef-medusa-media`; the container receives the temporary access key, secret, and session token.
- The broad `R2_SECRET_ACCESS_KEY` and `CLOUDFLARE_BROWSER_RENDERING_TOKEN` are not stored in or injected into this Worker/Container.
- Live R2 checks passed for write, read, delete, and denial against another bucket.
- Worker TypeScript validation passed.

## Cloudflare state

- The `clef-medusa` Worker record and its approved secret names exist.
- The Worker code can be uploaded with the current token.
- The container image is built locally but has not been pushed or rolled out.
- `https://clef-medusa.easondev.workers.dev/health` currently returns HTTP 404 because no container-backed Worker version has completed deployment.

## Blocker

The current Doppler `CLOUDFLARE_API_TOKEN` receives HTTP 403 from Cloudflare's Containers API. It lacks account-level **Containers Write** access and cannot grant that permission to itself because it also lacks API Tokens Write access.

## Manual action required

Create or update a Cloudflare API token for account `Eason CF Main` with:

- Account / Containers / Write
- Account / Containers / Read
- Account / Workers Scripts / Edit

Store the replacement token in Doppler project `locus-t-ai-backend`, config `prd`, as `CLOUDFLARE_API_TOKEN`. Do not paste it into source files or command history.

## Exact next command

```powershell
cd C:\Users\User\Desktop\clef-project\clef-medusa; doppler run --project locus-t-ai-backend --config prd --no-check-version -- npm run container:deploy
```
