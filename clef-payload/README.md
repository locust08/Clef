# Clef Payload

Payload CMS app folder for the Clef project.

Run the Payload CMS app:

```powershell
cd clef-project\clef-payload
npm install
npm run dev
```

Recommended local API URL for the storefront env:

```env
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
```

Payload password-reset and verification emails use the official Resend adapter.
Keep these values server-only (or provide them through Doppler):

```env
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM_NAME=Clef
EMAIL_FROM_ADDRESS=no-reply@your-verified-domain.com
EMAIL_ENABLED=true
```

Run with Doppler using `doppler run -- npm run dev`.

## Production admin bootstrap

Local development uses PostgreSQL. The Cloudflare Worker uses the remote D1 binding
`D1` (`clef-payload-db`), so localhost users are not copied to production.

Store these operator-only values in Doppler `locus-t-ai-backend/prd` before running
the bootstrap. Never commit them or place them in a public `NEXT_PUBLIC_*` variable:

```text
PAYLOAD_ADMIN_EMAIL
PAYLOAD_ADMIN_PASSWORD
```

`PAYLOAD_ADMIN_EMAIL` is sufficient for an idempotent existence check. The password is
read only when the account must be created or when an explicit reset is requested. Neither
variable is used by the Worker during normal startup or login.

Check for the target administrator without displaying the email or changing D1:

```powershell
$env:PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM='clef-payload-db:660d2a9a-f9fd-4ca5-8c7e-b72f8da809d5'
doppler run --project locus-t-ai-backend --config prd --no-check-version --preserve-env="PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM" -- npm run payload:admin:check:production
Remove-Item Env:PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM
```

If another production user already exists, creating an additional administrator also requires
the explicit operator-only flag `PAYLOAD_ADMIN_ALLOW_ADDITIONAL=true`. Leave it unset for the
normal idempotent check. Password resets revoke the user's existing sessions.

Create the production administrator only when it does not already exist:

```powershell
$env:PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM='clef-payload-db:660d2a9a-f9fd-4ca5-8c7e-b72f8da809d5'
doppler run --project locus-t-ai-backend --config prd --no-check-version --preserve-env="PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM" -- npm run payload:admin:bootstrap:production
Remove-Item Env:PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM
```

The command is idempotent and leaves an existing user unchanged.

When another production user already exists and the operator has explicitly approved
adding this administrator, run the one-time bootstrap with both guards:

```powershell
$env:PAYLOAD_ADMIN_ALLOW_ADDITIONAL='true'
$env:PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM='clef-payload-db:660d2a9a-f9fd-4ca5-8c7e-b72f8da809d5'
doppler run --project locus-t-ai-backend --config prd --no-check-version --preserve-env="PAYLOAD_ADMIN_ALLOW_ADDITIONAL,PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM" -- npm run payload:admin:bootstrap:production
Remove-Item Env:PAYLOAD_ADMIN_ALLOW_ADDITIONAL
Remove-Item Env:PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM
```

To explicitly reset that user's password and unlock it, set
`PAYLOAD_ADMIN_RESET=true` for that one run:

```powershell
$env:PAYLOAD_ADMIN_RESET='true'
$env:PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM='clef-payload-db:660d2a9a-f9fd-4ca5-8c7e-b72f8da809d5'
doppler run --project locus-t-ai-backend --config prd --no-check-version --preserve-env="PAYLOAD_ADMIN_RESET,PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM" -- npm run payload:admin:bootstrap:production
Remove-Item Env:PAYLOAD_ADMIN_RESET
Remove-Item Env:PAYLOAD_PRODUCTION_BOOTSTRAP_CONFIRM
```

The bootstrap uses Payload's Local API through Wrangler's confirmed remote binding.
It has no public HTTP endpoint and never prints the password, hash, token, or cookie.

## Production authentication verification

After bootstrap or deployment, run the real browser verification with the same
Doppler-provided `PAYLOAD_ADMIN_EMAIL` and `PAYLOAD_ADMIN_PASSWORD`:

```powershell
doppler run --project locus-t-ai-backend --config prd --no-check-version -- npm run auth:verify:production
```

It checks the login response, secure host-only cookie, `/api/users/me`, dashboard,
session persistence after refresh, and logout without printing credential or cookie
values. Failures are reported with a classification such as
`USER_MISSING_OR_INVALID_CREDENTIALS`, `MISSING_SET_COOKIE`,
`COOKIE_NOT_SENT_OR_SECRET_MISMATCH`, or `WORKER_DB_MIGRATION_OR_RUNTIME_ERROR`.

After the bootstrap and browser verification succeed, remove the temporary password from
Doppler. Payload authenticates against the hash stored by its Local API in D1 and does not
need this environment variable for subsequent logins:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/doppler-secret-safe.ps1 -Action delete -Name PAYLOAD_ADMIN_PASSWORD
```

## Safe Doppler secret maintenance

Use the targeted helper for one production secret at a time. It suppresses Doppler stdout
and stderr, never passes a replacement value as a command-line argument, and never runs the
application with the full Doppler environment merely to change one secret.

Add or replace one value (the helper prompts without echoing the input):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/doppler-secret-safe.ps1 -Action set -Name SECRET_NAME
```

Check for a name without printing its value:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/doppler-secret-safe.ps1 -Action check -Name SECRET_NAME
```

Delete one value without allowing Doppler's result table into terminal or CI logs:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/doppler-secret-safe.ps1 -Action delete -Name SECRET_NAME
```

Do not add `--debug`, `--print-config`, shell tracing, environment dumps, or output redirection
to these commands. Secret values belong only in the secure prompt or an approved secret
manager workflow, never in source, documentation, command arguments, or build logs.
