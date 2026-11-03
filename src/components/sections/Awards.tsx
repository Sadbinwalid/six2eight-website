"use client";

import { ArrowLink } from "@/components/ui/Arrow";
import { AvatarCta } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { AWARDS, AWARD_BLURB } from "@/content/awards";
import { LINKS } from "@/content/links";
import { useGsap } from "@/hooks/useGsap";
import { revealLines, revealUp } from "@/lib/motion";

export default function Awards() {
  const ref = useGsap<HTMLElement>((root) => {
    revealLines(root, root, "top 75%");
    revealUp("[data-aw='card']", "[data-aw='cards']", { y: 60 });
    revealUp("[data-aw='cta']", "[data-aw='cta']", { y: 24, start: "top 95%" });
  });

  return (
    <section ref={ref} aria-labelledby="awards-title" className="py-14 lg:py-32">
      <div className="container-page flex flex-col items-center gap-6 lg:gap-14">
        <RevealText
          id="awards-title"
          text="achievement & Awards"
          className="t-section w-[223px] text-center text-black capitalize md:w-auto lg:w-full lg:text-left"
        />

        {/* horizontal snap scroller on mobile/tablet, four equal cards on desktop */}
        <ul
          data-aw="cards"
          className="-mx-4 flex w-[calc(100%+32px)] snap-x snap-mandatory gap-3 overflow-x-auto px-4 [scrollbar-width:none] md:-mx-8 md:w-[calc(100%+64px)] md:px-8 lg:mx-0 lg:w-full lg:gap-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {AWARDS.map((a) => (
            <li
              key={a.platform}
              data-aw="card"
              className="relative flex h-[300px] w-[250px] shrink-0 snap-start flex-col items-start justify-between rounded-[16px] border border-ink-10 bg-bg-secondary p-5 transition-[translate,box-shadow] duration-700 ease-[var(--ease-out-expo)] lg:h-[390px] lg:w-auto lg:min-w-0 lg:flex-1 lg:p-8 lg:hover:-translate-y-1.5 lg:hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.15)]"
            >
              <div className="flex w-full items-center justify-between">
                <span className="relative block h-[22px] w-[70px] overflow-hidden lg:h-[31px] lg:w-[100px]">
                  <img
                    src={a.logo.src}
                    alt={a.platform}
                    loading="lazy"
                    className={a.logo.fit === "contain" ? "block size-full object-contain object-left" : "block size-full"}
                  />
                </span>
                <span className="flex items-center gap-1 rounded-full px-2 py-1 lg:px-3 lg:py-1.5" style={{ backgroundColor: a.tone.bg }}>
                  <img src={a.tone.star} alt="" className="block size-3.5 lg:size-[19.654px]" />
                  <span
                    className="text-[14px] leading-none font-medium tracking-[-0.03em] lg:text-[16px] lg:leading-6"
                    style={{ color: a.tone.ink }}
                  >
                    {a.rating}
                    <span className="sr-only"> rating on {a.platform}</span>
                  </span>
                </span>
              </div>
              <p className="t-sm-medium w-full text-ink-80 lg:text-[16px] lg:leading-[23px] lg:tracking-[-0.02em] lg:capitalize">
                {AWARD_BLURB}
              </p>
              <ArrowLink href={a.href} external>
                View on {a.platform}
              </ArrowLink>
            </li>
          ))}
        </ul>

        <div data-aw="cta">
          <AvatarCta href={LINKS.calendly} avatars={[{ src: "/figma/avatar-2.webp", bg: "#e789ff" }]} />
        </div>
      </div>
    </section>
  );
}
