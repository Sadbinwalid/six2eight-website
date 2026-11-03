# Components

Component tree of the homepage, then a reference for every component.
`(client)` = Client Component (`"use client"`).

```
app/page.tsx
├─ SmoothScroll (client)
├─ SiteHeader (client) ─ ServicesMenu
├─ main
│  ├─ Hero (client) ─ TrustBadge · RevealText · ParticleImage ×3 · ArrowIcon · MaskShape · HeroGrid · ShowreelModal
│  ├─ ClientLogos ─ Marquee ─ LogoTile ← logos.tsx
│  ├─ Services (client) ─ ServiceCard ─ ArrowIcon
│  ├─ Awards (client) ─ ArrowLink · AvatarCta
│  ├─ OurWork (client) ─ ProjectCard ×2 layouts · BrandButton · CursorBadge
│  ├─ AiProcess (client) ─ ParticleImage ×2 · ProcessCard ─ ToolLogo
│  ├─ Testimonials (client) ─ ReviewCard
│  ├─ Stats (client) ─ ParticleImage ×2 · Counter
│  ├─ Booking (client) ─ AvatarCta · CalendarWidget (client)
│  ├─ Faq (client) ─ Item
│  └─ ContactCta (client) ─ ContactForm (client)
├─ SiteFooter (client) ─ OfficeIcon · Magnetic
└─ MobileNav (client)
```

## Layout — `src/components/layout`

| Component      | Responsibility                                                                                                                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SmoothScroll` | Starts Lenis (skipped for reduced motion), drives it from `gsap.ticker`, forwards scroll to ScrollTrigger, smooth-scrolls in-page anchors with the header offset. Exports `scrollToTop()`. Exposes the instance as `window.__lenis` so modals can pause scrolling. |
| `SiteHeader`   | Sticky header. Desktop: logo, primary nav, **ServicesMenu** dropdown (hover/click/keyboard, Escape + outside-click close, staggered items), avatar + "Book a Consultation". Mobile: logo + compact CTA. Adds a shadow once scrolled.                               |
| `MobileNav`    | Fixed bottom bar below `lg` (Figma "Mobile_Final_With Bottom Nav"): Work · Services · raised lime action (→ `#contact`) · Pricing · More. Services/More open a sheet with backdrop; Escape closes.                                                                 |
| `SiteFooter`   | Logo + socials, four link columns (from `navigation.ts`), "Learn about Six2Eight from AI" links, office cards, company-profile download, back-to-top (`Magnetic`), parallax wordmark.                                                                              |

## UI primitives — `src/components/ui`

| Component                    | Props (main)                                                                                      | Responsibility                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `MaskShape` / `maskStyles()` | `src, color, style, maskPosition, maskSize`                                                       | Solid colour clipped by an image mask, placed with exact Figma geometry. `maskStyles` returns the raw CSS.                          |
| `BrandButton`                | `href?`, `type?`, `onClick?`, `disabled?`                                                         | Lime pill CTA: rolling label, light sweep and glow on hover, press scale. Renders `<a>` or `<button>`.                              |
| `RollingLabel`               | `children`                                                                                        | Label that rolls to a duplicate on `group/btn` hover (used by `BrandButton`, header CTA).                                           |
| `AvatarCta`                  | `href, avatars[], label?`                                                                         | Overlapping avatars + `BrandButton`; avatars hidden below `lg` (mobile design).                                                     |
| `ArrowIcon`                  | `color, size (18/20/24)`                                                                          | 45° arrow at Figma position; exits/re-enters diagonally on parent `group` hover.                                                    |
| `ArrowLink`                  | `href, color, external?`                                                                          | "View on Google ↗" text link.                                                                                                       |
| `RevealText`                 | `as, text, id?, className`                                                                        | Heading split into masked words (`[data-line]`) for `revealLines`; `aria-label` keeps the full text.                                |
| `Counter` (client)           | `value, unit?, delay?`                                                                            | NumberFlow odometer that spins from 0 when 60 % visible.                                                                            |
| `Magnetic` (client)          | `strength?`                                                                                       | Child follows the cursor slightly (fine pointers only).                                                                             |
| `ParticleImage` (client)     | `src, imageWidth/Height, width/height, maxParticles, radius, repelForce, entropy, friction, mass` | Canvas particle field built from an image's opaque pixels; spring/friction/entropy physics and mouse repel; pauses when off-screen. |
| `ShowreelModal` (client)     | `open, onClose`                                                                                   | Portal dialog; plays `LINKS.showreel` or a placeholder; Escape/backdrop close; stops Lenis; restores focus.                         |

