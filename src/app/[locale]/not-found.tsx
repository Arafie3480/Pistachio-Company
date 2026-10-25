import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-28 sm:px-8">
      <p className="section-label">{t("code")}</p>
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        {t("lead")}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild className="h-10">
          <Link href="/">{t("home")}</Link>
        </Button>
        <Button asChild variant="outline" className="h-10">
          <Link href="/contact">{t("contact")}</Link>
        </Button>
      </div>
    </section>
  );
}
