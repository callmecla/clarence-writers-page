import { createClient } from "@sanity/client";

// This client uses a write-enabled API token and must only ever be
// imported from server-side code (API routes) — never from a client
// component, or the token would end up exposed in the browser bundle.
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-07-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});
