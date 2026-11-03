export type QA = { q: string; a: string };

/**
 * Design tab copy comes from Figma. The other answers and tabs are
 * placeholders until the final copy is supplied.
 * Note: the desktop design labels the third tab "six2eight", mobile says "Branding".
 */
export const FAQ: Record<string, QA[]> = {
  Design: [
    {
      q: "What is “Creative-as a Service”?",
      a: "Creative-as-a-Service (CaaS) is a subscription service model that gives organizations access to quality creative assets at scale. CaaS solutions like Superside combine top talent and technology with a DesignOps process and team structure that removes the limits on speed.",
    },
    {
      q: "What makes Superside’s design services different?",
      a: "A dedicated senior team, a structured DesignOps process and AI-assisted workflows mean you get consistent, on-brand work delivered fast — without the overhead of hiring in-house.",
    },
    {
      q: "How does a design subscription work?",
      a: "You pick a plan, share your requests in a single board and our team delivers on a rolling basis. Pause, scale up or change priorities whenever you need to.",
    },
    {
      q: "Who needs graphic design services?",
      a: "Startups shipping their first product, growing SaaS teams that need to move faster, and established brands that want a reliable creative partner.",
    },
    {
      q: "What billing options do you offer?",
      a: "Monthly and quarterly subscriptions, plus fixed-scope project pricing for one-off engagements.",
    },
  ],
  Development: [
    {
      q: "Which platforms do you build on?",
      a: "Webflow, Shopify, WordPress and custom React / Next.js builds — we recommend the stack that fits your team and goals.",
    },
    {
      q: "How long does a typical website build take?",
      a: "Most marketing sites launch in 4–8 weeks depending on scope, content readiness and integrations.",
    },
    {
      q: "Do you handle hosting and maintenance?",
      a: "Yes. We can manage hosting, updates, monitoring and ongoing improvements after launch.",
    },
    {
      q: "Can you work with our in-house developers?",
      a: "Absolutely — we regularly pair with internal teams, follow your conventions and hand over clean, documented code.",
    },
    { q: "Will my site be fast and SEO-ready?", a: "Performance, accessibility and technical SEO are part of every build, not an add-on." },
  ],
  six2eight: [
    {
      q: "Where is the six2eight team based?",
      a: "We’re a global team of 50+ designers and developers with offices in the USA, Saudi Arabia and Dubai.",
    },
    { q: "How quickly can we kick off?", a: "Usually within 48 hours of signing — discovery starts right after the first call." },
    {
      q: "How do you use AI in your process?",
      a: "AI speeds up research, ideation and QA; every decision and deliverable is still owned by our senior team.",
    },
    {
      q: "What does a discovery call cover?",
      a: "Your goals, scope, timeline and budget — and you leave with a clear recommendation on next steps.",
    },
    { q: "Do you sign NDAs?", a: "Yes, we’re happy to sign an NDA before any project details are shared." },
  ],
};
