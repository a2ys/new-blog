import Link from "next/link";

const links = [
  { label: "Posts", href: "/posts" },
  { label: "Authors", href: "/authors" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="bg-black border-t-2 border-white/10">
      <div className="flex flex-col sm:flex-row border-b-2 border-white/10">
        <div className="px-6 lg:px-12 py-10 flex-1">
          <Link
            href="/"
            className="text-2xl font-black text-white no-underline hover:text-gray-300 transition-colors"
          >
            Savant
          </Link>
          <p className="mt-2 text-sm text-gray-400 max-w-xs leading-relaxed">
            A community blog where everyone gets a stage.
          </p>
        </div>

        <div className="px-6 lg:px-12 py-10 flex flex-col justify-between gap-8 sm:items-end sm:border-l-2 border-white/10">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={[
                  "relative text-sm font-medium text-gray-400 no-underline pb-0.5",
                  "after:absolute after:bottom-0 after:left-0",
                  "after:h-[2px] after:w-0 after:bg-white",
                  "after:transition-[width] after:duration-300 after:ease-in-out",
                  "hover:text-white hover:after:w-full",
                  "transition-colors",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </nav>

          <a
            href="https://github.com/a2ys/blog"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "rounded-full px-5 py-2 text-sm font-semibold no-underline inline-flex items-center gap-2",
              "border-2 border-white text-white",
              "hover:bg-white hover:text-black",
              "transition-all duration-200",
            ].join(" ")}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Source Code
          </a>
        </div>
      </div>

      <div className="px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="text-xs text-gray-500">
          © 2026{" "}
          <a
            href="https://a2ys.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors no-underline"
          >
            a2ys
          </a>
          . Built with Next.js.
        </p>
        <p className="text-xs text-gray-600">
          Made with care, late nights, and too much coffee.
        </p>
      </div>
    </footer>
  );
}
