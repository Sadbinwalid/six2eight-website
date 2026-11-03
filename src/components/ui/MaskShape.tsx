import type { CSSProperties } from "react";

/** Inline styles that clip an element to an image mask (Figma "mask group" export). */
export function maskStyles(src: string, position = "0 0", size = "100% 100%"): CSSProperties {
  return {
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: position,
    maskPosition: position,
    WebkitMaskSize: size,
    maskSize: size,
  };
}

/**
 * A solid colour clipped by an image mask — how Figma exports single-colour
 * logos and dotted icons. Pass the exact Figma geometry (position, mask
 * offset and mask size) so the shape lands on the same pixels as the design.
 */
export function MaskShape({
  src,
  color,
  style,
  maskPosition = "0 0",
  maskSize = "100% 100%",
  className = "",
}: {
  src: string;
  color: string;
  style?: CSSProperties;
  maskPosition?: string;
  maskSize?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`absolute block ${className}`}
      style={{ backgroundColor: color, ...maskStyles(src, maskPosition, maskSize), ...style }}
    />
  );
}
