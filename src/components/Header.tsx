"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const hasDarkHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // На страницах без тёмного героя — тёмный текст и светлый фон контейнера
  const dark = hasDarkHero;

  const navItems = [
    { href: "/", label: "Главная" },
    { href: "/generate", label: "Улучшить" },
    { href: "/pricing", label: "Тарифы" },
    { href: "/gallery", label: "Примеры" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000]">
      {/* Горизонтальные отступы 60px — как в Luzen */}
      <div className="px-[60px] max-md:px-4">
        {/* Контейнер 960px — стеклянная панель с округлёнными нижними углами */}
        <div
          className="mx-auto max-w-[960px] transition-colors duration-500"
          style={{
            borderRadius: "0px 0px 12px 12px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: dark
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(0,0,0,0.06)",
            backgroundColor: dark
              ? scrolled
                ? "rgba(62,62,62,0.6)"
                : "rgba(252,252,252,0.086)"
              : scrolled
                ? "rgba(255,255,255,0.85)"
                : "rgba(255,255,255,0.6)",
          }}
        >
          {/* Содержимое навбара */}
          <nav
            className="flex items-center justify-between"
            style={{ height: 64, padding: "12px 12px 12px 20px", gap: 16 }}
          >
            {/* Логотип */}
            <Link
              href="/"
              className={`text-[16px] font-semibold transition-colors duration-500 ${
                dark ? "text-white" : "text-[#0e0e0e]"
              }`}
              style={{ letterSpacing: "-0.16px" }}
            >
              GPT Estate
            </Link>

            {/* Навигация по центру — gap 48px */}
            <div className="hidden items-center md:flex" style={{ gap: 48 }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[16px] transition-colors duration-500 ${
                    pathname === item.href ? "font-semibold" : "font-normal"
                  } ${
                    dark
                      ? "text-white hover:text-white/70"
                      : "text-[#3e3e3e] hover:text-[#0e0e0e]"
                  }`}
                  style={{ letterSpacing: "-0.16px" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA кнопка */}
            <Link
              href="/generate"
              className={`hidden md:inline-flex items-center justify-center text-[16px] font-normal transition-all duration-500 ${
                dark
                  ? "bg-white text-[#111] hover:bg-white/90"
                  : "bg-[#0e0e0e] text-white hover:bg-[#2a2a2a]"
              }`}
              style={{
                borderRadius: 8,
                padding: "8px 24px",
                height: 40,
                letterSpacing: "-0.16px",
              }}
            >
              Попробовать
            </Link>

            {/* Мобильное меню */}
            <button
              className={`md:hidden flex items-center justify-center w-10 h-10 transition-all duration-500 ${
                dark ? "text-white" : "text-[#0e0e0e]"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </nav>
        </div>
      </div>

      {/* Мобильное выпадающее меню */}
      {mobileOpen && (
        <div className="mx-4 mt-1 rounded-xl bg-white/95 p-5 shadow-lg md:hidden"
          style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-3 text-[16px] transition-colors ${
                  pathname === item.href
                    ? "font-semibold text-[#0e0e0e]"
                    : "font-normal text-[#3e3e3e] hover:bg-neutral-50"
                }`}
                style={{ letterSpacing: "-0.16px" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/generate"
              className="mt-3 rounded-lg bg-[#0e0e0e] py-3 text-center text-[16px] font-normal text-white hover:bg-[#2a2a2a]"
              onClick={() => setMobileOpen(false)}
            >
              Попробовать
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
