import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  /** Compact nav mark vs fuller lockup */
  size?: "nav" | "hero" | "footer";
  priority?: boolean;
};

const sizes = {
  nav: { width: 148, height: 56, src: "/brand/logo-nav.png" as const },
  hero: { width: 280, height: 210, src: "/brand/logo-official-web.jpg" as const },
  footer: { width: 168, height: 64, src: "/brand/logo-nav.png" as const },
};

/**
 * Official Green Diamond Farm Rafsanjan lockup (client-supplied).
 */
export function BrandLogo({
  className,
  size = "nav",
  priority = false,
}: BrandLogoProps) {
  const cfg = sizes[size];
  return (
    <Image
      src={cfg.src}
      alt="Green Diamond Farm Rafsanjan"
      width={cfg.width}
      height={cfg.height}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
