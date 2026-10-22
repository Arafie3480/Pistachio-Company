import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Simple green-diamond mark until client logo arrives. */
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
          background: "#1a3d2e",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            background: "#7cb87a",
            transform: "rotate(45deg)",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
