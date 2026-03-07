import Link from "next/link";
import { PLANS } from "@/lib/constants";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тарифы и цены — от 50₽ за фото",
  description:
    "Прозрачные тарифы для риелторов и агентств. Бесплатный старт — 2 фото без регистрации. Тариф Риелтор — 2 490₽ за 50 фото. Гарантия возврата денег.",
  alternates: { canonical: "https://fotoestate.ru/pricing" },
  openGraph: {
    title: "Тарифы GPT Estate — AI-фото от 50₽",
    description: "Начните бесплатно. 2 фото без регистрации и без карты.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Можно ли попробовать бесплатно?",
    a: "Да! 2 фото бесплатно, без регистрации и без карты. Просто загрузите фото и получите результат за 30 секунд.",
  },
  {
    q: "Что входит в одну генерацию?",
    a: "Одна генерация = обработка одного фото. Вы выбираете режим (уборка, мебель, стиль или удаление) и получаете готовое фото.",
  },
  {
    q: "Как оплатить?",
    a: "Банковской картой через защищённый платёж ЮKassa. Visa, Mastercard, МИР. Оплата моментальная, генерации доступны сразу.",
  },
  {
    q: "Есть ли скидки для агентств?",
    a: "Тариф Агентство (6 990\u20BD за 150 фото) — уже со скидкой. Если нужно больше — напишите нам, подберём индивидуальные условия.",
  },
  {
    q: "Что если закончатся генерации?",
    a: "Вы можете докупить новый пакет в любой момент. Неиспользованные генерации не сгорают.",
  },
];

const PRICING_CARDS = [
  {
    name: "Бесплатно",
    price: "0",
    per: "",
    credits: "2 фото",
    perPhoto: "",
    features: ["Уборка фото", "Стандартное качество", "Без регистрации"],
    dark: false,
    badge: null as string | null,
    cta: "Попробовать",
    href: "/generate",
  },
  {
    name: "Риелтор",
    price: "2 490",
    per: "\u20BD",
    credits: "50 фото",
    perPhoto: "50\u20BD/фото",
    features: [
      "Уборка + Новый стиль",
      "Высокое качество",
      "Виртуальная мебель",
      "Приоритетная очередь",
    ],
    dark: true,
    badge: "Выбирают 67%",
    cta: "Подключить",
    href: "/auth",
  },
  {
    name: "Агентство",
    price: "6 990",
    per: "\u20BD",
    credits: "150 фото",
    perPhoto: "47\u20BD/фото",
    features: [
      "Все 10 режимов",
      "Лучшее качество",
      "Виртуальная мебель",
      "Поддержка каждый день",
    ],
    dark: false,
    badge: null,
    cta: "Подключить",
    href: "/auth",
  },
  {
    name: "Профи",
    price: "5 990",
    per: "\u20BD",
    credits: "100 фото",
    perPhoto: "60\u20BD/фото",
    features: [
      "Точечное удаление",
      "Все режимы + максимальное качество",
      "Личная поддержка",
    ],
    dark: true,
    badge: "PRO",
    cta: "Подключить",
    href: "/auth",
  },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Тарифы", url: "https://fotoestate.ru/pricing" },
]);

const faqSchemaData = getFAQSchema(FAQ_ITEMS);

