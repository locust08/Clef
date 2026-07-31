import Medusa from "@medusajs/js-sdk";
import { getMedusaBackendUrl } from './medusa-store';

export const sdk = new Medusa({
  baseUrl: getMedusaBackendUrl(),
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});
