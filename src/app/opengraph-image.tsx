import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Automation Studio | Custom Internal Tools in One Week";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 28 28"
            fill="none"
          >
            <rect width="28" height="28" rx="6" fill="#1d1d1f" />
            <path
              d="M8 14L12 10L16 14L20 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 18L12 14L16 18L20 14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 600,
              color: "#1d1d1f",
              letterSpacing: "-0.02em",
            }}
          >
            Automation Studio
          </span>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 600,
            color: "#1d1d1f",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "800px",
          }}
        >
          Stop doing repetitive work.
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#86868b",
            marginTop: "24px",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          Custom internal tools built for your business in one week.
        </div>
      </div>
    ),
    { ...size }
  );
}
