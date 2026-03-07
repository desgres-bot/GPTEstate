import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1E1B18] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pb-8 lg:pt-28">
        <p className="heading-display text-[28px] sm:text-[32px] lg:text-[40px] leading-tight max-w-md">
          Фото, которые продают квартиры
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
              Сервис
            </h4>
            <nav className="flex flex-col gap-3 text-base">
              <Link href="/generate" className="text-white transition-colors hover:text-neutral-300">Улучшить фото</Link>
              <Link href="/batch" className="text-white transition-colors hover:text-neutral-300">Пакетная обработка</Link>
              <Link href="/pricing" className="text-white transition-colors hover:text-neutral-300">Тарифы</Link>
              <Link href="/gallery" className="text-white transition-colors hover:text-neutral-300">Примеры</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
              Возможности
            </h4>
            <nav className="flex flex-col gap-3 text-base">
              <Link href="/uluchshenie-foto-nedvizhimosti" className="text-neutral-300 transition-colors hover:text-white">Уборка фото</Link>
              <Link href="/virtualnyj-stejdzhing" className="text-neutral-300 transition-colors hover:text-white">Виртуальная мебель</Link>
              <Link href="/dizajn-interera-online" className="text-neutral-300 transition-colors hover:text-white">Новый стиль интерьера</Link>
              <Link href="/day-to-dusk-foto" className="text-neutral-300 transition-colors hover:text-white">Day-to-Dusk фото</Link>
              <Link href="/tour" className="text-neutral-300 transition-colors hover:text-white">Тур 360°</Link>
              <Link href="/api-docs" className="text-neutral-300 transition-colors hover:text-white">API</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
              Блог
            </h4>
            <nav className="flex flex-col gap-3 text-base">
              <Link href="/blog" className="text-neutral-300 transition-colors hover:text-white">Все статьи</Link>
              <Link href="/blog/kak-prodat-kvartiru-bystree" className="text-neutral-300 transition-colors hover:text-white">Как продать квартиру</Link>
              <Link href="/blog/virtualnyj-stejdzhing-rukovodstvo" className="text-neutral-300 transition-colors hover:text-white">Гид по стейджингу</Link>
              <Link href="/blog/sekrety-foto-dlya-avito" className="text-neutral-300 transition-colors hover:text-white">Фото для Авито</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
              Сравнения
            </h4>
            <nav className="flex flex-col gap-3 text-base">
              <Link href="/gptestate-vs-fotograf" className="text-neutral-300 transition-colors hover:text-white">GPT Estate vs Фотограф</Link>
              <Link href="/virtualnyj-vs-realnyj-stejdzhing" className="text-neutral-300 transition-colors hover:text-white">Виртуальный vs Реальный</Link>
              <Link href="/gptestate-vs-boxbrownie" className="text-neutral-300 transition-colors hover:text-white">vs BoxBrownie</Link>
              <Link href="/gptestate-vs-virtual-staging-ai" className="text-neutral-300 transition-colors hover:text-white">vs Virtual Staging AI</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
              English
            </h4>
            <nav className="flex flex-col gap-3 text-base">
              <Link href="/en" className="text-neutral-300 transition-colors hover:text-white">Home</Link>
              <Link href="/en/virtual-staging" className="text-neutral-300 transition-colors hover:text-white">Virtual Staging</Link>
              <Link href="/en/ai-photo-enhancement" className="text-neutral-300 transition-colors hover:text-white">Photo Enhancement</Link>
              <Link href="/en/pricing" className="text-neutral-300 transition-colors hover:text-white">Pricing</Link>
            </nav>

            <h4 className="mb-4 mt-8 text-xs uppercase tracking-widest text-neutral-400">
              Контакты
            </h4>
            <nav className="flex flex-col gap-3 text-base">
              <span className="text-neutral-300">support@fotoestate.ru</span>
              <span className="text-neutral-300">Telegram: @fotoestate</span>
            </nav>
          </div>
        </div>

        {/* Large brand watermark */}
        <div className="mt-20 overflow-hidden">
          <p className="heading-display text-[120px] sm:text-[160px] lg:text-[200px] leading-none text-white/[0.04] select-none whitespace-nowrap">
            GPT Estate
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
          <span className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} GPT Estate
          </span>
          <span className="text-sm text-neutral-500">
            Сервис для недвижимости
          </span>
        </div>
      </div>
    </footer>
  );
}
