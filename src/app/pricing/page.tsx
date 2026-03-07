import Link from "next/link";
import { PLANS } from "@/lib/constants";
import CTASplitBanner from "@/components/CTASplitBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тарифы — GPT Estate",
  description: "Выберите тариф для улучшения фото недвижимости. От 15 рублей за фото.",
};

export default function PricingPage() {
  const isPremium = (id: string) => id === "premium_pro";

  return (
    <>
      <div className="bg-[#1E1B18] text-white pt-32 pb-24 lg:pt-44 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="section-label mb-8">
              <span className="section-number-light">01</span>
              <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">Тарифы</span>
            </div>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[80px]">
              Простые и понятные тарифы
            </h1>
            <p className="mt-8 text-lg text-[#BFBFBF]">
              Начните бесплатно, масштабируйте по мере роста
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-px bg-neutral-200 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-10 ${
                  plan.popular || isPremium(plan.id)
                    ? "bg-[#1E1B18] text-white"
                    : "bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-10 rounded-lg bg-white px-3 py-1 text-xs font-medium text-[#1E1B18]">
                    Популярный
                  </div>
                )}
                {isPremium(plan.id) && (
                  <div className="absolute -top-3 left-10 rounded-lg bg-white px-3 py-1 text-xs font-medium text-[#1E1B18]">
                    PRO
                  </div>
                )}
                <div className={`text-xs uppercase tracking-widest ${plan.popular || isPremium(plan.id) ? "text-neutral-400" : "text-[#7D756E]"}`}>
                  {plan.name}
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="heading-display text-[40px] sm:text-[48px]">
                    {plan.price === 0 ? "0" : plan.price.toLocaleString("ru-RU")}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-xl opacity-50">&#8381;</span>
                  )}
                </div>
                <div className={`mt-1 text-sm ${plan.popular || isPremium(plan.id) ? "text-neutral-400" : "text-[#7D756E]"}`}>
                  {plan.credits} {plan.credits === 2 ? "генерации" : "генераций"}
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-base ${plan.popular || isPremium(plan.id) ? "text-neutral-300" : "text-[#6B6560]"}`}
                    >
                      <span className="mt-0.5 text-xs">+</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.price === 0 ? "/generate" : "/auth"}
                  className={`mt-8 block w-full rounded-lg py-3 text-center text-base transition-all ${
                    plan.popular || isPremium(plan.id)
                      ? "bg-white text-[#1E1B18] hover:bg-neutral-200"
                      : "border border-neutral-300 text-[#1E1B18] hover:bg-[#1E1B18] hover:text-white hover:border-[#1E1B18]"
                  }`}
                >
                  {plan.price === 0 ? "Начать бесплатно" : isPremium(plan.id) ? "Подключить Pro" : "Подключить"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASplitBanner />
    </>
  );
}
