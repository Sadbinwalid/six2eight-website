# Deployment

**Current status:** deployed to Vercel production at **https://six2eight-website.vercel.app**
(project `six2eight-website`, account `sadbinwalid01-8361`, deployed with the Vercel CLI from `main`).

Pushes to GitHub do **not** redeploy automatically yet: the Vercel account has no GitHub login
connection. To enable auto-deploys, connect GitHub in Vercel → Account Settings → Authentication, then
run `npx vercel git connect`. Until then, redeploy with `npx vercel deploy --prod` from `main`.

The homepage prerenders to static HTML (`○ /` in the build output) and has no runtime environment
variables, so it can be hosted anywhere that runs Next.js.

## Pre-deploy checklist

1. `npm run check` passes.
2. `src/content/links.ts` contains real URLs (no `#` placeholders for production).
3. Contact form endpoint connected (or the form hidden) — submissions are currently simulated.
4. QA checklist signed off.

## Vercel (recommended)

1. Import `Sadbinwalid/six2eight-website` in the Vercel dashboard (framework preset: Next.js — no
   settings to change; build `npm run build`, output `.next`).
2. Every push to a branch creates a **preview deployment**; pushes to `main` deploy to production.
3. Preview URLs are protected by Vercel Authentication by default — share the production domain, or
   disable protection / add a shareable link for external reviewers.

CLI alternative:

```bash
npx vercel login
npx vercel          # preview
npx vercel --prod   # production
```

## Removing the deployment

Vercel → project `six2eight-website` → Settings → scroll to **Delete Project** (or
`npx vercel remove six2eight-website`). This takes the URL offline for everyone.

## Self-hosting

```bash
npm ci
npm run build
npm run start      # PORT=3000 by default
```

Serve behind a reverse proxy with HTTPS. Static assets in `public/figma` can be cached long-term.

## Environment variables

None today. When a form endpoint is added, document it in a `.env.example` and set it in the host's
project settings (never commit real values).
