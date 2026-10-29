import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/lib/site";

export const alt = "Green Diamond Farm — Iranian pistachio export";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default OG card with the official client logo. */
export default async function OpenGraphImage() {
  const markBuf = await readFile(join(process.cwd(), "public/brand/mark.png"));
  const markSrc = `data:image/png;base64,${markBuf.toString("base64")}`;

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
          background:
            "linear-gradient(145deg, #0f241c 0%, #163528 48%, #1f4636 100%)",
          color: "#f4f7f4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={markSrc}
            width={72}
            height={72}
            alt=""
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: 0.65,
              }}
            >
              Pistachio export
            </div>
            <div style={{ display: "flex", fontSize: 22, opacity: 0.8 }}>
              {brand.legalNameEn}
            </div>
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
            Iranian pistachios for international buyers
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
