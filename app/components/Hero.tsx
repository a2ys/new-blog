"use client";

import Noise from "@/components/Noise";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8"
      style={{ background: "var(--bg-base)" }}
    >
      <Noise patternRefreshInterval={2} patternAlpha={15} />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h1
          className="text-5xl font-black leading-none tracking-tight sm:text-7xl"
          style={{ color: "var(--fg-primary)" }}
        >
          Welcome to <span style={{ color: "var(--accent)" }}>Savant</span>
        </h1>

        <div
          className="mx-auto mt-5 mb-6 h-0.5 w-10 opacity-60"
          style={{ background: "var(--accent)" }}
        />

        <p
          className="mx-auto max-w-xl text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--fg-muted)" }}
        >
          A community blog where everyone has a chance to share their knowledge.
          More than just a blog, it is a platform for collaboration, learning,
          and the exchange of ideas.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            className="px-7 py-3 text-sm font-medium tracking-wide"
            style={{ background: "var(--accent)", color: "var(--bg-base)" }}
          >
            Start Reading
          </button>
          <button
            className="px-7 py-3 text-sm font-medium"
            style={{
              color: "var(--fg-muted)",
              border: "1px solid var(--border)",
            }}
          >
            Write a Post
          </button>
        </div>
      </div>
    </section>
  );
}
