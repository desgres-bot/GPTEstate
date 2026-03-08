import { MetadataRoute } from "next";
import { BLOG_ARTICLES } from "@/lib/blog-articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fotoestate.ru";

  const blogUrls: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    // Core pages
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/generate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/batch`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // SEO landing pages
    { url: `${baseUrl}/dizajn-interera-online`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/foto-kvartiry-dlya-avito`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/uluchshenie-foto-nedvizhimosti`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/virtualnyj-stejdzhing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/generaciya-opisaniya-kvartiry`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/day-to-dusk-foto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // New SEO landing pages (high-frequency keywords)
    { url: `${baseUrl}/kak-prodat-kvartiru-bystro`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/homestaging`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/podgotovka-kvartiry-k-prodazhe`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/obrabotka-foto-nedvizhimosti`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/dizajn-kvartiry-nejroset`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/virtualnaya-meblirovka`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/foto-dlya-cian`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/uvelichit-prodazhi-nedvizhimosti`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Comparison pages
    { url: `${baseUrl}/gptestate-vs-fotograf`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/virtualnyj-vs-realnyj-stejdzhing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/gptestate-vs-boxbrownie`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/gptestate-vs-virtual-staging-ai`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // Blog
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...blogUrls,
    // New features
    { url: `${baseUrl}/tour`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/api-docs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // English pages
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/en/virtual-staging`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/en/ai-photo-enhancement`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/en/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
