"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Shared motion vocabulary — keep GSAP timings consistent with the CSS tokens. */
export const EASE = {
  /** default for entrances: fast start, long soft landing */
  out: "expo.out",
  /** gentler variant for larger blocks */
  soft: "power3.out",
  /** scroll-linked motion */
  linear: "none",
} as const;

export const DURATION = {
  fast: 0.6,
  base: 1.1,
  slow: 1.4,
} as const;

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Reveal headline lines: every `[data-line]` inside `scope` slides up out of
 * its `.line-mask` wrapper when the trigger enters the viewport.
 */
export function revealLines(scope: Element | string, trigger: Element | string = scope, start = "top 80%") {
  const targets = typeof scope === "string" ? `${scope} [data-line]` : scope.querySelectorAll("[data-line]");
  return gsap.from(targets, {
    yPercent: 110,
    duration: DURATION.slow,
    stagger: 0.08,
    ease: EASE.out,
    scrollTrigger: { trigger, start },
  });
}

/** Fade + rise a set of elements in sequence. Inline styles are cleared afterwards so hover transforms keep working. */
export function revealUp(
  targets: gsap.TweenTarget,
  trigger: Element | string,
  opts: { y?: number; stagger?: number; start?: string; delay?: number } = {},
) {
  return gsap.from(targets, {
    y: opts.y ?? 48,
    autoAlpha: 0,
    duration: DURATION.slow,
    stagger: opts.stagger ?? 0.08,
    delay: opts.delay ?? 0,
    ease: EASE.out,
    clearProps: "transform,opacity,visibility",
    scrollTrigger: { trigger, start: opts.start ?? "top 85%" },
  });
}
