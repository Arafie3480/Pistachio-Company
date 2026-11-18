import { getLocale, getTranslations } from "next-intl/server";
import { BrandLogo } from "@/components/brand-logo";
import { Link } from "@/i18n/navigation";
import { rtlLocales } from "@/i18n/routing";
import { whatsappHref } from "@/lib/json-ld";
import { brand, brandLegalForLocale, contact } from "@/lib/site";

const navHrefs = ["/", "/about", "/products", "/contact"] as const;
const navKeys = ["home", "about", "products", "contact"] as const;

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tContact = await getTranslations("Contact");
  const locale = await getLocale();
  const waHref = whatsappHref(tContact("emailSubject"));
  const preferFaAddress = (rtlLocales as readonly string[]).includes(locale);
  const legal = brandLegalForLocale(locale);

  return (
    <footer className="mt-auto border-t border-border/80 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:gap-10 sm:px-8 sm:py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-14">
        <div>
          <div className="flex items-start gap-3">
            <BrandLogo size="footer" className="h-9 w-auto shrink-0 sm:h-11" />
            <div className="min-w-0">
              <p
                className="font-heading text-base font-semibold tracking-tight text-ink sm:text-xl"
                lang={legal.preferFa ? "fa" : undefined}
                dir={legal.preferFa ? "rtl" : undefined}
              >
                {legal.displayName}
              </p>
              <p className="mt-0.5 text-xs text-foreground/80 sm:mt-1 sm:text-sm">
                {legal.preferFa ? (
                  <>
                    <span lang="fa" dir="rtl">
                      {brand.legalNameFa}
                    </span>
                    <span className="mx-1.5 text-border" aria-hidden>
                      ·
                    </span>
                    <span dir="ltr">{brand.legalNameEn}</span>
                  </>
                ) : (
                  <>
                    {brand.legalNameEn}
                    <span className="mx-1.5 text-border" aria-hidden>
                      ·
                    </span>
                    <span lang="fa" dir="rtl">
                      {brand.legalNameFa}
                    </span>
                  </>
                )}
              </p>
              {legal.region ? (
                <p
                  className="brand-eyebrow mt-0.5 text-[0.65rem] text-gold-foreground/80 sm:mt-1 sm:text-xs"
                  lang={legal.preferFa ? "fa" : undefined}
                  dir={legal.preferFa ? "rtl" : undefined}
                >
                  {legal.region}
                </p>
              ) : null}
            </div>
          </div>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
            {t("tagline", {
              legalName: legal.legalName,
              legalNameFa: legal.preferFa
                ? brand.legalNameEn
                : brand.legalNameFa,
            })}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:contents">
          <div>
            <p className="section-label text-[0.65rem] sm:text-xs">
              {t("navigate")}
            </p>
            <ul className="mt-2 space-y-1.5 text-sm sm:mt-3 sm:space-y-2">
              {navHrefs.map((href, i) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-foreground/80 transition-colors hover:text-brand"
                  >
                    {tNav(navKeys[i])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label text-[0.65rem] sm:text-xs">
              {t("contact")}
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-foreground/80 sm:mt-3 sm:space-y-2 sm:text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(tContact("emailSubject"))}`}
                  className="break-all transition-colors hover:text-brand"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="transition-colors hover:text-brand"
                  dir="ltr"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand"
                >
                  {tContact("whatsapp")}
                </a>
              </li>
              <li
                lang={preferFaAddress ? "fa" : undefined}
                dir={preferFaAddress ? "rtl" : undefined}
              >
                {preferFaAddress ? contact.addressLineFa : contact.addressLine}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-5 py-3.5 text-[0.7rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-8 sm:py-5 sm:text-xs">
          <p>
            {t("rights", {
              year: brand.copyrightYear,
              brand: legal.displayName,
            })}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand"
            >
              {t("privacy")}
            </Link>
            <span aria-hidden className="text-border">
              ·
            </span>
            <p>{brand.domain}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
