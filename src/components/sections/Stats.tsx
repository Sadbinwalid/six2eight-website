"use client";

import type { PointerEvent } from "react";
import ParticleImage from "@/components/ui/ParticleImage";
import { Counter } from "@/components/ui/Counter";
import { RevealText } from "@/components/ui/RevealText";
import { STATS } from "@/content/stats";
import { useGsap } from "@/hooks/useGsap";
import { revealLines, revealUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

const VDivider = () => (
  <span
    aria-hidden
    className="hidden h-[127px] w-px shrink-0 self-center lg:block"
    style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.4), rgba(255,255,255,0))" }}
  />
);

/** Track the cursor inside the glass panel so a soft lime light follows it. */
function onPanelMove(e: PointerEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Stats() {
  const ref = useGsap<HTMLElement>((root) => {
    revealLines(root, root, "top 70%");
    revealUp("[data-st='panel']", "[data-st='panel']", { y: 60 });
  });

  return (
    <section ref={ref} aria-labelledby="stats-title" className="relative overflow-hidden bg-bg-tertiary py-14 lg:py-32">
      {/* particle "6" behind the glass (mobile 505×547 centred, desktop 674×731 at +92.5px) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[calc(50%+1px)] -translate-x-1/2 -translate-y-1/2 lg:top-[calc(50%+92.5px)] lg:left-[calc(50%-1px)]"
      >
        {/* soft glow of the same artwork — what the frosted glass picks up and diffuses */}
        <img
          src="/figma/particle-six.webp"
          alt=""
          className="absolute top-1/2 left-1/2 h-[547px] w-[505px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80 blur-[14px] lg:h-[731px] lg:w-[674px]"
        />
        <div className="relative lg:hidden">
          <ParticleImage
            src="/figma/particle-six.webp"
            imageWidth={505}
            imageHeight={547}
            width={720}
            height={760}
            maxParticles={3200}
            radius={0.9}
          />
        </div>
        <div className="relative hidden lg:block">
          <ParticleImage
            src="/figma/particle-six.webp"
            imageWidth={674}
            imageHeight={731}
            width={1100}
            height={1000}
            maxParticles={7000}
            radius={0.9}
          />
        </div>
      </div>

      <div className="container-page relative flex flex-col items-center gap-8 lg:gap-14">
        <RevealText
          id="stats-title"
          text="Why brands choose six2eight"
          className="t-section w-[331px] text-center text-paper capitalize md:w-[480px] lg:w-[594px]"
        />

        <div
          data-st="panel"
          onPointerMove={onPanelMove}
          className="glass group/panel w-full overflow-hidden rounded-[12px] [--glass-tint:rgb(255_255_255/0.1)] lg:rounded-[16px] lg:[--glass-tint:rgb(255_255_255/0.05)]"
        >
          {/* cursor light */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover/panel:opacity-100"
            style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(154,253,13,0.09), transparent 65%)" }}
          />
          <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1px_1fr_1px_1fr]">
            {STATS.map((s, k) => (
              <div key={s.label} className="contents">
                {k % 3 !== 0 && <VDivider />}
                <div
                  className={cn(
                    "flex min-w-0 flex-col-reverse items-start justify-center gap-4 border-paper-10 px-6 py-10 lg:h-[250px] lg:gap-6 lg:px-10 lg:py-0 xl:px-16",
                    k > 0 && "border-t",
                    k < 2 && "md:border-t-0",
                    k % 2 === 0 && "md:border-r",
                    "lg:border-r-0",
                    k < 3 ? "lg:border-t-0" : "lg:border-t",
                  )}
                >
                  <dt className="text-[16px] leading-6 tracking-[-0.02em] text-paper-80 lg:t-xl-regular lg:tracking-normal">{s.label}</dt>
                  <dd className="-mb-[23px] flex items-baseline gap-1 whitespace-nowrap text-paper">
                    <Counter
                      value={s.value}
                      unit={s.unit}
                      delay={k * 110}
                      className="text-[48px] leading-none tracking-[-0.03em] lg:text-[72px]"
                    />
                    <span className="text-[32px] leading-none tracking-[-0.035em] lg:text-[48px]">{s.suffix}</span>
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
