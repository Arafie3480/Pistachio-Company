import Link from "next/link";
import { brand, contact, nav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-xl font-semibold tracking-tight text-ink">
            {brand.name}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Iranian pistachio export under {brand.legalNameEn}
            <span className="mx-1 text-border">·</span>
            {brand.legalNameFa}. Reliable supply for international buyers.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Navigate
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-foreground/80 transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-brand"
              >
                {contact.email}
              </a>
            </li>
            <li>{contact.addressLine}</li>
            <li className="text-xs text-muted-foreground">{contact.addressNote}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © 2026 {brand.name}. All rights reserved.
          </p>
          <p>{brand.domain}</p>
        </div>
      </div>
    </footer>
  );
}
