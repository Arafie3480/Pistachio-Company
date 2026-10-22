import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Green-diamond mark until client logo arrives. */
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
          background: "#163528",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 14,
            height: 14,
            background: "#8bc48a",
            transform: "rotate(45deg)",
            borderRadius: 1,
            boxShadow: "0 0 0 2px #163528, 0 0 0 3px #5a9a68",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
