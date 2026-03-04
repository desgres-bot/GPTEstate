import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-navy-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500 text-white text-xs font-black">
                AI
              </span>
              ФотоЭстейт
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              AI-сервис для улучшения фотографий недвижимости и виртуального стейджинга
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Сервис</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/generate" className="hover:text-white transition-colors">Генерация</Link>
              <Link href="/gallery" className="hover:text-white transition-colors">Галерея</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Тарифы</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Возможности</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/foto-kvartiry-dlya-avito" className="hover:text-white transition-colors">Фото для Авито</Link>
              <Link href="/virtualnyj-stejdzhing" className="hover:text-white transition-colors">Виртуальный стейджинг</Link>
              <Link href="/uluchshenie-foto-nedvizhimosti" className="hover:text-white transition-colors">Улучшение фото</Link>
              <Link href="/dizajn-interera-online" className="hover:text-white transition-colors">Дизайн интерьера</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Контакты</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <span>support@fotoestate.ru</span>
              <span>Telegram: @fotoestate</span>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} ФотоЭстейт. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
