import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  /** Light mark for dark chrome; brand-green mark for light surfaces */
  tone?: "onDark" | "onLight";
  title?: string;
};

/**
 * Suggested Green Diamond Farm mark — diamond crown + pistachio kernel with cleft.
 * Adapted from media/green-diamond-mark.jpg for initial delivery.
 */
export function BrandMark({
  className,
  tone = "onLight",
  title = "Green Diamond Farm",
}: BrandMarkProps) {
  const diamond = tone === "onDark" ? "#F4F7F4" : "#00684C";
  const cut = tone === "onDark" ? "#163528" : "#FFFFFF";
  const cleft = "#00684C";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path fill={diamond} d="M32 2.5 L61.5 32 L32 61.5 L2.5 32 Z" />
      {/* Gem crown — two facets meeting at apex (inverted V) */}
      <path fill={cut} d="M32 8 L46 28.5 L32 28.5 Z" />
      <path fill={cut} d="M32 8 L18 28.5 L32 28.5 Z" />
      {/* Soft girdle between crown and kernel */}
      <path
        fill={cut}
        d="M17 30 Q32 34.5 47 30 L46.2 32.8 Q32 37 17.8 32.8 Z"
      />
      {/* Pistachio kernel */}
      <ellipse fill={cut} cx="32" cy="46.8" rx="9.6" ry="11.6" />
      {/* Natural shell cleft (S-curve) */}
      <path
        fill={cleft}
        d="M31.2 37.2
          C34.6 39.4 35.8 42.2 35.2 45.2
          C34.6 48.4 32.8 51.2 32.2 54.8
          C29.4 51.6 28.2 48.6 28.6 45.4
          C29 42.4 29.6 39.6 31.2 37.2 Z"
      />
    </svg>
  );
}
