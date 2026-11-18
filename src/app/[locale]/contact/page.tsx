import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/site";
import { whatsappHref } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";
import { rtlLocales } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return buildPageMetadata({
    locale,
    pathname: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const subject = encodeURIComponent(t("emailSubject"));
  const waHref = whatsappHref(t("emailSubject"));
  const preferFaAddress = (rtlLocales as readonly string[]).includes(locale);

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div className="space-y-10">
            <div className="flex gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-secondary text-brand">
                <Mail className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  {t("email")}
                </h2>
                <a
                  href={`mailto:${contact.email}?subject=${subject}`}
                  className="mt-1 inline-block text-base text-foreground/90 transition-colors hover:text-brand"
                >
                  {contact.email}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("emailNote")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-secondary text-brand">
                <Phone className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  {t("phone")}
                </h2>
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-1 inline-block text-base text-foreground/90 transition-colors hover:text-brand"
                  dir="ltr"
                >
                  {contact.phoneDisplay}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("phoneNote")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-secondary text-brand">
                <MessageCircle className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  {t("whatsapp")}
                </h2>
                <p className="mt-1 text-base text-foreground/90" dir="ltr">
                  {contact.phoneDisplay}
                </p>
                <Button asChild variant="outline" className="mt-3 h-9">
                  <a href={waHref} target="_blank" rel="noopener noreferrer">
                    {t("whatsappOpen")}
                  </a>
                </Button>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("whatsappNote")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-secondary text-brand">
                <MapPin className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  {t("office")}
                </h2>
                {preferFaAddress ? (
                  <>
                    <p
                      className="mt-1 text-base text-foreground/90"
                      lang="fa"
                      dir="rtl"
                    >
                      {contact.addressLineFa}
                    </p>
                    <p className="mt-1 text-sm text-foreground/75" dir="ltr">
                      {contact.addressLine}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-1 text-base text-foreground/90">
                      {contact.addressLine}
                    </p>
                    <p
                      className="mt-1 text-sm text-foreground/75"
                      lang="fa"
                      dir="rtl"
                    >
                      {contact.addressLineFa}
                    </p>
                  </>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("addressNote")}
                </p>
              </div>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-sm border border-gold/30 bg-brand px-6 py-8 text-brand-foreground sm:px-8">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_180px_at_90%_0%,oklch(0.8_0.1_82/0.2),transparent_65%)]"
              aria-hidden
            />
            <div className="relative">
              <h2 className="font-heading text-xl font-semibold">
                {t("includeTitle")}
              </h2>
              <div className="mt-4 h-px w-12 bg-gold/80" aria-hidden />
              <p className="mt-4 text-sm leading-relaxed text-brand-foreground/75">
                {t("includeLead")}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-brand-foreground/90">
                <li className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {t("include1")}
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {t("include2")}
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {t("include3")}
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-10 w-full border border-gold/50 bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto"
                >
                  <a href={`mailto:${contact.email}?subject=${subject}`}>
                    {t("emailCta")}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-10 w-full border-brand-foreground/35 bg-transparent text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground sm:w-auto"
                >
                  <a href={waHref} target="_blank" rel="noopener noreferrer">
                    {t("whatsappOpen")}
                  </a>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
