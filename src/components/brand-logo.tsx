"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/site";

type BrandLogoProps = {
  className?: string;
  /** Compact nav mark vs fuller lockup */
  size?: "nav" | "hero" | "footer";
  priority?: boolean;
};

const sizes = {
  nav: { width: 135, height: 128, src: brand.logoNavPath },
  hero: { width: 458, height: 440, src: brand.logoPath },
  footer: { width: 135, height: 128, src: brand.logoNavPath },
} as const;

/**
 * Official Green Diamond Farm Rafsanjan lockup (client-supplied, border-trimmed).
 */
export function BrandLogo({
  className,
  size = "nav",
  priority = false,
}: BrandLogoProps) {
  const locale = useLocale();
  const cfg = sizes[size];
  const alt =
    locale === "fa" || locale === "ar"
      ? "گرین دایموند فارم رفسنجان"
      : "Green Diamond Farm Rafsanjan";

  return (
    <Image
      src={cfg.src}
      alt={alt}
      width={cfg.width}
      height={cfg.height}
      priority={priority}
      className={cn(
        "h-auto w-auto object-contain object-left rtl:object-right",
        className,
      )}
    />
  );
}
