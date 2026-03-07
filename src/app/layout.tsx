import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { getOrganizationSchema, getWebApplicationSchema } from "@/lib/jsonld";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1B18" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fotoestate.ru"),
  title: {
    default: "GPT Estate — AI-улучшение фото квартир для Авито и ЦИАН",
    template: "%s | GPT Estate",
  },
  description:
    "Профессиональные фото для объявлений недвижимости за 30 секунд. AI-улучшение, виртуальный стейджинг и редизайн интерьера. От 50 рублей за фото.",
  keywords:
    "фото квартиры, улучшение фото, авито, циан, виртуальный стейджинг, редизайн интерьера, AI фото недвижимости, виртуальная мебель, фото для риелторов",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "GPT Estate",
    title: "GPT Estate — AI-улучшение фото недвижимости",
    description:
      "Профессиональные фото для объявлений за 30 секунд. Уборка, виртуальная мебель, новый стиль. От 50₽ за фото.",
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
      "Профессиональные фото для объявлений за 30 секунд. От 50₽ за фото.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://fotoestate.ru",
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GPT Estate",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
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
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgSchemaJson }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: appSchemaJson }}
        />
        <Header />
        <main className="pb-bottom-nav md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
