import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  /** Light mark for dark chrome; brand-green mark for light surfaces */
  tone?: "onDark" | "onLight";
  title?: string;
};

/**
 * Suggested Green Diamond Farm mark (diamond + pistachio) for initial delivery.
 * Replace when the client supplies a final logo file.
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
      <path fill={diamond} d="M32 3.2 L60.8 32 L32 60.8 L3.2 32 Z" />
      <polygon fill={cut} points="32,8 46.5,29 32,29" />
      <polygon fill={cut} points="32,8 17.5,29 32,29" />
      <path
        fill={cut}
        d="M16 30.2 Q32 33.8 48 30.2 L47.2 32.6 Q32 36 16.8 32.6 Z"
      />
      <ellipse fill={cut} cx="32" cy="46.2" rx="9.2" ry="11.2" />
      <path
        fill={cleft}
        d="M32 36.8 C34.6 39.2 35.6 42.2 35.4 45.4 C35.2 48.8 33.6 51.6 32 54.8 C30.4 51.6 28.8 48.8 28.6 45.4 C28.4 42.2 29.4 39.2 32 36.8 Z"
      />
    </svg>
  );
}
