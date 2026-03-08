import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import AllModesGrid from "@/components/AllModesGrid";

export const metadata: Metadata = {
  title: "GPT Estate — Photos That Sell Homes | 38 AI Services",
  description:
    "Professional real estate photos in 30 seconds. 38 AI services: enhancement, virtual staging, interior redesign, and more. Photos that sell homes. From $0.50 per photo. 2 free photos — no signup.",
  alternates: {
    canonical: "https://fotoestate.ru/en",
    languages: { ru: "https://fotoestate.ru", en: "https://fotoestate.ru/en" },
  },
  openGraph: {
    title: "GPT Estate — Photos That Sell Homes | 38 AI Services",
    description: "Professional listing photos in 30 seconds. 38 AI services. 2 free photos.",
    locale: "en_US",
  },
};

export default function EnHomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="text-white"
        style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}
      >
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
              { value: "38", label: "AI services" },
              { value: "$0.50", label: "per photo" },
            ].map((stat) => (
              <div key={stat.label + stat.value}>
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

      {/* ===== 01 PROBLEM ===== */}
      <FadeInSection
        variant="scale-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "radial-gradient(ellipse at top center, rgba(212,101,75,0.06) 0%, #161311 50%, #1a1714 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">01</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              The Problem
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16 text-white">
            Bad photos cost you{" "}
            <span className="text-terra-400">deals and clients.</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { num: "90%", text: "of buyers start their search online — photos are the first impression" },
              { num: "73%", text: "of staged properties sell faster than unstaged ones" },
              { num: "3x", text: "more inquiries on listings with professional photos" },
            ].map((item) => (
              <div
                key={item.num}
                className="stagger-child rounded-xl p-8"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="heading-display text-[48px] text-terra-400 mb-4">{item.num}</div>
                <p className="text-neutral-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 SERVICES ===== */}
      <FadeInSection
        variant="fade-left"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "linear-gradient(180deg, #1a1714 0%, #161311 50%, #1E1B18 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              AI Modes
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16 text-white">
            38 AI services.{" "}
            <span className="text-terra-400">One platform.</span>
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
                className="stagger-child group rounded-xl p-8 transition-all hover:-translate-y-[1px]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="text-[20px] font-normal mb-2 text-white group-hover:text-terra-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 EXAMPLES ===== */}
      <FadeInSection
        variant="blur-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">03</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Examples
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16 text-white">
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
      <FadeInSection
        variant="fade-right"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "radial-gradient(ellipse at bottom center, rgba(212,101,75,0.05) 0%, #161311 50%, #1a1714 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Pricing
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16 text-white">
            Cheaper than coffee.{" "}
            <span className="text-terra-400">More effective than a photographer.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-xl p-8 lg:p-10"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Traditional approach
              </div>
              <div className="space-y-4">
                {[
                  { item: "Professional photographer", cost: "$50-200" },
                  { item: "Real staging", cost: "$500-2,000" },
                  { item: "Copywriter", cost: "$30-100" },
                  { item: "Turnaround time", cost: "3-7 days" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-white font-medium">{row.cost}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-white font-medium">Total</span>
                  <span className="heading-display text-[28px] text-white">$580+</span>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-8 lg:p-10"
              style={{
                background: "linear-gradient(135deg, rgba(212,101,75,0.12) 0%, rgba(212,101,75,0.04) 100%)",
                border: "1px solid rgba(212,101,75,0.25)",
              }}
            >
              <div className="text-xs uppercase tracking-widest text-terra-400 mb-6">
                GPT Estate
              </div>
              <div className="space-y-4">
                {[
                  { item: "Photo enhancement", cost: "$0.50" },
                  { item: "Virtual staging", cost: "$0.50" },
                  { item: "Listing description", cost: "$0.50" },
                  { item: "Turnaround time", cost: "30 seconds" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(212,101,75,0.2)" }}>
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-terra-400 font-medium">{row.cost}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-terra-400 font-medium">Total per listing</span>
                  <span className="heading-display text-[28px] text-terra-400">$0.75</span>
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
      <FadeInSection
        variant="scale-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "linear-gradient(180deg, #1a1714 0%, #161311 50%, #1E1B18 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">05</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              How It Works
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16 text-white">
            Three steps.{" "}
            <span className="text-terra-400">30 seconds.</span>
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: "01", title: "Upload photo", desc: "Any phone photo works. The worse it looks — the more impressive the result." },
              { step: "02", title: "Choose a mode", desc: "Cleanup, staging, redesign, description — 38 AI services for every need." },
              { step: "03", title: "Get the result", desc: "Download the enhanced photo or copy the listing text. Ready to publish." },
            ].map((item) => (
              <div key={item.step} className="stagger-child">
                <div className="heading-display text-[64px] text-terra-400/20 mb-4">{item.step}</div>
                <h3 className="text-[20px] font-normal mb-2 text-white">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== ALL MODES GRID ===== */}
      <FadeInSection
        variant="scale-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "radial-gradient(ellipse at top center, rgba(212,101,75,0.06) 0%, #161311 50%, #1a1714 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <AllModesGrid title="Not just photos — also" subtitle="37 more AI services" />
        </div>
      </FadeInSection>

      <CTASplitBanner
        heading1={"2 free photos.\nRight now."}
        cta1="Try free"
        heading2={"Need 50+ photos/month?\nLet's find your plan."}
        cta2="Contact us"
        fomo="Join 47,832 agents already saving time and money"
      />
    </>
  );
}
