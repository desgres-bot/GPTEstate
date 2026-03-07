import Link from "next/link";

interface Props {
  heading1?: string;
  cta1?: string;
  cta1Href?: string;
  heading2?: string;
  cta2?: string;
  cta2Href?: string;
  fomo?: string;
}

export default function CTASplitBanner({
  heading1 = "2 фото бесплатно.\nПрямо сейчас.",
  cta1 = "Попробовать бесплатно",
  cta1Href = "/generate",
  heading2 = "Больше 50 фото в месяц?\nПодберём тариф.",
  cta2 = "Написать нам",
  cta2Href = "mailto:support@fotoestate.ru",
  fomo = "Присоединяйтесь к 1 247 риелторам, которые уже экономят время и деньги",
}: Props) {
  return (
    <section className="bg-[#1E1B18]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          <div className="bg-[#1E1B18] py-20 pr-8 lg:py-32">
            <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
              Попробовать
            </div>
            <h2 className="heading-display text-[28px] sm:text-[36px] lg:text-[48px] leading-tight text-white whitespace-pre-line">
              {heading1}
            </h2>
            <Link href={cta1Href} className="btn-white mt-8">
              {cta1}
            </Link>
          </div>
          <div className="bg-[#1E1B18] py-20 pr-8 lg:py-32">
            <div className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
              Для агентств
            </div>
            <h2 className="heading-display text-[28px] sm:text-[36px] lg:text-[48px] leading-tight text-white whitespace-pre-line">
              {heading2}
            </h2>
            {cta2Href.startsWith("mailto:") ? (
              <a href={cta2Href} className="btn-outline-light mt-8">
                {cta2}
              </a>
            ) : (
              <Link href={cta2Href} className="btn-outline-light mt-8">
                {cta2}
              </Link>
            )}
          </div>
        </div>
        <div className="py-8 text-center text-[15px] text-neutral-500">
          {fomo}
        </div>
      </div>
    </section>
  );
}
