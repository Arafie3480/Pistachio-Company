import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { productCatalogJsonLd } from "@/lib/json-ld";
import { productGroups, productSlugs } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return buildPageMetadata({
    locale,
    pathname: "/products",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Products");
  const tProducts = await getTranslations("products");

  const numberBySlug = Object.fromEntries(
    productGroups
      .flatMap((group) => group.slugs)
      .map((slug, i) => [slug, i + 1])
  ) as Record<(typeof productGroups)[number]["slugs"][number], number>;

  const productNames = Object.fromEntries(
    productSlugs.map((slug) => [slug, tProducts(`${slug}.name`)]),
  ) as Record<(typeof productSlugs)[number], string>;
  const catalogLd = productCatalogJsonLd(productNames);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogLd) }}
      />
      <PageHero title={t("title")} lead={t("lead")} />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t("outlineNote")}
        </p>

        <div className="mt-12 space-y-14">
          {productGroups.map((group) => (
            <div key={group.id}>
              <h2 className="section-label">{t(`group.${group.id}`)}</h2>
              <ul className="mt-5 divide-y divide-border/70 border-y border-border/70">
                {group.slugs.map((slug) => (
                  <li
                    key={slug}
                    className="product-row group grid gap-3 py-7 sm:grid-cols-[5.5rem_1fr] sm:gap-10 sm:py-8"
                  >
                    <span className="font-mono text-xs tracking-wider text-muted-foreground tabular-nums transition-colors group-hover:text-brand">
                      {String(numberBySlug[slug]).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-brand sm:text-2xl">
                        {tProducts(`${slug}.name`)}
                      </h3>
                      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                        {tProducts(`${slug}.summary`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-xl border-t border-border/60 pt-12">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {t("ctaLead")}
          </p>
          <Button asChild className="mt-6 h-10">
            <Link href="/contact">{t("ctaButton")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
