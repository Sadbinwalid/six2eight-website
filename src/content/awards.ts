import { LINKS } from "./links";

export type Award = {
  platform: string;
  logo: { src: string; fit?: "contain" };
  rating: string;
  /** pill background / ink / star icon */
  tone: { bg: string; ink: string; star: string };
  href: string;
};

export const AWARD_BLURB = "Leading Design & Development Company of 2026.";

export const AWARDS: Award[] = [
  {
    platform: "Google",
    logo: { src: "/figma/google-wordmark.svg" },
    rating: "5.00",
    tone: { bg: "#fef2cd", ink: "#977102", star: "/figma/star-yellow.svg" },
    href: LINKS.reviews.google,
  },
  {
    platform: "Upwork",
    logo: { src: "/figma/upwork-wordmark.webp", fit: "contain" },
    rating: "5.00",
    tone: { bg: "#ebffcf", ink: "#243d01", star: "/figma/star-green.svg" },
    href: LINKS.reviews.upwork,
  },
  {
    platform: "Clutch",
    logo: { src: "/figma/clutch-wordmark.svg" },
    rating: "5.00",
    tone: { bg: "#fbd3d0", ink: "#590e08", star: "/figma/star-red.svg" },
    href: LINKS.reviews.clutch,
  },
  {
    platform: "Dribbble",
    logo: { src: "/figma/dribbble-wordmark.svg" },
    rating: "5.00",
    tone: { bg: "#ffeefa", ink: "#ad007c", star: "/figma/star-magenta.svg" },
    href: LINKS.reviews.dribbble,
  },
];