export default function PricingPage() {
  return (
    <>
      {/* ===== 01 ГЕРОЙ ===== */}
      <section className="bg-[#1E1B18] text-white pt-32 pb-24 lg:pt-44 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="section-label mb-8">
              <span className="section-number-light">01</span>
              <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">
                Тарифы
              </span>
            </div>

            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[80px]">
              Дешевле чашки кофе. Эффективнее фотографа.
            </h1>

            <p className="mt-8 text-lg text-[#BFBFBF]">
              Начните бесплатно — 2 фото без регистрации и без карты
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
              </span>
              <span className="text-sm text-neutral-400">
                67% риелторов выбирают тариф{" "}
                <span className="text-white font-medium">Риелтор</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 02 ТАРИФНЫЕ КАРТОЧКИ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #e8e4df 0%, #d4d0cb 100%)",
            }}
          >
            {PRICING_CARDS.map((plan) => (
              <div
                key={plan.name}
                className={`stagger-child relative p-10 transition-transform duration-300 ease-spring hover:-translate-y-1 ${
                  plan.dark ? "bg-[#1E1B18] text-white" : "bg-white"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-10 rounded-lg bg-terra-500 px-3 py-1 text-xs font-medium text-white">
                    {plan.badge}
                  </div>
                )}

                <div
                  className={`text-xs uppercase tracking-widest ${
                    plan.dark ? "text-neutral-400" : "text-[#7D756E]"
                  }`}
                >
                  {plan.name}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="heading-display text-[40px] sm:text-[48px]">
                    {plan.price}
                  </span>
                  {plan.per && (
                    <span className="text-xl opacity-60">{plan.per}</span>
                  )}
                </div>

                <div
                  className={`mt-1 text-sm ${
                    plan.dark ? "text-neutral-400" : "text-[#7D756E]"
                  }`}
                >
                  {plan.credits}
                  {plan.perPhoto && (
                    <span className="ml-2 text-terra-500 font-medium">
                      = {plan.perPhoto}
                    </span>
                  )}
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-base ${
                        plan.dark ? "text-neutral-300" : "text-[#6B6560]"
                      }`}
                    >
                      <span className="mt-0.5 text-xs">+</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`mt-8 block w-full text-center ${
                    plan.dark && plan.badge
                      ? "btn-terra-glow"
                      : plan.dark
                        ? "btn-white"
                        : "btn-outline"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 СРАВНЕНИЕ СТОИМОСТИ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">02</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Сравнение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Почему это выгодно
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Без нас */}
            <div className="stagger-child rounded-xl bg-[#1E1B18] p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Без нас
              </div>
              <div className="space-y-5">
                {[
                  { item: "Фотограф", cost: "3 000 \u2013 5 000\u20BD" },
                  { item: "Ожидание", cost: "2\u20133 дня" },
                  { item: "Уборка квартиры", cost: "ваше время" },
                  { item: "Мебель для стейджинга", cost: "50 000\u20BD" },
                  { item: "Результат", cost: "1 комплект фото" },
                ].map((row) => (
                  <div
                    key={row.item}
                    className="flex justify-between items-center py-2 border-b border-white/10"
                  >
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-white font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* С нами */}
            <div
              className="stagger-child rounded-xl p-8 lg:p-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,101,75,0.15) 0%, rgba(212,101,75,0.05) 100%)",
                border: "1px solid rgba(212,101,75,0.3)",
              }}
            >
              <div className="text-xs uppercase tracking-widest text-terra-400 mb-6">
                С нами
              </div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "от 50\u20BD за фото" },
                  { item: "Скорость", cost: "30 секунд" },
                  { item: "Уборка", cost: "не нужна" },
                  { item: "Мебель", cost: "виртуальная, бесплатно" },
                  { item: "Результат", cost: "неограниченно" },
                ].map((row) => (
                  <div
                    key={row.item}
                    className="flex justify-between items-center py-2 border-b border-terra-400/20"
                  >
                    <span className="text-[#6B6560]">{row.item}</span>
                    <span className="text-terra-500 font-medium">
                      {row.cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-12 text-center heading-display text-[28px] sm:text-[36px] lg:text-[48px] text-terra-500">
            Экономия: от 49 000&#8381; в месяц при 10 объектах
          </p>
        </div>
      </FadeInSection>

      {/* ===== 04 ГАРАНТИЯ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="section-label mb-8 justify-center">
            <span className="section-number">03</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
              Гарантия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mx-auto">
            100% возврат денег
          </h2>

          <p className="mt-8 text-lg text-[#6B6560] leading-relaxed max-w-xl mx-auto">
            Не понравился результат? Вернём деньги без вопросов в течение 7
            дней. Никаких скрытых условий.
          </p>

          <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#7D756E]">
            <span>
              Оценка:{" "}
              <strong className="text-[#1E1B18]">4.9/5</strong>
            </span>
            <span className="hidden sm:inline" aria-hidden="true">
              &middot;
            </span>
            <span>1 247 пользователей</span>
            <span className="hidden sm:inline" aria-hidden="true">
              &middot;
            </span>
            <span>12 847 фото обработано</span>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 05 ВОПРОСЫ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number">04</span>
                <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">
                  Вопросы
                </span>
              </div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px]">
                Частые вопросы о тарифах
              </h2>
            </div>

            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="faq-item group">
                  <summary className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg">{item.q}</h3>
                    <span className="faq-icon flex-shrink-0 text-2xl leading-none text-[#7D756E]">
                      +
                    </span>
                  </summary>
                  <p className="pb-6 text-[#6B6560] leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 06 CTA ===== */}
      <CTASplitBanner />

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        // Static hardcoded breadcrumb data from our own constants
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        // Static hardcoded FAQ data from our own constants
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
    </>
  );
}