## Sections — `src/components/sections`

| Section      | Files                                                         | Notes                                                                                                                                                                                                                                |
| ------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hero         | `hero/Hero.tsx`, `TrustBadge.tsx`, `HeroGrid.tsx`             | Three `ParticleImage` instances (mobile/tablet/desktop sizes, only the visible one runs). `HeroGrid` holds both the mobile and desktop collages as data; tall website screenshots scroll on hover. Intro timeline + column parallax. |
| Client logos | `client-logos/ClientLogos.tsx`, `logos.tsx`                   | Server Component. Two marquees (desktop) / one combined (mobile); tiles scale 0.6 on mobile.                                                                                                                                         |
| Services     | `Services.tsx`                                                | Data from `content/services.ts`. Grid on mobile/tablet, Figma rows on desktop (`wide` = 57.65 %). Hover-only tag row on hover-capable devices.                                                                                       |
| Awards       | `Awards.tsx`                                                  | Snap scroller below `lg`, four equal cards above.                                                                                                                                                                                    |
| Our Work     | `our-work/OurWork.tsx`, `ProjectCard.tsx`                     | Two layouts: stacked grid (mobile/tablet, `project.mobile` only) and the pinned desktop composition (`project.desktop` anchors). `CursorBadge` follows the pointer over cards.                                                       |
| AI process   | `ai-process/AiProcess.tsx`, `ProcessCard.tsx`, `ToolLogo.tsx` | Scroll-scrubbed step progress bars, typed AI lines, tool tooltips, grey particle background.                                                                                                                                         |
| Testimonials | `Testimonials.tsx`                                            | Translate-based slider; autoplay via the progress bar's `animationend`; pauses on hover/focus/off-screen; swipe on touch; disabled for reduced motion.                                                                               |
| Stats        | `Stats.tsx`                                                   | Glass panel (`.glass`), cursor light, `Counter`s cascade, particle "6" + blurred glow behind.                                                                                                                                        |
| Booking      | `booking/Booking.tsx`, `CalendarWidget.tsx`                   | Calendly-style picker: real month grid, next 7 days bookable, time slots → "Next" → `LINKS.calendly`.                                                                                                                                |
| FAQ          | `Faq.tsx`                                                     | WAI-ARIA tabs (arrow keys) + accordion animated with `grid-template-rows`.                                                                                                                                                           |
| Contact      | `contact/ContactCta.tsx`, `ContactForm.tsx`                   | Form with validation, chips, drag-and-drop upload (10 MB limit), sending/sent states. Submission `TODO`.                                                                                                                             |

## Hooks & lib

| Module                      | Exports                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `hooks/useGsap.ts`          | `useGsap(setup, deps)` → ref; `MQ.desktop` / `MQ.belowDesktop`                                                  |
| `hooks/useMounted.ts`       | `useMounted()` — false on server/hydration                                                                      |
| `hooks/useReducedMotion.ts` | `useReducedMotion()` — live media query                                                                         |
| `lib/motion.ts`             | `gsap`, `ScrollTrigger`, `EASE`, `DURATION`, `prefersReducedMotion`, `isFinePointer`, `revealLines`, `revealUp` |
| `lib/cn.ts`                 | `cn(...classes)`                                                                                                |

## Adding a section

1. Put copy/data in `src/content/<name>.ts`.
2. Create `src/components/sections/<Name>.tsx` (folder if it needs sub-components).
3. Use `container-page`, `t-*` text utilities and tokens; headings via `RevealText`.
4. Animate inside `useGsap((root, mm) => { revealLines(root); … })`.
5. Add it to `src/app/page.tsx` in order.
