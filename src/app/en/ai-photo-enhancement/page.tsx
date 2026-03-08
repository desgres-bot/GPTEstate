import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "AI Photo Enhancement for Real Estate — Photos That Sell Homes | GPT Estate",
  description:
    "Professional real estate photo editing powered by AI. 38 AI services. Photos that sell homes. Remove clutter, fix lighting, enhance colors in 30 seconds. From $0.50 per photo. Try 2 photos free.",
  keywords:
    "real estate photo enhancement, AI photo editing, property photo improvement, real estate photography AI",
  alternates: {
    canonical: "https://fotoestate.ru/en/ai-photo-enhancement",
    languages: { ru: "https://fotoestate.ru/uluchshenie-foto-nedvizhimosti", en: "https://fotoestate.ru/en/ai-photo-enhancement" },
  },
  openGraph: {
    title: "AI Photo Enhancement — Photos That Sell Homes | GPT Estate",
    description: "Turn any phone photo into a professional listing image in 30 seconds. 38 AI services.",
    locale: "en_US",
  },
};

const FAQ_ITEMS = [
  { q: "Will buyers notice the photo was enhanced?", a: "No. AI removes clutter and improves lighting — the photo looks like you did a quick cleanup before the shoot. Layout, furniture, and windows stay exactly the same." },
  { q: "What kind of photos work?", a: "Any phone photo. Our AI handles even dark, poorly composed shots. Better angle = better result, but even bad photos become good." },
  { q: "Is this legal for listings?", a: "Yes. We enhance the photo, not change the property. Layout, room size, windows — everything stays real. It's like cleaning up before a showing, just faster." },
  { q: "How fast do I get results?", a: "30 seconds. Upload a photo — get the result. Faster than writing a message to the owner asking them to clean up." },
  { q: "Can I use enhanced photos on any platform?", a: "Yes. No restrictions — publish on Zillow, Realtor.com, MLS, social media, or any listing site. The photo is fully yours." },
];

export default function EnPhotoEnhancementPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="text-white"
        style={{ background: "#161311" }}
      >
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI Photo Enhancement
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Professional photos
              <br />
              <span className="text-terra-400">without a photographer</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              AI turns any phone photo into a professional listing image
              in 30 seconds. No travel, no waiting, no overpaying.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Try free — 2 photos
            </Link>
          </div>

          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-1.jpg"
              afterSrc="/demo/after-1.jpg"
              label="Photo Enhancement"
              subtitle="Click to see original"
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "30 sec", label: "processing time" },
              { value: "333x", label: "cheaper than photographer" },
              { value: "3x", label: "more inquiries" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="heading-display text-[36px] sm:text-[48px] lg:text-[64px] text-terra-400">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 01 WHO IS IT FOR ===== */}
      <FadeInSection
        variant="scale-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "#161311" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Who It&apos;s For
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16 text-white">
            For agents.{" "}
            <span className="text-terra-400">For owners. For agencies.</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Real Estate Agents", desc: "Process 10-20 listings per month without a photographer. Save $500-2,000 monthly on photography." },
              { title: "Property Owners", desc: "Selling your home? Make it look its best without hiring professionals. 2 photos free." },
              { title: "Agencies & Brokerages", desc: "150 photos for $20/month. Standardize listing quality across your entire team." },
            ].map((item) => (
              <div
                key={item.title}
                className="stagger-child rounded-xl p-8"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="text-[20px] font-normal mb-3 text-white">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 WHAT AI CAN DO ===== */}
      <FadeInSection
        variant="fade-left"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "#161311" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Capabilities
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16 text-white">
            38 AI services.{" "}
            <span className="text-terra-400">One upload.</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Photo Cleanup", "Virtual Staging", "Style Redesign",
              "Object Removal", "Listing Text", "Day-to-Dusk",
              "Sky Replacement", "Photo Scoring", "Room Analysis", "Virtual Renovation",
            ].map((mode) => (
              <div
                key={mode}
                className="stagger-child rounded-xl p-5 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-sm text-neutral-300">{mode}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 EXAMPLES ===== */}
      <FadeInSection
        variant="blur-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "#161311" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Results
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16 text-white">
            Before.{" "}
            <span className="text-terra-400">After.</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Kitchen Cleanup", subtitle: "Clutter removed, lighting improved" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Bedroom Enhancement", subtitle: "Colors and composition enhanced" },
            ].map((item) => (
              <div key={item.label} className="stagger-child rounded-xl overflow-hidden">
                <BeforeAfterToggle beforeSrc={item.before} afterSrc={item.after} label={item.label} subtitle={item.subtitle} />
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 COST ===== */}
      <FadeInSection
        variant="fade-right"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "#161311" }}
      >
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] mb-6 text-white">
              Photographer: $150.{" "}
              <span className="text-terra-400">GPT Estate: $0.50.</span>
            </h2>
            <p className="text-neutral-300 leading-relaxed text-lg mb-8">
              Same professional result. 333x cheaper. 30 seconds instead of 3 days.
              And you can process unlimited properties.
            </p>
            <Link href="/en/pricing" className="btn-terra inline-flex">
              View pricing plans
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 05 FAQ ===== */}
      <FadeInSection
        variant="scale-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "#161311" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number-light">05</span>
                <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
                  FAQ
                </span>
              </div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] text-white">
                Common questions
              </h2>
            </div>
            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="faq-item group" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <summary className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg text-white">{item.q}</h3>
                    <span className="faq-icon flex-shrink-0 text-2xl leading-none text-neutral-500">+</span>
                  </summary>
                  <p className="pb-6 text-neutral-400 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== ALL MODES GRID ===== */}
      <FadeInSection
        variant="scale-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "#161311" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <AllModesGrid title="Not just enhancement — also" subtitle="37 more AI services" />
        </div>
      </FadeInSection>

      <CTASplitBanner
        heading1={"2 free photos.\nTry now."}
        cta1="Enhance your photos"
        heading2={"Need bulk processing?\nWe'll find your plan."}
        cta2="Contact us"
        fomo="Join 47,832 agents already using AI enhancement"
      />
    </>
  );
}
