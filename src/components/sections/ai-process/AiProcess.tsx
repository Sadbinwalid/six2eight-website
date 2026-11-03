"use client";

import ParticleImage from "@/components/ui/ParticleImage";
import { PROCESS_STEPS } from "@/content/ai-process";
import { useGsap, MQ } from "@/hooks/useGsap";
import { gsap, EASE } from "@/lib/motion";
import { ProcessCard } from "./ProcessCard";

const WORD =
  "w-full font-semibold capitalize text-white tracking-[-0.03em] leading-normal text-[clamp(64px,11.61vw,167.2px)] [text-box:trim-both_cap_alphabetic]";

/** Type the AI line of a card out character by character, with a blinking caret. */
function typeOut(card: Element, delay = 0) {
  const target = card.querySelector<HTMLElement>("[data-ai='typed']");
  const caret = card.querySelector<HTMLElement>("[data-ai='caret']");
  if (!target) return gsap.timeline();
  const full = target.dataset.text ?? "";
  const state = { n: 0 };
  return gsap
    .timeline({ delay })
    .set(caret, { opacity: 1 })
    .to(state, {
      n: full.length,
      duration: Math.min(1.4, full.length * 0.035),
      ease: "none",
      onUpdate: () => {
        target.textContent = full.slice(0, Math.round(state.n));
      },
    })
    .to(caret, { opacity: 0, duration: 0.2, repeat: 3, yoyo: true })
    .set(caret, { opacity: 0 });
}

export default function AiProcess() {
  const ref = useGsap<HTMLElement>((root, mm) => {
    const cards = gsap.utils.toArray<HTMLElement>("[data-ai='card']");

    // AI lines start empty and are "generated" as each step activates
    cards.forEach((c) => {
      const t = c.querySelector<HTMLElement>("[data-ai='typed']");
      if (t) t.textContent = "";
    });

    gsap.from(cards, {
      y: 80,
      autoAlpha: 0,
      duration: 1.3,
      stagger: 0.1,
      ease: EASE.out,
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger: "[data-ai='cards']", start: "top 85%" },
    });

    // Process flow: step bars fill one after another while the cards cross the viewport,
    // and each step's AI contribution types itself out as it activates.
    const flow = gsap.timeline({
      scrollTrigger: { trigger: "[data-ai='cards']", start: "top 75%", end: "bottom 35%", scrub: 0.6 },
    });
    cards.forEach((card, i) => {
      flow.fromTo(card.querySelector("[data-ai='progress']"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, i);
    });
    cards.forEach((card, i) => {
      gsap.timeline({
        scrollTrigger: { trigger: "[data-ai='cards']", start: "top 75%", onEnter: () => typeOut(card, 0.35 + i * 0.45) },
      });
    });

    // oversized words drift apart / together with scroll (desktop)
    mm.add(MQ.desktop, () => {
      const st = { trigger: root, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo("[data-ai='word-1']", { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-ai='word-2']", { xPercent: 8 }, { xPercent: -8, ease: "none", scrollTrigger: st });
    });
  });

  return (
    <section ref={ref} aria-labelledby="ai-title" className="relative overflow-hidden bg-bg-subtle py-14 lg:py-32">
      <h2 id="ai-title" className="sr-only">
        How we use AI in design &amp; development
      </h2>

      {/* Grey particle "6" — reacts to the cursor like the hero, much quieter */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
        <div className="lg:hidden">
          <ParticleImage
            src="/figma/ai-bg-graphic.webp"
            imageWidth={630}
            imageHeight={682}
            width={760}
            height={820}
            maxParticles={2600}
            radius={0.9}
            repelForce={6}
          />
        </div>
        <div className="hidden lg:block">
          <ParticleImage
            src="/figma/ai-bg-graphic.webp"
            imageWidth={795}
            imageHeight={862}
            width={1000}
            height={1000}
            maxParticles={5200}
            radius={0.9}
            repelForce={6}
          />
        </div>
      </div>

      <div className="container-page relative">
        <div className="flex w-full flex-col items-start">
          <p aria-hidden data-ai="word-1" className={WORD}>
            artificial
          </p>
          <div data-ai="cards" className="grid w-full grid-cols-2 gap-2 md:gap-4 lg:flex lg:items-stretch lg:gap-5 [&>*]:lg:flex-1">
            {PROCESS_STEPS.map((step) => (
              <ProcessCard key={step.title} step={step} />
            ))}
          </div>
          <p aria-hidden data-ai="word-2" className={`${WORD} text-right`}>
            intelligence
          </p>
        </div>
      </div>
    </section>
  );
}
