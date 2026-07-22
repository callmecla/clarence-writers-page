import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-07-01",
  // 'published' content only, cached by Next.js — flip to false while
  // actively editing drafts in the Studio if you want instant previews
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlForImage(source: Image) {
  return builder.image(source);
}
