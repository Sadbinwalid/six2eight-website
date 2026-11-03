# Animations & Interactions

## Principles

- One motion vocabulary: entrances use `expo.out` (GSAP) / `--ease-out-expo` (CSS), 0.5–1.4 s.
- Motion has a job — guiding attention, explaining a process, or confirming an interaction.
- Everything respects `prefers-reduced-motion`: `useGsap` skips GSAP setup, CSS transitions/animations
  are cut to ~0 ms, looping decorations marked `data-motion="loop"` are removed, testimonial autoplay is
  disabled, Lenis is not started.
- Pointer-only effects (`Magnetic`, `CursorBadge`, hover tags) check `(hover: hover) and (pointer: fine)`.

## Tooling

| Tool              | Where                         | Used for                                               |
| ----------------- | ----------------------------- | ------------------------------------------------------ |
| GSAP              | `lib/motion.ts`, `useGsap`    | timelines, scroll triggers, pinning, quickTo followers |
| ScrollTrigger     | registered in `lib/motion.ts` | reveal on enter, scrub, pin                            |
| `gsap.matchMedia` | `useGsap` `mm` argument       | desktop-only motion (`MQ.desktop`)                     |
| Lenis             | `layout/SmoothScroll.tsx`     | smooth wheel scrolling, anchor scrolling               |
| NumberFlow        | `ui/Counter.tsx`              | rolling digits                                         |
| Canvas 2D         | `ui/ParticleImage.tsx`        | particle physics                                       |
| CSS               | `styles/effects.css`, classes | hovers, marquee, keyframes                             |

### Shared helpers (`lib/motion.ts`)

- `revealLines(scope, trigger?, start?)` — words of a `RevealText` rise out of their masks (stagger 0.08).
- `revealUp(targets, trigger, { y, stagger, start, delay })` — fade + rise, `clearProps` afterwards so
  CSS hover transforms keep working.

> Gotcha: never put a CSS `transition` on `transform` for an element GSAP animates — React StrictMode
> re-runs effects and GSAP would read a mid-transition value. Use `transition-[translate|scale|rotate]`
> (Tailwind 4 individual transform properties) for hover effects instead.

## Inventory

| Section      | Effect                                                                                                                                                                                                                                                | Implementation                                                        |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Global       | Smooth scroll; section headings reveal word-by-word                                                                                                                                                                                                   | Lenis; `revealLines`                                                  |
| Header       | Services dropdown fades/slides with staggered items; underline wipe on links; CTA label roll                                                                                                                                                          | CSS transitions + inline `transitionDelay`                            |
| Hero         | Intro timeline (badge → words → reel → links → collage); column parallax (desktop); collage screenshots scroll on hover; showreel ring pulse + thumbnail pan; **particle "6"**                                                                        | GSAP timeline; scrubbed ScrollTrigger; CSS keyframes; `ParticleImage` |
| Client logos | Infinite marquee, rows in opposite directions, pause on hover                                                                                                                                                                                         | CSS `marquee-left/right` (−50 % loop), `--marquee-duration`           |
| Services     | Cards rise + artwork settles from 1.12 scale; hover: image zoom, 150° tint wash, lime underline wipe, arrow swap, glass tags rise (staggered)                                                                                                         | GSAP per card; CSS group hover                                        |
| Awards       | Cards rise in sequence; hover lift                                                                                                                                                                                                                    | `revealUp`; CSS                                                       |
| Our Work     | **Desktop:** headline first, then the section pins and the card track travels bottom→top over 3.5 viewports with per-card parallax drift (`desktop.drift`); lime "View" badge follows the cursor. **Mobile:** cards rise                              | pinned scrubbed timeline; `gsap.quickTo`                              |
| AI process   | Cards rise; **step bars fill in sequence** as the row scrolls through; **AI line types itself out** with a blinking caret; sparkle twinkles on hover; tool tiles lift + tooltip; oversized words drift apart (desktop); interactive grey particle "6" | scrub timeline; `typeOut()` in `AiProcess.tsx`; CSS                   |
| Testimonials | Slide transition (1.1 s expo); active pill fills over 6 s then advances; pauses on hover/focus/off-screen; swipe                                                                                                                                      | CSS transform + `progress-fill` keyframe, `animationend`              |
| Stats        | **Odometer counters** cascade (110 ms apart); glass panel with cursor-following lime light; particle "6" + glow behind the glass                                                                                                                      | NumberFlow; CSS vars `--mx/--my`                                      |
| Booking      | Day hover scale; time column re-animates on date change; slot → "Time + Next" split                                                                                                                                                                   | CSS                                                                   |
| FAQ          | Panel fade-up on tab change; accordion height via `grid-template-rows 0fr→1fr`; plus/minus cross-rotate                                                                                                                                               | CSS                                                                   |
| Contact      | Form rises; chips press-scale; error messages fade in; success overlay                                                                                                                                                                                | `revealUp`; CSS                                                       |
| Footer       | Columns rise; wordmark parallax rise; magnetic back-to-top; social/AI hover                                                                                                                                                                           | GSAP scrub; `Magnetic`; CSS                                           |

## Particle system (`ParticleImage`)

Port of the physics behind the yeswearemad.com hero (`react-particle-image`):

1. The image is drawn to an off-screen canvas at its rendered size; every pixel with alpha > 60 is a
   candidate. Candidates are shuffled and capped at `maxParticles`.
2. Each particle is spring-attached to its home pixel, starts at the canvas centre (burst on load) and
   grows in over 1.2 s.
3. Per 30 fps physics tick: spring `(home − pos)`, friction `−v·friction·mass`, random entropy, and for
   100 ms after every pointer move a "disturbance" force away from the cursor (same falloff as the
   original, including its XOR quirk). Acceleration = force / mass.
4. Rendering batches particles by quantised colour into one path per colour.
5. An `IntersectionObserver` stops the loop off-screen; `display:none` instances never start.

Tunables: `mass 40`, `friction 0.45`, `entropy 25`, `repelForce 10` (AI section 6), `radius 0.8–0.9`.

> **Pending:** the hero background will be re-tuned once the client shares the reference recording.
