"use client";

import { useEffect, useRef, useState } from "react";
import { LINKS } from "@/content/links";
import { PRIMARY_NAV, SERVICE_GROUPS } from "@/content/navigation";
import { RollingLabel } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Services mega-dropdown (desktop). Opens on hover / click / keyboard, closes on Escape or outside click. */
function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div ref={wrap} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 text-paper"
      >
        <span className="t-md-medium capitalize">Services</span>
        <span className="relative size-5 shrink-0">
          <img
            src="/figma/chevron-down.svg"
            alt=""
            className={cn("absolute block max-w-none transition-[rotate] duration-500 ease-[var(--ease-out-expo)]", open && "rotate-180")}
            style={{ left: 4.47, top: 6.97 }}
          />
        </span>
      </button>

      <div
        id="services-menu"
        className={cn(
          "absolute top-full left-1/2 w-[720px] -translate-x-[30%] pt-7 transition-[opacity,translate,visibility] duration-500 ease-[var(--ease-out-expo)]",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <div className="grid grid-cols-3 gap-8 rounded-[16px] border border-paper-10 bg-[#0b0b0b]/95 p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {SERVICE_GROUPS.map((group, gi) => (
            <div key={group.title} className="flex flex-col gap-5">
              <a href={group.href} className="t-eyebrow text-paper-30 transition-colors hover:text-brand">
                {group.title}
              </a>
              <ul className="flex flex-col gap-3">
                {group.items.slice(0, 6).map((item, i) => (
                  <li
                    key={item}
                    className={cn(
                      "transition-[opacity,translate] duration-500 ease-[var(--ease-out-expo)]",
                      open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                    )}
                    style={{ transitionDelay: open ? `${80 + gi * 40 + i * 25}ms` : "0ms" }}
                  >
                    <a href="#" className="t-md-medium text-paper capitalize transition-colors hover:text-brand">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Sticky site header: full navigation on desktop, logo + CTA bar on mobile (bottom nav handles the rest). */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-bg-tertiary transition-shadow duration-500",
        scrolled && "shadow-[0_1px_0_rgba(255,255,255,0.08),0_12px_30px_-12px_rgba(0,0,0,0.6)]",
      )}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between">
        <div className="flex lg:w-[223px]">
          <a href="#top" aria-label="six2eight — home" className="block h-10 w-14 lg:h-12 lg:w-[68px]">
            <img src="/figma/logo.svg" alt="six2eight" className="block size-full" />
          </a>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {PRIMARY_NAV.map((item) =>
            "hasMenu" in item ? (
              <ServicesMenu key={item.label} />
            ) : (
              <a key={item.label} href={item.href} className="group relative text-paper">
                <span className="t-md-medium capitalize">{item.label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-paper transition-[scale] duration-500 ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ),
          )}
        </nav>

        <a href={LINKS.calendly} className="group/btn flex items-start justify-center">
          <span className="relative hidden size-11 shrink-0 overflow-hidden rounded-full bg-avatar-01 lg:block">
            <img src="/figma/avatar-1.webp" alt="" className="absolute top-[2px] left-[-8px] size-[62px] max-w-none object-cover" />
          </span>
          <span className="flex h-[34px] items-center justify-center rounded-full bg-bg-secondary px-3 transition-colors duration-500 ease-[var(--ease-out-expo)] group-hover/btn:bg-bg-brand lg:h-auto lg:px-4 lg:py-3">
            <span className="t-xs-medium whitespace-nowrap text-cta-ink lg:t-cta-16">
              <RollingLabel>Book a Consultation</RollingLabel>
            </span>
          </span>
        </a>
      </div>
    </header>
  );
}
