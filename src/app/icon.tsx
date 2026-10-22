import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — suggested Green Diamond mark (diamond + pistachio). */
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
        <div
          style={{
            display: "flex",
            width: 18,
            height: 18,
            background: "#F4F7F4",
            transform: "rotate(45deg)",
            borderRadius: 1,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
