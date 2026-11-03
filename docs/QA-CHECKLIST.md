# QA Checklist

Run at **360, 393, 768, 1024, 1280, 1366, 1440, 1512 (14" MacBook) and 1920 px** (plus a real phone where possible). Last full pass: 2026-11-04,
Chrome (desktop + mobile emulation). Results noted per item.

## Automated gates

| Check            | Command                | Last result   |
| ---------------- | ---------------------- | ------------- |
| ESLint           | `npm run lint`         | ✅ 0 problems |
| TypeScript       | `npm run typecheck`    | ✅            |
| Production build | `npm run build`        | ✅ `/` static |
| Formatting       | `npm run format:check` | ✅            |

## Design QA

- [x] Typography matches Figma text styles at desktop and mobile sizes
- [x] Section spacing / alignment matches Figma frames (desktop 1440, mobile 393)
- [x] Colours and overlays use design tokens
- [x] Glass panel (stats) shows the frosted particle "6" with rim light
- [x] Hover states: nav, buttons, service cards, awards, work cards, AI tools, footer links
- [x] Responsive layouts are designed per breakpoint (not just scaled)
- [ ] Hero background motion matched to client reference — **pending reference**
- [ ] Final copy and imagery — see PRD outstanding requirements

## Functional QA

- [x] Header sticky; Services dropdown opens on hover/click, closes on Escape / outside click
- [x] Mobile bottom nav; Services / More sheets open and close (tap backdrop, Escape)
- [x] In-page anchors (`#top`, `#book-a-consultation`, `#contact`, `#faq`) smooth-scroll with header offset
- [x] Showreel modal opens/closes (button, backdrop, Escape) and returns focus
- [x] Our Work pin and card travel on desktop; stacked list on mobile/tablet
- [x] AI cards: progress bars, typed lines, tool tooltips
- [x] Testimonials: arrows, dots, autoplay, pause on hover/focus, swipe
- [x] Counters roll once when visible
- [x] Calendar: month navigation, only next 7 days selectable, slot → "Next"
- [x] FAQ tabs (click + arrow keys) and accordion
- [x] Contact form validation, chip toggles, file add/remove/10 MB limit, success state
- [x] Back to top
- [ ] All links point to real destinations — **placeholders (`#`)**
- [ ] Form submits to a real endpoint — **not connected**

## Technical QA

- [x] No console errors or warnings on load + full scroll (all four widths)
- [x] No failed requests / 404s
- [x] No horizontal overflow (`scrollWidth === clientWidth`) at 393 / 768 / 1024 / 1440, including after a full scroll on mobile
- [x] No hydration mismatches
- [x] Images: WebP, lazy below the fold — total 4.9 MB
- [x] Particle canvases pause off-screen; hidden breakpoint instances never start

## Accessibility

- [x] Skip link to `#main`
- [x] One `h1`; sections labelled by their `h2` (`aria-labelledby`)
- [x] Keyboard: nav, dropdown, sheets, modal, slider, tabs, accordion, form controls
- [x] Visible focus ring (`:focus-visible`, lime / black)
- [x] Form: labels, `aria-required`, `aria-invalid`, `aria-describedby` errors, focus to first error
- [x] Decorative images `alt=""`; logos labelled
- [x] `prefers-reduced-motion`: no GSAP, no Lenis, no autoplay, near-instant transitions
- [ ] Colour contrast audit with a tool (manual check only so far; paper-80 on black and ink-80 on light pass by inspection)

## Browser matrix

| Browser                    | Status                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| Chrome (desktop)           | ✅ tested                                                                                                |
| Chrome (Android emulation) | ✅ tested                                                                                                |
| Safari / iOS               | ⚠️ not yet tested on device (backdrop-filter, `text-box` trim and masks are supported in current Safari) |
| Firefox                    | ⚠️ not yet tested (`text-box` trim unsupported → slightly taller giant words in the AI section)          |
