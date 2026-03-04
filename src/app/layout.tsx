import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "ФотоЭстейт — AI-улучшение фото квартир для Авито и ЦИАН",
  description:
    "Профессиональные фото для объявлений недвижимости за 30 секунд. AI-улучшение, виртуальный стейджинг и редизайн интерьера.",
  keywords:
    "фото квартиры, улучшение фото, авито, циан, виртуальный стейджинг, редизайн интерьера, AI фото недвижимости",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
