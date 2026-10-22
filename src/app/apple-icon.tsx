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
          background: "#163528",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 72,
            height: 72,
            background: "#8bc48a",
            transform: "rotate(45deg)",
            borderRadius: 6,
            boxShadow: "0 0 0 8px #163528, 0 0 0 12px #5a9a68",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
