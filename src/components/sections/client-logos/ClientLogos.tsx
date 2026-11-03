import { cn } from "@/lib/cn";
import { LOGOS_ROW_1, LOGOS_ROW_2, type ClientLogo } from "./logos";

/** One 220×72 logo tile (scaled to the 120×44 mobile tile below `lg`). */
function LogoTile({ logo }: { logo: ClientLogo }) {
  return (
    <li className="relative h-11 w-[120px] shrink-0 lg:mr-1 lg:h-[72px] lg:w-[220px]">
      <span
        className="absolute top-1/2 left-1/2 h-[72px] w-[220px] -translate-x-1/2 -translate-y-1/2 scale-[0.6] overflow-hidden lg:scale-100"
        aria-label={logo.name}
        role="img"
      >
        {logo.art}
      </span>
    </li>
  );
}

/**
 * Infinite marquee (superside.com treatment). The list is rendered twice and
 * shifted by exactly -50%, so the loop is seamless; hover pauses it.
 */
function Marquee({
  logos,
  direction,
  duration,
  className,
}: {
  logos: ClientLogo[];
  direction: "left" | "right";
  duration: number;
  className?: string;
}) {
  const loop = [...logos, ...logos];
  return (
    <div className={cn("group/row relative w-full overflow-hidden", className)}>
      <ul
        data-motion="loop"
        className={cn(
          "flex w-max group-hover/row:[animation-play-state:paused]",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[...loop, ...loop].map((logo, i) => (
          <LogoTile key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </ul>
    </div>
  );
}

const FADE = "linear-gradient(var(--fade-dir), rgb(240,238,237) 18.429%, rgba(240,238,237,0) 100%)";

export default function ClientLogos() {
  return (
    <section aria-label="Clients" className="relative overflow-hidden pt-8 lg:pt-16">
      <div className="container-page flex justify-center">
        <p className="rounded-full border border-ink-10 bg-bg-primary px-2 py-1.5 text-[14px] leading-5 whitespace-nowrap text-black lg:px-4 lg:py-2 lg:text-[16px] lg:leading-6 lg:tracking-[-0.02em]">
          Creative support for <span className="font-semibold">400+</span> top global brands
        </p>
      </div>

      <div className="relative mt-5 flex flex-col items-center gap-5 lg:mt-8">
        {/* mobile: one combined row */}
        <Marquee logos={[...LOGOS_ROW_1, ...LOGOS_ROW_2]} direction="left" duration={60} className="opacity-100 lg:hidden" />
        {/* desktop: two rows drifting in opposite directions */}
        <Marquee logos={LOGOS_ROW_1} direction="left" duration={42} className="hidden lg:block" />
        <Marquee logos={LOGOS_ROW_2} direction="right" duration={46} className="hidden lg:block" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[70px] lg:top-1/2 lg:h-[164px] lg:w-[262px] lg:-translate-y-1/2"
          style={{ backgroundImage: FADE, ["--fade-dir" as string]: "90deg" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[70px] lg:top-1/2 lg:h-[164px] lg:w-[262px] lg:-translate-y-1/2"
          style={{ backgroundImage: FADE, ["--fade-dir" as string]: "-90deg" }}
        />
      </div>
    </section>
  );
}
