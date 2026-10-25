import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Link } from "@/i18n/navigation";
import { brand, contact } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return buildPageMetadata({
    locale,
    pathname: "/privacy",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  const sections = [
    { title: t("collectTitle"), body: t("collectBody") },
    { title: t("cookiesTitle"), body: t("cookiesBody") },
    { title: t("contactTitle"), body: t("contactBody") },
    { title: t("thirdTitle"), body: t("thirdBody") },
  ] as const;

  return (
    <>
      <PageHero title={t("title")} lead={t("lead", { brand: brand.name })} />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl space-y-10">
          {sections.map((item) => (
            <div key={item.title}>
              <h2 className="font-heading text-xl font-semibold tracking-tight text-ink">
                {item.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}

          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight text-ink">
              {t("reachTitle")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {t("reachBody")}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/85">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-brand"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-brand">
                  {t("contactPage")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
