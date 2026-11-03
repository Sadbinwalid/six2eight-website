import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ArrowColor = "white" | "black" | "brand";

const ARROW_SRC: Record<ArrowColor, string> = {
  white: "/figma/arrow-up-right-white2.svg",
  black: "/figma/arrow-up-right-black.svg",
  brand: "/figma/arrow-up-right-green.svg",
};

/**
 * 45° "arrow-up-right" icon, positioned exactly like the Figma frame
 * (18 / 20 / 24px). Inside any `group` element it exits top-right and a
 * second copy slides in from bottom-left on hover.
 */
export function ArrowIcon({ color = "white", size = 20, className }: { color?: ArrowColor; size?: 18 | 20 | 24; className?: string }) {
  const src = size === 24 ? "/figma/arrow-up-right-white.svg" : ARROW_SRC[color];
  const offset = size === 24 ? 6.13 : size * 0.2515;
  const glyph = size === 24 ? 12.61 : size === 20 ? 10.72 : 9.65;
  const img = (
    <img
      src={src}
      alt=""
      aria-hidden
      className="absolute block max-w-none"
      style={{ left: offset, top: offset, width: glyph, height: glyph }}
    />
  );
  return (
    <span className={cn("relative block shrink-0 overflow-hidden", className)} style={{ width: size, height: size }}>
      <span className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-full group-hover:-translate-y-full">
        {img}
      </span>
      <span className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:translate-y-0">
        {img}
      </span>
    </span>
  );
}

/** "View on Google ↗" style text link. */
export function ArrowLink({
  href,
  children,
  color = "black",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  color?: ArrowColor;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn("group inline-flex items-center gap-0.5 lg:gap-1", className)}
    >
      <span className={cn("t-cta-14 whitespace-nowrap lg:text-[16px]", color === "white" ? "text-paper" : "text-black")}>{children}</span>
      <ArrowIcon color={color} size={20} />
    </a>
  );
}
