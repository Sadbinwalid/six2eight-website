"use client";

import { useEffect, useRef, type RefObject } from "react";
import { BrandButton } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { LINKS } from "@/content/links";
import { PROJECTS, WORK_TRACK } from "@/content/work";
import { useGsap, MQ } from "@/hooks/useGsap";
import { gsap, EASE, isFinePointer, revealLines, revealUp } from "@/lib/motion";
import { ProjectCard } from "./ProjectCard";

const HEADLINE = "Our Work, Turning Bold Ideas Into Digital Experiences";

/** Lime "View" badge that follows the cursor over project cards (desktop pointers). */
function CursorBadge({ scope }: { scope: RefObject<HTMLElement | null> }) {
  const badge = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scope.current;
    const el = badge.current;
    if (!root || !el || !isFinePointer()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const overCard = (e.target as HTMLElement).closest("[data-work-card]");
      gsap.to(el, { scale: overCard ? 1 : 0, autoAlpha: overCard ? 1 : 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    };
    const leave = () => gsap.to(el, { scale: 0, autoAlpha: 0, duration: 0.3 });
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
    };
  }, [scope]);

  return (
    <div
      ref={badge}
      aria-hidden
      className="pointer-events-none invisible fixed top-0 left-0 z-30 -mt-11 -ml-11 hidden size-[88px] scale-0 items-center justify-center rounded-full bg-bg-brand t-cta-16 text-black shadow-[0_10px_40px_rgba(154,253,13,0.35)] lg:flex"
    >
      View
    </div>
  );
}

export default function OurWork() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const ref = useGsap<HTMLElement>((root, mm) => {
    // mobile / tablet: simple reveals
    mm.add(MQ.belowDesktop, () => {
      revealLines("[data-work='stack-head']", "[data-work='stack-head']");
      gsap.utils.toArray<HTMLElement>("[data-work='stack'] [data-work-card]").forEach((card) => revealUp(card, card, { y: 60 }));
    });

    // desktop: typography first, then the cards stream bottom → top over ~3.5 scrolls (heisyai.com)
    mm.add(MQ.desktop, () => {
      const track = trackRef.current!;
      const header = () => Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;

      revealLines("[data-work='float-head']", root, "top 60%");
      gsap.from("[data-work='cta']", {
        y: 24,
        autoAlpha: 0,
        duration: 1,
        delay: 0.35,
        ease: EASE.out,
        scrollTrigger: { trigger: root, start: "top 60%" },
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinRef.current,
          start: () => `top ${header()}px`,
          end: () => `+=${window.innerHeight * 3.5}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(track, { y: () => window.innerHeight - header() + 40 }, { y: () => -WORK_TRACK.height - 40, duration: 1 }, 0);
      gsap.utils.toArray<HTMLElement>("[data-work='float'] [data-drift]").forEach((card) => {
        const d = Number(card.dataset.drift || 0);
        tl.fromTo(card, { y: d }, { y: -d, duration: 1 }, 0);
      });
    });
  });

  return (
    <section ref={ref} id="work" aria-labelledby="work-title" className="relative bg-bg-tertiary">
      {/* ---------- mobile / tablet ---------- */}
      <div className="container-page flex flex-col items-center gap-8 py-14 lg:hidden">
        <div data-work="stack-head">
          <RevealText id="work-title" text={HEADLINE} className="t-section w-[331px] text-center text-paper capitalize md:w-[520px]" />
        </div>
        <div data-work="stack" className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10">
          {PROJECTS.filter((p) => p.mobile).map((p) => (
            <ProjectCard key={p.name} project={p} variant="stack" />
          ))}
        </div>
        <BrandButton href={LINKS.ourWork}>View More Projects</BrandButton>
      </div>

      {/* ---------- desktop: pinned composition ---------- */}
      <div ref={pinRef} className="relative hidden h-[calc(100vh-var(--header-h))] min-h-[700px] overflow-hidden lg:block">
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div data-work="float-head" className="pointer-events-auto flex flex-col items-center gap-8">
            <RevealText as="p" text={HEADLINE} className="t-section w-[550px] text-center text-paper capitalize" />
            <div data-work="cta">
              <BrandButton href={LINKS.ourWork}>View More Projects</BrandButton>
            </div>
          </div>
        </div>

        <div className="container-page absolute inset-x-0 top-0">
          <div ref={trackRef} data-work="float" className="relative w-full will-change-transform" style={{ height: WORK_TRACK.height }}>
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                data-drift={p.desktop.drift}
                className="absolute"
                style={{ left: p.desktop.left, right: p.desktop.right, top: p.desktop.top }}
              >
                <ProjectCard project={p} variant="float" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <CursorBadge scope={ref} />
    </section>
  );
}
