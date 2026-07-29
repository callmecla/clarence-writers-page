# hello, rencey!

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

- Homepage (`/`) — hero, social links, and a five-tile overview of every section
- Novels page (`/novels`) — shown as a connected constellation of orbs;
  click one to see its cover, logline, "where this idea came from," and a
  mood board (colors, a song, an image) — all editable per-novel in Sanity
- Poetry page — poems shown as a clickable constellation of stars
- Diary page — entries + a "random memory" button that scrolls & highlights
- Photos page — photos tilt in 3D toward your cursor
- About page — bio, favorite line, a "leave a light" guestbook, and a working
  contact form
- Day/night theme toggle, remembers your last choice
- Each page has its own color mood + background animation (see `lib/moods.ts`)
- Ambient particles gently drift toward your cursor on every page
- Soft fade-in transition between pages

## Guestbook setup (leave a light)

The guestbook needs a Sanity **write token** (separate from your normal
read-only setup) since visitors are creating new documents, not just reading.

1. Go to https://www.sanity.io/manage → your project → API → Tokens
2. Create a new token with **Editor** permissions
3. Add to `.env.local`:
   ```
   SANITY_API_TOKEN=your-token-here
   ```
4. Restart `npm run dev`

**Important:** this token can create content, so never commit it or expose
it in client-side code — it's only ever used inside
`app/api/guestbook/route.ts`, which runs on the server. Add it to Vercel's
Environment Variables too when you deploy, the same as the other secrets.

## Contact form setup

The "say hello" form on the About page sends you an email via Resend
whenever someone submits it.

1. Create a free account at https://resend.com
2. Go to https://resend.com/api-keys and create an API key
3. Add to your `.env.local`:
   ```
   RESEND_API_KEY=your-key-here
   CONTACT_TO_EMAIL=the-email-you-signed-up-to-resend-with
   ```
4. Restart `npm run dev`

No custom domain needed — the form sends from Resend's shared test address,
which works as long as it's sending *to* the email you signed up with. If
you later want the "from" address to look like it's coming from your own
domain, that's when you'd verify a domain in Resend's dashboard.

**Don't forget:** when you deploy to Vercel, add `RESEND_API_KEY` and
`CONTACT_TO_EMAIL` in the Vercel project's Environment Variables too — env
vars in `.env.local` only apply locally, not on the live site.
