import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  /** Kept for call-site compatibility; official PNG works on light and dark chrome. */
  tone?: "onDark" | "onLight";
  title?: string;
  /** Full official lockup vs emblem-only crop for tight chrome. */
  variant?: "lockup" | "mark";
  priority?: boolean;
};

/**
 * Official Green Diamond Farm Rafsanjan logo (client-supplied).
 * Assets: `/public/brand/logo.png` (lockup), `/public/brand/mark.png` (emblem).
 */
export function BrandMark({
  className,
  title = "Green Diamond Farm Rafsanjan",
  variant = "mark",
  priority = false,
}: BrandMarkProps) {
  const src = variant === "lockup" ? "/brand/logo.png" : "/brand/mark.png";
  const sizes = variant === "lockup" ? "(max-width: 640px) 160px, 220px" : "64px";

  return (
    <Image
      src={src}
      alt={title}
      width={variant === "lockup" ? 640 : 512}
      height={variant === "lockup" ? 606 : 512}
      sizes={sizes}
      priority={priority}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
