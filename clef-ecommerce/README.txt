Clef Ecommerce
==============

Next.js storefront for the Clef project.

Local development:

    cd clef-project\clef-ecommerce
    npm install
    npm run dev

Open http://localhost:3000.

Medusa backend URL:

    NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

CMS API URL:

    NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001

CMS API calls use src/lib/cms.ts. Medusa still owns products, prices, variants, inventory, cart, and checkout.

Related apps:

    cd ..\clef-medusa\apps\backend
    npm run dev

    cd ..\clef-payload
    npm run dev

Open http://localhost:3001/admin.
