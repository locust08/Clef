# Stripe Sandbox checkout

Clef's Stripe checkout is sandbox-only. Stripe secrets come from Doppler and must never be copied into an environment file, source code, browser code, logs, or reports.

## Run locally

From the repository root, start the backend and storefront separately:

```powershell
npm --prefix clef-medusa/apps/backend run dev:doppler
npm --prefix clef-ecommerce run dev:doppler
```

The backend accepts only a Stripe test secret key and a `whsec_` webhook secret. The storefront accepts only a Stripe test publishable key. Any other prefix stops the relevant process before checkout can run.

Before a payment can be offered to customers, enable the registered `pp_stripe_stripe` provider for the Malaysia region in Medusa Admin:

`Settings -> Regions -> Malaysia -> Edit -> Payment Providers -> Stripe -> Save`

## Local webhook testing

With Medusa running on port 9000, start a temporary Stripe CLI listener:

```powershell
stripe listen --forward-to localhost:9000/hooks/payment/stripe_stripe
```

Set Doppler's `STRIPE_WEBHOOK_SECRET` for the development configuration to the listener's signing secret. Do not copy that value into a file or commit it. The sandbox endpoint handles these Medusa-supported events:

- `payment_intent.amount_capturable_updated`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.partially_funded`

Do not create a live Stripe webhook from this workflow.

## Sandbox test cases

Use a future expiry and any valid test CVC:

- Success: `4242 4242 4242 4242`
- 3D Secure: `4000 0027 6000 3184`
- Decline: `4000 0000 0000 0002`

Expected behaviour: a successful or capturable Stripe intent completes the Medusa cart and redirects to `/summary`; a declined or cancelled payment leaves the cart available; and a payment return verifies the Stripe client secret against the Medusa payment session before completing the cart.
