import type { CSSProperties, ReactNode } from "react";
import { MaskShape } from "@/components/ui/MaskShape";

/**
 * Client logo artwork, positioned exactly as exported from Figma inside a
 * 220×72 tile. Single-colour logos are rendered as masks so they share the
 * same 60% black.
 */
export type ClientLogo = { name: string; art: ReactNode };

const GREY = "rgba(0,0,0,0.6)";

const centered = (w: number | "auto", h: number | "auto", extra: CSSProperties = {}): CSSProperties => ({
  position: "absolute",
  width: w,
  height: h,
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  ...extra,
});

export const LOGOS_ROW_1: ClientLogo[] = [
  {
    name: "Qore Logiq",
    art: (
      <MaskShape
        src="/figma/l-logiq-mask.svg"
        color={GREY}
        style={{ left: 34, top: 17, width: 153, height: 38 }}
        maskPosition="11px 6px"
        maskSize="130.002px 26.536px"
      />
    ),
  },
  {
    name: "Reviewinc",
    art: (
      <MaskShape
        src="/figma/l-reviewinc-mask.webp"
        color={GREY}
        style={{ left: 38, top: 18, width: 144, height: 35 }}
        maskPosition="3px 4px"
        maskSize="138.556px 27.389px"
      />
    ),
  },
  {
    name: "Crecer",
    art: (
      <span style={centered(137, 28.023, { left: "calc(50% - 0.5px)", overflow: "hidden" })}>
        <img
          src="/figma/l-crecer.svg"
          alt=""
          className="absolute block max-w-none"
          style={{ inset: "0.84% 0.65% -0.63% 0", width: "99.35%", height: "99.79%" }}
        />
      </span>
    ),
  },
  {
    name: "Lhanel Fit",
    art: (
      <MaskShape
        src="/figma/l-lhanel-mask.webp"
        color={GREY}
        style={{ left: 6.6, top: 14.95, width: 207.48, height: 41.757 }}
        maskPosition="13.398px 13.055px"
        maskSize="180.679px 15.659px"
      />
    ),
  },
  {
    name: "Romulus Labs",
    art: (
      <span style={centered(124, 33.067, { top: "calc(50% - 0.47px)", overflow: "hidden" })}>
        <img src="/figma/l-romulus.svg" alt="" className="absolute inset-0 block size-full max-w-none" />
      </span>
    ),
  },
  {
    name: "Performance AI",
    art: (
      <span style={centered(193.021, 28, { left: "calc(50% - 0.5px)", display: "flex", alignItems: "center", gap: 10 })}>
        <img src="/figma/l-perf-mark.svg" alt="" className="block shrink-0" style={{ width: 28.34, height: 28.342 }} />
        <img src="/figma/l-perf-text.svg" alt="" className="block shrink-0" style={{ width: 157.034, height: 13.337 }} />
      </span>
    ),
  },
  {
    name: "Judyco",
    art: (
      <span style={centered(180, 20, { left: "calc(50% - 0.23px)", overflow: "hidden" })}>
        <img
          src="/figma/l-judyco.svg"
          alt=""
          className="absolute block max-w-none"
          style={{ inset: "0 0.2% 0 0", width: "99.8%", height: "100%" }}
        />
      </span>
    ),
  },
];

export const LOGOS_ROW_2: ClientLogo[] = [
  {
    name: "eCom Triage",
    art: (
      <MaskShape
        src="/figma/l-ecomtriage-mask.webp"
        color={GREY}
        style={{ left: 44.27, top: 13, width: 132, height: 46 }}
        maskPosition="6px 5px"
        maskSize="119px 36px"
      />
    ),
  },
  {
    name: "Fiction Profits Academy",
    art: (
      <>
        <img
          src="/figma/l-crocs-mark.svg"
          alt=""
          className="absolute block max-w-none"
          style={{ left: "10.45%", top: "23.6%", width: "17.11%", height: "52.27%" }}
        />
        <img
          src="/figma/l-crocs-text.svg"
          alt=""
          className="absolute block max-w-none"
          style={{ left: "31.64%", top: "38.51%", width: "58.36%", height: "27.89%" }}
        />
      </>
    ),
  },
  {
    name: "Microsoft",
    art: (
      <span style={centered("auto", "auto", { top: "calc(50% - 3.28px)", display: "flex", alignItems: "flex-end", gap: 2.56 })}>
        <span className="relative shrink-0" style={{ width: 37.122, height: 45.442 }}>
          <MaskShape
            src="/figma/l-fiction-mark.webp"
            color={GREY}
            style={{ left: -1.28, top: -5.12, width: 40.962, height: 56.322 }}
            maskPosition="1.28px 5.123px"
            maskSize="37.122px 45.442px"
          />
        </span>
        <span className="relative shrink-0 overflow-hidden mix-blend-difference" style={{ width: 94.318, height: 38.769 }}>
          <img
            src="/figma/l-fiction-text.webp"
            alt=""
            className="absolute max-w-none"
            style={{ left: "-3.07%", top: "-14.93%", width: "107.36%", height: "137.31%" }}
          />
        </span>
      </span>
    ),
  },
  {
    name: "Confiz",
    art: (
      <MaskShape
        src="/figma/l-microsoft-mask.webp"
        color={GREY}
        style={{ left: 33.23, top: 8.45, width: 153.545, height: 55.415 }}
        maskPosition="5.773px 11.547px"
        maskSize="142px 32.325px"
      />
    ),
  },
  {
    name: "Crocs",
    art: (
      <MaskShape
        src="/figma/l-confiz-mask.webp"
        color={GREY}
        style={{ left: 42.02, top: 11.24, width: 135.72, height: 48.561 }}
        maskPosition="4.98px -1.242px"
        maskSize="125.709px 51.051px"
      />
    ),
  },
  {
    name: "Leading Leads",
    art: (
      <MaskShape
        src="/figma/l-romulus-mask.webp"
        color={GREY}
        style={{ left: 14.06, top: 3.08, width: 188.981, height: 64.619 }}
        maskPosition="30.48px 15.852px"
        maskSize="130.458px 34.139px"
      />
    ),
  },
  {
    name: "Gunmade",
    art: (
      <span style={centered("auto", "auto", { left: "calc(50% - 0.23px)", display: "flex", alignItems: "center", gap: 12 })}>
        <span className="relative shrink-0" style={{ width: 36, height: 36 }}>
          <MaskShape
            src="/figma/l-gunmade-mark.webp"
            color={GREY}
            style={{ left: -7, top: -4, width: 50, height: 43 }}
            maskPosition="7px 4px"
            maskSize="36px 36px"
          />
        </span>
        <img src="/figma/l-gunmade-text.svg" alt="" className="block shrink-0" style={{ width: 123.542, height: 14.977 }} />
      </span>
    ),
  },
];
