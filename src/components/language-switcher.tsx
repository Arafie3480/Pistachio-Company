"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  /** Lighter treatment when header sits on the home hero */
  onDark?: boolean;
};

export function LanguageSwitcher({
  className,
  onDark = false,
}: LanguageSwitcherProps) {
  const t = useTranslations("Language");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <label className={cn("inline-flex items-center", className)}>
      <span className="sr-only">{t("switchTo")}</span>
      <select
        name="locale"
        aria-label={t("label")}
        value={locale}
        onChange={(e) => {
          router.replace(pathname, { locale: e.target.value as Locale });
        }}
        className={cn(
          "h-8 max-w-[7.5rem] cursor-pointer appearance-none rounded-md border bg-transparent py-1 pe-7 ps-2 text-xs tracking-wide outline-none transition-colors",
          "bg-[length:0.65rem] bg-[right_0.45rem_center] bg-no-repeat",
          onDark
            ? "border-brand-foreground/25 text-brand-foreground/90 hover:border-brand-foreground/45 focus-visible:border-brand-foreground/55"
            : "border-brand-foreground/30 text-brand-foreground/90 hover:border-brand-foreground/50 focus-visible:border-brand-foreground/60",
          "[background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23e8f0ea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")]"
        )}
      >
        {locales.map((code) => (
          <option key={code} value={code} className="bg-brand text-brand-foreground">
            {localeNames[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
