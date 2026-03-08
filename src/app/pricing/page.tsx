import Link from "next/link";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import SavingsCalculator from "@/components/SavingsCalculator";
import LiveCounter from "@/components/LiveCounter";
import AllModesGrid from "@/components/AllModesGrid";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тарифы — 38 AI-сервисов для риелторов. От 0₽.",
  description:
    "Прозрачные тарифы для риелторов и агентств. 38 AI-сервисов: фото, тексты, аналитика. Бесплатный старт — 2 фото без регистрации. Тариф Риелтор — 2 490₽ за 50 фото.",
  alternates: { canonical: "https://fotoestate.ru/pricing" },
  openGraph: {
    title: "Тарифы GPT Estate — 38 AI-сервисов от 15₽/фото",
    description: "Начните бесплатно. 2 фото без регистрации и без карты. Все 38 AI-сервисов в одной подписке.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Можно ли попробовать бесплатно?",
    a: "Да! 2 фото бесплатно, без регистрации и без карты. Просто загрузите фото и получите результат за 30 секунд.",
  },
  {
    q: "Что входит в одну генерацию?",
    a: "Одна генерация = обработка одного фото любым из 38 AI-сервисов. Вы выбираете режим (уборка, мебель, стиль, удаление, ремонт, текст и др.) и получаете готовое фото или текст.",
  },
  {
    q: "Как оплатить?",
    a: "Банковской картой через защищённый платёж ЮKassa. Visa, Mastercard, МИР. Оплата моментальная, генерации доступны сразу.",
  },
  {
    q: "Что если закончатся генерации?",
    a: "Вы можете докупить новый пакет в любой момент. Неиспользованные генерации не сгорают.",
  },
  {
    q: "Чем отличается Профи от Риелтора?",
    a: "Профи включает AI Chat Editor (точечная доработка результата в диалоге), сравнение 4 стилей одновременно, точечное удаление объектов и персональную поддержку. Для тех, кто хочет максимальный контроль.",
  },
  {
    q: "Можно ли использовать Batch-обработку?",
    a: "Batch-обработка доступна на тарифе Агентство. Загружаете до 20 фото, выбираете один стиль — все фото обрабатываются одновременно за минуту.",
  },
  {
    q: "Есть ли скидки для агентств?",
    a: "Тариф Агентство (6 990₽ за 150 фото) — уже со скидкой. Если нужно больше — напишите нам, подберём индивидуальные условия.",
  },
  {
    q: "100% возврат денег — как это работает?",
    a: "Если не понравится результат — вернём деньги в течение 7 дней. Без вопросов, без скрытых условий. Просто напишите в поддержку.",
  },
];

const PRICING_CARDS = [
  {
    name: "Бесплатно",
    price: "0",
    per: "",
    credits: "2 фото",
    perPhoto: "",
    features: [
      "Уборка и улучшение фото",
      "Стандартное качество",
      "Без регистрации",
    ],
    accent: false,
    badge: null as string | null,
    cta: "Попробовать",
    href: "/generate",
  },
  {
    name: "Риелтор",
    price: "2 490",
    per: "₽",
    credits: "50 фото",
    perPhoto: "50₽/фото",
    features: [
      "Все 38 AI-сервисов",
      "Виртуальная мебель и ремонт",
      "AI-описания объектов",
      "Высокое качество",
      "Приоритетная генерация",
    ],
    accent: true,
    badge: "Выбирают 67%",
    cta: "Подключить",
    href: "/auth",
  },
  {
    name: "Агентство",
    price: "6 990",
    per: "₽",
    credits: "150 фото",
    perPhoto: "47₽/фото",
    features: [
      "Все 38 AI-сервисов",
      "Batch-обработка до 20 фото",
      "AI-описания + соцсети",
      "Максимальное качество",
      "Поддержка каждый день",
    ],
    accent: false,
    badge: null,
    cta: "Подключить",
    href: "/auth",
  },
  {
    name: "Профи",
    price: "5 990",
    per: "₽",
    credits: "100 фото",
    perPhoto: "60₽/фото",
    features: [
      "Все 38 AI-сервисов",
      "Точечное удаление объектов",
      "AI Chat Editor (доработка)",
      "Сравнение 4 стилей",
      "Персональная поддержка",
    ],
    accent: false,
    badge: "PRO",
    cta: "Подключить",
    href: "/auth",
  },
];

