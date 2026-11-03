# Architecture

## Stack

| Layer     | Technology                                | Version | Why                                                          |
| --------- | ----------------------------------------- | ------- | ------------------------------------------------------------ |
| Framework | Next.js (App Router)                      | 16.4.4  | Static prerender, `next/font`, matches team's other projects |
| UI        | React                                     | 19.3.0  |                                                              |
| Language  | TypeScript                                | 5.9     | strict mode                                                  |
| Styling   | Tailwind CSS                              | 4.3     | `@theme` tokens + `@utility` text styles; no CSS-in-JS       |
| Motion    | GSAP + ScrollTrigger                      | 3.15    | scroll-linked / pinned animation, matchMedia per breakpoint  |
| Scrolling | Lenis                                     | 1.3     | smooth wheel scrolling synced to GSAP's ticker               |
| Counters  | @number-flow/react                        | 0.6     | odometer-style rolling digits (superside.com reference)      |
| Images    | sharp (via `scripts/optimize-images.mjs`) | —       | WebP conversion of Figma exports                             |

`next.config.ts` enables `cacheComponents` and `partialPrefetching` (scaffold defaults) and wires the
Tailwind Turbopack loader for `*.css`.

## Rendering model

- The homepage (`src/app/page.tsx`) is a **Server Component** that composes section components.
  It is fully **static** — `next build` prerenders `/` to HTML.
- Interactive sections are **Client Components** (`"use client"`): anything using GSAP, state,
  `IntersectionObserver` or the canvas.
- Purely presentational pieces (`logos.tsx`, `HeroGrid`, `TrustBadge`, `ProjectCard`, `ProcessCard`,
  `ToolLogo`, `MaskShape`, `Button`, `Arrow`, `RevealText`) contain no hooks or `"use client"`. They run
  wherever their parent runs; `ClientLogos` is the one section that stays a Server Component.
- Values that only exist in the browser (current date, time zone, "mounted") are read through
  `useSyncExternalStore` with a server snapshot, so hydration is deterministic.

## Folder structure

```
src/
├─ app/
│  ├─ layout.tsx          html shell, fonts (CSS variables), metadata, viewport
│  ├─ page.tsx            section order, skip link, overflow clip wrapper
│  └─ globals.css         imports styles/*, base element styles, `container-page` utility
├─ styles/
│  ├─ tokens.css          @theme: colours, radius, easing, marquee animation, header heights
│  ├─ typography.css      @utility t-* text styles (responsive + fixed)
│  └─ effects.css         .glass, .glass-pill, keyframes, Lenis + reduced-motion rules
├─ content/               typed data + copy, no JSX (except client logos, see below)
├─ components/
│  ├─ layout/             page chrome shared by every page
│  ├─ ui/                 reusable, section-agnostic primitives
│  └─ sections/           homepage sections; multi-file sections get a folder
├─ hooks/                 React hooks
└─ lib/                   framework-agnostic helpers
public/figma/             served assets (generated)
assets/figma-source/      raw Figma exports (local only, git-ignored)
scripts/                  build tooling
docs/                     documentation
```

### Conventions

- **Components:** PascalCase files, one default export per section; small helpers live in the same file
  unless reused.
- **Content vs presentation:** text, URLs and item lists live in `src/content/*.ts`; components only
  map over them. Client-logo artwork is JSX (it carries exact Figma geometry), so it lives next to its
  section in `sections/client-logos/logos.tsx`.
- **Styling:** Tailwind classes inline; shared values come from tokens/utilities. Figma pixel geometry
  that has no token is written as arbitrary values or inline `style` and commented where non-obvious.
- **Motion:** all GSAP code runs inside `useGsap`, which scopes selectors to the section, reverts on
  unmount and skips everything for reduced motion.

## Data flow

```
content/*.ts ──► section component ──► ui primitives
links.ts ─────► every CTA / link
```

There is no runtime data fetching, global state or API layer. Component state is local:

| State                          | Owner                         |
| ------------------------------ | ----------------------------- |
| Services dropdown open         | `SiteHeader` › `ServicesMenu` |
| Mobile sheet (services / more) | `MobileNav`                   |
| Showreel modal open            | `Hero`                        |
| Slide index, pause, in-view    | `Testimonials`                |
| Month / selected date / slot   | `CalendarWidget`              |
| Active tab / open question     | `Faq`                         |
| Form fields, chips, files      | `ContactForm`                 |

## Cross-cutting concerns

| Concern          | Where                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- |
| Smooth scrolling | `layout/SmoothScroll.tsx` — Lenis on GSAP ticker; intercepts in-page `#anchor` links  |
| Breakpoints      | Tailwind `md` 768 / `lg` 1024 / `xl` 1280; GSAP `MQ` constants in `hooks/useGsap.ts`  |
| Header offset    | CSS variable `--header-h` (56 px mobile / 96 px desktop) used by sticky pin + anchors |
| Bottom nav space | CSS variable `--bottom-nav-h` (72 px below `lg`, 0 above) applied as body padding     |
| Horizontal bleed | `page.tsx` wraps content in `overflow-x-clip`; sliders clip themselves on mobile      |
| Reduced motion   | `useGsap` (skips setup), `useReducedMotion` (testimonial autoplay), CSS media rule    |
