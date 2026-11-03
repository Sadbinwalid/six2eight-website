export type Project = {
  name: string;
  tags: string[];
  size: "lg" | "sm";
  href: string;
  /**
   * Desktop composition (Figma "Our Work", 1216px container):
   * horizontal anchor + y offset in px. `drift` = extra parallax travel.
   */
  desktop: { left?: string; right?: string; top: number; drift: number };
  /** image key — the Revive AI card is a composed mockup */
  image: string | "revive";
  /** included in the stacked mobile / tablet list (Figma mobile shows four) */
  mobile?: boolean;
};

export const PROJECTS: Project[] = [
  {
    name: "InMind - Mental Health",
    tags: ["UI/UX", "Frontend", "Website"],
    size: "lg",
    href: "#",
    desktop: { left: "0%", top: 0, drift: 140 },
    image: "/figma/work-inmind.webp",
    mobile: true,
  },
  {
    name: "elora",
    tags: ["UI/UX", "Branding"],
    size: "sm",
    href: "#",
    desktop: { left: "47.32%", top: 194.52, drift: 110 },
    image: "/figma/work-elora.webp",
    mobile: true,
  },
  {
    name: "Nova Ring",
    tags: ["UI/UX", "3D", "WebGL"],
    size: "lg",
    href: "#",
    desktop: { right: "0%", top: 0, drift: 60 },
    image: "/figma/work-novaring.webp",
    mobile: true,
  },
  {
    name: "Metrivo",
    tags: ["Branding", "CMS"],
    size: "lg",
    href: "#",
    desktop: { left: "0%", top: 924, drift: -80 },
    image: "/figma/work-metrivo.webp",
    mobile: true,
  },
  {
    name: "Revive AI",
    tags: ["Research", "Saas", "Branding"],
    size: "sm",
    href: "#",
    desktop: { left: "42.2%", top: 924, drift: -110 },
    image: "revive",
  },
  {
    name: "Aevum",
    tags: ["UI/UX", "Website", "SaaS"],
    size: "lg",
    href: "#",
    desktop: { right: "0%", top: 1050.664, drift: -40 },
    image: "/figma/work-aevum.webp",
  },
];

/** Figma composition metrics (px) used by the pinned scroll on desktop */
export const WORK_TRACK = {
  height: 1488,
  /** vertical centre of the headline slot inside the track */
  slotCenter: 701,
};
