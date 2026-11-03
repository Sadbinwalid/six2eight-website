"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MaskShape } from "@/components/ui/MaskShape";
import { RevealText } from "@/components/ui/RevealText";
import { REVIEWS, type Review } from "@/content/testimonials";
import { useGsap } from "@/hooks/useGsap";
import { revealLines, revealUp } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 6000;

const VDivider = () => (
  <span
    aria-hidden
    className="block h-[27px] w-px shrink-0"
    style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.35), rgba(0,0,0,0))" }}
  />
);

function ReviewCard({ review, active }: { review: Review; active: boolean }) {
  return (
    <article
      aria-roledescription="slide"
      aria-hidden={!active}
      className="flex w-full flex-col items-stretch gap-6 rounded-[16px] bg-bg-secondary p-4 lg:flex-row lg:items-center lg:gap-8 lg:p-8"
    >
      <div className="relative h-[320px] shrink-0 overflow-hidden rounded-[12px] lg:h-auto lg:basis-[40%] lg:self-stretch">
        <img src={review.photo.base} alt="" loading="lazy" className="absolute inset-0 size-full max-w-none object-cover" />
        {review.photo.overlay && (
          <span className="absolute inset-0 overflow-hidden">
            <img src={review.photo.overlay.src} alt="" loading="lazy" className="absolute max-w-none" style={review.photo.overlay.style} />
          </span>
        )}
        <span
          className="absolute top-1/2 left-[calc(50%-0.5px)] block h-[28.023px] w-[137px] -translate-x-1/2 -translate-y-1/2 scale-80 lg:scale-100"
          role="img"
          aria-label={review.logo.alt}
        >
          {review.logo.kind === "svg" ? (
            <span className="absolute block overflow-hidden" style={{ inset: 0 }}>
              <img
                src={review.logo.src}
                alt=""
                className="absolute block max-w-none"
                style={{ inset: "0.84% 0.65% -0.63% 0", width: "99.35%", height: "99.79%" }}
              />
            </span>
          ) : (
            <MaskShape
              src={review.logo.src}
              color="#fff"
              style={review.logo.style}
              maskPosition={review.logo.pos}
              maskSize={review.logo.size}
            />
          )}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-6 lg:gap-10">
        <blockquote className="t-quote w-full text-black lg:max-w-[489px]">{review.quote}</blockquote>
        <div className="flex flex-col items-start gap-0.5 whitespace-nowrap lg:gap-1.5">
          <p className="t-md-medium text-black capitalize lg:t-xl-medium">{review.name}</p>
          <p className="t-sm-regular text-ink-80 lg:t-md-regular">{review.role}</p>
        </div>
        <span aria-hidden className="block h-px w-full bg-ink-10" />
        <dl className="flex w-full items-center justify-between xl:justify-start xl:gap-12">
          {review.stats.map((s, i) => (
            <div key={s.label} className="contents">
              {i > 0 && <VDivider />}
              <div className="flex shrink-0 flex-col-reverse items-start lg:gap-0.5">
                <dt className="t-sm-regular text-ink-80 lg:t-md-regular">{s.label}</dt>
                <dd className="t-md-medium text-black lg:t-xl-medium">{s.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

function Chevron({ flip }: { flip?: boolean }) {
  return (
    <span className={cn("relative block size-6 shrink-0", flip && "-scale-x-100")}>
      <img src="/figma/chevron-right.svg" alt="" className="absolute block max-w-none" style={{ left: 8.29, top: 5.29 }} />
    </span>
  );
}

const ROUND_BTN =
  "flex size-10 items-center justify-center rounded-full bg-bg-secondary transition-[scale,background-color] duration-300 ease-[var(--ease-out-expo)] hover:bg-white/70 active:scale-90 lg:size-12";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const autoplay = !useReducedMotion();
  const touchX = useRef<number | null>(null);
  const count = REVIEWS.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  const ref = useGsap<HTMLElement>((root) => {
    revealLines(root, root, "top 75%");
    revealUp("[data-ts='slider']", "[data-ts='slider']", { y: 40 });
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  const running = autoplay && inView && !paused;

  return (
    <section ref={ref} aria-labelledby="testimonials-title" aria-roledescription="carousel" className="overflow-x-clip py-14 lg:py-32">
      <div className="container-page flex flex-col items-center gap-8 lg:gap-14">
        <RevealText
          id="testimonials-title"
          text="Creative wins, told by our customers"
          className="t-section w-[314px] text-center text-black capitalize md:w-[480px] lg:w-[574px]"
        />

        <div
          data-ts="slider"
          className="w-full overflow-hidden lg:overflow-visible lg:[clip-path:inset(-40px_-100vw_-40px_0)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
            touchX.current = null;
          }}
        >
          <div
            aria-live={running ? "off" : "polite"}
            className="flex items-stretch gap-4 transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] [--step:calc(100%+16px)] lg:items-center lg:gap-5 lg:[--step:calc(min(920px,100%-96px)+20px)]"
            style={{ transform: `translate3d(calc(var(--step) * ${-index}), 0, 0)` }}
          >
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className={cn(
                  "flex w-full shrink-0 transition-opacity duration-700 lg:w-[min(920px,calc(100%-96px))]",
                  i < index && "opacity-0",
                )}
              >
                <ReviewCard review={r} active={i === index} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous review" onClick={() => go(index - 1)} className={ROUND_BTN}>
            <Chevron flip />
          </button>
          <div className="flex h-10 items-center gap-2 rounded-full bg-bg-secondary px-6 lg:h-12" role="tablist" aria-label="Choose review">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Review ${i + 1} of ${count}`}
                onClick={() => go(i)}
                className="flex h-9 items-center"
              >
                <span
                  className="relative block h-1.5 overflow-hidden rounded-full transition-[width,background-color] duration-700 ease-[var(--ease-out-expo)]"
                  style={{ width: i === index ? 50 : 6, backgroundColor: i === index ? "#dcd8d5" : "#000" }}
                >
                  {i === index && autoplay && (
                    <span
                      key={index}
                      className="absolute inset-y-0 left-0 block w-0 rounded-full bg-black"
                      onAnimationEnd={() => go(index + 1)}
                      style={{
                        animation: `progress-fill ${AUTOPLAY_MS}ms linear forwards`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <button type="button" aria-label="Next review" onClick={() => go(index + 1)} className={ROUND_BTN}>
            <Chevron />
          </button>
        </div>
      </div>
    </section>
  );
}
