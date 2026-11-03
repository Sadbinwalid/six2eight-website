"use client";

import { AvatarCta } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { LINKS } from "@/content/links";
import { useGsap } from "@/hooks/useGsap";
import { revealLines, revealUp } from "@/lib/motion";
import { CalendarWidget } from "./CalendarWidget";

/** "Consult strategy" + Calendly booking (annotation: keep the Calendly booking flow). */
export default function Booking() {
  const ref = useGsap<HTMLElement>((root) => {
    revealLines(root, root, "top 75%");
    revealUp("[data-bk='meta'] > *", "[data-bk='meta']", { y: 24, start: "top 90%" });
    revealUp("[data-bk='widget']", root, { y: 70, start: "top 70%" });
  });

  return (
    <section ref={ref} id="book-a-consultation" aria-labelledby="booking-title" className="pt-14 lg:pt-32">
      <div className="container-page flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex w-full flex-col items-start gap-8 xl:h-[520px] xl:w-[434px] xl:justify-between">
          <RevealText
            id="booking-title"
            text="Consult strategy To build stronger product"
            className="t-section w-[251px] text-black capitalize md:w-[420px] xl:w-full"
          />
          <div data-bk="meta" className="flex w-full flex-col items-start gap-5 xl:w-[351px] xl:gap-12">
            <div className="flex w-full flex-col items-start gap-5">
              <p className="text-[14px] leading-normal font-bold tracking-[0.14em] text-black uppercase lg:text-[16px]">Discovery Call</p>
              <ul className="flex w-full flex-col items-start gap-4 lg:gap-5">
                <li className="flex w-full items-center gap-2">
                  <span className="relative size-5 shrink-0">
                    <img src="/figma/clock.svg" alt="" className="absolute block max-w-none" style={{ left: 0.92, top: 0.92 }} />
                  </span>
                  <span className="t-sm-medium text-black lg:t-md-medium lg:capitalize">30 min</span>
                </li>
                <li className="flex w-full items-start gap-2">
                  <span className="relative mt-0.5 size-5 shrink-0">
                    <img src="/figma/video.svg" alt="" className="absolute block max-w-none" style={{ left: 0.92, top: 2.58 }} />
                  </span>
                  <span className="t-sm-medium text-black lg:t-md-medium lg:capitalize">
                    Web conferencing details provided upon confirmation.
                  </span>
                </li>
              </ul>
            </div>
            <AvatarCta
              href={LINKS.calendly}
              avatars={[
                { src: "/figma/avatar-2.webp", bg: "#e789ff", ring: true },
                { src: "/figma/avatar-1.webp", bg: "#7373ff", size: 88 },
              ]}
            />
          </div>
        </div>

        <CalendarWidget />
      </div>
    </section>
  );
}
