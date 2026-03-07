import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES, getArticleBySlug } from "@/lib/blog-articles";
import { BLOG_CATEGORIES } from "@/lib/constants";
import CTASplitBanner from "@/components/CTASplitBanner";
import FadeInSection from "@/components/FadeInSection";
import BlogArticleContent from "./BlogArticleContent";

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | GPT Estate`,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `https://fotoestate.ru/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      images: [{ url: `https://fotoestate.ru${article.heroImage}` }],
    },
  };
}

function getCategoryName(id: string) {
  return BLOG_CATEGORIES.find((c) => c.id === id)?.name ?? id;
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = article.relatedSlugs
    .map((s) => BLOG_ARTICLES.find((a) => a.slug === s))
    .filter(Boolean);

  return (
    <>
      {/* JSON-LD via client component */}
      <BlogArticleContent article={article} />

      {/* Hero */}
      <section className="bg-[#1E1B18] text-white pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
          >
            &larr; Блог
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="rounded-md bg-white/10 px-3 py-1 text-xs text-neutral-300">
              {getCategoryName(article.category)}
            </span>
            <span className="text-xs text-neutral-500">{article.readTime}</span>
            <span className="text-xs text-neutral-500">{article.date}</span>
          </div>
          <h1 className="heading-display text-[32px] leading-[1.12] sm:text-[40px] lg:text-[48px]">
            {article.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-300 max-w-2xl">
            {article.description}
          </p>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-[#fbf9f5] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <article>
            {article.content.map((section, idx) => {
              switch (section.type) {
                case "heading":
                  return section.level === 3 ? (
                    <h3 key={idx} className="text-[20px] font-normal mt-10 mb-4">
                      {section.content}
                    </h3>
                  ) : (
                    <h2 key={idx} className="text-[24px] sm:text-[28px] font-normal mt-12 mb-4">
                      {section.content}
                    </h2>
                  );
                case "paragraph":
                  return (
                    <p key={idx} className="text-[#3e3e3e] leading-relaxed mb-4">
                      {section.content}
                    </p>
                  );
                case "list":
                  return (
                    <ul key={idx} className="mb-6 space-y-2">
                      {section.items?.map((item, li) => (
                        <li key={li} className="flex gap-3 text-[#3e3e3e] leading-relaxed">
                          <span className="text-terra-500 mt-1 flex-shrink-0">&#x2022;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case "cta":
                  return (
                    <div key={idx} className="my-8 rounded-xl bg-terra-500/10 border border-terra-500/20 p-6 text-center">
                      <p className="text-[#3e3e3e] mb-4">{section.content}</p>
                      <Link href="/generate" className="btn-terra inline-flex">
                        Попробовать бесплатно
                      </Link>
                    </div>
                  );
                case "quote":
                  return (
                    <blockquote key={idx} className="my-6 border-l-4 border-terra-400 pl-6 italic text-[#6B6560]">
                      {section.content}
                    </blockquote>
                  );
                case "image":
                  return (
                    <div key={idx} className="my-8 rounded-xl overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={section.content}
                        alt=""
                        className="w-full h-auto"
                      />
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </article>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <FadeInSection className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="heading-display text-[28px] sm:text-[36px] mb-10">
              Читайте также
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) =>
                rel ? (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group rounded-xl bg-[#fbf9f5] border border-neutral-200 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.heroImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-neutral-400">{rel.readTime}</span>
                      <h3 className="mt-2 text-[16px] font-normal leading-snug group-hover:text-terra-500 transition-colors">
                        {rel.title}
                      </h3>
                    </div>
                  </Link>
                ) : null,
              )}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* FAQ */}
      {article.faq.length > 0 && (
        <FadeInSection className="bg-[#fbf9f5] py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="heading-display text-[28px] sm:text-[36px] mb-10">
              Частые вопросы
            </h2>
            {article.faq.map((item) => (
              <details key={item.q} className="faq-item group">
                <summary className="flex items-center justify-between gap-4">
                  <h3 className="text-base sm:text-lg">{item.q}</h3>
                  <span className="faq-icon flex-shrink-0 text-2xl leading-none text-[#7D756E]">
                    +
                  </span>
                </summary>
                <p className="pb-6 text-[#6B6560] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </FadeInSection>
      )}

      <CTASplitBanner />
    </>
  );
}
