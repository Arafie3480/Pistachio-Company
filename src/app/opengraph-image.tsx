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
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(145deg, #12291f 0%, #1a3d2e 48%, #2a5540 100%)",
          color: "#f4f7f4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              background: "#8bc48a",
              transform: "rotate(45deg)",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            Pistachio export
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {brand.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 28,
              opacity: 0.82,
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Iranian pistachios for international buyers · {brand.legalNameEn}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            opacity: 0.55,
            letterSpacing: "0.04em",
          }}
        >
          {brand.domain}
        </div>
      </div>
    ),
    { ...size },
  );
}
