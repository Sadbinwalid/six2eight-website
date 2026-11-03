export type ToolId =
  "cenario" | "claude" | "notion" | "figma" | "midjourney" | "higgsfield" | "vscode" | "github" | "cursor" | "lighthouse";

export type ProcessStep = {
  title: string;
  /** 56px dotted icon, rendered as a black mask (Figma export geometry) */
  icon: { src: string; style: { left: number; top: number; width: number; height: number }; pos: string; size: string };
  human: string;
  ai: string;
  tools: ToolId[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Discover & Strategy",
    icon: {
      src: "/figma/proc-discover-mask.webp",
      style: { left: -10.34, top: -9.8, width: 75.917, height: 75.608 },
      pos: "11.341px 11.804px",
      size: "53.234px 52px",
    },
    human: "Research, strategy",
    ai: "Insight synthesis, persona draft",
    tools: ["cenario", "claude", "notion", "figma"],
  },
  {
    title: "Design",
    icon: { src: "/figma/proc-design-mask.webp", style: { left: -7, top: -5, width: 70, height: 65 }, pos: "9px 7px", size: "52px 52px" },
    human: "UX flows, UI direction",
    ai: "Wireframe ideas, copy support",
    tools: ["figma", "midjourney", "claude", "higgsfield"],
  },
  {
    title: "Development",
    icon: {
      src: "/figma/proc-dev-mask.webp",
      style: { left: -4.79, top: -0.09, width: 65.578, height: 56.117 },
      pos: "6.789px 2.094px",
      size: "52px 52px",
    },
    human: "Architecture, implement",
    ai: "Code assist, debug support",
    tools: ["vscode", "github", "claude", "cursor"],
  },
  {
    title: "Optimise",
    icon: {
      src: "/figma/proc-optimise-mask.webp",
      style: { left: -1.11, top: -0.66, width: 58.369, height: 57.24 },
      pos: "4.111px 2.661px",
      size: "50.227px 52px",
    },
    human: "QA review, prioritisation",
    ai: "Bug analysis, performance suggestions",
    tools: ["cenario", "claude", "lighthouse"],
  },
];

export const TOOL_NAMES: Record<ToolId, string> = {
  cenario: "Scenario",
  claude: "Claude",
  notion: "Notion",
  figma: "Figma",
  midjourney: "Midjourney",
  higgsfield: "Higgsfield",
  vscode: "VS Code",
  github: "GitHub",
  cursor: "Cursor",
  lighthouse: "Lighthouse",
};