const COMPARE_ROWS = [
  { feature: "AI-сервисов", free: "3", realtor: "38", agency: "38", pro: "38" },
  { feature: "Уборка фото", free: "✓", realtor: "✓", agency: "✓", pro: "✓" },
  { feature: "Виртуальная мебель", free: "—", realtor: "✓", agency: "✓", pro: "✓" },
  { feature: "Удаление объектов", free: "—", realtor: "✓", agency: "✓", pro: "✓ точечное" },
  { feature: "Ремонт стен и полов", free: "—", realtor: "✓", agency: "✓", pro: "✓" },
  { feature: "Экстерьер и ландшафт", free: "—", realtor: "✓", agency: "✓", pro: "✓" },
  { feature: "AI-описание для Авито", free: "—", realtor: "✓", agency: "✓", pro: "✓" },
  { feature: "Batch до 20 фото", free: "—", realtor: "—", agency: "✓", pro: "—" },
  { feature: "AI Chat Editor", free: "—", realtor: "—", agency: "—", pro: "✓" },
  { feature: "Сравнение 4 стилей", free: "—", realtor: "—", agency: "—", pro: "✓" },
  { feature: "Качество", free: "Стандарт", realtor: "Высокое", agency: "Макс.", pro: "Лучшее" },
  { feature: "Поддержка", free: "—", realtor: "Email", agency: "24/7", pro: "Персональная" },
];

const breadcrumbData = getBreadcrumbSchema([
  { name: "Главная", url: "https://fotoestate.ru" },
  { name: "Тарифы", url: "https://fotoestate.ru/pricing" },
]);

const faqSchemaData = getFAQSchema(FAQ_ITEMS);

