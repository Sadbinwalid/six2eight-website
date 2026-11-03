# Design System

All values are taken from the Figma variables of _six2eight · Website 2.0_. They live in
`src/styles/tokens.css` (Tailwind `@theme`) and `src/styles/typography.css` (`@utility`).

## Colour

| Token (Tailwind)                 | Value                                   | Figma variable                                  | Use                     |
| -------------------------------- | --------------------------------------- | ----------------------------------------------- | ----------------------- |
| `bg-bg-primary`                  | `#f0eeed`                               | Background/bg-primary                           | page background         |
| `bg-bg-secondary`                | `#ffffff`                               | Background/bg-secondary                         | cards                   |
| `bg-bg-tertiary`                 | `#000000`                               | Background/bg-tertiary                          | dark sections           |
| `bg-bg-subtle`                   | `#dcd8d5`                               | Background/bg-secondary-subtle                  | AI + contact sections   |
| `bg-bg-brand` / `brand`          | `#9afd0d`                               | Background/bg-brand, Content/text-brand-primary | CTAs, accents           |
| `bg-bg-yellow/green/red/magenta` | `#fef2cd` `#ebffcf` `#fbd3d0` `#ffeefa` | Background/bg-*                                 | rating pills, calendar  |
| `avatar-01` / `avatar-02`        | `#7373ff` / `#e789ff`                   | Background/bg-on-avatar-*                       | avatar backgrounds      |
| `ink`, `ink-80/60/50/20/10`      | black at 100/80/60/50/20/10 %           | Content/text-on-white, -tertiary, Border/*      | text & borders on light |
| `paper`, `paper-80/30/20/10/5`   | white at 100/80/30/20/10/5 %            | Content/text-primary, -secondary, Border/*      | text & borders on dark  |
| `link-blue`                      | `#2c66ff`                               | Content/text-blue                               | inline link             |
| `required`                       | `#ff3d2e`                               | Icon/icon-red                                   | required marks, errors  |
| `cta-ink`                        | `#121d02`                               | (header CTA text)                               |                         |

## Typography

Families: **Instrument Sans** (variable, `wdth 100`) for everything; **IBM Plex Mono** only for the
"/" separators in project tags. Figma letter-spacing percentages are converted to `em`.

### Responsive styles (mobile → tablet `md` → desktop `lg`)

| Utility        | Mobile            | Tablet      | Desktop         | Figma style                       |
| -------------- | ----------------- | ----------- | --------------- | --------------------------------- |
| `t-display`    | 38/42, −4 %       | 56/62, −3 % | 72/78 600, −3 % | Heading 1                         |
| `t-section`    | 32/36 600, −3 %   | 44/50       | 56/64           | Heading 2                         |
| `t-card-title` | 24/28 500, −3 %   | —           | 32/38           | Heading 4                         |
| `t-quote`      | 20/27 500, −3 %   | —           | 24/32           | Heading 5                         |
| `t-eyebrow`    | 14/20, +6 %, caps | —           | 16/24           | Text sm/md Regular-Letter Spacing |

### Fixed styles

`t-h5` (24/32 500) · `t-xl-medium` (20 500) · `t-xl-semibold` (20/28 600) · `t-xl-regular` ·
`t-lg-regular|medium|semibold` (18/28) · `t-md-regular` (16/24) · `t-md-medium` (16/23) ·
`t-md-semibold` (16/24 600) · `t-sm-regular|medium|semibold` (14/20) · `t-xs-regular` (12/18) ·
`t-xs-medium` (12 500) · `t-cta-14|16|18` (button labels).

## Spacing & layout

- Figma spacing scale (`spacing-xs` 4 … `spacing-11xl` 128) is used through Tailwind's 4 px scale
  (`gap-3` = 12, `py-32` = 128 …).
- **`container-page`** — 16 px gutters (mobile), 32 px (tablet), and on desktop a centred 1216 px
  content column inside a 1440 px frame (`padding-inline: max(32px, (100% - 1216px) / 2)`).
- Section rhythm: desktop `py-32` (128), mobile `py-14` (56) — per Figma.

## Breakpoints

| Name | Min width | Layout                                                        |
| ---- | --------- | ------------------------------------------------------------- |
| base | 0         | Figma mobile (393), bottom nav                                |
| `md` | 768       | tablet: 2-column grids, larger type                           |
| `lg` | 1024      | desktop layout, full header, pinned "Our Work", hover effects |
| `xl` | 1280      | Booking and Contact switch to side-by-side                    |

## Radius

`radius-xs` 4 · `sm` 6 · `md` 8 · `lg` 12 · `xl` 16 · `full`.

## Effects

| Class / token | Description                                                                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.glass`      | Figma GLASS (frost 36, light −45° @ 0.8): tint (`--glass-tint`), `backdrop-filter: blur(var(--glass-blur, 36px)) saturate(160%) brightness(1.06)`, specular rim (`::before`, masked gradient border lit top-left), sheen (`::after`), inner + outer shadows. |
| `.glass-pill` | Lighter frost (14 px) for the service tags.                                                                                                                                                                                                                  |
| Drop shadow   | `Brand/Effect-02` → `0 8px 24px rgba(0,0,0,.35)` (showreel pill).                                                                                                                                                                                            |
| Easing tokens | `--ease-out-expo` `cubic-bezier(0.16,1,0.3,1)` (default), `--ease-out-quart`, `--ease-in-out-quart`.                                                                                                                                                         |

## Iconography & imagery

- Icons and single-colour logos come from Figma as **mask images** and are drawn with `MaskShape` in a
  colour, preserving the exported offsets exactly.
- Raster images are served as WebP (`public/figma/*.webp`); vectors as SVG.
