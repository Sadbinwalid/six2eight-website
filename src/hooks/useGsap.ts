"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Runs GSAP setup scoped to a section and reverts it on unmount.
 * Animations are skipped entirely when the user prefers reduced motion,
 * so every section stays fully readable without JS-driven motion.
 *
 *   const ref = useGsap<HTMLElement>((root) => { revealLines(root) });
 */
export function useGsap<T extends HTMLElement>(setup: (root: T, mm: gsap.MatchMedia) => void, deps: unknown[] = []): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => setup(root, mm), root);
    return () => {
      mm.revert();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/** Breakpoint queries shared by gsap.matchMedia() calls. */
export const MQ = {
  desktop: "(min-width: 1024px)",
  belowDesktop: "(max-width: 1023px)",
} as const;
