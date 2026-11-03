import type { CSSProperties } from "react";

export type Review = {
  quote: string;
  name: string;
  role: string;
  stats: { value: string; label: string }[];
  /** layered photo (base + optional crop) */
  photo: { base: string; overlay?: { src: string; style: CSSProperties } };
  /** white client logo over the photo */
  logo:
    { kind: "svg"; src: string; alt: string } | { kind: "mask"; src: string; alt: string; style: CSSProperties; pos: string; size: string };
};

const QUOTE =
  "“Concourse Accelerated Our Al Transformation By Months. The Concourse Team has Become Part of Our Finance Organization and Helped us get Real Al Results in the First Months.”";

const STATS = [
  { value: "~90%", label: "Time Saved" },
  { value: "5.00", label: "Ratings" },
  { value: "95%", label: "Increase Revenue" },
];

const DESIGNED: Review[] = [
  {
    quote: QUOTE,
    name: "Eme Alpargun",
    role: "Head of Brand Protection",
    stats: STATS,
    photo: { base: "/figma/t-photo-1.webp" },
    logo: { kind: "svg", src: "/figma/t-crecer.svg", alt: "Crecer" },
  },
  {
    quote: QUOTE,
    name: "Eme Alpargun",
    role: "Head of Brand Protection",
    stats: STATS,
    photo: {
      base: "/figma/t-photo-1.webp",
      overlay: { src: "/figma/t-photo-2.webp", style: { top: 0, left: "-60.3%", height: "100%", width: "191.87%" } },
    },
    logo: {
      kind: "mask",
      src: "/figma/t-crocs-mask.webp",
      alt: "Crocs",
      style: { left: -32.0, top: -13.01, width: 198.46, height: 53.04 },
      pos: "32.009px 9.156px",
      size: "137px 35.851px",
    },
  },
  {
    quote: QUOTE,
    name: "Eme Alpargun",
    role: "Head of Brand Protection",
    stats: STATS,
    photo: {
      base: "/figma/t-photo-1.webp",
      overlay: { src: "/figma/t-photo-3.webp", style: { top: "-15.42%", left: 0, height: "121.12%", width: "100%" } },
    },
    logo: {
      kind: "mask",
      src: "/figma/t-microsoft-mask.webp",
      alt: "Microsoft",
      style: { left: -5.576, top: -10.01, width: 148.14, height: 48.04 },
      pos: "5.571px 8.743px",
      size: "137px 31.187px",
    },
  },
];

/** ~6 reviews are planned; the three designed cards repeat until real content lands. */
export const REVIEWS: Review[] = [...DESIGNED, ...DESIGNED];
