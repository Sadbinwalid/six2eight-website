"use client";

import { ArrowIcon } from "@/components/ui/Arrow";
import { RevealText } from "@/components/ui/RevealText";
import { SERVICE_ROWS, type Service } from "@/content/services";
import { useGsap } from "@/hooks/useGsap";
import { gsap, EASE, revealLines } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Service card. Hover state (Figma "hover card"): artwork eases in, a 150°
 * colour wash fades up, "Learn More" turns lime + underlined and the glass
 * tag row rises in. Touch devices show the default state.
 */
function ServiceCard({ service }: { service: Service }) {
  return (
    <a
      href={service.href}
      data-svc="card"
      className={cn(
        "group relative flex h-[400px] min-w-0 flex-col justify-between overflow-hidden rounded-[16px] p-5 lg:h-[520px] lg:p-8",
        service.wide ? "lg:basis-[57.65%] lg:shrink-0" : "lg:flex-1",
      )}
    >
      <div
        aria-hidden
        data-svc="media"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]"
        style={{ backgroundColor: service.image.fill }}
      >
        <img
          src={service.image.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute max-w-none transition-[scale] duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.045]"
          style={service.image.style}
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-[var(--ease-out-quart)] group-hover:opacity-100"
          style={{ backgroundImage: `linear-gradient(150.41deg, rgb(${service.tint}) 26.221%, rgba(${service.tint}, 0.1) 49.052%)` }}
        />
      </div>

      <div className="relative flex flex-1 flex-col items-start justify-between">
        <div className="flex w-full flex-col items-start gap-8">
          <div className="flex w-full flex-col items-start gap-3">
            <h3 className="t-card-title w-full text-paper">{service.title}</h3>
            <p
              className={cn(
                "t-sm-medium w-full text-paper-80 lg:text-[16px] lg:leading-[23px] lg:tracking-[-0.02em] lg:capitalize",
                service.wide && "lg:max-w-[540px]",
              )}
            >
              {service.description}
            </p>
          </div>
          <span className="flex items-center gap-0.5 lg:gap-1">
            <span className="t-cta-14 relative whitespace-nowrap text-paper transition-colors duration-500 group-hover:text-brand lg:text-[16px]">
              Learn More
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-[scale] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </span>
            <span className="relative size-[18px] lg:size-5">
              <span className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                <ArrowIcon color="white" size={20} className="scale-90 lg:scale-100" />
              </span>
              <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <ArrowIcon color="brand" size={20} className="scale-90 lg:scale-100" />
              </span>
            </span>
          </span>
        </div>

        {/* glass tag row — revealed on hover (desktop) */}
        <ul aria-label="Includes" className="hidden items-center [@media(hover:hover)]:lg:flex">
          {service.tags.map((t, i) => (
            <li
              key={t}
              className={cn(
                "glass-pill flex h-8 translate-y-3 items-center bg-paper-10 px-3 opacity-0 transition-[opacity,translate] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100",
                i === 0 ? "rounded-l-full" : i === service.tags.length - 1 ? "rounded-r-full" : "rounded-full",
              )}
              style={{ transitionDelay: `${60 + i * 60}ms` }}
            >
              <span className="t-xs-medium whitespace-nowrap text-paper">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}

export default function Services() {
  const ref = useGsap<HTMLElement>((root) => {
    revealLines(root, root, "top 80%");
    gsap.utils.toArray<HTMLElement>("[data-svc='card']").forEach((card) => {
      const media = card.querySelector("[data-svc='media']");
      gsap
        .timeline({ scrollTrigger: { trigger: card, start: "top 88%" } })
        .from(card, { y: 70, autoAlpha: 0, duration: 1.3, ease: EASE.out, clearProps: "transform,opacity,visibility" })
        .from(media, { scale: 1.12, duration: 1.8, ease: EASE.out, clearProps: "transform" }, 0);
    });
  });

  return (
    <section ref={ref} id="services" aria-labelledby="services-title" className="pt-14 lg:pt-32">
      <div className="container-page flex flex-col items-center gap-6 lg:gap-14">
        <RevealText id="services-title" text="Our Digital Services" className="t-section text-center text-black capitalize" />
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:flex-col lg:gap-5">
          {SERVICE_ROWS.map((row, i) => (
            <div key={i} className="contents lg:flex lg:w-full lg:items-stretch lg:gap-5">
              {row.map((s) => (
                <ServiceCard key={s.title} service={s} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
