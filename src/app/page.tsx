import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { STYLES } from "@/lib/constants";
import FadeInSection from "@/components/FadeInSection";

const FAQ_ITEMS = [
  {
    q: "Заметят ли покупатели, что фото обработано?",
    a: "Нет. AI убирает беспорядок и улучшает свет так, что фото выглядит как после реальной уборки. Планировка и мебель остаются на месте.",
  },
  {
    q: "Сколько стоит обработка одного фото?",
    a: "От 15 рублей за фото на тарифе «Риелтор». Первые 2 фото — бесплатно, без регистрации.",
  },
  {
    q: "Какие фото подходят?",
    a: "Любые фото с телефона. Чем лучше освещение и ракурс — тем лучше результат, но AI справляется даже с тёмными снимками.",
  },
  {
    q: "Как быстро я получу результат?",
    a: "В среднем 30 секунд. Вы загружаете фото, выбираете режим — и через полминуты скачиваете готовый результат.",
  },
  {
    q: "Можно ли использовать для коммерческих объявлений?",
    a: "Да. Фото можно публиковать на Авито, ЦИАН, Домклик и любых других площадках без ограничений.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO — Emotional Impact ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Грязная квартира?{" "}
                <span className="text-accent-400">Чистое фото за 30 секунд</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl lg:text-2xl">
                AI убирает бардак с фото для Авито и ЦИАН — хозяевам не нужно убираться
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/generate" className="btn-primary !py-4 !px-10 !text-lg shadow-lg shadow-accent-500/25">
                  Попробовать бесплатно
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Без регистрации
                </span>
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  2 фото бесплатно
                </span>
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Результат за 30 сек
                </span>
              </div>
            </div>

            <div className="relative">
              <BeforeAfterSlider
                beforeSrc="/demo/hero-before.jpg"
                afterSrc="/demo/hero-after.jpg"
                label="Кухня — уборка за 30 секунд"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Pain Points — 3 Cards ===== */}
      <FadeInSection className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "\u{1F3E0}",
                title: "Хозяева не убираются",
                desc: "Вы приезжаете на показ, а в квартире бардак. Фотографировать стыдно, но нужно.",
              },
              {
                icon: "\u{1F4F8}",
                title: "Фото отпугивают клиентов",
                desc: "Грязная посуда, разбросанные вещи — покупатели листают дальше, даже не открывая объявление.",
              },
              {
                icon: "\u{1F441}",
                title: "Объявления без просмотров",
                desc: "Плохие фото = мало кликов. Объект зависает на площадке неделями, клиент недоволен.",
              },
            ].map((item) => (
              <div key={item.title} className="stagger-child rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900">{item.title}</h3>
                <p className="mt-3 text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-xl font-semibold text-navy-800">
            Знакомо? Мы решаем все три проблемы за 30 секунд
          </p>
        </div>
      </FadeInSection>

      {/* ===== Before/After Gallery ===== */}
      <FadeInSection className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">Та же комната. Только чище.</h2>
            <p className="mt-3 text-lg text-gray-500">Реальные результаты обработки AI</p>
          </div>
          <div className="mt-14 scroll-gallery">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Кухня" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Гостиная" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Спальня" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Кухня-столовая" },
            ].map((item) => (
              <div key={item.label} className="stagger-child w-[85vw] min-w-[300px] md:w-auto">
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  label={item.label}
                />
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== How it Works — 3 Steps ===== */}
      <FadeInSection className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">Как это работает</h2>
            <p className="mt-3 text-lg text-gray-500">Три шага — и фото готово для объявления</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                emoji: "\u{1F4F1}",
                title: "Загрузите фото",
                desc: "Даже снятое на телефон. Никаких требований к качеству — AI справится.",
              },
              {
                step: "2",
                emoji: "\u2728",
                title: "AI уберёт бардак",
                desc: "За 30 секунд нейросеть уберёт беспорядок, улучшит свет и сделает фото привлекательным.",
              },
              {
                step: "3",
                emoji: "\u{1F680}",
                title: "Скачайте и выложите",
                desc: "Скачайте готовое фото и опубликуйте на Авито, ЦИАН или Домклик.",
              },
            ].map((item) => (
              <div key={item.step} className="stagger-child text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-50 text-4xl">
                  {item.emoji}
                </div>
                <div className="mb-2 inline-block rounded-full bg-navy-100 px-4 py-1.5 text-sm font-bold text-navy-700">
                  Шаг {item.step}
                </div>
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== Virtual Staging ===== */}
      <FadeInSection className="bg-navy-950 py-20 lg:py-28 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold lg:text-4xl">
                Пустая комната?{" "}
                <span className="text-accent-400">Добавим мебель виртуально</span>
              </h2>
              <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                Виртуальный стейджинг — покажите покупателям, как будет выглядеть
                квартира с мебелью. Дешевле и быстрее реального стейджинга.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {STYLES.map((style) => (
                  <span
                    key={style.id}
                    className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm"
                  >
                    {style.emoji} {style.name}
                  </span>
                ))}
              </div>
              <Link href="/generate" className="btn-primary mt-8 inline-block !py-4 !px-8">
                Попробовать стейджинг
              </Link>
            </div>
            <div>
              <BeforeAfterSlider
                beforeSrc="/demo/before-2.jpg"
                afterSrc="/demo/after-2.jpg"
                label="Виртуальный стейджинг — Современный"
              />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== Stats & Trust ===== */}
      <FadeInSection className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                value: "x3",
                label: "больше просмотров",
                desc: "Объявления с профессиональными фото получают в 3 раза больше кликов",
              },
              {
                value: "15 \u20BD",
                label: "вместо 50 000 \u20BD",
                desc: "Виртуальный стейджинг за стоимость чашки кофе вместо реальной меблировки",
              },
              {
                value: "30 сек",
                label: "вместо 3 дней",
                desc: "Результат мгновенно, а не через неделю ожидания клинеров или фотографа",
              },
            ].map((stat) => (
              <div key={stat.label} className="stagger-child text-center">
                <div className="text-5xl font-extrabold text-accent-500">{stat.value}</div>
                <div className="mt-2 text-lg font-semibold text-navy-900">{stat.label}</div>
                <p className="mt-2 text-gray-500">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Алексей Морозов",
                role: "Риелтор, Москва",
                text: "Раньше просил хозяев убраться — половина отказывалась. Теперь просто фоткаю и прогоняю через сервис. Экономлю часы на каждом объекте.",
              },
              {
                name: "Марина Соколова",
                role: "Агентство «НовоСтрой»",
                text: "Виртуальный стейджинг — находка для новостроек. Пустые комнаты никто не хочет смотреть, а с мебелью объявления собирают в 3 раза больше откликов.",
              },
              {
                name: "Дмитрий Волков",
                role: "Частный риелтор, СПб",
                text: "За 15 рублей получаю фото, которое раньше стоило бы тысяч пять у фотографа. Окупается с первого же объявления.",
              },
            ].map((review) => (
              <div key={review.name} className="stagger-child rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-1 text-accent-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="font-semibold text-navy-900">{review.name}</div>
                  <div className="text-sm text-gray-400">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== Pricing — 3 Plans ===== */}
      <FadeInSection className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">Простые тарифы</h2>
            <p className="mt-3 text-lg text-gray-500">Начните бесплатно — платите только когда нужно больше</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {[
              {
                name: "Бесплатно",
                price: "0",
                per: "",
                credits: "2 фото",
                features: ["Улучшение фото", "Стандартное качество", "Без регистрации"],
                popular: false,
                premium: false,
                cta: "Начать бесплатно",
                href: "/generate",
              },
              {
                name: "Риелтор",
                price: "799",
                per: "\u20BD",
                credits: "50 фото",
                features: ["Улучшение + Редизайн", "HD качество", "Виртуальный стейджинг", "Приоритетная генерация"],
                popular: true,
                premium: false,
                cta: "Подключить",
                href: "/auth",
              },
              {
                name: "Агентство",
                price: "1 990",
                per: "\u20BD",
                credits: "150 фото",
                features: ["Все режимы", "Максимальное качество", "Виртуальный стейджинг", "Поддержка 24/7"],
                popular: false,
                premium: false,
                cta: "Подключить",
                href: "/auth",
              },
              {
                name: "Premium Pro",
                price: "3 990",
                per: "\u20BD",
                credits: "100 фото",
                features: ["Укажите что убрать с фото", "Точечное удаление объектов", "Все режимы + 4K", "Персональная поддержка"],
                popular: false,
                premium: true,
                cta: "Подключить Pro",
                href: "/auth",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`stagger-child relative rounded-2xl border p-8 transition-shadow hover:shadow-lg ${
                  plan.popular
                    ? "border-accent-500 shadow-lg ring-2 ring-accent-500/20 bg-white"
                    : plan.premium
                    ? "border-navy-800 bg-navy-950 text-white shadow-lg ring-2 ring-navy-700/50"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-5 py-1.5 text-xs font-bold text-white shadow-md">
                    Популярный
                  </div>
                )}
                {plan.premium && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-1.5 text-xs font-bold text-white shadow-md">
                    PRO
                  </div>
                )}
                <div className={`text-sm font-semibold ${plan.premium ? "text-gray-400" : "text-gray-500"}`}>{plan.name}</div>
                <div className="mt-3">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.per && <span className={`text-xl font-bold ${plan.premium ? "text-gray-500" : "text-gray-400"}`}> {plan.per}</span>}
                </div>
                <div className={`mt-1 text-sm ${plan.premium ? "text-gray-500" : "text-gray-400"}`}>{plan.credits}</div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.premium ? "text-gray-300" : "text-gray-600"}`}>
                      <svg className={`mt-0.5 h-4 w-4 flex-shrink-0 ${plan.premium ? "text-purple-400" : "text-green-500"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 block w-full rounded-xl py-3.5 text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-accent-500 text-white hover:bg-accent-600 shadow-md"
                      : plan.premium
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== FAQ ===== */}
      <FadeInSection className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-3xl font-bold lg:text-4xl">Частые вопросы</h2>
          <div className="mt-12 space-y-6">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="stagger-child rounded-2xl border border-gray-100 bg-white p-6">
                <h3 className="text-lg font-semibold text-navy-900">{item.q}</h3>
                <p className="mt-2 text-gray-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ===== Final CTA ===== */}
      <section className="bg-gradient-to-r from-navy-900 to-navy-950 py-20 lg:py-28 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold lg:text-5xl">
            Попробуйте сейчас — 2 фото бесплатно
          </h2>
          <p className="mt-5 text-lg text-gray-300">
            Загрузите фото грязной квартиры и получите чистое за 30 секунд.
            Без регистрации, без водяных знаков.
          </p>
          <Link href="/generate" className="btn-primary mt-10 !py-5 !px-12 !text-lg shadow-lg shadow-accent-500/25">
            Попробовать бесплатно
          </Link>
        </div>
      </section>
    </>
  );
}
