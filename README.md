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

- Homepage with hero + Novels section, pulling live data from Sanity
- Poetry, Diary, and Photos pages, also pulling from Sanity
- About page with a working contact form (see "Contact form setup" below)
- Day/night theme toggle (top right), remembers your last choice
- Each page has its own color mood and background animation (Novels =
  morning/birds, Poetry = midnight/stars, Diary = summer/petals, Photos =
  dusk/dust, About = twilight/embers) — see `lib/moods.ts`
- Soft fade-in transition between pages (`app/template.tsx`)

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
