import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1E1B18] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 lg:pt-28">
        <p className="heading-display text-[28px] sm:text-[32px] lg:text-[40px] leading-tight max-w-md">
          Фото, которые продают квартиры
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
              Сервис
            </h4>
            <nav className="flex flex-col gap-3 text-base">
              <Link href="/generate" className="text-white transition-colors hover:text-neutral-300">Улучшить фото</Link>
              <Link href="/pricing" className="text-white transition-colors hover:text-neutral-300">Тарифы</Link>
              <Link href="/gallery" className="text-white transition-colors hover:text-neutral-300">Блог</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
              Возможности
            </h4>
            <nav className="flex flex-col gap-3 text-base">
              <span className="text-neutral-300">Уборка фото</span>
              <span className="text-neutral-300">Виртуальная мебель</span>
              <span className="text-neutral-300">Новый стиль интерьера</span>
              <span className="text-neutral-300">Удаление объектов</span>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
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
