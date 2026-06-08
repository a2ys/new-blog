import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const fontTitle = readFileSync(
  join(process.cwd(), "public/fonts/CabinetGrotesk-Extrabold.otf"),
);
const fontBody = readFileSync(
  join(process.cwd(), "public/fonts/WorkSans-Regular.otf"),
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Untitled";
  const author = searchParams.get("author") ?? "Savant";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#f5f4ee",
        fontFamily: "Cabinet Grotesk",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          display: "flex",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(160,123,40,0.12) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      <div style={{ display: "flex" }}>
        <span
          style={{
            color: "#a07b28",
            fontSize: "14px",
            fontWeight: 800,
            letterSpacing: "0.15em",
          }}
        >
          SAVANT
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          paddingTop: "32px",
        }}
      >
        <span
          style={{
            color: "#0e0f1a",
            fontSize:
              title.length > 60 ? "36px" : title.length > 40 ? "44px" : "54px",
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: "90%",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div
          style={{
            width: "36px",
            height: "2px",
            background: "#a07b28",
            display: "flex",
          }}
        />
        <span
          style={{
            color: "#5c5d66",
            fontSize: "15px",
            fontWeight: 400,
            fontFamily: "Work Sans",
          }}
        >
          {author}
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Cabinet Grotesk",
          data: fontTitle,
          weight: 800,
          style: "normal",
        },
        {
          name: "Work Sans",
          data: fontBody,
          weight: 400,
          style: "normal",
        },
      ],
      headers: {
        "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
      },
    },
  );
}
