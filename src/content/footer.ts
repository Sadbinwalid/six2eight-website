import { LINKS } from "./links";

export const SOCIALS = [
  { name: "LinkedIn", icon: "/figma/s-linkedin.svg", href: LINKS.social.linkedin },
  { name: "Instagram", icon: "/figma/s-instagram.svg", href: LINKS.social.instagram },
  { name: "Dribbble", icon: "/figma/s-dribbble.svg", href: LINKS.social.dribbble },
  { name: "Behance", icon: "/figma/s-behance.svg", href: LINKS.social.behance },
  { name: "Webflow", icon: "/figma/s-webflow.svg", href: LINKS.social.webflow },
];

/** Icon offsets are the Figma geometry inside a 24px frame */
export const ASK_AI = [
  { name: "ChatGPT", href: LINKS.askAi.chatgpt, icon: "/figma/ai-chatgpt.svg", offset: { left: 1.4, top: 1.22 } },
  { name: "Claude", href: LINKS.askAi.claude, icon: "/figma/ai-claude.svg", offset: { left: 0, top: 0 } },
  { name: "Perplexity", href: LINKS.askAi.perplexity, icon: "/figma/ai-perplexity.svg", offset: { left: 4.47, top: 2.0 } },
  { name: "Google AI Mode", href: LINKS.askAi.google, icon: "/figma/ai-google.svg", offset: { left: 0, top: 0 } },
];

/* Placeholder addresses — all three offices currently share the London address in Figma. */
const ADDRESS = "1st Floor, 12-16 Clerkenwell Road, London, ECIM 5PQ, United Kingdom";
const PHONE = "+44 (9)203 882 7872";

export type Office = {
  city: string;
  address: string;
  phone: string;
  icon:
    | { kind: "mask"; src: string; style: { left: number; top: number; width: number; height: number }; pos: string; size: string }
    | { kind: "image"; src: string };
};

export const OFFICES: Office[] = [
  {
    city: "USA",
    address: ADDRESS,
    phone: PHONE,
    icon: {
      kind: "mask",
      src: "/figma/loc-usa-mask.webp",
      style: { left: -2.59, top: -7.41, width: 75.176, height: 85.765 },
      pos: "10.588px 7.412px",
      size: "54.614px 72px",
    },
  },
  {
    city: "Saudi Arabia",
    address: ADDRESS,
    phone: PHONE,
    icon: {
      kind: "mask",
      src: "/figma/loc-saudi-mask.webp",
      style: { left: 1.33, top: -2.84, width: 69.257, height: 77.584 },
      pos: "1.665px 2.841px",
      size: "66.11px 72px",
    },
  },
  { city: "Dubai", address: ADDRESS, phone: PHONE, icon: { kind: "image", src: "/figma/loc-dubai.webp" } },
];
