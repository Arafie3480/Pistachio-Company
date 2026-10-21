"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { brand } from "@/lib/site";
import { cn } from "@/lib/utils";

const navHrefs = ["/", "/about", "/products", "/contact"] as const;
const navKeys = ["home", "about", "products", "contact"] as const;

export function SiteHeader() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = !isHome || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        solid ? "bg-brand/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:h-[4.25rem] sm:px-8">
        <Link
          href="/"
          className="font-heading text-[0.95rem] font-semibold tracking-tight text-brand-foreground transition-opacity hover:opacity-90 sm:text-base"
        >
          {brand.name}
        </Link>

        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label={t("primary")}
        >
          {navHrefs.map((href, i) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "text-brand-foreground"
                    : "text-brand-foreground/75 hover:text-brand-foreground"
                )}
              >
                {t(navKeys[i])}
              </Link>
            );
          })}
          <LanguageSwitcher className="ms-2" onDark />
          <Button
            asChild
            size="sm"
            className="ms-2 h-9 bg-brand-foreground text-brand hover:bg-brand-foreground/90"
          >
            <Link href="/contact">{t("inquire")}</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitcher onDark />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-brand-foreground"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-brand-foreground/15 md:hidden"
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4"
            aria-label={t("mobile")}
          >
            {navHrefs.map((href, i) => (
              <Link
                key={href}
                href={href}
                className="rounded-md px-3 py-3 text-base text-brand-foreground/90 hover:bg-brand-foreground/10"
              >
                {t(navKeys[i])}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
