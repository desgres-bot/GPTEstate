import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "GPT Estate — AI Real Estate Photo Enhancement",
  description:
    "Professional real estate photos in 30 seconds. AI enhancement, virtual staging, and interior redesign. From $0.50 per photo. 2 free photos — no signup.",
  alternates: {
    canonical: "https://fotoestate.ru/en",
    languages: { ru: "https://fotoestate.ru", en: "https://fotoestate.ru/en" },
  },
  openGraph: {
    title: "GPT Estate — AI Real Estate Photo Enhancement",
    description: "Professional listing photos in 30 seconds. 2 free photos.",
    locale: "en_US",
  },
};

export default function EnHomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-[#1E1B18] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              AI-powered real estate photography
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Photos that
              <br />
              <span className="text-terra-400">sell homes</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              AI creates professional listing photos in 30 seconds.
              <br className="hidden sm:block" />
              No photographer, no cleaning, no waiting.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Try free — 2 photos, no signup
            </Link>
          </div>

          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/hero-before.jpg"
              afterSrc="/demo/hero-after.jpg"
              label="Before / After"
              subtitle="Click to see original"
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "30 sec", label: "per photo" },
              { value: "10", label: "AI modes" },
              { value: "$0.50", label: "per photo" },
            ].map((stat) => (
              <div key={stat.label + stat.value}>
                <div className="heading-display text-[36px] sm:text-[48px] lg:text-[64px] text-terra-400">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 01 PROBLEM ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">01</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              The Problem
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            Bad photos cost you{" "}
            <span className="text-terra-500">deals and clients.</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { num: "90%", text: "of buyers start their search online — photos are the first impression" },
              { num: "73%", text: "of staged properties sell faster than unstaged ones" },
              { num: "3x", text: "more inquiries on listings with professional photos" },
            ].map((item) => (
              <div key={item.num} className="stagger-child rounded-xl bg-white border border-neutral-200 p-8">
                <div className="heading-display text-[48px] text-terra-500 mb-4">{item.num}</div>
                <p className="text-[#6B6560] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 SERVICES ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">02</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              AI Modes
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            10 tools.{" "}
            <span className="text-terra-500">One platform.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Photo Cleanup", desc: "Remove clutter, fix lighting — like a 5-minute tidy-up", link: "/generate?mode=enhance" },
              { title: "Virtual Staging", desc: "Add furniture to empty rooms. 25 styles + custom text", link: "/generate?mode=staging" },
              { title: "Interior Redesign", desc: "Change furniture style in one click. 25 design options", link: "/generate?mode=redesign" },
              { title: "Object Removal", desc: "Paint over objects to remove — AI fills with clean surface", link: "/generate?mode=remove" },
              { title: "Listing Description", desc: "Upload photo — get ready-to-post text in 30 seconds", link: "/generate?mode=describe" },
              { title: "Day-to-Dusk", desc: "Transform daytime exteriors into stunning twilight scenes", link: "/generate?mode=dusk" },
              { title: "Sky Replacement", desc: "Overcast sky? Swap for sunny, sunset, dramatic, or blue", link: "/generate?mode=sky" },
              { title: "Photo Scoring", desc: "AI rates your photo 1-10 with improvement recommendations", link: "/generate?mode=score" },
              { title: "Room Analysis", desc: "AI identifies room type, area, materials, furniture, 15+ parameters", link: "/generate?mode=analyze" },
              { title: "Virtual Renovation", desc: "Replace walls and floors — 8 material options", link: "/generate?mode=renovation" },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.link}
                className="stagger-child group rounded-xl border border-neutral-200 p-8 hover:border-terra-300 transition-all"
              >
                <h3 className="text-[20px] font-normal mb-2 group-hover:text-terra-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#6B6560] leading-relaxed text-sm">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 EXAMPLES ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
              Examples
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            See it.{" "}
            <span className="text-terra-400">Believe it.</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Photo Cleanup", subtitle: "Kitchen — clutter removed" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Virtual Staging", subtitle: "Empty room — furnished" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Interior Redesign", subtitle: "Bedroom — Scandinavian style" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Style Change", subtitle: "Kitchen — Modern redesign" },
            ].map((item) => (
              <div key={item.label + item.subtitle} className="stagger-child rounded-xl overflow-hidden">
                <BeforeAfterToggle
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  label={item.label}
                  subtitle={item.subtitle}
                />
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 PRICING PREVIEW ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">04</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Pricing
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            Cheaper than coffee.{" "}
            <span className="text-terra-500">More effective than a photographer.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white border border-neutral-200 p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-6">
                Traditional approach
              </div>
              <div className="space-y-4">
                {[
                  { item: "Professional photographer", cost: "$50-200" },
                  { item: "Real staging", cost: "$500-2,000" },
                  { item: "Copywriter", cost: "$30-100" },
                  { item: "Turnaround time", cost: "3-7 days" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="text-[#6B6560]">{row.item}</span>
                    <span className="text-[#1E1B18] font-medium">{row.cost}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-[#1E1B18] font-medium">Total</span>
                  <span className="heading-display text-[28px]">$580+</span>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-8 lg:p-10"
              style={{
                background: "linear-gradient(135deg, rgba(212,101,75,0.10) 0%, rgba(212,101,75,0.03) 100%)",
                border: "1px solid rgba(212,101,75,0.25)",
              }}
            >
              <div className="text-xs uppercase tracking-widest text-terra-500 mb-6">
                GPT Estate
              </div>
              <div className="space-y-4">
                {[
                  { item: "Photo enhancement", cost: "$0.50" },
                  { item: "Virtual staging", cost: "$0.50" },
                  { item: "Listing description", cost: "$0.50" },
                  { item: "Turnaround time", cost: "30 seconds" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-terra-200/40">
                    <span className="text-[#6B6560]">{row.item}</span>
                    <span className="text-terra-500 font-medium">{row.cost}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-terra-500 font-medium">Total per listing</span>
                  <span className="heading-display text-[28px] text-terra-500">$0.75</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/en/pricing" className="btn-terra inline-flex">
              View all plans
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 05 HOW IT WORKS ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">05</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              How It Works
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Three steps.{" "}
            <span className="text-terra-500">30 seconds.</span>
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: "01", title: "Upload photo", desc: "Any phone photo works. The worse it looks — the more impressive the result." },
              { step: "02", title: "Choose a mode", desc: "Cleanup, staging, redesign, description — 10 AI modes for every need." },
              { step: "03", title: "Get the result", desc: "Download the enhanced photo or copy the listing text. Ready to publish." },
            ].map((item) => (
              <div key={item.step} className="stagger-child">
                <div className="heading-display text-[64px] text-terra-500/20 mb-4">{item.step}</div>
                <h3 className="text-[20px] font-normal mb-2">{item.title}</h3>
                <p className="text-[#6B6560] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      <CTASplitBanner
        heading1={"2 free photos.\nRight now."}
        cta1="Try free"
        heading2={"Need 50+ photos/month?\nLet's find your plan."}
        cta2="Contact us"
        fomo="Join 1,247 agents already saving time and money"
      />
    </>
  );
}
