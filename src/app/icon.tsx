import { ImageResponse } from "next/og";
import { BrandMarkOg } from "@/lib/brand-mark-og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — suggested Green Diamond mark (diamond + pistachio cue). */
export default function Icon() {
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
        <BrandMarkOg size={22} diamond="#F4F7F4" cut="#00684C" cleft="#F4F7F4" />
      </div>
    ),
    { ...size },
  );
}
