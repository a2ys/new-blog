import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-full flex flex-col">
      <section
        className="flex-1 flex flex-col justify-center px-6 lg:px-12 py-20"
        style={{
          backgroundColor: "#f5c8c8",
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 11px 11px",
        }}
      >
        <h1 className="relative inline-block self-start pb-5 text-[100px] font-black tracking-tight sm:text-[140px] lg:text-[180px] text-black leading-none">
          404
          <svg
            viewBox="0 0 360 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 bottom-0 w-full overflow-visible"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M4 7 C15 18 35 2 58 14 C75 22 90 3 115 11 C138 18 148 4 172 9 C194 14 202 2 228 11 C250 18 262 4 288 8 C306 11 318 3 342 13 C350 16 355 9 360 11"
              stroke="#8b1a1a"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 14 C18 11 38 17 62 13 C80 10 94 15 118 12 C140 10 152 14 176 12 C198 10 206 13 232 11 C254 9 266 13 292 10 C310 9 322 12 344 10"
              stroke="#8b1a1a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
        </h1>

        <div className="mt-10 max-w-lg">
          <h2 className="text-2xl font-black tracking-tight text-black sm:text-3xl">
            Page not found
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            This page was deleted, moved, or never existed in the first place.
            Either way, it&apos;s not here.
          </p>
          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Link
              href="/"
              className={[
                "rounded-full px-6 py-2.5 text-sm font-bold no-underline",
                "border-2 border-black bg-black text-white",
                "hover:bg-transparent hover:text-black",
                "transition-all duration-200",
              ].join(" ")}
            >
              Back to Home
            </Link>
            <Link
              href="/posts"
              className={[
                "rounded-full px-6 py-2.5 text-sm font-bold no-underline",
                "border-2 border-black text-black",
                "hover:bg-black hover:text-white",
                "transition-all duration-200",
              ].join(" ")}
            >
              Browse Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
