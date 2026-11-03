# Changelog

All notable changes. Format based on [Keep a Changelog](https://keepachangelog.com/).

## [0.1.0] — 2026-11-04

### Added

- Homepage built from the Figma file _six2eight · Website 2.0_: navigation, hero, client logos,
  services, awards, our work, AI process, testimonials, stats, booking, FAQ, contact, footer.
- Mobile layouts from the Figma mobile frames, including the bottom navigation bar and sheets.
- Design tokens and text styles as Tailwind 4 `@theme` / `@utility` (`src/styles`).
- Motion system: Lenis smooth scroll, GSAP reveals, pinned "Our Work" showcase, AI process sequence
  (progress bars, typed text, tooltips), NumberFlow odometer counters, cursor-following badge and light,
  magnetic back-to-top.
- `ParticleImage` — interactive image-to-particle canvas (yeswearemad.com physics) for the hero,
  AI and stats sections.
- Refined glass effect for the stats panel.
- Calendly-style date/time picker, contact form with validation and file upload.
- Accessibility: skip link, ARIA tabs/accordion/dialog/carousel patterns, focus styles, reduced motion.
- Image pipeline (`npm run images`): Figma exports → WebP (108 MB → 4.9 MB).
- Content layer (`src/content`) separating copy and links from components.
- Documentation in `docs/`, Prettier config, `typecheck` / `check` / `format` scripts.

### Fixed (during QA)

- Mobile viewport widening caused by an `sr-only` label escaping the awards scroller.
- Horizontal page overflow from the testimonial slider.
- GSAP entrance values corrupted by CSS `transform` transitions under React StrictMode.
- Hydration mismatches (showreel portal, calendar dates).

### Known limitations

See [PRD → Outstanding requirements](PRD.md#6-outstanding-requirements).
