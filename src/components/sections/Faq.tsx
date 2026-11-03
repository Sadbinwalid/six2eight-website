"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { RevealText } from "@/components/ui/RevealText";
import { FAQ, type QA } from "@/content/faq";
import { useGsap } from "@/hooks/useGsap";
import { revealLines, revealUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

const TABS = Object.keys(FAQ);

/** Accordion row. Height animates with grid-template-rows so there is no measuring. */
function Item({ qa, open, onToggle }: { qa: QA; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className="flex w-full flex-col items-start border-b border-ink-20 pb-5 lg:pb-10">
      <h3 className="w-full">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 text-left lg:gap-6"
        >
          <span className="text-[20px] leading-7 font-semibold text-black transition-[translate] duration-500 ease-[var(--ease-out-expo)] lg:t-card-title lg:group-hover:translate-x-1.5">
            {qa.q}
          </span>
          <span aria-hidden className="relative size-6 shrink-0 lg:size-8">
            <span className="absolute inset-0 origin-top-left scale-75 lg:scale-100">
              <img
                src="/figma/plus.svg"
                alt=""
                className={cn(
                  "absolute top-[5.33px] left-[5.33px] block max-w-none transition-[rotate,opacity] duration-500 ease-[var(--ease-out-expo)]",
                  open ? "rotate-90 opacity-0" : "opacity-100",
                )}
              />
              <img
                src="/figma/minus.svg"
                alt=""
                className={cn(
                  "absolute top-[15px] left-[5.33px] block max-w-none transition-[rotate,opacity] duration-500 ease-[var(--ease-out-expo)]",
                  open ? "opacity-100" : "-rotate-90 opacity-0",
                )}
              />
            </span>
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className="grid w-full transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="t-md-regular w-full pt-2 text-ink-80 lg:w-[698px] lg:pt-3">{qa.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [tab, setTab] = useState(TABS[0]);
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  const ref = useGsap<HTMLElement>((root) => {
    revealLines(root, root, "top 75%");
    revealUp("[data-faq='tabs'] > *", root, { y: 20, stagger: 0.06, start: "top 70%" });
  });

  const select = (t: string) => {
    setTab(t);
    setOpen(0);
  };

  // arrow-key navigation between tabs (WAI-ARIA tabs pattern)
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = TABS[(i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length];
    select(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <section ref={ref} id="faq" aria-labelledby="faq-title" className="py-14 lg:py-32">
      <div className="container-page flex flex-col items-center gap-8 lg:gap-14">
        <div className="flex w-full flex-col items-center gap-5 lg:gap-8">
          <RevealText
            id="faq-title"
            text="Frequently asked questions"
            className="t-section w-[251px] text-center text-black capitalize md:w-[420px] lg:w-[656px]"
          />
          <div data-faq="tabs" role="tablist" aria-label="FAQ topics" className="flex items-start gap-1.5 lg:gap-2">
            {TABS.map((t, i) => (
              <button
                key={t}
                id={`${baseId}-tab-${t}`}
                role="tab"
                type="button"
                aria-selected={tab === t}
                aria-controls={`${baseId}-panel`}
                tabIndex={tab === t ? 0 : -1}
                onClick={() => select(t)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={cn(
                  "flex h-[34px] items-center justify-center rounded-full border px-4 transition-[background-color,color,border-color] duration-500 ease-[var(--ease-out-expo)] lg:h-auto lg:px-5 lg:py-2",
                  tab === t
                    ? "border-paper-10 bg-bg-tertiary text-paper"
                    : "border-ink-10 bg-bg-secondary text-black hover:border-ink-20 lg:border-paper-10",
                )}
              >
                <span className="t-md-medium whitespace-nowrap lg:t-xl-medium">{t}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          key={tab}
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab}`}
          className="flex w-full flex-col items-start gap-5 [animation:fade-up_0.6s_var(--ease-out-expo)] lg:w-[820px] lg:gap-8"
        >
          {FAQ[tab].map((qa, i) => (
            <Item key={qa.q} qa={qa} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
