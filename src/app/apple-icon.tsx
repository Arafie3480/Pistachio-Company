import { ImageResponse } from "next/og";

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
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            background: "#F4F7F4",
            transform: "rotate(45deg)",
            borderRadius: 6,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
