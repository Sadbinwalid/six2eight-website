import { createElement, Fragment, type ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * Headline whose words rise out of individual masks (see `revealLines` in
 * lib/motion). Splitting by word instead of hard-coded lines keeps the
 * reveal correct at every breakpoint, wherever the text wraps.
 */
export function RevealText({ as = "h2", text, className, id }: { as?: ElementType; text: string; className?: string; id?: string }) {
  const words = text.split(" ");
  return createElement(
    as,
    { id, className: cn(className), "aria-label": text },
    words.map((w, i) => (
      <Fragment key={`${w}-${i}`}>
        <span aria-hidden className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
          <span data-line className="inline-block will-change-transform">
            {w}
          </span>
        </span>
        {i < words.length - 1 && " "}
      </Fragment>
    )),
  );
}
