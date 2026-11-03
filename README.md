# six2eight — Website 2.0

Marketing homepage for **six2eight**, a design & development digital agency. Built pixel-faithfully from
the Figma file _six2eight · Website 2.0 → Home Page_ (desktop frame "Home Page Design Final" and the
"Mobile_Final" frames), with scroll-driven motion, interactive particle effects and a fully responsive
layout.

> Status: homepage complete on the front end. Real links, the contact-form endpoint, final copy and the
> hero background-motion reference are still outstanding — see [Outstanding requirements](docs/PRD.md#6-outstanding-requirements).

## Tech stack

| Area      | Choice                                                                                    |
| --------- | ----------------------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, static prerender) · React 19 · TypeScript 5 |
| Styling   | Tailwind CSS 4 (`@theme` design tokens + custom utilities)                                |
| Motion    | GSAP 3 + ScrollTrigger · Lenis smooth scroll · NumberFlow (rolling counters)              |
| Fonts     | Instrument Sans (variable, `wdth` axis) · IBM Plex Mono — via `next/font`                 |
| Tooling   | ESLint 9 (`eslint-config-next`) · Prettier 3 · sharp (image pipeline)                     |

## Key features

- 13 homepage sections matching Figma at 1440 px, with dedicated mobile layouts (393 px) and a mobile bottom navigation bar.
- Interactive particle "6" (hero, AI section, stats) — image-to-particle physics ported from the yeswearemad.com hero.
- Pinned, scroll-scrubbed project showcase ("Our Work"), sequential AI process animation with typed text, odometer counters behind a frosted-glass panel.
- Accessible by default: skip link, keyboard-operable tabs / accordion / menus / modal, visible focus, reduced-motion support.
- Optimised assets: 108 MB of Figma exports → 4.9 MB of WebP/SVG.

## Getting started

Requirements: **Node.js ≥ 20.9** and npm.

```bash
npm install
npm run dev            # http://localhost:3000
```

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start the dev server (Turbopack)                 |
| `npm run build`     | Production build (static prerender)              |
| `npm run start`     | Serve the production build                       |
| `npm run lint`      | ESLint                                           |
| `npm run typecheck` | Generate route types + `tsc --noEmit`            |
| `npm run check`     | lint + typecheck + build — run before every push |
| `npm run format`    | Prettier (write) · `format:check` to verify      |
| `npm run images`    | Rebuild `public/figma/*` from raw Figma exports  |

There is no automated test suite yet; quality gates are `npm run check` plus the manual
[QA checklist](docs/QA-CHECKLIST.md).

## Repository structure

```
src/
  app/            layout (fonts, metadata), page (section order), globals.css
  styles/         tokens.css · typography.css · effects.css
  content/        all copy, links and per-item data (edit content here)
  components/
    layout/       SiteHeader · MobileNav · SiteFooter · SmoothScroll
    ui/           reusable primitives (Button, Arrow, RevealText, Counter, ParticleImage …)
    sections/     one file or folder per homepage section
  hooks/          useGsap · useMounted · useReducedMotion
  lib/            motion.ts (GSAP setup + reveal helpers) · cn.ts
public/figma/     optimised images & SVGs served by the site
scripts/          optimize-images.mjs
docs/             project documentation
```

## Configuration

No environment variables are required — the site is fully static. All external URLs (Calendly, social
profiles, service pages, showreel video) are configured in [`src/content/links.ts`](src/content/links.ts).
See [Development guide → Configuration](docs/DEVELOPMENT-GUIDE.md#configuration).

## Deployment

Designed for [Vercel](https://vercel.com) (zero config) or any host that can run `next start`.
Live at **https://six2eight-website.vercel.app** — see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Documentation

| Document                                       | Contents                                              |
| ---------------------------------------------- | ----------------------------------------------------- |
| [PRD](docs/PRD.md)                             | Goals, scope, requirements, status, open items        |
| [Architecture](docs/ARCHITECTURE.md)           | Stack, folder structure, rendering & data flow        |
| [Components](docs/COMPONENTS.md)               | Every component, its responsibility and relationships |
| [Design system](docs/DESIGN-SYSTEM.md)         | Tokens, typography, breakpoints, effects              |
| [Animations](docs/ANIMATIONS.md)               | Motion inventory and how each effect is built         |
| [Development guide](docs/DEVELOPMENT-GUIDE.md) | Setup, conventions, assets, configuration             |
| [Deployment](docs/DEPLOYMENT.md)               | Build and hosting                                     |
| [QA checklist](docs/QA-CHECKLIST.md)           | Design & development QA steps and last results        |
| [Changelog](docs/CHANGELOG.md)                 | Version history                                       |

---

© 2026 six2eight
