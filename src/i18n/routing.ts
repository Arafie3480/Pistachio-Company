import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fa", "ar", "tr", "zh", "hi", "ru"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  fa: "فارسی",
  ar: "العربية",
  tr: "Türkçe",
  zh: "中文",
  hi: "हिन्दी",
  ru: "Русский",
};

export const rtlLocales = ["fa", "ar"] as const;

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});
