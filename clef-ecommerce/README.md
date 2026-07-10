# Clef Ecommerce

Next.js storefront for the Clef project.

## Local Development

```powershell
cd clef-project\clef-ecommerce
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy the example env if needed:

```powershell
Copy-Item .env.local.example .env.local
```

Required Medusa variables:

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=replace_with_medusa_publishable_key
```

CMS API variable:

```env
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
```

CMS API calls use `src/lib/cms.ts`; product, cart, checkout, pricing, and inventory still come from Medusa.

## Related Apps

Medusa backend/admin:

```powershell
cd ..\clef-medusa\apps\backend
npm run dev
```

Payload CMS:

```powershell
cd ..\clef-payload
npm run dev
```

Open `http://localhost:3001/admin`.
