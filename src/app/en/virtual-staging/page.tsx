import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "Virtual Staging — AI Furniture in 30 Seconds | GPT Estate",
  description:
    "Virtual staging for real estate. Add photorealistic furniture to empty rooms in 30 seconds. 25 interior styles + custom text. From $0.50 per photo.",
  keywords:
    "virtual staging, AI staging, virtual furniture, real estate staging, home staging AI, virtual staging software",
  alternates: {
    canonical: "https://fotoestate.ru/en/virtual-staging",
    languages: { ru: "https://fotoestate.ru/virtualnyj-stejdzhing", en: "https://fotoestate.ru/en/virtual-staging" },
  },
  openGraph: {
    title: "Virtual Staging — AI Furniture in 30 Seconds",
    description: "Add photorealistic furniture to empty rooms. 25 styles, $0.50/photo.",
    locale: "en_US",
  },
};

const FAQ_ITEMS = [
  { q: "Will buyers notice the furniture is virtual?", a: "No. AI creates photorealistic furniture with correct shadows, perspective, and lighting. The results are indistinguishable from real photos." },
  { q: "Is virtual staging legal?", a: "Yes. Virtual staging is a standard marketing practice worldwide. Just note in your listing that the staging is virtual." },
  { q: "How many styles are available?", a: "25 pre-designed styles (Modern, Scandinavian, Loft, Japanese, and more) plus a custom text option where you describe any style you want." },
  { q: "Can I stage multiple rooms at once?", a: "Yes. Use our batch processing feature to stage up to 20 photos at once and download them all as a ZIP file." },
  { q: "How does it compare to real staging?", a: "Virtual staging costs $0.50 vs $500-2,000 for real staging. Same effect on sales — 73% of staged properties sell faster." },
];

export default function EnVirtualStagingPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-[#1E1B18] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Virtual Staging
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Empty rooms don&apos;t sell.
              <br />
              <span className="text-terra-400">Furnished ones do.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              AI adds photorealistic furniture to any empty room in 30 seconds.
              25 interior styles + describe any custom style in text.
            </p>
            <Link href="/generate?mode=staging" className="btn-terra mt-8 inline-flex">
              Try free — 2 photos
            </Link>
          </div>

          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/before-2.jpg"
              afterSrc="/demo/after-2.jpg"
              label="Virtual Staging"
              subtitle="Empty room — furnished in 30 seconds"
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "$0.50", label: "per photo" },
              { value: "25+", label: "design styles" },
              { value: "73%", label: "faster sales" },
            ].map((stat) => (
              <div key={stat.label}>
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

      {/* ===== 01 COMPARISON ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">01</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Cost Comparison
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mb-16">
            Real staging: $2,000.{" "}
            <span className="text-terra-500">Virtual: $0.50.</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white border border-neutral-200 p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-[#7D756E] mb-6">Real Staging</div>
              <div className="space-y-5">
                {[
                  { item: "Furniture rental", cost: "$500-2,000" },
                  { item: "Delivery & setup", cost: "$200-500" },
                  { item: "Cleanup after", cost: "$100-200" },
                  { item: "Turnaround", cost: "3-7 days" },
                  { item: "Styles available", cost: "1 (purchased)" },
                  { item: "Change style", cost: "Buy again" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="text-[#6B6560]">{row.item}</span>
                    <span className="text-[#1E1B18] font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-8 lg:p-10" style={{ background: "linear-gradient(135deg, rgba(212,101,75,0.10) 0%, rgba(212,101,75,0.03) 100%)", border: "1px solid rgba(212,101,75,0.25)" }}>
              <div className="text-xs uppercase tracking-widest text-terra-500 mb-6">Virtual Staging (GPT Estate)</div>
              <div className="space-y-5">
                {[
                  { item: "Per photo", cost: "$0.50" },
                  { item: "Delivery & setup", cost: "Not needed" },
                  { item: "Cleanup after", cost: "Not needed" },
                  { item: "Turnaround", cost: "30 seconds" },
                  { item: "Styles available", cost: "25 + custom" },
                  { item: "Change style", cost: "1 click, free" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-terra-200/40">
                    <span className="text-[#6B6560]">{row.item}</span>
                    <span className="text-terra-500 font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 STYLES ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">02</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Styles
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            25 styles.{" "}
            <span className="text-terra-500">Or describe your own.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Modern", "Scandinavian", "Loft", "Classic", "Japanese", "Minimalist",
              "Boho", "Provence", "Art Deco", "High-tech", "Country", "Eco",
              "Industrial", "Mediterranean", "Retro", "Neoclassic", "Mid-century",
              "Coastal", "Farmhouse", "Rustic", "Glam", "Transitional", "Baroque",
              "Fusion", "Ethnic",
            ].map((style) => (
              <span key={style} className="stagger-child rounded-full bg-[#fbf9f5] border border-neutral-200 px-5 py-2.5 text-sm text-[#6B6560]">
                {style}
              </span>
            ))}
            <span className="stagger-child rounded-full bg-terra-500/10 border border-terra-500/30 px-5 py-2.5 text-sm text-terra-500 font-medium">
              + Custom text prompt
            </span>
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
            Empty.{" "}
            <span className="text-terra-400">Furnished.</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Living Room", subtitle: "Modern style" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Bedroom", subtitle: "Scandinavian style" },
            ].map((item) => (
              <div key={item.label} className="stagger-child rounded-xl overflow-hidden">
                <BeforeAfterToggle beforeSrc={item.before} afterSrc={item.after} label={item.label} subtitle={item.subtitle} />
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 FAQ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number">04</span>
                <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
                  FAQ
                </span>
              </div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px]">
                Common questions
              </h2>
            </div>
            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="faq-item group">
                  <summary className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg">{item.q}</h3>
                    <span className="faq-icon flex-shrink-0 text-2xl leading-none text-[#7D756E]">+</span>
                  </summary>
                  <p className="pb-6 text-[#6B6560] leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <CTASplitBanner
        heading1={"2 free photos.\nTry now."}
        cta1="Try virtual staging"
        cta1Href="/generate?mode=staging"
        heading2={"Need bulk staging?\nWe'll find your plan."}
        cta2="Contact us"
        fomo="Join 1,247 agents already using AI staging"
      />
    </>
  );
}
