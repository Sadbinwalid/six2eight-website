import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const BRAND_BUTTON =
  "group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-bg-brand px-5 py-4 t-cta-16 text-ink whitespace-nowrap isolate " +
  "transition-[scale,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:shadow-[0_10px_30px_-8px_rgba(154,253,13,0.6)] active:scale-[0.97] " +
  "lg:px-6 lg:py-5 lg:t-cta-18";

/** Text that rolls up to a second copy on hover — shared by every pill CTA. */
export function RollingLabel({ children, hoverClassName = "" }: { children: ReactNode; hoverClassName?: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-y-0",
          hoverClassName,
        )}
      >
        {children}
      </span>
    </span>
  );
}

/** Lime primary CTA (Button / CTA - 18 - Medium on desktop, 16 on mobile). */
export function BrandButton({
  children,
  href,
  className,
  type = "button",
  onClick,
  disabled,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const inner = (
    <>
      {/* soft light sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/2 -skew-x-12 bg-white/45 opacity-0 blur-md transition-[translate,opacity] duration-700 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-[300%] group-hover/btn:opacity-100"
      />
      <RollingLabel>{children}</RollingLabel>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cn(BRAND_BUTTON, className)} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} className={cn(BRAND_BUTTON, "disabled:opacity-60", className)} onClick={onClick}>
      {inner}
    </button>
  );
}

type Avatar = { src: string; bg: string; size?: number; ring?: boolean };

/** Overlapping avatars + lime CTA (Awards, Booking). Avatars hide on mobile per the mobile design. */
export function AvatarCta({ href, avatars, label = "Book a Consultation" }: { href: string; avatars: Avatar[]; label?: string }) {
  return (
    <div className="flex items-start justify-center">
      <div className="isolate hidden items-center lg:flex">
        {avatars.map((a, i) => (
          <span
            key={a.src}
            className={cn("relative size-[62px] shrink-0 overflow-hidden rounded-full", a.ring && "border-2 border-bg-primary")}
            style={{ backgroundColor: a.bg, marginRight: i < avatars.length - 1 ? -11 : 0, zIndex: avatars.length - i }}
          >
            <img
              src={a.src}
              alt=""
              loading="lazy"
              className="absolute top-0 left-1/2 max-w-none -translate-x-1/2 object-cover"
              style={{ width: a.size ?? 62, height: a.size ?? 62 }}
            />
          </span>
        ))}
      </div>
      <BrandButton href={href}>{label}</BrandButton>
    </div>
  );
}
