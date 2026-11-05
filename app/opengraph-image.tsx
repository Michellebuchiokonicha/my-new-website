import { ImageResponse } from "next/og";
import { site } from "./content";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f3ebdd", color: "#1b1a17", padding: 64, fontFamily: "Georgia, serif" }}>
        <div style={{ display: "flex", background: "#2547d0", color: "#fff", padding: "10px 22px", fontSize: 26, alignSelf: "flex-start", fontFamily: "sans-serif", letterSpacing: 4 }}>
          GOOGLE DEVELOPER EXPERT
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.95 }}>
          <div style={{ fontSize: 190 }}>Michelle</div>
          <div style={{ fontSize: 96, fontStyle: "italic", color: "#bc361c" }}>Buchi Okonicha</div>
        </div>
        <div style={{ display: "flex", fontSize: 32, fontFamily: "sans-serif" }}>{site.title}</div>
      </div>
    ),
    size,
  );
}
