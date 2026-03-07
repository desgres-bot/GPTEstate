import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getOrganizationSchema, getWebApplicationSchema } from "@/lib/jsonld";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fotoestate.ru"),
  title: {
    default: "GPT Estate — AI-улучшение фото квартир для Авито и ЦИАН",
    template: "%s | GPT Estate",
  },
  description:
    "Профессиональные фото для объявлений недвижимости за 30 секунд. AI-улучшение, виртуальный стейджинг и редизайн интерьера. От 15 рублей за фото.",
  keywords:
    "фото квартиры, улучшение фото, авито, циан, виртуальный стейджинг, редизайн интерьера, AI фото недвижимости, виртуальная мебель, фото для риелторов",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "GPT Estate",
    title: "GPT Estate — AI-улучшение фото недвижимости",
    description:
      "Профессиональные фото для объявлений за 30 секунд. Уборка, виртуальная мебель, новый стиль. От 15₽ за фото.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GPT Estate — AI-улучшение фото недвижимости",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPT Estate — AI-улучшение фото недвижимости",
    description:
      "Профессиональные фото для объявлений за 30 секунд. От 15₽ за фото.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://fotoestate.ru",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD schemas are static data from our own codebase, safe to serialize
const orgSchemaJson = JSON.stringify(getOrganizationSchema());
const appSchemaJson = JSON.stringify(getWebApplicationSchema());

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgSchemaJson }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: appSchemaJson }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
