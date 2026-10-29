import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { brand, imagery, productSlugs } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const meta = buildPageMetadata({
    locale,
    pathname: "",
    title: t("titleDefault"),
    description: t("description"),
  });
  // Avoid template doubling the brand already present in titleDefault.
  return { ...meta, title: { absolute: t("titleDefault") } };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const tProducts = await getTranslations("products");

  const pillars = [
    { title: t("pillar1Title"), body: t("pillar1Body") },
    { title: t("pillar2Title"), body: t("pillar2Body") },
    { title: t("pillar3Title"), body: t("pillar3Body") },
  ] as const;

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-brand text-brand-foreground">
        <div className="absolute inset-0 animate-gd-ken">
          <Image
            src={imagery.hero}
            alt={t("heroAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand/82 via-brand/55 to-brand/28 rtl:bg-gradient-to-l"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-brand/65 via-transparent to-brand/25"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pt-28 pb-16 sm:justify-center sm:px-8 sm:pb-24">
          <div className="animate-gd-fade-up">
            <BrandMark
              tone="onDark"
              variant="lockup"
              priority
              className="h-28 w-auto max-w-[min(100%,16rem)] drop-shadow-md sm:h-36 sm:max-w-[20rem] md:h-40 md:max-w-[22rem]"
            />
            <p className="mt-3 text-xs tracking-[0.12em] text-brand-foreground/60 uppercase sm:text-sm sm:tracking-[0.16em]">
              {brand.legalNameEn}
            </p>
          </div>
          <h1 className="animate-gd-fade-up animate-gd-delay-1 mt-6 max-w-xl font-heading text-2xl font-medium tracking-tight text-balance text-brand-foreground/95 sm:mt-8 sm:text-3xl md:text-[2.15rem] md:leading-snug">
            {t("headline")}
          </h1>
          <p className="animate-gd-fade-up animate-gd-delay-2 mt-4 max-w-md text-base leading-relaxed text-brand-foreground/75 sm:text-lg">
            {t("subhead", { legalName: brand.legalNameEn })}
          </p>
          <div className="animate-gd-fade-up animate-gd-delay-3 mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 bg-brand-foreground px-5 text-brand hover:bg-brand-foreground/90"
            >
              <Link href="/products">{t("ctaProducts")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 border-brand-foreground/35 bg-transparent px-5 text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
            >
              <Link href="/contact">{t("ctaContact")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t("buyersTitle")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("buyersLead")}
          </p>
        </div>

        <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-3">
          {pillars.map((item) => (
            <li key={item.title} className="border-t border-border/70 pt-6">
              <h3 className="font-heading text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border/70 bg-surface/70">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={imagery.product}
              alt={t("productAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink">
              {t("shipmentTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("shipmentLead")}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-foreground/85">
              {productSlugs.slice(0, 5).map((slug) => (
                <li key={slug} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                  {tProducts(`${slug}.name`)}
                </li>
              ))}
              <li className="flex gap-2 text-muted-foreground">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-muted" />
                {t("kernelsRoasted")}
              </li>
            </ul>
            <Button asChild className="mt-8 h-10">
              <Link href="/products">{t("seeAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("ctaLead")}
          </p>
          <Button asChild size="lg" className="mt-8 h-11">
            <Link href="/contact">{t("ctaButton")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
