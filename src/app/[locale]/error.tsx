"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    // Surface digest in the console for support; do not show stack to buyers.
    if (error.digest) {
      console.error(`Route error digest: ${error.digest}`);
    }
  }, [error]);

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
        <Button type="button" className="h-10" onClick={() => reset()}>
          {t("retry")}
        </Button>
        <Button asChild variant="outline" className="h-10">
          <Link href="/">{t("home")}</Link>
        </Button>
        <Button asChild variant="outline" className="h-10">
          <Link href="/contact">{t("contact")}</Link>
        </Button>
      </div>
    </section>
  );
}
