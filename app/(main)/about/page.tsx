const sections = [
  {
    tag: "DEF",
    title: "Savant /ˈsavənt/",
    blocks: [
      <>
        <span className="italic text-gray-400">(noun)</span> A person who has an
        exceptional aptitude in one particular field, such as music or
        mathematics, despite having significant impairment in other areas of
        intellectual or social functioning.
      </>,
    ],
  },
  {
    tag: "01",
    title: "Why Savant?",
    blocks: [
      <>
        Savant is a community blog, where everyone has a chance to share their
        knowledge. It was born in early November 2024 as a modern successor to
        my old{" "}
        <a
          href="https://legacy.blog.a2ys.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-2 border-black hover:text-gray-500 transition-colors"
          style={{ textDecoration: "none" }}
        >
          blog
        </a>
        .
      </>,
      <>
        Unlike before, Savant focuses on collaboration. Anyone can contribute
        articles, suggest edits, or submit entirely new ideas. Every piece of
        content is hosted publicly on{" "}
        <a
          href="https://github.com/a2ys/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-2 border-black hover:text-gray-500 transition-colors"
          style={{ textDecoration: "none" }}
        >
          GitHub
        </a>{" "}
        so it&apos;s transparent, editable, and open-source.
      </>,
      "Whether you're a student, developer, or hobbyist — if you've got something worth sharing, Savant gives you a stage.",
    ],
  },
  {
    tag: "02",
    title: "The Backstory",
    blocks: [
      <>
        It all started with Buildspace on July 6th, 2024 — with the 5th season
        of their{" "}
        <a
          href="https://x.com/unreal_sapien/status/1809572446896550320"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-2 border-black hover:text-gray-500 transition-colors"
          style={{ textDecoration: "none" }}
        >
          Nights &amp; Weekends
        </a>{" "}
        program. That&apos;s where the idea for Savant first took shape. The
        journey was genuinely inspiring, and I&apos;m deeply grateful to Farza
        and the community for the energy they sparked.
      </>,
      <>
        Then on August 23rd, 2024,{" "}
        <a
          href="https://buildspace.so/letter"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-2 border-black hover:text-gray-500 transition-colors"
          style={{ textDecoration: "none" }}
        >
          Buildspace closed for good
        </a>
        . It hit hard — really hard. It left a void ... but also a burning idea.
        This spark only existed because of Buildspace. I still listen to
        &ldquo;All the Way&rdquo; by Buildspace — it&apos;s one of my favorite
        songs. That energy never left.
      </>,
      "After Buildspace ended, I didn't work much. I took a break. Then on October 8th, 2024, I started building a new website. It was the first version of Savant. On November 4th, 2024, all the key pieces were in place and the MVP was ready. That was the true beginning.",
    ],
  },
];

const timeline = [
  { date: "Nov 4, 2024", note: "MVP of Savant was ready" },
  {
    date: "Dec 6, 2024",
    note: "Tweaked fonts, added math support, post sorting by date, revamped code color scheme, added tag components, and reorganized all paths",
  },
  {
    date: "Dec 8, 2024",
    note: "Integrated PostHog for analytics and created the Author component",
  },
  {
    date: "Feb 26, 2025",
    note: "Added draft post support and kicked off multi-author infrastructure",
  },
  {
    date: "May 22–25, 2025",
    note: "Introduced series support with custom ordering, removed tags, completely revamped the UI with new schema, colors, subtle animations, and gradients",
  },
  {
    date: "May 16-Jun 8, 2026",
    note: "Rewrite the entire blog in Next.js, Implement Authentication, Allow writing of blogs by everyone, A rich text editor inside the blog itself, an entirely new design language",
  },
  {
    date: "Coming Soon",
    note: "Full multi-author publishing, more helpful blogs, new voices (👀), and a bunch of cool stuff I probably haven't even thought of yet",
    upcoming: true,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section
        className="px-6 lg:px-12 pt-14 pb-12 lg:pt-20 lg:pb-16 border-b-2 border-black"
        style={{
          backgroundColor: "#ede9f5",
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 11px 11px",
        }}
      >
        <h1 className="mt-3 relative inline-block pb-4 text-[52px] font-black tracking-tight sm:text-6xl lg:text-[80px] text-black">
          About
          <svg
            viewBox="0 0 360 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 bottom-0 w-full overflow-visible"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M4 10 C20 16 50 5 85 14 C115 19 140 6 170 12 C195 17 215 7 240 13 C262 18 278 8 300 11"
              stroke="#4a1a6b"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 15 C28 12 55 17 88 13 C118 10 144 15 173 12 C198 10 220 14 248 11 C268 9 285 13 302 11"
              stroke="#4a1a6b"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
        </h1>
        <p className="mt-5 max-w-lg text-[17px] font-medium leading-relaxed text-gray-700">
          Hear the story behind Savant.
        </p>
      </section>

      {/* Content sections */}
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
            <h2 className="text-xl font-bold tracking-tight mb-4">{title}</h2>
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

      {/* Timeline */}
      <div className="flex flex-col sm:flex-row border-b-2 border-black">
        <div className="px-6 lg:px-12 py-8 sm:py-10 sm:w-32 lg:w-48 shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            03
          </span>
        </div>
        <div className="flex-1">
          <div className="px-6 lg:px-12 py-8 sm:py-10 border-b-2 border-black">
            <h2 className="text-xl font-bold tracking-tight">
              The Journey So Far
            </h2>
          </div>
          {timeline.map(({ date, note, upcoming }, i) => (
            <div
              key={i}
              className={[
                "flex flex-col sm:flex-row gap-2 sm:gap-8 px-6 lg:px-12 py-6",
                i !== timeline.length - 1 ? "border-b-2 border-black" : "",
                upcoming ? "bg-black text-white" : "",
              ].join(" ")}
            >
              <span
                className={[
                  "text-xs font-black uppercase tracking-[0.15em] shrink-0 sm:w-32 sm:pt-0.5",
                  upcoming ? "text-white" : "text-gray-400",
                ].join(" ")}
              >
                {date}
              </span>
              <p
                className={[
                  "text-base leading-relaxed",
                  upcoming ? "text-white" : "text-gray-700",
                ].join(" ")}
              >
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
