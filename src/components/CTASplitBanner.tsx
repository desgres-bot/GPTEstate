import Link from "next/link";

export default function CTASplitBanner() {
  return (
    <section className="bg-[#1E1B18]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          <div className="bg-[#1E1B18] py-20 pr-8 lg:py-32">
            <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
              Попробовать
            </div>
            <h2 className="heading-display text-[28px] sm:text-[36px] lg:text-[48px] leading-tight text-white">
              2 фото бесплатно.<br />Прямо сейчас.
            </h2>
            <Link href="/generate" className="btn-white mt-8">
              Попробовать бесплатно
            </Link>
          </div>
          <div className="bg-[#1E1B18] py-20 pr-8 lg:py-32">
            <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
              Для агентств
            </div>
            <h2 className="heading-display text-[28px] sm:text-[36px] lg:text-[48px] leading-tight text-white">
              Больше 50 фото в месяц?<br />Подберём тариф.
            </h2>
            <a href="mailto:support@fotoestate.ru" className="btn-outline-light mt-8">
              Написать нам
            </a>
          </div>
        </div>
        {/* FOMO полоса */}
        <div className="py-8 text-center text-[15px] text-neutral-500">
          Присоединяйтесь к 1 247 риелторам, которые уже экономят время и деньги
        </div>
      </div>
    </section>
  );
}
