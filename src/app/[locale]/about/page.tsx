import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { brand, imagery } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return buildPageMetadata({
    locale,
    pathname: "/about",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {t("heading")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("p1", {
                brand: brand.name,
                legalName: brand.legalNameEn,
                legalNameFa: brand.legalNameFa,
              })}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("p2")}
            </p>
          </div>

          <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
            <Image
              src={imagery.orchard}
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-surface/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {t("historyTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            {t("historyNote")}
          </p>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="section-label">
                {t("originLabel")}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-foreground/90">
                {t("originBody", { legalName: brand.legalNameEn })}
              </dd>
            </div>
            <div>
              <dt className="section-label">
                {t("standLabel")}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-foreground/90">
                {t("standBody")}
              </dd>
            </div>
            <div>
              <dt className="section-label">
                {t("certsLabel")}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-foreground/90">
                {t("certsBody")}
              </dd>
            </div>
            <div>
              <dt className="section-label">
                {t("marketsLabel")}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-foreground/90">
                {t("marketsBody")}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
