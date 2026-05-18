"use client";

import Link from "next/link";
import Noise from "@/components/Noise";

export default function NotFound() {
  return (
    <>
      <style>{`
        .back-link {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.15s ease;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .back-link:hover {
          border-color: var(--accent);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float {
          animation: float 3.5s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor {
          animation: blink 1s step-end infinite;
          display: inline-block;
          margin-left: 2px;
        }
      `}</style>

      <main
        className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{ background: "var(--bg-base)" }}
      >
        <Noise
          patternScaleX={2}
          patternScaleY={2}
          patternRefreshInterval={2}
          patternAlpha={15}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative select-none">
            <span
              className="text-[10rem] font-black leading-none tracking-tighter sm:text-[14rem]"
              style={{ color: "var(--fg-faint)", opacity: 0.25 }}
            >
              404
            </span>
            <span
              className="float absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-6xl"
              aria-hidden="true"
            >
              🎼
            </span>
          </div>

          <h1
            className="mt-2 text-2xl font-black tracking-tight sm:text-3xl"
            style={{ color: "var(--fg-primary)" }}
          >
            Looks like you hit a wrong note
            <span className="cursor" style={{ color: "var(--accent)" }}>
              |
            </span>
          </h1>

          <div
            className="mx-auto mt-4 mb-6 h-0.5 w-10 opacity-60"
            style={{ background: "var(--accent)" }}
          />

          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            This page can&apos;t be found. Maybe it was deleted, moved, or never
            existed in the first place.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/"
              className="px-7 py-3 text-sm font-medium tracking-wide transition-opacity hover:opacity-85"
              style={{ background: "var(--accent)", color: "var(--bg-base)" }}
            >
              Back to home
            </Link>
            <Link
              href="/posts"
              className="px-7 py-3 text-sm font-medium"
              style={{
                color: "var(--fg-muted)",
                border: "1px solid var(--border)",
              }}
            >
              Browse posts
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
