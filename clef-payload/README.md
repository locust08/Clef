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
