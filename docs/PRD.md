# Product Requirements — six2eight Website 2.0 (Homepage)

## 1. Overview

A new marketing homepage for six2eight, a design & development digital agency. The page presents the
agency's services, proof (awards, clients, testimonials, stats), selected work and its AI-assisted
process, and converts visitors into consultation bookings or project inquiries.

- **Source of truth:** Figma file _six2eight · Website 2.0_, section **Home Page** (node `17139:26967`)
  - Desktop frame: "Home Page Design Final" (1440 px)
  - Mobile frames: "Mobile_Final" (393 px) and "Mobile_Final_With Bottom Nav"
- **Motion references** (from Figma annotations):
  - Hero background: yeswearemad.com
  - Client logos and counters: superside.com
  - "Our Work" immersive scroll: heisyai.com

## 2. Goals

1. Reproduce the Figma design faithfully — typography, spacing, colour, proportions.
2. Make the experience feel premium and alive through purposeful, smooth motion.
3. Drive conversions: "Book a Consultation" (Calendly) and the project-inquiry form.
4. Work well on phones, tablets, laptops and desktops.
5. Leave behind a codebase another senior developer can pick up immediately.

## 3. Users

- Prospective clients (founders, marketing and product leads) evaluating the agency.
- The six2eight team, maintaining content and adding pages later.

## 4. Scope

### In scope (implemented)

| #   | Section                     | Requirements (from Figma + annotations)                                            | Status |
| --- | --------------------------- | ---------------------------------------------------------------------------------- | ------ |
| 1   | Navigation                  | Sticky on scroll; CTA → Calendly; Services dropdown; mobile bottom nav             | Done   |
| 2   | Hero                        | Trust badges, headline, showreel (looping preview → modal), service links, collage | Done¹  |
| 3   | Client logos                | Logo marquee (superside.com)                                                       | Done   |
| 4   | Our Digital Services        | 7 cards; hover state with colour wash, tags, lime "Learn More"                     | Done   |
| 5   | Achievement & Awards        | 4 review-platform cards; CTA → Calendly                                            | Done   |
| 6   | Our Work                    | Headline first, cards move bottom→top over 3–4 scrolls (heisyai.com)               | Done   |
| 7   | How We Use AI               | 4 process cards; added subtle engagement motion (approved request)                 | Done   |
| 8   | Testimonials                | ~6 reviews, arrows + pagination, animated active indicator                         | Done   |
| 9   | Why brands choose six2eight | Counter animation (superside.com); glass panel                                     | Done   |
| 10  | Calendly section            | Keep the Calendly booking flow                                                     | Done²  |
| 11  | FAQ                         | Tabs filter questions; accordion                                                   | Done   |
| 12  | Final CTA / contact         | Inquiry form with chips, upload, validation                                        | Done³  |
| 13  | Footer                      | Links, socials, "ask AI", offices, company-profile download, back to top           | Done   |

¹ Hero background motion is implemented (particle physics from yeswearemad.com) but **awaits the
client's motion reference** before final tuning.
² A Calendly-styled date/time picker; selecting a time hands off to `LINKS.calendly`. Real availability
requires a Calendly URL / API decision.
³ Client-side validation and success state are implemented; the submission endpoint is not connected.

### Out of scope

Other pages (service pages, Work, About, Pricing …), CMS integration, analytics, back-end services.

## 5. Non-functional requirements

| Area            | Requirement                                                             | Implementation                                                                       |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Responsive      | Designed layouts for phone, tablet, laptop, desktop; no sideways scroll | Mobile-first Tailwind; verified at 393 / 768 / 1024 / 1440                           |
| Performance     | Lightweight assets, smooth motion                                       | WebP pipeline (4.9 MB total), lazy images, 30 fps particle physics paused off-screen |
| Accessibility   | Keyboard, screen-reader and reduced-motion support                      | See [QA checklist](QA-CHECKLIST.md#accessibility)                                    |
| Maintainability | Content separated from components; documented                           | `src/content/*`, `docs/*`                                                            |

## 6. Outstanding requirements

| Item                                                                                         | Owner         | Where to change                 |
| -------------------------------------------------------------------------------------------- | ------------- | ------------------------------- |
| Real URLs (Calendly, service pages, review profiles, socials, company-profile PDF, pricing…) | six2eight     | `src/content/links.ts`          |
| Showreel video file                                                                          | six2eight     | `LINKS.showreel`                |
| Contact-form submission endpoint (CRM / email) incl. file uploads                            | six2eight/dev | `ContactForm.tsx` (`TODO`)      |
| Real Calendly availability (embed or API) instead of the 7-day placeholder                   | dev           | `CalendarWidget.tsx`            |
| Hero background motion reference (download/video)                                            | six2eight     | `ParticleImage.tsx`, `Hero.tsx` |
| Final copy: 6 testimonials, FAQ answers + Development/six2eight tabs, office addresses       | six2eight     | `src/content/*`                 |
| Service-card hover tags for cards 2–7 (only card 1 is designed)                              | design        | `src/content/services.ts`       |
| Brand favicon / social share image                                                           | design        | `src/app/`                      |

## 7. Assumptions & design decisions

- **Figma inconsistencies resolved in code** (flag for design review):
  - Mobile Figma lists different services (e.g. "Motion Design"); the desktop list is used everywhere.
  - FAQ third tab is "six2eight" (desktop) vs "Branding" (mobile); "six2eight" is used.
  - Typos corrected: "Al" → "AI", "UX Ul" → "UX UI", time slot "1:00am" → "1:00pm".
  - Mobile footer / AI cards use placeholder icons in Figma; the desktop icons are reused.
- Testimonials: the three designed cards are repeated to make six until real reviews are provided.
- Placeholder FAQ answers and service hover tags were written to fill the designed states.
- Glass effect: CSS approximation of Figma's GLASS (frost 36, rim light −45°); not pixel-identical.
