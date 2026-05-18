"use client";

import Noise from "@/components/Noise";

const sections = [
  {
    tag: "DEF",
    title: "Savant /ˈsavənt/",
    blocks: [
      <>
        <span style={{ color: "var(--fg-faint)", fontStyle: "italic" }}>
          (noun)
        </span>{" "}
        A person who has an exceptional aptitude in one particular field, such
        as music or mathematics, despite having significant impairment in other
        areas of intellectual or social functioning.
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
          className="about-link"
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
          className="about-link"
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
          className="about-link"
        >
          Nights &amp; Weekends
        </a>{" "}
        program. That&apos;s where the idea for Savant first took shape. The
        journey was genuinely inspiring, and I&apos;m deeply grateful to Farza
        and the community for the energy they sparked. It was the first time I
        felt truly excited about building something over the summer.
      </>,
      <>
        Then on August 23rd, 2024,{" "}
        <a
          href="https://buildspace.so/letter"
          target="_blank"
          rel="noopener noreferrer"
          className="about-link"
        >
          Buildspace closed for good
        </a>
        . It hit hard — really hard. It left a void ... but also a burning idea.
        This spark only existed because of Buildspace. I still listen to
        &ldquo;All the Way&rdquo; by Buildspace — it&apos;s one of my favorite
        songs. That energy never left.
      </>,
      "After Buildspace ended, I didn't work much. I took a break. Then on October 8th, 2024, I started building a new website. It was the first version of Savant. I worked on components, interfaces and features for over a month. On November 4th, 2024, all the key pieces were in place and the MVP was ready. That's when the idea truly began to take shape. That was the true beginning.",
    ],
  },
  {
    tag: "03",
    title: "The Journey So Far",
    timeline: [
      {
        date: "Nov 4, 2024",
        note: "MVP of Savant was ready 🚀",
      },
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
        note: "Introduced series support with custom ordering, removed tags, completely revamped the UI with new schema, colors, subtle animations, and gradients ✨",
      },
      {
        date: "Coming Soon",
        note: "Full multi-author publishing, more helpful blogs, new voices (👀), and a bunch of cool stuff I probably haven't even thought of yet",
        upcoming: true,
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-link {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.15s ease;
        }
        .about-link:hover {
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
              About
            </h1>
            <div
              className="mx-auto mt-5 mb-6 h-0.5 w-10 opacity-60"
              style={{ background: "var(--accent)" }}
            />
            <p
              className="mx-auto max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--fg-muted)" }}
            >
              Hear the story behind Savant.
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
              {sections.map(({ tag, title, blocks, timeline }) => (
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

                      {timeline && (
                        <div className="flex flex-col">
                          {timeline.map(({ date, note, upcoming }, i) => (
                            <div
                              key={i}
                              className="flex gap-4 py-3"
                              style={{
                                borderTop:
                                  i !== 0 ? "1px solid var(--border)" : "none",
                              }}
                            >
                              <span
                                className="shrink-0 text-xs font-semibold tabular-nums pt-0.5"
                                style={{
                                  color: upcoming
                                    ? "var(--accent)"
                                    : "var(--fg-faint)",
                                  minWidth: "7rem",
                                }}
                              >
                                {date}
                              </span>
                              <p
                                className="text-sm leading-relaxed"
                                style={{
                                  color: upcoming
                                    ? "var(--fg-primary)"
                                    : "var(--fg-muted)",
                                }}
                              >
                                {note}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
