import Link from "next/link";
import BeforeAfterToggle from "@/components/BeforeAfterToggle";
import CTASplitBanner from "@/components/CTASplitBanner";
import { STYLES } from "@/lib/constants";
import FadeInSection from "@/components/FadeInSection";

const FAQ_ITEMS = [
  {
    q: "Покупатель заметит, что фото обработано?",
    a: "Нет. Наш сервис убирает бардак и улучшает свет — фото выглядит как после настоящей уборки. Планировка, мебель, окна — всё остаётся на месте. Это не фотошоп, а цифровая уборка.",
  },
  {
    q: "Сколько стоит обработка?",
    a: "От 15 рублей за фото. Первые 2 — бесплатно, без регистрации. Дешевле чашки кофе, а объявление работает на порядок лучше.",
  },
  {
    q: "Какие фото подходят?",
    a: "Любые фото с телефона. Наш сервис справляется даже с тёмными и кривыми снимками. Но чем лучше ракурс — тем эффектнее результат.",
  },
  {
    q: "Как быстро получу результат?",
    a: "30 секунд. Загрузили фото — получили результат. Быстрее, чем написать сообщение хозяину с просьбой убраться.",
  },
  {
    q: "Можно выкладывать на Авито и ЦИАН?",
    a: "Да. Никаких ограничений — публикуйте на любых площадках. Фото полностью ваше.",
  },
  {
    q: "А если фото плохого качества?",
    a: "Подойдут любые фото с телефона. Наш сервис справляется даже с тёмными снимками, сделанными на бегу между показами. Чем лучше ракурс — тем лучше результат, но даже из плохого фото получится хорошее.",
  },
  {
    q: "Это законно? Не введёт ли покупателя в заблуждение?",
    a: "Мы улучшаем фото, а не меняем квартиру. Планировка, окна, размер комнат — всё остаётся реальным. Это как сделать уборку перед показом, только быстрее.",
  },
  {
    q: "Почему это дешевле фотографа?",
    a: "Фотограф тратит время на выезд, съёмку, обработку. Наш сервис делает всё это за 30 секунд автоматически. Поэтому 15₽ вместо 5 000₽.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== ГЕРОЙ ===== */}
      <section className="bg-[#1E1B18] text-white">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-0 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">Для риелторов, агентств и собственников недвижимости</p>
            <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[64px] lg:text-[88px]">
              Фото, которые
              <br />
              <span className="text-terra-400">продают дома и квартиры</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
              Сервис на базе искусственного интеллекта делает продающие фото за 30 секунд.
              <br className="hidden sm:block" />
              Без фотографа, без уборки, без ожидания.
            </p>
            <Link href="/generate" className="btn-terra mt-8 inline-flex">
              Попробовать бесплатно — 2 фото без регистрации
            </Link>
          </div>

          {/* Hero before/after */}
          <div className="mt-12 lg:mt-16 mx-auto max-w-3xl rounded-xl overflow-hidden">
            <BeforeAfterToggle
              beforeSrc="/demo/hero-before.jpg"
              afterSrc="/demo/hero-after.jpg"
              label="До / После"
              subtitle="Нажмите, чтобы увидеть оригинал"
            />
          </div>

          {/* 4 карточки сервисов */}
          <div className="mt-12 lg:mt-16 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {[
              { problem: "Бардак в квартире?", solution: "Уберём беспорядок с фото", href: "/generate?mode=enhance" },
              { problem: "Пустые комнаты?", solution: "Расставим мебель виртуально", href: "/generate?mode=staging" },
              { problem: "Старый ремонт?", solution: "Покажем современный интерьер", href: "/generate?mode=redesign" },
              { problem: "Лишние вещи?", solution: "Удалим всё ненужное", href: "/generate?mode=remove" },
            ].map((item) => (
              <Link
                key={item.problem}
                href={item.href}
                className="group rounded-2xl p-5 lg:p-6 transition-all active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(212,101,75,0.06) 50%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="text-sm font-medium text-terra-400">{item.problem}</h3>
                <p className="mt-1 text-base text-white">{item.solution}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "12 847", label: "фото за месяц" },
              { value: "30 сек", label: "до результата" },
              { value: "15₽", label: "вместо 5 000₽ за фотографа" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="heading-display text-[36px] sm:text-[48px] lg:text-[64px] text-terra-400">{stat.value}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Социальное доказательство */}
        <div className="border-t border-white/[0.08]">
          <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-terra-400"></span>
              </span>
              <span className="text-sm text-neutral-400">1 247 риелторов — <span className="text-terra-400">83 подключились на этой неделе</span></span>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-xs uppercase tracking-widest text-neutral-500">Публикуйте на</span>
              <div className="flex gap-2">
                {["Авито", "ЦИАН", "Домклик", "Яндекс"].map((p) => (
                  <span key={p} className="rounded-full px-3 py-1 text-xs text-neutral-300" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 01 БОЛЬ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">01</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">Проблема</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-2xl">
            Вы теряете деньги. Каждый день.
          </h2>

          <div className="mt-16 lg:mt-20 space-y-0">
            {/* Боль 1 — с мини before/after */}
            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr] items-start">
                <div className="flex items-start gap-6">
                  <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">01</span>
                  <div>
                    <h3 className="text-[20px] sm:text-[24px] font-normal">Хозяин не убрался. Опять.</h3>
                    <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">Вы приехали через весь город, а в квартире гора посуды и разбросанные вещи. Снимать стыдно. Не снимать — потерять время.</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <BeforeAfterToggle
                    beforeSrc="/demo/before-1.jpg"
                    afterSrc="/demo/after-1.jpg"
                    label="Решение"
                    subtitle="30 секунд — и чисто"
                  />
                </div>
              </div>
            </div>

            {/* Боль 2 — сравнение объявлений */}
            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr] items-start">
                <div className="flex items-start gap-6">
                  <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">02</span>
                  <div>
                    <h3 className="text-[20px] sm:text-[24px] font-normal">Покупатель ушёл к конкуренту</h3>
                    <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">На Авито у объявления 3 секунды. Покупатель видит бардак — листает дальше. А у конкурента — чистое фото, сделанное за 30 секунд через наш сервис.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-center">
                    <div className="text-xs text-red-400 uppercase tracking-wider mb-2">Ваше объявление</div>
                    <div className="text-[32px] leading-none mb-1">0</div>
                    <div className="text-xs text-red-400">звонков</div>
                  </div>
                  <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-2">С нашим сервисом</div>
                    <div className="text-[32px] leading-none mb-1">x3</div>
                    <div className="text-xs text-green-600">больше звонков</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Боль 3 — калькулятор потерь */}
            <div className="stagger-child border-b border-neutral-200 py-10 lg:py-12">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr] items-start">
                <div className="flex items-start gap-6">
                  <span className="heading-display text-[24px] text-[#bfbfbf] hidden sm:block">03</span>
                  <div>
                    <h3 className="text-[20px] sm:text-[24px] font-normal">Каждый день простоя = потерянная комиссия</h3>
                    <p className="mt-3 text-[#6B6560] leading-relaxed max-w-lg">Объект висит неделями. Хозяин нервничает, вы теряете деньги. А всё потому, что первое впечатление — это фото.</p>
                  </div>
                </div>
                <div className="rounded-lg bg-white border border-neutral-200 p-6">
                  <div className="space-y-3 text-center">
                    <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                      <span className="text-[#6B6560]">1 день простоя</span>
                      <span className="font-medium text-[#1E1B18]">−500₽</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                      <span className="text-[#6B6560]">30 дней</span>
                      <span className="font-medium text-red-500">−15 000₽</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[#6B6560]">Одно фото с нами</span>
                      <span className="font-medium text-terra-500">15₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOMO блок */}
          <div className="mt-12 rounded-xl bg-terra-50 border border-terra-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#1E1B18] text-base sm:text-lg font-medium">
              Пока вы читаете это — ваши конкуренты уже загрузили 3 фото
            </p>
            <Link href="/generate" className="btn-terra whitespace-nowrap">
              Не отставать
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 02 ВСЕ 4 СЕРВИСА ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">02</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">Результат</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-lg">
              Та же квартира. Другие деньги.
            </h2>
            <p className="text-[#6B6560] max-w-sm text-base">
              Нажмите на фото — увидите, как было. И представьте это в вашем объявлении.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { before: "/demo/before-1.jpg", after: "/demo/after-1.jpg", label: "Уборка", subtitle: "Бардак исчезает за 30 секунд", mode: "enhance" },
              { before: "/demo/before-2.jpg", after: "/demo/after-2.jpg", label: "Мебель", subtitle: "Пустая комната стала жилой", mode: "staging" },
              { before: "/demo/before-3.jpg", after: "/demo/after-3.jpg", label: "Новый стиль", subtitle: "Из советского ремонта — в современный", mode: "redesign" },
              { before: "/demo/before-4.jpg", after: "/demo/after-4.jpg", label: "Удаление", subtitle: "Лишнее исчезло без следа", mode: "remove" },
            ].map((item) => (
              <div key={item.label} className="stagger-child">
                <BeforeAfterToggle
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  label={item.label}
                  subtitle={item.subtitle}
                />
                <Link
                  href={`/generate?mode=${item.mode}`}
                  className="mt-2 inline-flex items-center gap-1 text-sm text-terra-500 hover:text-terra-600 transition-colors"
                >
                  Попробовать <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Конверсионный баннер */}
          <div className="mt-16 rounded-xl bg-terra-500 p-8 sm:p-10 text-center text-white">
            <p className="text-xl sm:text-2xl font-medium">Первые 2 фото — бесплатно. Без регистрации. Без карты.</p>
            <Link href="/generate" className="btn-white mt-6 inline-flex">
              Попробовать сейчас
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 03 КАК ЭТО РАБОТАЕТ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">03</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">Процесс</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Быстрее, чем <span className="text-terra-500">написать хозяину</span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Сфотографируйте",
                desc: "На телефон. Даже с плохим светом.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Выберите режим",
                desc: "Уборка, мебель, стиль или удаление.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Скачайте за 30 секунд",
                desc: "Публикуйте на Авито и ЦИАН.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="stagger-child text-center p-8 rounded-xl bg-white">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terra-50 text-terra-500 mb-6">
                  {item.icon}
                </div>
                <div className="text-xs text-[#bfbfbf] uppercase tracking-widest mb-3">{item.step}</div>
                <h3 className="text-[20px] font-normal mb-2">{item.title}</h3>
                <p className="text-[#6B6560] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/generate" className="btn-terra">
              Загрузить первое фото бесплатно
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 04 СРАВНЕНИЕ СТОИМОСТИ ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number-light">04</span>
            <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">Экономия</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            Сколько стоит <span className="text-terra-400">НЕ</span> использовать
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Без нас */}
            <div className="rounded-xl bg-white/[0.05] border border-white/10 p-8 lg:p-10">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">Без нас</div>
              <div className="space-y-5">
                {[
                  { item: "Фотограф", cost: "3 000 – 5 000₽" },
                  { item: "Ожидание", cost: "2-3 дня" },
                  { item: "Уборка квартиры", cost: "ваше время" },
                  { item: "Мебель для стейджинга", cost: "50 000₽" },
                  { item: "Результат", cost: "1 комплект фото" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-neutral-400">{row.item}</span>
                    <span className="text-white font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* С нами */}
            <div className="rounded-xl p-8 lg:p-10" style={{ background: "linear-gradient(135deg, rgba(212,101,75,0.15) 0%, rgba(212,101,75,0.05) 100%)", border: "1px solid rgba(212,101,75,0.3)" }}>
              <div className="text-xs uppercase tracking-widest text-terra-400 mb-6">С нами</div>
              <div className="space-y-5">
                {[
                  { item: "Стоимость", cost: "15₽ за фото" },
                  { item: "Ожидание", cost: "30 секунд" },
                  { item: "Уборка", cost: "не нужна" },
                  { item: "Мебель", cost: "виртуальная, бесплатно" },
                  { item: "Результат", cost: "неограниченно" },
                ].map((row) => (
                  <div key={row.item} className="flex justify-between items-center py-2 border-b border-terra-400/20">
                    <span className="text-neutral-300">{row.item}</span>
                    <span className="text-terra-400 font-medium">{row.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="heading-display text-[28px] sm:text-[36px] lg:text-[48px] text-terra-400 mb-6">
              Экономия: от 4 985₽ на объекте
            </p>
            <Link href="/generate" className="btn-white">
              Начать экономить
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 05 СТЕЙДЖИНГ ===== */}
      <FadeInSection className="bg-[#1E1B18] py-24 lg:py-32 text-white border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number-light">05</span>
                <span className="text-base uppercase tracking-widest text-neutral-400 self-end mb-2">Мебель</span>
              </div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[40px] lg:text-[56px]">
                Пустая квартира <span className="text-terra-400">не продаётся</span>
              </h2>
              <p className="mt-6 text-neutral-300 leading-relaxed max-w-md">
                Покупатель не может представить себя в пустых стенах. Добавьте мебель за 15 рублей вместо 50 000 за реальную обстановку.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {STYLES.map((style) => (
                  <span
                    key={style.id}
                    className="rounded-lg px-4 py-2 text-sm text-neutral-200"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {style.emoji} {style.name}
                  </span>
                ))}
              </div>
              <Link href="/generate?mode=staging" className="btn-terra mt-8">
                Добавить мебель
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden">
              <BeforeAfterToggle
                beforeSrc="/demo/before-2.jpg"
                afterSrc="/demo/after-2.jpg"
                label="Виртуальная мебель"
                subtitle="Нажмите для сравнения"
              />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 06 ОТЗЫВЫ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">06</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">Отзывы</span>
          </div>

          <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl mb-16">
            1 247 риелторов. Вот что они говорят.
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Алексей Морозов",
                role: "Риелтор, Москва",
                text: "Раньше тратил час на уговоры хозяев убраться. Теперь фоткаю как есть и через 30 секунд у меня продающее фото.",
                metric: "+2 сделки/мес",
              },
              {
                name: "Марина Соколова",
                role: "Агентство «НовоСтрой»",
                text: "Виртуальная мебель для новостроек — находка. Пустые бетонные стены никто не хочет смотреть. С мебелью — другая история.",
                metric: "x3 звонков",
              },
              {
                name: "Дмитрий Волков",
                role: "Частный риелтор, СПб",
                text: "За 15 рублей получаю фото, за которое фотограф просит пять тысяч. И не надо ждать — результат мгновенно.",
                metric: "экономия 4 985₽",
              },
              {
                name: "Елена Козлова",
                role: "Риелтор, Казань",
                text: "Удаление лишних вещей — спасение. Хозяева не убирают, а мне нужно срочно выложить объявление. Теперь убираю всё с фото за секунды.",
                metric: "−3 часа/день",
              },
            ].map((review, i) => (
              <div key={review.name} className="stagger-child">
                <div className="inline-block rounded-lg bg-terra-50 px-3 py-1 text-sm font-medium text-terra-600 mb-4">
                  {review.metric}
                </div>
                <p className="text-[#6B6560] leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-6">
                  <div className="text-base text-[#1E1B18]">{review.name}</div>
                  <div className="text-sm text-[#7D756E] mt-1">{review.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Полоса доверия */}
          <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#7D756E]">
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <span>Оценка: <strong className="text-[#1E1B18]">4.9/5</strong></span>
              <span>1 247 пользователей</span>
              <span>12 847 фото обработано</span>
            </div>
            <span className="text-terra-500">~12 новых риелторов каждый день</span>
          </div>
        </div>
      </FadeInSection>

      {/* ===== 07 ТАРИФЫ ===== */}
      <FadeInSection className="bg-[#fbf9f5] py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-label mb-8">
            <span className="section-number">07</span>
            <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">Тарифы</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] max-w-xl">
              Ваши конкуренты платят 15₽ за фото. А вы?
            </h2>
            <Link href="/pricing" className="btn-outline self-start">
              Все тарифы
            </Link>
          </div>

          {/* Блок бесплатного старта */}
          <div className="mb-8 rounded-xl bg-terra-50 border border-terra-200 p-5 text-center">
            <p className="text-[#1E1B18] font-medium">Не уверены? Начните бесплатно — 2 фото без регистрации и без карты</p>
          </div>

          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #e8e4df 0%, #d4d0cb 100%)" }}>
            {[
              {
                name: "Бесплатно", price: "0", per: "", credits: "2 фото", perPhoto: "",
                features: ["Уборка фото", "Стандартное качество", "Без регистрации"],
                dark: false, badge: null, cta: "Попробовать", href: "/generate",
              },
              {
                name: "Риелтор", price: "799", per: "₽", credits: "50 фото", perPhoto: "16₽/фото",
                features: ["Уборка + Новый стиль", "Высокое качество", "Виртуальная мебель", "Приоритетная очередь"],
                dark: true, badge: "Выбирают 67%", cta: "Подключить", href: "/auth",
              },
              {
                name: "Агентство", price: "1 990", per: "₽", credits: "150 фото", perPhoto: "13₽/фото",
                features: ["Все 4 режима", "Лучшее качество", "Виртуальная мебель", "Поддержка каждый день"],
                dark: false, badge: null, cta: "Подключить", href: "/auth",
              },
              {
                name: "Профи", price: "3 990", per: "₽", credits: "100 фото", perPhoto: "40₽/фото",
                features: ["Точечное удаление", "Все режимы + максимальное качество", "Личная поддержка"],
                dark: true, badge: null, cta: "Подключить", href: "/auth",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`stagger-child relative p-10 ${plan.dark ? "bg-[#1E1B18] text-white" : "bg-[#fbf9f5]"}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-10 rounded-lg bg-terra-500 px-3 py-1 text-xs font-medium text-white">
                    {plan.badge}
                  </div>
                )}
                <div className={`text-xs uppercase tracking-widest ${plan.dark ? "text-neutral-400" : "text-[#7D756E]"}`}>
                  {plan.name}
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="heading-display text-[40px] sm:text-[48px]">{plan.price}</span>
                  {plan.per && <span className="text-xl opacity-60">{plan.per}</span>}
                </div>
                <div className={`mt-1 text-sm ${plan.dark ? "text-neutral-400" : "text-[#7D756E]"}`}>
                  {plan.credits}
                  {plan.perPhoto && <span className="ml-2 text-terra-500 font-medium">= {plan.perPhoto}</span>}
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-base ${plan.dark ? "text-neutral-300" : "text-[#6B6560]"}`}>
                      <span className="mt-0.5 text-xs">+</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 block w-full rounded-lg py-3 text-center text-base transition-all ${
                    plan.dark
                      ? "bg-white text-[#1E1B18] hover:bg-neutral-200"
                      : "border border-neutral-300 text-[#1E1B18] hover:bg-[#1E1B18] hover:text-white hover:border-[#1E1B18]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Гарантия */}
          <p className="mt-8 text-center text-[#7D756E]">
            Не понравится — вернём деньги. Без вопросов.
          </p>
        </div>
      </FadeInSection>

      {/* ===== 08 ВОПРОСЫ ===== */}
      <FadeInSection className="bg-white py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="section-label mb-8">
                <span className="section-number">08</span>
                <span className="text-base uppercase tracking-widest text-[#6B6560] self-end mb-2">Вопросы</span>
              </div>
              <h2 className="heading-display text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px]">
                Частые вопросы
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

      {/* ===== CTA ===== */}
      <CTASplitBanner />
    </>
  );
}
