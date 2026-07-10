# Clef Project

Parent folder for the three Clef apps. Keep each app installed and run from its own folder.

## Local Apps

### Frontend / Storefront

```powershell
cd clef-project\clef-ecommerce
npm install
npm run dev
```

Runs at `http://localhost:3000`.

### Medusa Backend / Admin

```powershell
cd clef-project\clef-medusa\apps\backend
npm install
npm run dev
```

Runs at `http://localhost:9000`. Admin is available at `http://localhost:9000/app`.

The backend allows the storefront origins `http://localhost:3000` and `http://localhost:3001` through `STORE_CORS` and `AUTH_CORS`.

### Payload CMS

```powershell
cd clef-project\clef-payload
npm install
npm run dev
```

The `clef-payload` folder is currently empty in this checkout. Add or restore the Payload project files before this command can run.

## Optional Parent Scripts

From `clef-project`:

```powershell
npm run frontend:dev
npm run medusa:dev
npm run payload:dev
```

These scripts delegate to the separated app folders; they do not turn the apps into one workspace.
