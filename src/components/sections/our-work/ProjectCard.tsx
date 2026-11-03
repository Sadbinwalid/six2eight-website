import { maskStyles } from "@/components/ui/MaskShape";
import type { Project } from "@/content/work";
import { cn } from "@/lib/cn";

/** Revive AI — the composed iPad mockup from Figma (190 × 214 frame). */
function ReviveMockup() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <img
        src="/figma/work-revive-bg.webp"
        alt=""
        loading="lazy"
        className="absolute top-[calc(50%+0.5px)] left-1/2 h-[281px] w-[296px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover object-bottom blur-[2px]"
      />
      <img
        src="/figma/work-revive-ipad.webp"
        alt=""
        loading="lazy"
        className="absolute max-w-none"
        style={{ left: -7.56, top: 34, width: 214.498, height: 148.981 }}
      />
      <div
        className="absolute"
        style={{
          left: -3.23,
          top: 39.33,
          width: 203.934,
          height: 135.912,
          ...maskStyles("/figma/work-revive-screenmask.svg", "1.114px 0.094px", "201.777px 135.6px"),
        }}
      >
        <img src="/figma/work-revive-screen.webp" alt="" loading="lazy" className="absolute inset-0 block size-full max-w-none" />
      </div>
      <img
        src="/figma/work-revive-hand1.webp"
        alt=""
        loading="lazy"
        className="absolute max-w-none"
        style={{ left: -90.96, top: 91.38, width: 133.393, height: 156.619 }}
      />
      <img
        src="/figma/work-revive-pen.webp"
        alt=""
        loading="lazy"
        className="absolute max-w-none"
        style={{ left: 140.43, top: 144.66, width: 98.989, height: 33.348 }}
      />
      <div className="absolute overflow-hidden" style={{ left: 164.4, top: 95.42, width: 115.943, height: 149.726 }}>
        <img src="/figma/work-revive-hand2.webp" alt="" loading="lazy" className="absolute top-0 left-0 h-full w-[103.59%] max-w-none" />
      </div>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <p className="flex w-full items-center gap-[5px] whitespace-nowrap uppercase">
      {tags.map((t, i) => (
        <span key={t} className="contents">
          {i > 0 && (
            <span aria-hidden className="font-mono text-[9.047px] leading-[9.047px] text-white">
              /
            </span>
          )}
          <span className="text-[12px] leading-normal tracking-[-0.03em] text-paper-80">{t}</span>
        </span>
      ))}
    </p>
  );
}

/**
 * Project card. `variant="stack"` is the full-width mobile/tablet card;
 * `variant="float"` is the fixed-size card used in the desktop composition.
 */
export function ProjectCard({ project, variant }: { project: Project; variant: "stack" | "float" }) {
  const lg = project.size === "lg";
  const floatSize = lg ? { width: 294, height: 370 } : { width: 190, height: 214 };

  return (
    <a
      href={project.href}
      data-work-card
      className={cn(
        "group flex flex-col items-start",
        variant === "stack" ? "w-full gap-3" : lg ? "w-[293.144px] gap-3" : "w-[190.601px] gap-[14.476px]",
      )}
    >
      <div
        className={cn("relative w-full shrink-0 overflow-hidden", variant === "stack" && "h-[380px] md:h-auto md:aspect-[4/5]")}
        style={variant === "float" ? floatSize : undefined}
      >
        <div className="absolute inset-0 transition-[scale] duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
          {project.image === "revive" ? (
            <ReviveMockup />
          ) : (
            <img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full max-w-none object-cover"
            />
          )}
        </div>
      </div>
      <div className={cn("flex flex-col items-start gap-2", variant === "float" && !lg ? "w-[171px]" : "w-full")}>
        <h3 className="text-[24px] leading-[28px] font-medium tracking-[-0.03em] text-paper lg:leading-8">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_1px]">
            {project.name}
          </span>
        </h3>
        <Tags tags={project.tags} />
      </div>
    </a>
  );
}
