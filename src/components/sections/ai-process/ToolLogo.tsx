import type { ReactNode } from "react";
import { MaskShape, maskStyles } from "@/components/ui/MaskShape";
import type { ToolId } from "@/content/ai-process";

/* Logos are the Figma "Logos" component variants, drawn in a 24px frame. */

const Centered = ({ children, w = 24, h = 24, clip }: { children: ReactNode; w?: number; h?: number; clip?: boolean }) => (
  <span
    className={`absolute top-1/2 left-[calc(50%+0.5px)] block -translate-x-1/2 -translate-y-1/2 ${clip ? "overflow-hidden" : ""}`}
    style={{ width: w, height: h }}
  >
    {children}
  </span>
);

const Img = ({ src, w, h }: { src: string; w: number; h: number }) => (
  <Centered w={w} h={h}>
    <img src={src} alt="" className="absolute inset-0 block size-full max-w-none" />
  </Centered>
);

const VSCODE_LAYERS = [
  { src: "/figma/vsc-1.svg", box: { inset: "0.26% 0 24.16% -0.07%" }, pos: "0.016px 0px" },
  { src: "/figma/vsc-2.svg", box: { inset: "24.16% 0 0.26% -0.07%" }, pos: "0.016px -5.737px", inner: "-45.94% -34.7%" },
  { src: "/figma/vsc-3.svg", box: { inset: "0.26% 0 0.26% 68.75%" }, pos: "-16.5px 0px", inner: "-34.9% -111.11%" },
  { src: "/figma/vsc-4.svg", box: { inset: "0.26% 0.07% 0.26% -0.07%", mixBlendMode: "overlay" as const }, pos: "0.016px 0px" },
];

const LOGOS: Record<ToolId, ReactNode> = {
  cenario: (
    <Centered w={25} h={24}>
      <MaskShape
        src="/figma/tool-default-mask.webp"
        color="#7c34fb"
        style={{ left: -5, top: -2, width: 34, height: 29 }}
        maskPosition="5px 2px"
        maskSize="25px 24px"
      />
    </Centered>
  ),
  claude: <Img src="/figma/tool-claude.svg" w={24} h={24} />,
  notion: <Img src="/figma/tool-notion.svg" w={23} h={24} />,
  figma: <Img src="/figma/tool-figma.svg" w={16} h={24} />,
  midjourney: <Img src="/figma/tool-midjourney.svg" w={29} h={24} />,
  higgsfield: <Img src="/figma/tool-higgsfield.svg" w={24} h={22} />,
  cursor: <Img src="/figma/tool-cursor.svg" w={21} h={24} />,
  lighthouse: (
    <Centered clip>
      <img
        src="/figma/tool-optimise-3.svg"
        alt=""
        className="absolute block max-w-none"
        style={{ left: 0.79, top: 1, width: 22.41, height: 22.41 }}
      />
    </Centered>
  ),
  vscode: (
    <Centered clip>
      {VSCODE_LAYERS.map((l) => (
        <span key={l.src} className="absolute block" style={{ ...l.box, ...maskStyles("/figma/vsc-mask.svg", l.pos, "24px 23.876px") }}>
          {l.inner ? (
            <span className="absolute block" style={{ inset: l.inner }}>
              <img src={l.src} alt="" className="block size-full max-w-none" />
            </span>
          ) : (
            <img src={l.src} alt="" className="absolute inset-0 block size-full max-w-none" />
          )}
        </span>
      ))}
    </Centered>
  ),
  github: (
    <Centered clip>
      <span className="absolute block" style={{ inset: "0 0 1.12% 0", ...maskStyles("/figma/gh-mask.svg", "0 0", "24px 24px") }}>
        <img src="/figma/gh-fill.svg" alt="" className="absolute inset-0 block size-full max-w-none" />
      </span>
    </Centered>
  ),
};

export function ToolLogo({ id }: { id: ToolId }) {
  return <>{LOGOS[id]}</>;
}
