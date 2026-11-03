import type { CSSProperties } from "react";

export type Service = {
  title: string;
  description: string;
  href: string;
  /** shown on hover (desktop) — only the first card's tags are designed in Figma */
  tags: string[];
  /** RGB of the 150° hover wash, sampled from the card artwork */
  tint: string;
  /** desktop row layout: "wide" = 701px column at 1440 */
  wide?: boolean;
  image: { src: string; style: CSSProperties; fill?: string };
};

export const SERVICE_ROWS: Service[][] = [
  [
    {
      title: "Website Design",
      description: "Six2eight excels with meticulous attention to detail, commitment to excellence, and creative problem-solving.",
      href: "#",
      tags: ["Website Design", "Website Audit", "SaaS Landing Page"],
      tint: "71, 148, 214",
      wide: true,
      image: {
        src: "/figma/svc-website.webp",
        style: { inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom" },
      },
    },
    {
      title: "Webflow Development",
      description: "six2eight excels with meticulous attention to detail, to excellence, and creative problem-solving.",
      href: "#",
      tags: ["Webflow Build", "CMS Setup", "Site Migration"],
      tint: "122, 112, 32",
      image: { src: "/figma/svc-webflow.webp", style: { inset: 0, width: "100%", height: "100%", objectFit: "cover" } },
    },
  ],
  [
    {
      title: "Mobile App Design",
      description: "six2eight excels with meticulous attention to detail, commitment to excellence.",
      href: "#",
      tags: ["iOS & Android", "UX Flows", "Prototyping"],
      tint: "30, 110, 190",
      image: { src: "/figma/svc-mobile.webp", style: { left: "-6.89%", top: "-0.09%", width: "113.78%", height: "106.43%" } },
    },
    {
      title: "Shopify Development",
      description: "six2eight excels with meticulous attention to detail, commitment to excellence.",
      href: "#",
      tags: ["Store Setup", "Theme Design", "Custom Apps"],
      tint: "80, 150, 225",
      image: { src: "/figma/svc-shopify.webp", style: { inset: 0, width: "100%", height: "100%", objectFit: "cover" } },
    },
    {
      title: "Wordpress Development",
      description: "six2eight excels with meticulous attention to detail, commitment to excellence.",
      href: "#",
      tags: ["Custom Theme", "WooCommerce", "Speed Fixes"],
      tint: "104, 150, 32",
      image: { src: "/figma/svc-wordpress.webp", style: { inset: 0, width: "100%", height: "100%", objectFit: "cover" } },
    },
  ],
  [
    {
      title: "Web Application Design & Development",
      description: "six2eight excels with meticulous attention to detail, to excellence, and creative problem-solving.",
      href: "#",
      tags: ["SaaS Dashboard", "Design System", "Frontend"],
      tint: "70, 140, 60",
      image: { src: "/figma/svc-webapp.webp", style: { left: "-2.95%", top: "0.01%", width: "138.74%", height: "115.37%" } },
    },
    {
      title: "Logo & Branding Design",
      description: "six2eight excels with meticulous attention to detail, commitment to excellence, and creative problem-solving.",
      href: "#",
      tags: ["Logo Design", "Brand Identity", "Guidelines"],
      tint: "110, 112, 80",
      wide: true,
      image: {
        src: "/figma/svc-branding.webp",
        fill: "#919476",
        style: { left: "5.7%", top: "15.27%", width: "94.33%", height: "84.82%" },
      },
    },
  ],
];
