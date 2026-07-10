# Clef Medusa

Medusa backend/admin app for the Clef project.

## Location

```text
clef-project/
  clef-ecommerce/          # Next.js storefront
  clef-medusa/apps/backend # Medusa backend/admin
  clef-payload/            # Payload CMS
```

## Local Development

Run the backend from its app folder:

```powershell
cd clef-project\clef-medusa\apps\backend
npm install
npm run dev
```

Medusa runs at `http://localhost:9000`.

Admin runs at `http://localhost:9000/app`.

## Storefront CORS

The storefront is now the sibling app at `clef-project\clef-ecommerce` and runs on `http://localhost:3000` by default.

`apps/backend/.env` and `apps/backend/.env.template` allow:

```env
STORE_CORS=http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001,https://docs.medusajs.com
AUTH_CORS=http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001,http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
```

Keep `NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000` in the storefront env.

## Useful Commands

From `clef-project\clef-medusa`:

```powershell
npm run backend:dev
npm run storefront:dev
npm run payload:dev
```

From `clef-project\clef-medusa\apps\backend`:

```powershell
npm run dev
npm run build
npm run seed:deodorant-products
npm run test:unit
```
