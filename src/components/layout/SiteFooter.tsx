"use client";

import { Magnetic } from "@/components/ui/Magnetic";
import { MaskShape } from "@/components/ui/MaskShape";
import { scrollToTop } from "@/components/layout/SmoothScroll";
import { ASK_AI, OFFICES, SOCIALS, type Office } from "@/content/footer";
import { LINKS } from "@/content/links";
import { COMPANY_LINKS, SERVICE_GROUPS } from "@/content/navigation";
import { useGsap } from "@/hooks/useGsap";
import { gsap, revealUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

const COLUMNS = [...SERVICE_GROUPS.map((g) => ({ title: g.title, items: [...g.items] })), { title: "Company", items: [...COMPANY_LINKS] }];

function OfficeIcon({ icon }: { icon: Office["icon"] }) {
  return (
    <span className="relative block size-12 shrink-0 overflow-hidden lg:size-[72px]">
      <span className="absolute top-0 left-0 block size-[72px] origin-top-left scale-[0.667] lg:scale-100">
        {icon.kind === "mask" ? (
          <MaskShape src={icon.src} color="#d9d9d9" style={icon.style} maskPosition={icon.pos} maskSize={icon.size} />
        ) : (
          <span className="absolute top-1/2 left-[calc(50%-10px)] block h-[72px] w-11 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
            <img src={icon.src} alt="" loading="lazy" className="absolute top-[-22.4%] left-[-69.07%] h-[144.8%] w-[237.95%] max-w-none" />
          </span>
        )}
      </span>
    </span>
  );
}

export default function SiteFooter() {
  const ref = useGsap<HTMLElement>(() => {
    revealUp("[data-ft='col']", "[data-ft='cols']", { y: 30 });
    gsap.fromTo(
      "[data-ft='wordmark']",
      { yPercent: 70 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: "[data-ft='wordmark-wrap']", start: "top bottom", end: "bottom bottom", scrub: true },
      },
    );
  });

  return (
    <footer ref={ref} className="overflow-hidden bg-bg-tertiary pt-14 lg:pt-24">
      <div className="container-page flex flex-col items-start gap-10 lg:gap-20">
        <div className="flex w-full flex-col items-start gap-10 lg:gap-16">
          {/* logo + socials */}
          <div className="flex w-full flex-col items-start gap-[26px] lg:flex-row lg:items-center lg:justify-between">
            <a href="#top" aria-label="six2eight — back to top" className="block h-10 w-14 lg:h-[90.347px] lg:w-32">
              <img src="/figma/footer-logo.svg" alt="six2eight" className="block size-full" />
            </a>
            <ul className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex size-12 items-center justify-center overflow-hidden rounded-[30px] border border-paper-20 transition-[background-color,border-color,translate] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-paper-30 hover:bg-paper-10 lg:size-14"
                  >
                    <img src={s.icon} alt="" className="block size-[30px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <span aria-hidden className="block h-px w-full bg-paper-10" />

          {/* link columns: 2×2 on mobile, one row on desktop */}
          <nav
            aria-label="Footer"
            data-ft="cols"
            className="grid w-full grid-cols-2 gap-x-4 gap-y-12 lg:flex lg:items-start lg:justify-between lg:gap-0"
          >
            {COLUMNS.map((c, i) => (
              <div
                key={c.title}
                data-ft="col"
                className={cn("flex min-w-0 flex-col items-start gap-8 lg:gap-10", i !== 1 && "lg:w-[171px]")}
              >
                <p className="t-eyebrow w-full text-paper-30">{c.title}</p>
                <ul className="flex flex-col items-start gap-5">
                  {c.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="t-sm-medium text-paper capitalize transition-colors duration-300 hover:text-brand lg:t-md-medium lg:whitespace-nowrap"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <span aria-hidden className="hidden h-px w-full bg-paper-10 lg:block" />

          {/* ask AI */}
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center lg:gap-6">
            <p className="t-sm-regular whitespace-nowrap text-paper-80">Learn about Six2Eight From AI</p>
            <ul className="flex items-center gap-3">
              {ASK_AI.map((a) => (
                <li key={a.name}>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ask ${a.name} about six2eight (opens in a new tab)`}
                    className="grid size-12 place-items-center rounded-full bg-paper-5 backdrop-blur-[20px] transition-[background-color,scale] duration-500 ease-[var(--ease-out-expo)] hover:scale-105 hover:bg-paper-10 lg:size-[55.984px]"
                  >
                    <span className="relative block size-[23.984px]">
                      <img
                        src={a.icon}
                        alt=""
                        className="absolute block max-w-none"
                        style={a.offset.left || a.offset.top ? a.offset : { inset: 0, width: "100%", height: "100%" }}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* offices */}
        <ul className="flex w-full flex-col items-start gap-8 rounded-[16px] bg-paper-5 p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-10">
          {OFFICES.map((o, i) => (
            <li key={o.city} className="contents">
              {i > 0 && <span aria-hidden className="block h-px w-full bg-paper-10 lg:hidden" />}
              <address className="flex w-64 flex-col items-start gap-6 not-italic">
                <OfficeIcon icon={o.icon} />
                <span className="flex w-full flex-col items-start gap-3 lg:gap-4">
                  <span className="t-md-semibold text-paper lg:t-xl-semibold">{o.city}</span>
                  <span className="t-sm-regular text-paper-80 lg:t-md-regular">
                    <span className="block lg:mb-4">{o.address}</span>
                    <a href={`tel:${o.phone.replace(/[^\d+]/g, "")}`} className="block transition-colors hover:text-brand">
                      {o.phone}
                    </a>
                  </span>
                </span>
              </address>
            </li>
          ))}
        </ul>

        {/* credits */}
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between lg:contents">
            <a href={LINKS.companyProfile} download className="group flex items-center gap-2 lg:order-1 lg:gap-3">
              <span className="relative block size-10 shrink-0 overflow-hidden rounded-full bg-brand transition-[scale] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105 lg:size-12">
                <span className="absolute top-1/2 left-1/2 block size-6 -translate-x-1/2 -translate-y-1/2">
                  <img
                    src="/figma/download.svg"
                    alt=""
                    className="absolute block max-w-none transition-[translate] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5"
                    style={{ left: 3.29, top: 4.5 }}
                  />
                </span>
              </span>
              <span className="t-md-medium whitespace-nowrap text-paper-80 opacity-80 transition-opacity group-hover:opacity-100 lg:t-xl-medium">
                Company Profile
              </span>
            </a>
            <div className="flex lg:order-3 lg:w-52 lg:justify-end">
              <Magnetic strength={0.35}>
                <button
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  className="group relative block size-10 shrink-0 overflow-hidden rounded-full bg-bg-secondary transition-[scale] duration-500 ease-[var(--ease-out-expo)] hover:scale-105 lg:size-12"
                >
                  <span className="absolute top-1/2 left-1/2 block size-6 -translate-x-1/2 -translate-y-1/2">
                    <span
                      className="absolute -scale-y-100 transition-[translate] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
                      style={{ left: 7, top: 4, width: 10, height: 16 }}
                    >
                      <img
                        src="/figma/arrow-up.svg"
                        alt=""
                        className="absolute block max-w-none"
                        style={{ left: -0.707, top: 0, width: 11.414, height: 17.414 }}
                      />
                    </span>
                  </span>
                </button>
              </Magnetic>
            </div>
          </div>
          <span aria-hidden className="block h-px w-full bg-paper-10 lg:hidden" />
          <p className="t-sm-regular text-center whitespace-nowrap text-paper-80 lg:order-2 lg:t-md-regular">
            ©2026 Six2Eight. All rights reserved.
          </p>
        </div>
      </div>

      {/* giant wordmark */}
      <div
        data-ft="wordmark-wrap"
        className="relative mx-auto mt-10 grid w-full max-w-[1920px] overflow-hidden lg:mt-6"
        style={{ aspectRatio: "1440/241" }}
      >
        <img
          data-ft="wordmark"
          src="/figma/footer-wordmark.svg"
          alt=""
          className="col-start-1 row-start-1 mt-[1.39%] block w-full max-w-none"
        />
        <div
          aria-hidden
          className="pointer-events-none col-start-1 row-start-1 size-full"
          style={{ backgroundImage: "linear-gradient(to bottom, rgba(154,253,13,0) 18.008%, rgba(154,253,13,0.5) 203.07%)" }}
        />
      </div>
    </footer>
  );
}
