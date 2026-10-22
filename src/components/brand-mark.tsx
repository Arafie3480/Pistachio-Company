import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  /** Light mark for dark chrome; brand-green mark for light surfaces */
  tone?: "onDark" | "onLight";
  title?: string;
};

/**
 * Suggested Green Diamond Farm mark (diamond + pistachio) for initial delivery.
 * Adapted from the drafted green-diamond-mark artwork; client may replace later.
 */
export function BrandMark({
  className,
  tone = "onLight",
  title = "Green Diamond Farm",
}: BrandMarkProps) {
  const diamond = tone === "onDark" ? "#F4F7F4" : "#00684C";
  const cut = tone === "onDark" ? "#163528" : "#FFFFFF";
  const cleft = tone === "onDark" ? "#00684C" : "#00684C";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path fill={diamond} d="M32 2 L62 32 L32 62 L2 32 Z" />
      {/* Upper crown facets */}
      <path fill={cut} d="M32 7 L47 30 H32 Z" />
      <path fill={cut} d="M32 7 L17 30 H32 Z" />
      {/* Facet girdle */}
      <path
        fill={cut}
        d="M15 31.2 C24 35.2 40 35.2 49 31.2 L48.2 34 C39.5 37.6 24.5 37.6 15.8 34 Z"
      />
      {/* Pistachio kernel */}
      <ellipse fill={cut} cx="32" cy="46.5" rx="10" ry="12" />
      <path
        fill={cleft}
        d="M32 36.5 C35 39.2 36.2 42.5 36 46 C35.8 49.8 34 52.8 32 56.2 C30 52.8 28.2 49.8 28 46 C27.8 42.5 29 39.2 32 36.5 Z"
      />
    </svg>
  );
}