export default function PricingPage() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section
        className="text-white pt-32 pb-20 lg:pt-44 lg:pb-28"
        style={{ background: "linear-gradient(180deg, #1E1B18 0%, #161311 60%, #1a1714 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="section-label mb-8">
              <span className="section-number-light">01</span>
              <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
                Тарифы
              </span>
            </div>

            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[80px]">
              38&nbsp;AI&#8209;сервисов.
              <br />
              <span className="text-terra-400">От&nbsp;0₽.</span>
            </h1>

            <p className="mt-8 text-lg text-neutral-300 max-w-lg">
              Дешевле чашки кофе. Эффективнее фотографа. Начните бесплатно — 2 фото без регистрации и без карты.
            </p>

            {/* Live stats */}
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <div>
                <div className="heading-display text-[36px] sm:text-[48px] text-terra-400">
                  <LiveCounter end={2480} />
                </div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                  риелторов подключились
                </div>
              </div>
              <div>
                <div className="heading-display text-[36px] sm:text-[48px] text-terra-400">
                  <LiveCounter end={38} />
                </div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                  AI-сервисов
                </div>
              </div>
              <div>
                <div className="heading-display text-[36px] sm:text-[48px] text-terra-400">
                  <LiveCounter end={15} suffix="₽" />
                </div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mt-1">
                  от за фото
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terra-400"></span>
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
      <FadeInSection
        variant="scale-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "radial-gradient(ellipse at top center, rgba(212,101,75,0.06) 0%, #161311 50%, #1a1714 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Free trial banner */}
          <div
            className="mb-10 rounded-xl p-5 text-center"
            style={{ background: "rgba(212,101,75,0.1)", border: "1px solid rgba(212,101,75,0.25)" }}
          >
            <p className="text-white font-medium">
              Не уверены? Начните бесплатно — 2 фото без регистрации и без карты
            </p>
          </div>

          <div
            className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            {PRICING_CARDS.map((plan) => (
              <div
                key={plan.name}
                className="relative p-10 stagger-scale transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: plan.accent
                    ? "linear-gradient(135deg, rgba(212,101,75,0.12) 0%, #1E1B18 100%)"
                    : "#1E1B18",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-10 rounded-lg bg-terra-500 px-3 py-1 text-xs font-medium text-white">
                    {plan.badge}
                  </div>
                )}

                <div className="text-xs uppercase tracking-widest text-neutral-500">
                  {plan.name}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="heading-display text-[40px] sm:text-[48px] text-white">
                    {plan.price}
                  </span>
                  {plan.per && (
                    <span className="text-xl text-neutral-500">{plan.per}</span>
                  )}
                </div>

                <div className="mt-1 text-sm text-neutral-500">
                  {plan.credits}
                  {plan.perPhoto && (
                    <span className="ml-2 text-terra-400 font-medium">
                      = {plan.perPhoto}
                    </span>
                  )}
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-base text-neutral-300"
                    >
                      <span className="mt-0.5 text-xs text-terra-400">+</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`mt-8 block w-full text-center ${
                    plan.accent ? "btn-terra-glow" : "btn-outline-light"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <p className="mt-8 text-center text-neutral-500">
            100% возврат денег в течение 7 дней. Без вопросов.
          </p>
        </div>
      </FadeInSection>

      {/* ===== 03 ТАБЛИЦА СРАВНЕНИЯ ===== */}
      <FadeInSection
        variant="fade-left"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "linear-gradient(180deg, #1E1B18 0%, #1a1714 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">02</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Сравнение
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Что входит в каждый тариф
          </h2>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th className="py-4 text-left text-sm font-medium text-neutral-500 w-1/5">Возможность</th>
                  <th className="py-4 text-center text-sm font-medium text-neutral-500 w-1/5">Бесплатно</th>
                  <th className="py-4 text-center text-sm font-medium text-terra-400 w-1/5">
                    Риелтор
                    <div className="text-[10px] text-terra-400/70 mt-0.5">ПОПУЛЯРНЫЙ</div>
                  </th>
                  <th className="py-4 text-center text-sm font-medium text-neutral-500 w-1/5">Агентство</th>
                  <th className="py-4 text-center text-sm font-medium text-neutral-500 w-1/5">Профи</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.feature} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td className="py-3.5 text-sm text-neutral-300">{row.feature}</td>
                    <td className="py-3.5 text-sm text-center text-neutral-500">{row.free}</td>
                    <td
                      className="py-3.5 text-sm text-center font-medium text-white"
                      style={{ background: "rgba(212,101,75,0.04)" }}
                    >
                      {row.realtor}
                    </td>
                    <td className="py-3.5 text-sm text-center text-neutral-300">{row.agency}</td>
                    <td className="py-3.5 text-sm text-center text-neutral-300">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 КАЛЬКУЛЯТОР ЭКОНОМИИ ===== */}
      <FadeInSection
        variant="blur-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(212,101,75,0.05) 0%, #161311 50%, #1E1B18 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-start">
            <div>
              <div className="section-label mb-8">
                <span className="section-number-light">03</span>
                <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
                  Экономия
                </span>
              </div>

              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-lg">
                Почему это <span className="text-terra-400">выгоднее</span> фотографа
              </h2>

              <div className="mt-12 space-y-0">
                {[
                  { item: "Фотограф на объект", old: "3 000 – 5 000₽", new: "от 50₽" },
                  { item: "Ожидание результата", old: "2-3 дня", new: "30 секунд" },
                  { item: "Уборка квартиры", old: "ваше время", new: "не нужна" },
                  { item: "Мебель для стейджинга", old: "50 000₽", new: "виртуальная, бесплатно" },
                  { item: "Текст для Авито", old: "1 000₽ копирайтер", new: "AI за 10 сек" },
                  { item: "38 AI-сервисов", old: "не существует", new: "всё включено" },
                ].map((row) => (
                  <div key={row.item} className="stagger-left flex items-center justify-between py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="text-neutral-400 text-sm">{row.item}</span>
                    <div className="text-right">
                      <span className="text-red-400/70 line-through text-xs mr-3">{row.old}</span>
                      <span className="text-terra-400 font-medium text-sm">{row.new}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <p className="heading-display text-[28px] sm:text-[36px] text-terra-400">
                  Экономия: от 4 985₽ на объекте
                </p>
              </div>
            </div>

            {/* SavingsCalculator */}
            <div className="lg:sticky lg:top-28">
              <SavingsCalculator />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 05 ГАРАНТИЯ ===== */}
      <FadeInSection
        variant="scale-in"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "linear-gradient(180deg, #161311 0%, #1E1B18 50%, #1a1714 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="section-label mb-8 justify-center">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Гарантия
            </span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl mx-auto">
            100% возврат денег
          </h2>

          <p className="mt-8 text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto">
            Не понравился результат? Вернём деньги без вопросов в течение 7
            дней. Никаких скрытых условий.
          </p>

          <div
            className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-500"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span>
              Оценка:{" "}
              <strong className="text-white">4.9/5</strong>
            </span>
            <span className="hidden sm:inline text-neutral-600" aria-hidden="true">
              &middot;
            </span>
            <span>2 480 пользователей</span>
            <span className="hidden sm:inline text-neutral-600" aria-hidden="true">
              &middot;
            </span>
            <span>47 832 фото обработано</span>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 06 ВСЕ 38 СЕРВИСОВ ===== */}
      <FadeInSection
        variant="default"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "radial-gradient(ellipse at top left, rgba(212,101,75,0.04) 0%, #1E1B18 40%, #161311 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">05</span>
            <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
              Каталог
            </span>
          </div>

          <AllModesGrid
            title="Что получаете за подписку"
            subtitle="— 38 AI-сервисов"
          />

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 07 ВОПРОСЫ ===== */}
      <FadeInSection
        variant="fade-right"
        className="py-24 lg:py-40 text-white border-t border-white/[0.06]"
        style={{ background: "linear-gradient(180deg, #161311 0%, #1E1B18 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number-light">06</span>
                <span className="text-base uppercase tracking-widest text-neutral-500 self-end mb-2">
                  Вопросы
                </span>
              </div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px]">
                Частые вопросы о тарифах
              </h2>
            </div>

            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="faq-item group" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <summary className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg text-white">{item.q}</h3>
                    <span className="faq-icon flex-shrink-0 text-2xl leading-none text-neutral-500">
                      +
                    </span>
                  </summary>
                  <p className="pb-6 text-neutral-400 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== CTA ===== */}
      <CTASplitBanner
        heading1={"2 фото бесплатно.\nПрямо сейчас."}
        heading2={"38 AI-сервисов.\nОдна подписка."}
        cta2="Выбрать тариф"
        cta2Href="/auth"
        fomo="Присоединяйтесь к 2 480 риелторам, которые уже используют все 38 AI-сервисов"
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
    </>
  );
}
