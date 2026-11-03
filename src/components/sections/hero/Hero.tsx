"use client";

import { useCallback, useState } from "react";
import ParticleImage from "@/components/ui/ParticleImage";
import ShowreelModal from "@/components/ui/ShowreelModal";
import { ArrowIcon } from "@/components/ui/Arrow";
import { MaskShape } from "@/components/ui/MaskShape";
import { RevealText } from "@/components/ui/RevealText";
import { LINKS } from "@/content/links";
import { useGsap, MQ } from "@/hooks/useGsap";
import { gsap, EASE } from "@/lib/motion";
import { TrustBadge } from "./TrustBadge";
import { HeroGrid } from "./HeroGrid";

const SERVICE_LINKS = [
  {
    label: "UI/UX Design",
    href: LINKS.services.uiux,
    mask: {
      src: "/figma/icon-uiux-mask.webp",
      style: { left: 0.28, top: 3.65, width: 30.441, height: 24.353 },
      pos: "2.281px 0px",
      size: "25.15px 24.353px",
    },
  },
  {
    label: "Development",
    href: LINKS.services.development,
    mask: {
      src: "/figma/icon-dev-mask.webp",
      style: { left: -0.78, top: 3, width: 34, height: 24 },
      pos: "1.945px 4px",
      size: "29.653px 17.455px",
    },
  },
  {
    label: "Creative & Branding",
    href: LINKS.services.branding,
    mask: {
      src: "/figma/icon-brand-mask.webp",
      style: { left: 2.08, top: 1.66, width: 28.083, height: 29.667 },
      pos: "3.418px 2.336px",
      size: "21.167px 25px",
    },
  },
];

/* Particle "6" — sized per breakpoint from the Figma frames (mobile 244×264, desktop 458×496). */
const PARTICLES = [
  { className: "md:hidden top-[282px]", image: [244, 264], canvas: [460, 440], max: 2600 },
  { className: "hidden md:block lg:hidden top-[300px]", image: [340, 368], canvas: [640, 600], max: 4000 },
  { className: "hidden lg:block top-[328px] left-[calc(50%-5px)]!", image: [458, 496], canvas: [900, 760], max: 6000 },
] as const;

export default function Hero() {
  const [reelOpen, setReelOpen] = useState(false);
  const closeReel = useCallback(() => setReelOpen(false), []);

  const ref = useGsap<HTMLElement>((_, mm) => {
    const tl = gsap.timeline({ defaults: { ease: EASE.out, duration: 1.4 } });
    tl.from("[data-hero='badge']", { y: 24, autoAlpha: 0 }, 0.2)
      .from("[data-line]", { yPercent: 110, stagger: 0.07, duration: 1.3 }, 0.3)
      .from("[data-hero='reel']", { scale: 0.4, autoAlpha: 0, duration: 1.2 }, 0.75)
      .from("[data-hero='service']", { y: 20, autoAlpha: 0, stagger: 0.08 }, 0.9)
      .from("[data-hero='rule']", { scaleX: 0, transformOrigin: "left center", duration: 1.6 }, 0.9)
      .from("[data-hero='col']", { y: 120, autoAlpha: 0, stagger: 0.1, duration: 1.6, clearProps: "transform,opacity,visibility" }, 1.0);

    // gentle column parallax while the collage scrolls past (desktop)
    mm.add(MQ.desktop, () => {
      const travel = [-70, 30, -110];
      gsap.utils.toArray<HTMLElement>("[data-hero='col-inner']").forEach((col, i) => {
        gsap.to(col, {
          y: travel[i],
          ease: "none",
          scrollTrigger: { trigger: "[data-hero='grid']", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
  });

  return (
    <section ref={ref} id="top" aria-label="Introduction" className="relative overflow-hidden bg-bg-tertiary py-14 lg:pt-20 lg:pb-10">
      {PARTICLES.map((p) => (
        <div
          key={p.className}
          aria-hidden
          className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 ${p.className}`}
        >
          <ParticleImage
            src="/figma/particle-six.webp"
            imageWidth={p.image[0]}
            imageHeight={p.image[1]}
            width={p.canvas[0]}
            height={p.canvas[1]}
            maxParticles={p.max}
          />
        </div>
      ))}

      <div className="container-page relative flex flex-col items-center gap-12 lg:gap-16">
        <div className="flex w-full max-w-[742px] flex-col items-center gap-8 lg:gap-10">
          <div className="flex w-full flex-col items-center gap-3 lg:gap-5">
            <TrustBadge />
            <RevealText as="h1" text="Design & Development Digital Agency" className="t-display w-full text-center text-paper capitalize" />
          </div>

          {/* Showreel (desktop 100px, mobile 82px) */}
          <div data-hero="reel" className="flex size-[82px] items-center justify-center lg:size-[100px]">
            <button
              type="button"
              onClick={() => setReelOpen(true)}
              aria-label="Play showreel"
              className="group relative flex size-[100px] shrink-0 scale-82 flex-col items-center justify-center rounded-full border-6 border-paper-20 p-5 lg:scale-100"
            >
              <span
                data-motion="loop"
                className="pointer-events-none absolute -inset-[6px] rounded-full border border-brand/60 [animation:ring-pulse_2.6s_ease-out_infinite]"
              />
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <img
                  src="/figma/showreel-thumb.webp"
                  alt=""
                  data-motion="loop"
                  className="absolute top-[-14.33%] left-[-7.45%] h-[114.33%] w-[114.9%] max-w-none [animation:reel-pan_9s_ease-in-out_infinite]"
                />
              </span>
              <span className="relative flex items-center rounded-full bg-white py-1 pr-2 pl-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-[scale] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110">
                <span className="relative size-4 shrink-0">
                  <img src="/figma/play.svg" alt="" className="absolute block max-w-none" style={{ left: 2.83, top: 2.5 }} />
                </span>
                <span className="t-xs-medium whitespace-nowrap text-black">Showreel</span>
              </span>
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[19px]">
          {/* Service categories — each links to its service page (hidden on phones per the mobile design) */}
          <div className="relative hidden w-full flex-wrap items-center justify-between gap-4 py-5 md:flex">
            <span data-hero="rule" className="absolute bottom-0 left-0 h-px w-full bg-paper-30" />
            {SERVICE_LINKS.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                data-hero="service"
                className="group flex items-center gap-2"
                style={{ width: i < 2 ? 220 : undefined }}
              >
                <span className="relative size-8 shrink-0 overflow-hidden">
                  <MaskShape src={s.mask.src} color="#fff" style={s.mask.style} maskPosition={s.mask.pos} maskSize={s.mask.size} />
                </span>
                <span className="flex items-center gap-2">
                  <span className="t-md-semibold whitespace-nowrap text-paper transition-colors duration-500 group-hover:text-brand">
                    {s.label}
                  </span>
                  <ArrowIcon size={24} />
                </span>
              </a>
            ))}
          </div>

          <HeroGrid />
        </div>
      </div>

      <ShowreelModal open={reelOpen} onClose={closeReel} />
    </section>
  );
}
