# Development Guide

## Prerequisites

- Node.js **≥ 20.9** (developed on Node 24) and npm
- Optional: the Figma file, for re-exporting assets

## Setup

```bash
git clone https://github.com/Sadbinwalid/six2eight-website.git
cd six2eight-website
npm install
npm run dev        # http://localhost:3000  (use `npm run dev -- -p 3456` for another port)
```

## Scripts

| Script                    | Purpose                                                             |
| ------------------------- | ------------------------------------------------------------------- |
| `dev`                     | Next.js dev server (Turbopack, Fast Refresh)                        |
| `build` / `start`         | Production build / serve it                                         |
| `lint`                    | ESLint (`eslint-config-next` core-web-vitals + TypeScript)          |
| `typecheck`               | `next typegen` (route types such as `LayoutProps`) + `tsc --noEmit` |
| `check`                   | lint → typecheck → build. **Run before every push.**                |
| `format` / `format:check` | Prettier (`printWidth 140`, double quotes, trailing commas)         |
| `images`                  | Optimise raw Figma exports into `public/figma/` (see below)         |

## Testing

There is no automated test suite yet. Quality gates:

1. `npm run check` must pass (lint, types, production build).
2. Walk through [QA-CHECKLIST.md](QA-CHECKLIST.md) at 393 / 768 / 1024 / 1440 px.

Recommended next step: add Playwright smoke tests (page renders, no console errors, no horizontal
overflow per breakpoint, tabs/accordion/slider/form behaviour).

## Configuration

**Environment variables:** none. The site is static and calls no APIs. `.env*` files are git-ignored;
add a `.env.example` when the contact form gets a real endpoint.

**Links & content** — all editable without touching components:

| File                          | Contains                                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/content/links.ts`        | Calendly, service pages, review profiles, socials, ask-AI prompts, company profile, showreel video |
| `src/content/navigation.ts`   | Primary nav, service groups (dropdown, mobile sheet, footer), company links                        |
| `src/content/services.ts`     | Service cards (copy, tags, hover tint, image crop)                                                 |
| `src/content/work.ts`         | Projects (+ desktop composition anchors, mobile visibility)                                        |
| `src/content/ai-process.ts`   | Process steps, tools                                                                               |
| `src/content/testimonials.ts` | Reviews                                                                                            |
| `src/content/stats.ts`        | Stats                                                                                              |
| `src/content/faq.ts`          | FAQ tabs and Q&A                                                                                   |
| `src/content/contact.ts`      | Contact copy, form options, upload rules                                                           |
| `src/content/footer.ts`       | Socials, ask-AI links, offices                                                                     |

## Coding conventions

- TypeScript strict; prefer `type` over `interface`; path alias `@/` → `src/`.
- Components in PascalCase files; sections are default exports, primitives are named exports.
- Keep copy and URLs in `src/content`; components should not contain hard-coded content.
- Styling with Tailwind classes; use tokens (`bg-bg-brand`, `text-ink-80`) and `t-*` text utilities.
  Exact Figma geometry that has no token may use arbitrary values / inline `style`.
- Hover transitions: use `transition-[translate|scale|rotate|opacity|colors]`, not `transform`
  (see [ANIMATIONS.md](ANIMATIONS.md)).
- All GSAP code goes through `useGsap`; desktop-only motion inside `mm.add(MQ.desktop, …)`.
- Absolutely positioned elements (incl. `sr-only`) inside horizontal scrollers need a positioned
  ancestor — otherwise they escape the scroller and widen the mobile viewport.
- Images: `<img>` with explicit geometry is intentional (Figma crops); add `loading="lazy"` below the fold.
  The `@next/next/no-img-element` rule is disabled for this reason.
- Run `npm run format` before committing.

## Working with assets

```
Figma ──export──► assets/figma-source/<name>.png|svg   (local only, git-ignored, ~115 MB)
                          │  npm run images  (scripts/optimize-images.mjs, sharp)
                          ▼
                  public/figma/<name>.webp|svg          (committed, ~5 MB)
```

- Rasters → WebP (q 82, alpha q 90), max 1800 × 4200 px; SVGs copied unchanged.
- Reference assets as `/figma/<name>.webp` or `/figma/<name>.svg`.
- Raw exports are not in git. To regenerate, export the frames from the Figma file into
  `assets/figma-source/` with the same names first; the script exits with a message if the folder is missing.

## Troubleshooting

| Symptom                                                | Fix                                                                                                                           |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find name 'LayoutProps'` in `tsc`              | run `npm run typecheck` (it generates route types first)                                                                      |
| Animation starts from the wrong position after editing | an element animated by GSAP has a CSS `transition` on `transform`                                                             |
| Page scrolls sideways on mobile                        | find the element wider than the viewport (`document.querySelectorAll('*')` right > innerWidth); clip or position its ancestor |
| Lint errors from `.vercel/output`                      | already ignored in `eslint.config.mjs`; delete `.vercel/` if it is stale                                                      |
