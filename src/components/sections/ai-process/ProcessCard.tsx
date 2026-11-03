import { MaskShape } from "@/components/ui/MaskShape";
import { TOOL_NAMES, type ProcessStep } from "@/content/ai-process";
import { ToolLogo } from "./ToolLogo";

const Divider = () => <span aria-hidden className="block h-px w-full shrink-0 bg-ink-10" />;

function Contributor({ kind, text }: { kind: "human" | "ai"; text: string }) {
  return (
    <div className="flex w-full items-start gap-1 lg:gap-1.5">
      <span className="relative size-4 shrink-0 lg:size-5">
        <span className="absolute top-0 left-0 block size-5 origin-top-left scale-80 lg:scale-100">
          {kind === "human" ? (
            <img src="/figma/human.svg" alt="" className="absolute block max-w-none" style={{ left: 3.83, top: 2.58 }} />
          ) : (
            <img
              src="/figma/ai-magic.svg"
              alt=""
              data-ai="sparkle"
              className="absolute block max-w-none -scale-y-100 group-hover:[animation:sparkle_1.2s_ease-in-out_infinite]"
              style={{ left: 1.75, top: 1.75 }}
            />
          )}
        </span>
      </span>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 lg:gap-0">
        <p className="w-full text-[12px] leading-normal font-medium tracking-[-0.03em] text-black lg:t-sm-medium lg:tracking-normal">
          {kind === "human" ? "Human" : "AI"}
        </p>
        {kind === "ai" ? (
          <p className="w-full text-[10px] leading-normal text-ink-80 lg:t-xs-regular" aria-label={text}>
            {/* typed in by AiProcess when the card becomes active */}
            <span data-ai="typed" data-text={text} aria-hidden>
              {text}
            </span>
            <span data-ai="caret" aria-hidden className="ml-px inline-block h-[1.05em] w-px translate-y-[0.15em] bg-black opacity-0" />
          </p>
        ) : (
          <p className="w-full text-[10px] leading-normal text-ink-80 lg:t-xs-regular">{text}</p>
        )}
      </div>
    </div>
  );
}

/** One step of the AI-assisted process ("How We Use AI" section). */
export function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <article
      data-ai="card"
      className="group relative flex min-w-0 flex-col items-start gap-3 overflow-hidden rounded-[12px] border border-ink-10 bg-bg-secondary p-3 transition-[translate,box-shadow,border-color] duration-700 ease-[var(--ease-out-expo)] lg:gap-6 lg:rounded-[16px] lg:p-5 lg:hover:-translate-y-1.5 lg:hover:border-brand/60 lg:hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)]"
    >
      {/* step progress — fills in sequence as the section scrolls */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-transparent">
        <span data-ai="progress" className="block h-full w-full origin-left scale-x-0 bg-brand" />
      </span>

      <span className="relative size-7 shrink-0 lg:size-14">
        <span className="absolute top-0 left-0 block size-14 origin-top-left scale-50 overflow-hidden lg:scale-100">
          <MaskShape src={step.icon.src} color="#000" style={step.icon.style} maskPosition={step.icon.pos} maskSize={step.icon.size} />
        </span>
      </span>

      <div className="flex w-full flex-col items-start gap-3 lg:gap-5">
        <h3 className="w-full text-[16px] leading-[23px] font-medium tracking-[-0.02em] text-black lg:t-h5">{step.title}</h3>
        <Divider />
        <div className="flex w-full flex-col items-start gap-3">
          <Contributor kind="human" text={step.human} />
          <Contributor kind="ai" text={step.ai} />
        </div>
        <Divider />
        <div className="flex w-full flex-col items-start gap-1 lg:w-[184px] lg:gap-2">
          <p className="w-full text-[10px] leading-normal tracking-[0.08em] text-black uppercase opacity-80">Tools</p>
          <ul className="flex w-full items-center gap-1 lg:gap-2">
            {step.tools.map((t, i) => (
              <li key={`${t}-${i}`} className="group/tool relative">
                <span
                  className="relative block size-7 shrink-0 overflow-hidden rounded-[4px] bg-bg-primary shadow-[inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-1px_0_rgba(0,0,0,0.04)] transition-[translate] duration-500 ease-[var(--ease-out-expo)] group-hover/tool:-translate-y-1 lg:size-10 lg:rounded-[8px]"
                  role="img"
                  aria-label={TOOL_NAMES[t]}
                >
                  <span className="absolute top-1/2 left-1/2 block size-10 -translate-x-1/2 -translate-y-1/2 scale-[0.667] lg:scale-100">
                    <ToolLogo id={t} />
                  </span>
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 translate-y-1 rounded-full bg-black px-2 py-1 text-[11px] leading-none whitespace-nowrap text-white opacity-0 transition-[opacity,translate] duration-300 group-hover/tool:translate-y-0 group-hover/tool:opacity-100 lg:block"
                >
                  {TOOL_NAMES[t]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
