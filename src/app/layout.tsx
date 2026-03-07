import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GPT Estate — AI-улучшение фото квартир для Авито и ЦИАН",
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
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
