import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Layer = { src: string; style: CSSProperties; className?: string; clip?: boolean };
type Tile = {
  /** width / height of the tile at the design size — tiles scale with their column */
  aspect: string;
  layers: Layer[];
  rounded?: boolean;
  width?: string;
  /** tall website screenshots scroll through on hover (desktop) */
  scrollTo?: string;
};

const cover: CSSProperties = { inset: 0, width: "100%", height: "100%", objectFit: "cover" };

/* Desktop — Figma "Image & Video Container" (1216 × 657, 3 × 397.33px columns, 12px gaps) */
const DESKTOP: Tile[][] = [
  [
    {
      aspect: "397.33/320.672",
      layers: [{ src: "/figma/grid-1.webp", style: { left: 0, top: "-0.03%", width: "100%", height: "487.53%" } }],
      scrollTo: "-79.4%",
    },
    {
      aspect: "397.33/367.453",
      layers: [{ src: "/figma/grid-2.webp", style: { left: "-45.61%", top: "-16.14%", width: "191.44%", height: "138.02%" } }],
    },
    { aspect: "353/297.047", width: "88.84%", rounded: false, layers: [{ src: "/figma/grid-3.webp", style: cover }] },
  ],
  [
    {
      aspect: "397.33/368",
      layers: [{ src: "/figma/grid-4.webp", style: { left: 0, top: "-0.09%", width: "100%", height: "637.25%" } }],
      scrollTo: "-84.2%",
    },
    {
      aspect: "397.33/490",
      layers: [{ src: "/figma/grid-5.webp", style: { left: "-0.08%", top: "-0.05%", width: "100.08%", height: "227.86%" } }],
      scrollTo: "-56%",
    },
    {
      aspect: "397.33/372",
      layers: [
        { src: "/figma/grid-6a.webp", style: cover },
        { src: "/figma/grid-6b.webp", style: cover },
      ],
    },
  ],
  [
    {
      aspect: "397.33/465",
      layers: [
        { src: "/figma/grid-5.webp", clip: true, style: { left: 0, top: "-0.04%", width: "100%", height: "213.65%" } },
        { src: "/figma/grid-7.webp", style: { inset: 0, width: "100%", height: "100%", objectPosition: "bottom" } },
      ],
    },
    { aspect: "397.33/329", layers: [{ src: "/figma/grid-8.webp", style: cover }] },
    {
      aspect: "397.33/349",
      layers: [
        { src: "/figma/grid-9a.webp", style: cover },
        { src: "/figma/grid-9b.webp", style: cover },
      ],
    },
  ],
];

/* Mobile — Figma "Image Container" (3 × 138px columns, 8px gaps, bleeding past the 361px frame) */
const MOBILE: Tile[][] = [
  [
    { aspect: "138/284", layers: [{ src: "/figma/m-grid-1.webp", style: { left: 0, top: "-0.05%", width: "100%", height: "1401.63%" } }] },
    {
      aspect: "138/189",
      layers: [{ src: "/figma/grid-2.webp", style: { left: "-72%", top: "-12.83%", width: "244.35%", height: "118.59%" } }],
    },
  ],
  [
    { aspect: "138/214", layers: [{ src: "/figma/m-grid-2.webp", style: { left: 0, top: "0.04%", width: "100%", height: "1234.27%" } }] },
    {
      aspect: "138/334",
      layers: [
        { src: "/figma/m-grid-3a.webp", style: cover },
        { src: "/figma/m-grid-3b.webp", clip: true, style: { left: 0, top: "-0.04%", width: "100%", height: "880.52%" } },
      ],
    },
  ],
  [
    {
      aspect: "138/347",
      layers: [{ src: "/figma/m-grid-4.webp", style: { inset: 0, width: "100%", height: "100%", objectPosition: "bottom" } }],
    },
    {
      aspect: "138/257",
      layers: [
        { src: "/figma/m-grid-5a.webp", clip: true, style: { left: 0, top: "-135.25%", width: "100%", height: "533.84%" } },
        { src: "/figma/grid-8.webp", style: cover },
      ],
    },
  ],
];

function GridTile({ tile, radius }: { tile: Tile; radius: string }) {
  return (
    <div
      className={cn("group/tile relative shrink-0 overflow-hidden", tile.rounded !== false && radius)}
      style={{ aspectRatio: tile.aspect, width: tile.width ?? "100%" }}
    >
      {tile.layers.map((l, i) => {
        const img = (
          <img
            key={l.src + i}
            src={l.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={cn(
              "absolute max-w-none",
              tile.scrollTo &&
                i === 0 &&
                "transition-[translate] duration-[6s] ease-[cubic-bezier(0.45,0,0.2,1)] group-hover/tile:[translate:0_var(--scroll-to)]",
              l.className,
            )}
            style={{ ...l.style, ["--scroll-to" as string]: tile.scrollTo }}
          />
        );
        return l.clip ? (
          <div key={l.src + i} className="absolute inset-0 overflow-hidden">
            {img}
          </div>
        ) : (
          img
        );
      })}
    </div>
  );
}

/** The project collage under the hero headline. */
export function HeroGrid() {
  return (
    <>
      {/* mobile + tablet */}
      <div className="relative -mx-4 flex w-[calc(100%+32px)] justify-center self-stretch overflow-hidden md:-mx-8 md:w-[calc(100%+64px)] lg:hidden">
        <div
          className="flex w-[430px] max-w-none shrink-0 items-start justify-center gap-2 md:w-[min(720px,100%)] md:gap-3"
          style={{ aspectRatio: "430/396" }}
        >
          {MOBILE.map((col, i) => (
            <div key={i} data-hero="col" className="flex min-w-0 flex-1 flex-col gap-2 md:gap-3">
              {col.map((t, j) => (
                <GridTile key={j} tile={t} radius="rounded-[8px]" />
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[199px] bg-gradient-to-b from-transparent to-black to-[93.378%]" />
      </div>

      {/* desktop */}
      <div
        data-hero="grid"
        className="relative hidden w-full items-start justify-center gap-3 overflow-hidden lg:flex"
        style={{ aspectRatio: "1216/657" }}
      >
        {DESKTOP.map((col, i) => (
          <div key={i} data-hero="col" className="min-w-0 flex-1">
            <div data-hero="col-inner" className={cn("flex flex-col gap-3", i === 1 ? "items-end" : "items-start")}>
              {col.map((t, j) => (
                <GridTile key={j} tile={t} radius="rounded-[12px]" />
              ))}
            </div>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40.5%] bg-gradient-to-b from-transparent to-black to-[93.378%]" />
      </div>
    </>
  );
}
