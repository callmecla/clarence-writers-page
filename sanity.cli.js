import { defineCliConfig } from "sanity/cli";

// This file is read directly by the Sanity CLI (npm run sanity:deploy, etc.)
// It's separate from sanity.config.ts, which configures the Studio itself.
//
// The project ID is hardcoded here rather than read from an env var — the
// Sanity CLI doesn't reliably load .env.local for this particular file, and
// a project ID isn't a secret (it's already public in your site's code).
export default defineCliConfig({
  api: {
    projectId: "qdvrnvkg",
    dataset: "production",
  },
});
