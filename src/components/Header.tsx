"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-navy-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 text-white text-sm font-black">
            AI
          </span>
          ФотоЭстейт
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/generate" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">
            Генерация
          </Link>
          <Link href="/gallery" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">
            Галерея
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">
            Тарифы
          </Link>
          <Link href="/auth" className="btn-primary !py-2 !px-4 !text-sm">
            Войти
          </Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link href="/generate" className="text-sm font-medium text-gray-600" onClick={() => setMobileOpen(false)}>
              Генерация
            </Link>
            <Link href="/gallery" className="text-sm font-medium text-gray-600" onClick={() => setMobileOpen(false)}>
              Галерея
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600" onClick={() => setMobileOpen(false)}>
              Тарифы
            </Link>
            <Link href="/auth" className="btn-primary text-center !text-sm" onClick={() => setMobileOpen(false)}>
              Войти
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
