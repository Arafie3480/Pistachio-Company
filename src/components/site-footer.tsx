import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { whatsappHref } from "@/lib/json-ld";
import { brand, contact } from "@/lib/site";

const navHrefs = ["/", "/about", "/products", "/contact"] as const;
const navKeys = ["home", "about", "products", "contact"] as const;

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tContact = await getTranslations("Contact");
  const waHref = whatsappHref(tContact("emailSubject"));

  return (
    <footer className="mt-auto border-t border-border/80 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-xl font-semibold tracking-tight text-ink">
            {brand.name}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("tagline", {
              legalName: brand.legalNameEn,
              legalNameFa: brand.legalNameFa,
            })}
          </p>
        </div>

        <div>
          <p className="section-label">{t("navigate")}</p>
          <ul className="mt-3 space-y-2 text-sm">
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
          <p className="section-label">{t("contact")}</p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-brand"
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
            <li>{contact.addressLine}</li>
            <li className="text-xs text-muted-foreground">
              {tContact("addressNote")}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>{t("rights", { year: brand.copyrightYear, brand: brand.name })}</p>
          <p>{brand.domain}</p>
        </div>
      </div>
    </footer>
  );
}
