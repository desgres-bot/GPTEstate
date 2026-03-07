import Link from "next/link";
import { PLANS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тарифы — ФотоЭстейт",
  description: "Выберите тариф для улучшения фото недвижимости. От 15 рублей за фото.",
};

export default function PricingPage() {
  const isPremium = (id: string) => id === "premium_pro";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold lg:text-4xl">Простые и понятные тарифы</h1>
        <p className="mt-3 text-lg text-gray-500">
          Начните бесплатно, масштабируйте по мере роста
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border p-8 transition-shadow hover:shadow-lg ${
              plan.popular
                ? "border-accent-500 shadow-lg ring-2 ring-accent-500/20 bg-white"
                : isPremium(plan.id)
                ? "border-navy-800 bg-navy-950 text-white shadow-lg ring-2 ring-navy-700/50"
                : "border-gray-200 bg-white"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-5 py-1.5 text-xs font-bold text-white shadow-md">
                Популярный
              </div>
            )}
            {isPremium(plan.id) && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-1.5 text-xs font-bold text-white shadow-md">
                PRO
              </div>
            )}
            <div className={`text-sm font-semibold ${isPremium(plan.id) ? "text-gray-400" : "text-gray-500"}`}>
              {plan.name}
            </div>
            <div className="mt-3">
              <span className="text-4xl font-extrabold">
                {plan.price === 0 ? "0" : plan.price.toLocaleString("ru-RU")}
              </span>
              {plan.price > 0 && (
                <span className={`text-xl font-bold ${isPremium(plan.id) ? "text-gray-500" : "text-gray-400"}`}>
                  {" "} &#8381;
                </span>
              )}
            </div>
            <div className={`mt-1 text-sm ${isPremium(plan.id) ? "text-gray-500" : "text-gray-400"}`}>
              {plan.credits} {plan.credits === 2 ? "генерации" : "генераций"}
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-2 text-sm ${isPremium(plan.id) ? "text-gray-300" : "text-gray-600"}`}
                >
                  <svg
                    className={`mt-0.5 h-4 w-4 flex-shrink-0 ${isPremium(plan.id) ? "text-purple-400" : "text-green-500"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={plan.price === 0 ? "/generate" : "/auth"}
              className={`mt-8 block w-full rounded-xl py-3.5 text-center text-sm font-semibold transition-all ${
                plan.popular
                  ? "bg-accent-500 text-white hover:bg-accent-600 shadow-md"
                  : isPremium(plan.id)
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {plan.price === 0 ? "Начать бесплатно" : isPremium(plan.id) ? "Подключить Pro" : "Подключить"}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-gray-50 p-8 text-center">
        <h3 className="text-xl font-bold">Нужен индивидуальный план?</h3>
        <p className="mt-2 text-gray-500">
          Свяжитесь с нами для обсуждения условий для крупных агентств недвижимости
        </p>
        <a
          href="mailto:support@fotoestate.ru"
          className="btn-secondary mt-4 inline-block"
        >
          Написать нам
        </a>
      </div>
    </div>
  );
}
