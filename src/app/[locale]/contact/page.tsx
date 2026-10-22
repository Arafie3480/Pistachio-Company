import { Mail, MapPin, MessageCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
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

  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div className="space-y-10">
            <div className="flex gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-brand">
                <Mail className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  {t("email")}
                </h2>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 inline-block text-base text-foreground/90 transition-colors hover:text-brand"
                >
                  {contact.email}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("emailTodo")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-brand">
                <MessageCircle className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  {t("whatsapp")}
                </h2>
                <p className="mt-1 text-base text-foreground/90">
                  {t("whatsappLabel")}
                </p>
                {contact.whatsappUrl.startsWith("http") ? (
                  <Button asChild variant="outline" className="mt-3 h-9">
                    <a
                      href={contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("whatsappOpen")}
                    </a>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3 h-9"
                    disabled
                    aria-disabled="true"
                  >
                    {t("whatsappOpen")}
                  </Button>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("whatsappNote")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-brand">
                <MapPin className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-lg font-semibold text-ink">
                  {t("office")}
                </h2>
                <p className="mt-1 text-base text-foreground/90">
                  {contact.addressLine}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("addressNote")}
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-sm border border-border/80 bg-surface px-6 py-8 sm:px-8">
            <h2 className="font-heading text-xl font-semibold text-ink">
              {t("includeTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("includeLead")}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground/85">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                {t("include1")}
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                {t("include2")}
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                {t("include3")}
              </li>
            </ul>
            <Button asChild className="mt-8 h-10 w-full sm:w-auto">
              <a href={`mailto:${contact.email}?subject=${subject}`}>
                {t("emailCta")}
              </a>
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
