/**
 * Compact diamond + pistachio mark for next/og ImageResponse (Satori).
 * Mirrors `BrandMark` / `public/brand/mark.svg` geometry at small sizes.
 */
export function BrandMarkOg({
  size = 56,
  diamond = "#F4F7F4",
  cut = "#163528",
  cleft = "#00684C",
}: {
  size?: number;
  diamond?: string;
  cut?: string;
  cleft?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      style={{ display: "flex" }}
    >
      <path fill={diamond} d="M32 2.5 L61.5 32 L32 61.5 L2.5 32 Z" />
      <path fill={cut} d="M32 8 L46 28.5 L32 28.5 Z" />
      <path fill={cut} d="M32 8 L18 28.5 L32 28.5 Z" />
      <path
        fill={cut}
        d="M17 30 Q32 34.5 47 30 L46.2 32.8 Q32 37 17.8 32.8 Z"
      />
      <ellipse fill={cut} cx="32" cy="46.8" rx="9.6" ry="11.6" />
      <path
        fill={cleft}
        d="M31.2 37.2 C34.6 39.4 35.8 42.2 35.2 45.2 C34.6 48.4 32.8 51.2 32.2 54.8 C29.4 51.6 28.2 48.6 28.6 45.4 C29 42.4 29.6 39.6 31.2 37.2 Z"
      />
    </svg>
  );
}
