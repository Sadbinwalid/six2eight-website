import { LINKS } from "./links";

export const PRIMARY_NAV = [
  { label: "Services", href: "#services", hasMenu: true },
  { label: "Work", href: LINKS.ourWork },
  { label: "About us", href: LINKS.about },
  { label: "Resources", href: LINKS.resources },
  { label: "Pricing", href: LINKS.pricing },
] as const;

/** Service groups — used by the desktop dropdown, the mobile menu and the footer. */
export const SERVICE_GROUPS = [
  {
    title: "Design Services",
    href: LINKS.services.uiux,
    items: ["UI/UX Design", "Website Design", "SaaS Design", "Product Design", "Mobile App Design", "MVP Design", "Wireframe Design"],
  },
  {
    title: "Development",
    href: LINKS.services.development,
    items: [
      "Web Development",
      "Custom Website Solutions",
      "Wordpress Development",
      "Shopify Development Services",
      "Webflow Development",
      "MVP Development",
    ],
  },
  {
    title: "Branding",
    href: LINKS.services.branding,
    items: ["Logo Design", "Social media creative", "Presentation design", "Illustration design", "Branding services", "Showreel"],
  },
] as const;

export const COMPANY_LINKS = ["About Us", "FAQS", "Team", "Career", "Terms & Conditions", "Privacy Policy"] as const;
