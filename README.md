# small hours

A writer's site — novels (teasers linking to Wattpad), poetry, diary entries, and
photographs — built with Next.js, TypeScript, and Sanity as a free headless CMS.

## Stack

- **Frontend:** Next.js (App Router) + TypeScript, React Server Components
- **Content:** Sanity.io (free tier) — this is your "backend." You add novels,
  poems, diary entries, and photos through a visual editor at `/studio`
  (or a separate `sanity.io` URL), no code required.
- **Theming:** day/night mode via a `data-theme` attribute on `<html>`, CSS
  variables in `app/globals.css`, saved to `localStorage` so it remembers your
  choice.

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a free Sanity project**
   - Go to https://www.sanity.io/manage and create a new project (free tier)
   - Copy your Project ID
   - Copy `.env.local.example` to `.env.local` and paste your Project ID in

3. **Run the Studio (your admin panel) locally**
   ```bash
   npm run sanity:dev
   ```
   This opens a visual editor where you can add novels, poems, diary entries,
   and photos — the schemas are already defined in `sanity/schemaTypes/`.
   When you're ready, `npm run sanity:deploy` puts the Studio at a permanent
   URL you can bookmark and use from anywhere, not just your local machine.

4. **Run the website**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 — it fetches live content from Sanity.

## What's scaffolded so far

- Homepage with hero + Novels section, pulling live data from Sanity
- Day/night theme toggle (top right), remembers your last choice
- `Novel` content type: title, genre tag, logline, cover image, Wattpad link
- `Poem`, `DiaryEntry`, and `Photo` content types are defined in the schema
  but don't have pages built yet — the querying functions for them already
  exist in `lib/sanity/queries.ts`, ready to wire up

## Next steps

- Build out `/poetry`, `/diary`, and `/photos` pages the same way `app/page.tsx`
  pulls novels (see `getPoems`, `getDiaryEntries`, `getPhotos` in
  `lib/sanity/queries.ts`)
- Add the ambient animations (drifting clouds, floating motes) from the design
  mockup as a client component
- Deploy: Vercel's free tier is the easiest path for a Next.js site like this
