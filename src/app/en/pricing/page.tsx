import type { Metadata } from "next";
import Link from "next/link";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "Pricing — From $0.50 per Photo | GPT Estate",
  description:
    "Transparent pricing for real estate agents and agencies. Start free — 2 photos, no signup. Realtor plan from $8/month for 50 photos. Money-back guarantee.",
  alternates: {
    canonical: "https://fotoestate.ru/en/pricing",
    languages: { ru: "https://fotoestate.ru/pricing", en: "https://fotoestate.ru/en/pricing" },
  },
  openGraph: {
    title: "Pricing — GPT Estate",
    description: "AI photo enhancement from $0.50/photo. Start free.",
    locale: "en_US",
  },
};

const PRICING_CARDS = [
  {
    name: "Free",
    price: "0",
    per: "",
    credits: "2 photos",
    perPhoto: "",
    features: ["Photo cleanup", "Standard quality", "No signup needed"],
    dark: false,
    badge: null as string | null,
    cta: "Try Free",
    href: "/generate",
  },
  {
    name: "Realtor",
    price: "2,490",
    per: "₽",
    credits: "50 photos",
    perPhoto: "~$0.50/photo",
    features: ["Cleanup + Styling", "High quality", "Virtual furniture", "Priority processing"],
    dark: true,
    badge: "Most Popular",
    cta: "Get Started",
    href: "/auth",
  },
  {
    name: "Agency",
    price: "6,990",
    per: "₽",
    credits: "150 photos",
    perPhoto: "~$0.47/photo",
    features: ["All 10 modes", "Maximum quality", "Virtual furniture", "Priority processing", "Daily support"],
    dark: false,
    badge: null,
    cta: "Get Started",
    href: "/auth",
  },
  {
    name: "Pro",
    price: "5,990",
    per: "₽",
    credits: "100 photos",
    perPhoto: "~$0.60/photo",
    features: ["Object removal", "All modes + Best quality", "Virtual furniture", "Priority processing", "Personal support"],
    dark: true,
    badge: null,
    cta: "Get Started",
    href: "/auth",
  },
];

const FAQ_ITEMS = [
  { q: "Can I try for free?", a: "Yes! 2 photos free, no signup, no credit card. Upload a photo and get results in 30 seconds." },
  { q: "What counts as one generation?", a: "One generation = processing one photo. Choose a mode (cleanup, staging, redesign, etc.) and get your enhanced photo." },
  { q: "How do I pay?", a: "Secure payment via YuKassa. Visa, Mastercard, MIR accepted. Instant activation after payment." },
  { q: "Are there volume discounts?", a: "The Agency plan (6,990₽ for 150 photos) already includes a discount. Need more? Contact us for custom pricing." },
  { q: "What if I run out of credits?", a: "Purchase a new plan anytime. Unused credits don't expire." },
];

export default function EnPricingPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-[#1E1B18] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
              Pricing
            </p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Cheaper than coffee.
              <br />
              <span className="text-terra-400">Better than a photographer.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Start free — 2 photos, no signup. Pick a plan when you&apos;re ready.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 01 PLANS ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">01</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Plans
            </span>
          </div>
          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Pick your plan.
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_CARDS.map((plan) => (
              <div
                key={plan.name}
                className={`stagger-child relative rounded-xl p-8 ${
                  plan.dark
                    ? "bg-[#1E1B18] text-white"
                    : "bg-white border border-neutral-200"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-8 rounded-full bg-terra-500 px-4 py-1 text-xs font-medium text-white">
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-[20px] font-normal mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="heading-display text-[40px]">{plan.price}</span>
                  <span className={plan.dark ? "text-neutral-400" : "text-[#6B6560]"}>{plan.per}</span>
                </div>
                <p className={`text-sm mb-1 ${plan.dark ? "text-neutral-400" : "text-[#6B6560]"}`}>
                  {plan.credits}
                </p>
                {plan.perPhoto && (
                  <p className="text-sm text-terra-500 mb-6">{plan.perPhoto}</p>
                )}
                {!plan.perPhoto && <div className="mb-6" />}
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm ${plan.dark ? "text-neutral-300" : "text-[#6B6560]"}`}>
                      + {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block w-full text-center rounded-lg py-3 text-sm transition-all ${
                    plan.dark
                      ? "bg-white text-[#1E1B18] hover:bg-neutral-200"
                      : "border border-neutral-300 text-[#1E1B18] hover:bg-neutral-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 GUARANTEE ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] mb-6">
              100% money-back{" "}
              <span className="text-terra-500">guarantee</span>
            </h2>
            <p className="text-[#6B6560] leading-relaxed text-lg">
              Not satisfied with the results? We&apos;ll refund your money within 7 days, no questions asked.
              We&apos;re confident in our AI — and we want you to be too.
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 FAQ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number">03</span>
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
        heading1={"Start free.\nNo signup needed."}
        cta1="Try 2 free photos"
        heading2={"Need a custom plan?\nLet's talk."}
        cta2="Contact us"
        fomo="Join 1,247 agents already saving time and money"
      />
    </>
  );
}
