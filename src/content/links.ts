/**
 * Every outbound / internal link on the homepage lives here, so the real
 * URLs can be dropped in later without touching any component.
 * Anything set to "#" is a placeholder still waiting for its destination.
 */
const ASK_PROMPT = "Tell me about six2eight, the design & development agency";

export const LINKS = {
  /** Calendly booking page — every "Book a Consultation" CTA points here */
  calendly: "#book-a-consultation",
  ourWork: "#",
  about: "#",
  resources: "#",
  pricing: "#",
  services: {
    uiux: "#",
    development: "#",
    branding: "#",
  },
  reviews: {
    google: "#",
    upwork: "#",
    clutch: "#",
    dribbble: "#",
  },
  social: {
    linkedin: "#",
    instagram: "#",
    dribbble: "#",
    behance: "#",
    webflow: "#",
  },
  askAi: {
    chatgpt: `https://chatgpt.com/?q=${encodeURIComponent(ASK_PROMPT)}`,
    claude: `https://claude.ai/new?q=${encodeURIComponent(ASK_PROMPT)}`,
    perplexity: `https://www.perplexity.ai/search?q=${encodeURIComponent(ASK_PROMPT)}`,
    google: `https://www.google.com/search?udm=50&q=${encodeURIComponent(ASK_PROMPT)}`,
  },
  companyProfile: "#",
  /** Showreel video file (mp4/webm). Leave empty until the final cut is ready. */
  showreel: "",
} as const;
