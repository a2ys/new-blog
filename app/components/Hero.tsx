"use client";

import Noise from "@/components/Noise";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
      style={{ background: "var(--bg-base)" }}
    >
      <Noise patternRefreshInterval={2} patternAlpha={15} />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h1
          className="text-4xl font-black leading-none tracking-tight sm:text-5xl lg:text-7xl"
          style={{ color: "var(--fg-primary)" }}
        >
          Welcome to <span style={{ color: "var(--accent)" }}>Savant</span>
        </h1>
        <div
          className="mx-auto mt-4 mb-5 h-0.5 w-10 opacity-60 sm:mt-5 sm:mb-6"
          style={{ background: "var(--accent)" }}
        />
        <p
          className="mx-auto max-w-xs text-sm leading-relaxed sm:max-w-xl sm:text-base lg:text-lg"
          style={{ color: "var(--fg-muted)" }}
        >
          A community blog where everyone has a chance to share their knowledge.
          More than just a blog, it is a platform for collaboration, learning,
          and the exchange of ideas.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <button
            className="w-full px-7 py-3 text-sm font-medium tracking-wide sm:w-auto"
            style={{ background: "var(--accent)", color: "var(--bg-base)" }}
          >
            Start Reading
          </button>
          <button
            className="w-full px-7 py-3 text-sm font-medium sm:w-auto"
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
