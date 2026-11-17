"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const navHrefs = ["/", "/about", "/products", "/contact"] as const;
const navKeys = ["home", "about", "products", "contact"] as const;

export function SiteHeader() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [routeKey, setRouteKey] = useState(`${locale}:${pathname}`);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isHome = pathname === "/";

  // Close the mobile drawer when the route or locale changes (render-time adjust).
  const nextRouteKey = `${locale}:${pathname}`;
  if (nextRouteKey !== routeKey) {
    setRouteKey(nextRouteKey);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const drawer = document.getElementById("mobile-nav");
    const focusables = () =>
      Array.from(
        drawer?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    focusables()[0]?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
          className="group shrink-0 rounded-md outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-gold/70"
        >
          <BrandLogo size="nav" priority className="h-9 w-auto sm:h-10" />
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
                  "relative rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "text-brand-foreground after:absolute after:inset-x-3 after:bottom-1 after:h-px after:bg-gold/90"
                    : "text-brand-foreground/75 hover:text-brand-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                {t(navKeys[i])}
              </Link>
            );
          })}
          <LanguageSwitcher className="ms-2" onDark />
          <Button
            asChild
            size="sm"
            className="ms-2 h-9 border border-gold/40 bg-gold text-gold-foreground hover:bg-gold/90"
          >
            <Link href="/contact">{t("inquire")}</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitcher onDark />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-brand-foreground outline-none transition-colors hover:bg-brand-foreground/10 focus-visible:ring-2 focus-visible:ring-brand-foreground/40"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-haspopup="menu"
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
            {navHrefs.map((href, i) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "rounded-md px-3 py-3 text-base transition-colors hover:bg-brand-foreground/10",
                    active
                      ? "bg-brand-foreground/10 font-medium text-brand-foreground"
                      : "text-brand-foreground/90"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {t(navKeys[i])}
                </Link>
              );
            })}
            <Button
              asChild
              className="mt-2 h-11 w-full border border-gold/40 bg-gold text-gold-foreground hover:bg-gold/90"
            >
              <Link href="/contact">{t("inquire")}</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
