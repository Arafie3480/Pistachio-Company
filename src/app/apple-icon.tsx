import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — green diamond placeholder until client logo. */
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
          background: "#1a3d2e",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            background: "#7cb87a",
            transform: "rotate(45deg)",
            borderRadius: 8,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
