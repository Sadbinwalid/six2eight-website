"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { LINKS } from "@/content/links";
import { SERVICE_GROUPS } from "@/content/navigation";
import { MaskShape } from "@/components/ui/MaskShape";
import { cn } from "@/lib/cn";

type Sheet = "services" | "more" | null;

/** Dotted icons from the Figma bottom-nav, cropped exactly as exported (16.5px glyph in a 24px frame). */
function NavIcon({
  src,
  imgStyle,
  box = { width: 16.5, height: 16.5 },
}: {
  src: string;
  imgStyle: CSSProperties;
  box?: { width: number; height: number };
}) {
  return (
    <span className="relative size-6 shrink-0 overflow-hidden">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden" style={box}>
        <img src={src} alt="" className="absolute max-w-none" style={imgStyle} />
      </span>
    </span>
  );
}

const ITEM =
  "flex w-[68px] flex-col items-center justify-center gap-1 p-4 text-[10px] leading-none tracking-[-0.03em] text-paper-80 transition-colors active:text-brand";

/**
 * Mobile / tablet bottom navigation ("Mobile_Final_With Bottom Nav" frame):
 * Work · Services · [primary action] · Pricing · More. Services and More open
 * a sheet above the bar.
 */
export default function MobileNav() {
  const [sheet, setSheet] = useState<Sheet>(null);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  const toggle = (s: Exclude<Sheet, null>) => setSheet((cur) => (cur === s ? null : s));

  return (
    <div className="lg:hidden">
      {/* backdrop */}
      <div
        aria-hidden
        onClick={() => setSheet(null)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-500",
          sheet ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* sheet */}
      <div
        id="mobile-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={sheet === "services" ? "Services" : "More"}
        aria-hidden={!sheet}
        className={cn(
          "fixed inset-x-3 bottom-[calc(var(--bottom-nav-h)+12px)] z-40 max-h-[70vh] overflow-y-auto rounded-[16px] border border-paper-10 bg-[#0b0b0b] p-5 transition-[opacity,translate,visibility] duration-500 ease-[var(--ease-out-expo)]",
          sheet ? "visible translate-y-0 opacity-100" : "invisible translate-y-6 opacity-0",
        )}
        data-lenis-prevent
      >
        {sheet === "services" && (
          <div className="flex flex-col gap-6">
            {SERVICE_GROUPS.map((g) => (
              <div key={g.title} className="flex flex-col gap-3">
                <a href={g.href} className="t-eyebrow text-paper-30">
                  {g.title}
                </a>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {g.items.map((item) => (
                    <li key={item}>
                      <a href="#" onClick={() => setSheet(null)} className="t-sm-medium text-paper capitalize">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {sheet === "more" && (
          <ul className="flex flex-col">
            {[
              { label: "About us", href: LINKS.about },
              { label: "Resources", href: LINKS.resources },
              { label: "Pricing", href: LINKS.pricing },
              { label: "FAQ", href: "#faq" },
              { label: "Book a Consultation", href: LINKS.calendly },
            ].map((l) => (
              <li key={l.label} className="border-b border-paper-10 last:border-b-0">
                <a
                  href={l.href}
                  onClick={() => setSheet(null)}
                  className="t-card-title flex items-center justify-between py-3.5 text-paper"
                >
                  {l.label}
                  <span aria-hidden className="text-paper-30">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* bar */}
      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-50 h-[var(--bottom-nav-h)] pb-[env(safe-area-inset-bottom)] drop-shadow-[0_-6px_17px_rgba(255,255,255,0.12)]"
      >
        <div aria-hidden className="absolute inset-0 flex">
          <span className="flex-1 bg-black" />
          <img src="/figma/m-bottomnav-shape.svg" alt="" className="block h-[72px] w-[393px] shrink-0" />
          <span className="flex-1 bg-black" />
        </div>
        <div className="relative mx-auto flex h-[72px] max-w-[393px] items-center justify-between px-4">
          <div className="flex items-center">
            <a href={LINKS.ourWork} className={ITEM}>
              <NavIcon src="/figma/m-icon-work.webp" imgStyle={{ left: "-46.12%", top: "-44.79%", width: "190.46%", height: "190.46%" }} />
              Work
            </a>
            <button
              type="button"
              aria-expanded={sheet === "services"}
              aria-controls="mobile-sheet"
              onClick={() => toggle("services")}
              className={cn(ITEM, sheet === "services" && "text-brand")}
            >
              <NavIcon
                src="/figma/m-icon-services.webp"
                imgStyle={{ left: "-61.84%", top: "-61.84%", width: "223.68%", height: "223.68%" }}
              />
              Services
            </button>
          </div>
          <div className="flex items-center">
            <a href={LINKS.pricing} className={ITEM}>
              <NavIcon
                src="/figma/m-icon-pricing.webp"
                imgStyle={{ left: "-59.23%", top: "-59.23%", width: "218.46%", height: "218.46%" }}
              />
              Pricing
            </a>
            <button
              type="button"
              aria-expanded={sheet === "more"}
              aria-controls="mobile-sheet"
              onClick={() => toggle("more")}
              className={cn(ITEM, sheet === "more" && "text-brand")}
            >
              <NavIcon
                src="/figma/m-icon-more.webp"
                box={{ width: 16.5, height: 11.25 }}
                imgStyle={{ left: "-60%", top: "-115%", width: "220%", height: "330%" }}
              />
              More
            </button>
          </div>

          {/* primary action — raised lime ring */}
          <a
            href="#contact"
            aria-label="Start a project"
            className="absolute top-[calc(50%-36px)] left-[calc(50%-0.5px)] flex size-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand bg-black shadow-[0_6px_30px_rgba(154,253,13,0.6)] transition-[scale] duration-300 active:scale-95"
          >
            <span className="relative size-[30px] overflow-hidden">
              <MaskShape
                src="/figma/icon-uiux-mask.webp"
                color="#fff"
                style={{ left: 0.28, top: 3.65, width: 30.441, height: 24.353 }}
                maskPosition="2.281px 0px"
                maskSize="25.15px 24.353px"
              />
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
}
