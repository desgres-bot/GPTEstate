const BASE_URL = "https://fotoestate.ru";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GPT Estate",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "AI-сервис для улучшения фото недвижимости. Уборка, виртуальная мебель, редизайн интерьера и удаление объектов за 30 секунд.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@fotoestate.ru",
      contactType: "customer support",
      availableLanguage: "Russian",
    },
    sameAs: ["https://t.me/fotoestate"],
  };
}

export function getWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GPT Estate",
    url: BASE_URL,
    applicationCategory: "PhotographyApplication",
    operatingSystem: "Web",
    description:
      "Профессиональные фото для объявлений недвижимости за 30 секунд. AI-улучшение, виртуальный стейджинг и редизайн интерьера.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "6990",
      priceCurrency: "RUB",
      offerCount: 4,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1247",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function getFAQSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "GPT Estate",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "GPT Estate",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${article.slug}`,
    },
  };
}

export function getSoftwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPT Estate API",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "REST API для AI-обработки фото недвижимости: улучшение, виртуальный стейджинг, редизайн интерьера.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RUB",
    },
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
