import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { productSlugs } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
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

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="max-w-2xl text-sm text-muted-foreground">
          {t("outlineNote")}
        </p>

        <ul className="mt-10 divide-y divide-border/80 border-y border-border/80">
          {productSlugs.map((slug, index) => (
            <li
              key={slug}
              className="grid gap-3 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8"
            >
              <span className="font-mono text-xs tracking-wider text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-heading text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {tProducts(`${slug}.name`)}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {tProducts(`${slug}.summary`)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 max-w-xl">
          <h2 className="font-heading text-2xl font-semibold text-ink">
            {t("ctaTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("ctaLead")}</p>
          <Button asChild className="mt-6 h-10">
            <Link href="/contact">{t("ctaButton")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
