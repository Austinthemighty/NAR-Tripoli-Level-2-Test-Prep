import { ImageResponse } from "next/og";

export const alt = "Rocket Cert Prep — NAR & Tripoli Level 2 practice exams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f1115 0%, #363b43 60%, #c41a0c 110%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 600, color: "#ff9c72" }}>🚀 Rocket Cert Prep</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          Pass your NAR &amp; Tripoli Level 2 cert.
        </div>
        <div style={{ fontSize: 32, marginTop: 28, color: "#d4d8dd", maxWidth: 900 }}>
          Free practice exams, flashcards, and the complete question bank.
        </div>
      </div>
    ),
    size
  );
}
