"use client";

import { useState } from "react";
import Link from "next/link";
import { BLOG_ARTICLES } from "@/lib/blog-articles";
import { BLOG_CATEGORIES } from "@/lib/constants";
import type { BlogCategory } from "@/types";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === activeCategory);

  const getCategoryName = (id: string) =>
    BLOG_CATEGORIES.find((c) => c.id === id)?.name ?? id;
  const getCategoryEmoji = (id: string) =>
    BLOG_CATEGORIES.find((c) => c.id === id)?.emoji ?? "";

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1E1B18] text-white pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-terra-400 text-sm uppercase tracking-widest font-medium mb-6">
            Блог
          </p>
          <h1 className="heading-display text-[40px] leading-[1.08] sm:text-[56px] lg:text-[72px]">
            Знания для{" "}
            <span className="text-terra-400">риелторов</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-xl mx-auto">
            {BLOG_ARTICLES.length} статей о фотографии недвижимости, AI-обработке и продажах
          </p>
        </div>
      </section>

      {/* Filters + Articles */}
      <section className="bg-[#fbf9f5] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-lg px-4 py-2 text-sm transition-all ${
                activeCategory === "all"
                  ? "bg-[#1E1B18] text-white"
                  : "bg-white border border-neutral-200 text-[#6B6560] hover:border-neutral-400"
              }`}
            >
              Все статьи
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as BlogCategory)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#1E1B18] text-white"
                    : "bg-white border border-neutral-200 text-[#6B6560] hover:border-neutral-400"
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-xl bg-white border border-neutral-200 overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="rounded-md bg-[#fbf9f5] px-2.5 py-1 text-xs text-[#6B6560]">
                      {getCategoryEmoji(article.category)} {getCategoryName(article.category)}
                    </span>
                    <span className="text-xs text-neutral-400">{article.readTime}</span>
                  </div>
                  <h2 className="text-[18px] font-normal leading-snug group-hover:text-terra-500 transition-colors">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#6B6560] leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-neutral-400">
              Нет статей в этой категории
            </div>
          )}
        </div>
      </section>
    </>
  );
}
