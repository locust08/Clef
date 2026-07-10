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
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3002
```

Forgot-password emails require SMTP env vars in `.env.local`.
For Resend SMTP, use:

```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=resend
SMTP_PASS=your-resend-api-key
SMTP_FROM_ADDRESS=no-reply@your-verified-domain.com
SMTP_FROM_NAME=CLEF Payload
```
