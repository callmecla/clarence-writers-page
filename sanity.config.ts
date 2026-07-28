import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "hello-rencey-studio",
  title: "hello, rencey!",

  // The Studio runs on Vite (not Next.js), so it needs env vars prefixed
  // with SANITY_STUDIO_ rather than NEXT_PUBLIC_ — see .env.local.example
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
