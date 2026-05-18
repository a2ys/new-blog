"use client";

import Link from "next/link";

const links = [
  { label: "Posts", href: "/posts" },
  { label: "Authors", href: "/authors" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer
      className="px-6 lg:px-10"
      style={{
        background: "var(--bg-base)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <div
            className="flex items-center text-[15px] font-bold"
            style={{ color: "var(--fg-primary)" }}
          >
            <a
              href="https://a2ys.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ color: "var(--fg-primary)" }}
            >
              a2ys
            </a>
            <span
              className="mx-2"
              style={{ color: "var(--fg-faint)", fontWeight: 400 }}
            >
              /
            </span>
            <Link
              href="/"
              className="footer-link"
              style={{ color: "var(--fg-primary)" }}
            >
              Savant
            </Link>
          </div>
          <p
            className="max-w-55 text-xs leading-relaxed"
            style={{ color: "var(--fg-faint)" }}
          >
            A community blog where everyone gets a stage.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-1">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="footer-link text-xs font-medium tracking-wide"
                style={{ color: "var(--fg-muted)" }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <a
            href="https://github.com/a2ys/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs footer-link"
            style={{ color: "var(--fg-faint)" }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Open source on GitHub
          </a>
        </div>
      </div>

      <div
        className="mx-auto max-w-5xl pb-6"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="pt-5 text-xs" style={{ color: "var(--fg-faint)" }}>
          © 2026 a2ys. Built with love, Next.js, and too many late nights.
        </p>
      </div>

      <style>{`
        .footer-link {
          transition: color 0.15s ease;
        }
        .footer-link:hover {
          color: var(--accent) !important;
        }
      `}</style>
    </footer>
  );
}
