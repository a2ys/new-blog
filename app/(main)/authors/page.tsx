import { Suspense } from "react";
import { AuthorsGrid } from "@/components/AuthorsGrid";
import { getAllAuthors } from "../../../lib/queries/authors";

async function AuthorsSection() {
  const authors = await getAllAuthors();

  if (authors.length === 0) {
    return <p className="text-base text-gray-500 p-6">No authors yet.</p>;
  }

  return <AuthorsGrid authors={authors} />;
}

export default async function AuthorsPage() {
  return (
    <main className="min-h-screen">
      <section
        className="px-6 lg:px-12 pt-14 pb-12 lg:pt-20 lg:pb-16 border-b-2 border-black"
        style={{
          backgroundColor: "#fef3c7",
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 11px 11px",
        }}
      >
        <h1 className="mt-3 relative inline-block pb-4 text-[52px] font-black tracking-tight sm:text-6xl lg:text-[80px] text-black">
          Authors
          <svg
            viewBox="0 0 360 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 bottom-0 w-full overflow-visible"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M4 9 C35 17 70 3 108 13 C138 20 162 5 195 14 C222 20 248 6 280 12 C300 16 318 8 340 11"
              stroke="#78450a"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 15 C36 12 72 17 110 14 C140 11 165 16 198 13 C225 10 250 15 282 12 C302 10 320 13 342 11"
              stroke="#78450a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
        </h1>
        <p className="mt-5 max-w-lg text-[17px] font-medium leading-relaxed text-gray-700">
          Meet the people behind the content on Savant.
        </p>
      </section>

      <div className="flex flex-col sm:flex-row border-b-2 border-black">
        <div className="px-6 lg:px-12 py-8 sm:py-10 sm:w-32 lg:w-48 shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            About
          </span>
        </div>
        <div className="px-6 lg:px-12 py-8 sm:py-10 flex-1">
          <h2 className="text-xl font-bold tracking-tight mb-4">
            Our Contributors
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-gray-700">
              Savant is built by people who love to share what they know. Our
              authors come from different backgrounds — some are experts, others
              are still learning — but they all have something valuable to
              teach.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              Each person brings their own experiences and knowledge to help
              others learn something new.
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-between px-6 lg:px-12 py-8 border-b-2 border-black"
        style={{ backgroundColor: "#e8e4dc" }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-1.5">
            The Team
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            Meet our Authors
          </h2>
        </div>
      </div>

      <Suspense
        fallback={
          <p className="text-base text-gray-500 p-6">Loading authors…</p>
        }
      >
        <AuthorsSection />
      </Suspense>

      <div className="flex flex-col sm:flex-row border-t-2 border-black">
        <div className="px-6 lg:px-12 py-8 sm:py-10 sm:w-32 lg:w-48 shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            Join
          </span>
        </div>
        <div className="px-6 lg:px-12 py-8 sm:py-10 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold tracking-tight">
              Want to Contribute?
            </h2>
            <p className="text-base leading-relaxed text-gray-700 max-w-lg">
              Savant is always looking for new voices and perspectives. If you
              have knowledge to share and stories to tell, I&apos;d love to have
              you on board.
            </p>
          </div>
          <a
            href="https://github.com/a2ys/blog"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "rounded-full px-6 py-2.5 text-base font-bold no-underline shrink-0 text-center",
              "border-2 border-black bg-black text-white",
              "hover:bg-transparent hover:text-black",
              "transition-all duration-200",
            ].join(" ")}
          >
            Get Started on GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
