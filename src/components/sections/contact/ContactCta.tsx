"use client";

import { RevealText } from "@/components/ui/RevealText";
import { CONTACT_COPY } from "@/content/contact";
import { useGsap } from "@/hooks/useGsap";
import { revealLines, revealUp } from "@/lib/motion";
import { ContactForm } from "./ContactForm";

/** Final CTA — "Let's talk about your project" + inquiry form. */
export default function ContactCta() {
  const ref = useGsap<HTMLElement>((root) => {
    revealLines(root, root, "top 70%");
    revealUp("[data-cta='fade']", root, { y: 30, stagger: 0.12, start: "top 70%" });
    revealUp("[data-cta='form']", "[data-cta='form']", { y: 70, start: "top 85%" });
  });

  const t = CONTACT_COPY.testimonial;

  return (
    <section ref={ref} id="contact" aria-labelledby="contact-title" className="bg-bg-subtle py-14 lg:py-32">
      <div className="container-page flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between xl:gap-20">
        <div className="flex w-full flex-col items-start gap-8 xl:w-[510px] xl:shrink-0 xl:gap-[309px]">
          <div className="flex w-full flex-col items-start gap-4 lg:gap-6 xl:w-[477px]">
            <RevealText
              id="contact-title"
              text={CONTACT_COPY.title.join(" ")}
              className="t-section w-[251px] text-black capitalize md:w-[420px] xl:w-[414px]"
            />
            <p data-cta="fade" className="t-md-medium w-full max-w-[477px] text-ink-80 lg:t-lg-medium">
              {CONTACT_COPY.intro}
            </p>
          </div>
          <figure data-cta="fade" className="flex w-full flex-col items-start gap-5 lg:gap-12">
            <blockquote className="t-lg-medium w-full text-black lg:t-h5">{t.quote}</blockquote>
            <figcaption className="flex items-center gap-3 lg:gap-4">
              <img src={t.avatar} alt="" loading="lazy" className="size-14 shrink-0 rounded-full object-cover lg:size-20" />
              <span className="flex w-[273px] flex-col items-start gap-1 lg:gap-1.5">
                <span className="t-sm-medium w-full text-black lg:t-xl-medium">{t.name}</span>
                <span className="t-xs-regular w-[262px] text-ink-80 lg:t-sm-regular lg:w-full">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
