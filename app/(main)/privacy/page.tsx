const sections = [
  {
    tag: "TL;DR",
    title: null,
    blocks: [
      "I don't collect any personal data unless you explicitly give it to me. No hidden trackers, no creepy stuff. I'm just here to share knowledge.",
    ],
  },
  {
    tag: "01",
    title: "What I Collect",
    blocks: [
      "By default, I don't ask for your name, email, or any identifying info. But if you choose to contribute or interact via GitHub, your public GitHub username will naturally be part of that interaction.",
      <>
        I use{" "}
        <a
          href="https://posthog.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-2 border-black hover:text-gray-500 transition-colors"
          style={{ textDecoration: "none" }}
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
    blocks: [
      "There are no third-party ads, no Google Analytics, no fingerprinting, no cookies following you around the internet.",
    ],
  },
  {
    tag: "03",
    title: "Open Source & Transparent",
    blocks: [
      <>
        Everything — from this site&apos;s code to the content — is open source
        and on{" "}
        <a
          href="https://github.com/a2ys/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-2 border-black hover:text-gray-500 transition-colors"
          style={{ textDecoration: "none" }}
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
    blocks: [
      "Because I don't collect personal data, there's nothing to delete or opt-out from. But if you really don't want even anonymous analytics to load, feel free to use a tracker blocker (like uBlock Origin or Privacy Badger) — no issues with that!",
    ],
  },
  {
    tag: "05",
    title: "Questions?",
    blocks: [
      <>
        I&apos;m just a DM or issue away. Hit me up at{" "}
        <a
          href="https://github.com/a2ys"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-2 border-black hover:text-gray-500 transition-colors"
          style={{ textDecoration: "none" }}
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
    <main className="min-h-screen">
      {/* Hero */}
      <section
        className="px-6 lg:px-12 pt-14 pb-12 lg:pt-20 lg:pb-16 border-b-2 border-black"
        style={{
          backgroundColor: "#fce8dc",
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 11px 11px",
        }}
      >
        <h1 className="mt-3 relative inline-block pb-4 text-[52px] font-black tracking-tight sm:text-6xl lg:text-[80px] text-black">
          Privacy Policy
          <svg
            viewBox="0 0 360 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 bottom-0 w-full overflow-visible"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M4 11 C40 5 80 18 125 8 C162 1 195 16 235 7 C268 0 298 15 340 9 C350 7 356 11 360 9"
              stroke="#7a2e0e"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 16 C38 13 76 18 120 14 C158 11 192 17 232 13 C265 10 296 15 338 12"
              stroke="#7a2e0e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
        </h1>
        <p className="mt-5 max-w-lg text-[17px] font-medium leading-relaxed text-gray-700">
          How I handle your data, in plain language.
        </p>
      </section>

      {/* Sections */}
      {sections.map(({ tag, title, blocks }) => (
        <div
          key={tag}
          className="flex flex-col sm:flex-row border-b-2 border-black"
        >
          <div className="px-6 lg:px-12 py-8 sm:py-10 sm:w-32 lg:w-48 shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              {tag}
            </span>
          </div>
          <div className="px-6 lg:px-12 py-8 sm:py-10 flex-1">
            {title && (
              <h2 className="text-xl font-bold tracking-tight mb-4">{title}</h2>
            )}
            <div className="flex flex-col gap-4">
              {blocks.map((block, i) => (
                <p key={i} className="text-base leading-relaxed text-gray-700">
                  {block}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Footer strip */}
      <div className="px-6 lg:px-12 py-6 bg-black">
        <p className="text-xs text-white leading-relaxed">
          Last updated: May 2026. This policy is part of the open-source Savant
          project and may be revised as the platform evolves.
        </p>
      </div>
    </main>
  );
}
