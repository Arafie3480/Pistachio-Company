import { ImageResponse } from "next/og";
import { brand } from "@/lib/site";

export const alt = "Green Diamond Farm — Iranian pistachio export";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default OG card until brand photography is supplied. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #1a3d2e 0%, #2d5a45 55%, #3d6b52 100%)",
          color: "#f4f7f4",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 56,
            height: 56,
            background: "#7cb87a",
            transform: "rotate(45deg)",
            marginBottom: 40,
            borderRadius: 6,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {brand.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 28,
            opacity: 0.85,
            maxWidth: 800,
          }}
        >
          Iranian pistachio export · {brand.legalNameEn}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 22,
            opacity: 0.65,
          }}
        >
          {brand.domain}
        </div>
      </div>
    ),
    { ...size },
  );
}
