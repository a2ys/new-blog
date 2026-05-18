"use client";

import Noise from "@/components/Noise";

const sections = [
  {
    tag: "TL;DR",
    title: null,
    body: "I don't collect any personal data unless you explicitly give it to me. No hidden trackers, no creepy stuff. I'm just here to share knowledge.",
  },
  {
    tag: "01",
    title: "What I Collect",
    body: null,
    blocks: [
      "By default, I don't ask for your name, email, or any identifying info. But if you choose to contribute or interact via GitHub, your public GitHub username will naturally be part of that interaction.",
      <>
        I use{" "}
        <a
          href="https://posthog.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="privacy-link"
        >
          PostHog
        </a>{" "}
        to collect basic analytics — like which pages people visit or what they
        click. This helps me make Savant better, but it&apos;s all anonymized.
        Your identity stays yours.
      </>,
    ],
  },
  {
    tag: "02",
    title: "No Ads, No Trackers",
    body: "There are no third-party ads, no Google Analytics, no fingerprinting, no cookies following you around the internet.",
  },
  {
    tag: "03",
    title: "Open Source & Transparent",
    body: null,
    blocks: [
      <>
        Everything — from this site&apos;s code to the content — is open source
        and on{" "}
        <a
          href="https://github.com/a2ys/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="privacy-link"
        >
          GitHub
        </a>
        . If you&apos;re ever unsure about something, you can audit the source
        for yourself.
      </>,
    ],
  },
  {
    tag: "04",
    title: "Your Rights",
    body: "Because I don't collect personal data, there's nothing to delete or opt-out from. But if you really don't want even anonymous analytics to load, feel free to use a tracker blocker (like uBlock Origin or Privacy Badger) — no issues with that!",
  },
  {
    tag: "05",
    title: "Questions?",
    body: null,
    blocks: [
      <>
        I&apos;m just a DM or issue away. Hit me up at{" "}
        <a
          href="https://github.com/a2ys"
          target="_blank"
          rel="noopener noreferrer"
          className="privacy-link"
        >
          GitHub
        </a>{" "}
        if you&apos;ve got any questions or concerns.
      </>,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        .privacy-link {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.15s ease;
        }
        .privacy-link:hover {
          border-color: var(--accent);
        }
        .section-card {
          transition: background 0.15s ease;
        }
        .section-card:hover {
          background: var(--bg-surface) !important;
        }
      `}</style>

      <main className="relative min-h-screen">
        <section
          className="relative overflow-hidden px-6 py-20 sm:py-28 lg:px-8"
          style={{ background: "var(--bg-base)" }}
        >
          <Noise patternRefreshInterval={2} patternAlpha={15} />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h1
              className="text-5xl font-black leading-none tracking-tight sm:text-7xl"
              style={{ color: "var(--fg-primary)" }}
            >
              Privacy Policy
            </h1>
            <div
              className="mx-auto mt-5 mb-6 h-0.5 w-10 opacity-60"
              style={{ background: "var(--accent)" }}
            />
            <p
              className="mx-auto max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--fg-muted)" }}
            >
              How I handle your data, in plain language.
            </p>
          </div>
        </section>

        <section
          className="px-6 py-16 lg:px-8"
          style={{ background: "var(--bg-surface)" }}
        >
          <div className="mx-auto max-w-2xl">
            <div
              className="flex flex-col"
              style={{ border: "1px solid var(--border)" }}
            >
              {sections.map(({ tag, title, body, blocks }) => (
                <div
                  key={tag}
                  className="section-card px-6 py-7"
                  style={{
                    background: "transparent",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="mt-0.5 shrink-0 text-xs font-bold uppercase tracking-widest"
                      style={{ color: "var(--accent)", minWidth: "2.5rem" }}
                    >
                      {tag}
                    </span>

                    <div className="flex-1">
                      {title && (
                        <h2
                          className="mb-3 text-base font-bold tracking-tight"
                          style={{ color: "var(--fg-primary)" }}
                        >
                          {title}
                        </h2>
                      )}

                      {body && (
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          {body}
                        </p>
                      )}

                      {blocks && (
                        <div className="flex flex-col gap-3">
                          {blocks.map((block, i) => (
                            <p
                              key={i}
                              className="text-sm leading-relaxed"
                              style={{ color: "var(--fg-muted)" }}
                            >
                              {block}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="mt-8 text-xs leading-relaxed"
              style={{ color: "var(--fg-faint)" }}
            >
              Last updated: May 2026. This policy is part of the open-source
              Savant project and may be revised as the platform evolves.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
