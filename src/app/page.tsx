import SmoothScroll from "@/components/layout/SmoothScroll";
import SiteHeader from "@/components/layout/SiteHeader";
import MobileNav from "@/components/layout/MobileNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/sections/hero/Hero";
import ClientLogos from "@/components/sections/client-logos/ClientLogos";
import Services from "@/components/sections/Services";
import Awards from "@/components/sections/Awards";
import OurWork from "@/components/sections/our-work/OurWork";
import AiProcess from "@/components/sections/ai-process/AiProcess";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
import Booking from "@/components/sections/booking/Booking";
import Faq from "@/components/sections/Faq";
import ContactCta from "@/components/sections/contact/ContactCta";

/** Homepage — sections in Figma order ("Home Page Design Final"). */
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[200] rounded-full bg-bg-brand px-4 py-2 text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SmoothScroll />
      {/* clips decorative bleed (testimonial cards, marquees) without creating a scroll container */}
      <div className="overflow-x-clip">
        <SiteHeader />
        <main id="main">
          <Hero />
          <ClientLogos />
          <Services />
          <Awards />
          <OurWork />
          <AiProcess />
          <Testimonials />
          <Stats />
          <Booking />
          <Faq />
          <ContactCta />
        </main>
        <SiteFooter />
      </div>
      <MobileNav />
    </>
  );
}
