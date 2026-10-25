import { ImageResponse } from "next/og";
import { BrandMarkOg } from "@/lib/brand-mark-og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — suggested Green Diamond mark. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#00684C",
        }}
      >
        <BrandMarkOg
          size={120}
          diamond="#F4F7F4"
          cut="#00684C"
          cleft="#F4F7F4"
        />
      </div>
    ),
    { ...size },
  );
}
