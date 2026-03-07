"use client";

import { useEffect } from "react";
import type { BlogArticle } from "@/types";
import { getArticleSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/jsonld";

interface Props {
  article: BlogArticle;
}

export default function BlogArticleContent({ article }: Props) {
  useEffect(() => {
    const schemas = [
      getArticleSchema({
        title: article.title,
        description: article.description,
        date: article.date,
        slug: article.slug,
      }),
      getFAQSchema(article.faq),
      getBreadcrumbSchema([
        { name: "Главная", url: "https://fotoestate.ru" },
        { name: "Блог", url: "https://fotoestate.ru/blog" },
        { name: article.title, url: `https://fotoestate.ru/blog/${article.slug}` },
      ]),
    ];

    const scripts: HTMLScriptElement[] = [];
    for (const schema of schemas) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      scripts.push(script);
    }

    return () => {
      for (const s of scripts) s.remove();
    };
  }, [article]);

  return null;
}
