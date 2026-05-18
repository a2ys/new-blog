"use client";

import Link from "next/link";

const links = [
  { label: "Posts", href: "/posts" },
  { label: "Authors", href: "/authors" },
  { label: "Privacy", href: "/privacy" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  return (
    <nav
      className="flex h-14 items-center justify-between px-6 lg:px-10"
      style={{
        background: "var(--bg-base)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center text-[15px] font-bold">
        <a
          href="https://a2ys.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors"
          style={{ color: "var(--fg-primary)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--fg-primary)")
          }
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
          className="transition-colors"
          style={{ color: "var(--fg-primary)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--fg-primary)")
          }
        >
          Savant
        </Link>
      </div>

      <div className="flex items-center gap-0.5">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="px-3.5 py-1.5 text-sm font-medium tracking-wide transition-colors"
            style={{ color: "var(--fg-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--fg-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--fg-muted)")
            }
          >
            {label}
          </Link>
        ))}

        <button
          className="ml-4 px-4 py-1.5 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
          style={{
            background: "var(--accent)",
            color: "var(--bg-base)",
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
}
