"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Posts", href: "/posts" },
  { label: "Authors", href: "/authors" },
  { label: "Privacy", href: "/privacy" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="relative"
      style={{
        background: "var(--bg-base)",
        borderBottom: open ? "none" : "1px solid var(--border)",
      }}
    >
      <div className="flex h-14 items-center justify-between px-6 lg:px-10">
        <div className="flex items-center text-[15px] font-bold">
          <a
            href="https://a2ys.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "var(--fg-primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--fg-primary)")
            }
          >
            Savant
          </Link>
        </div>

        <div className="hidden items-center gap-0.5 sm:flex">
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
            style={{ background: "var(--accent)", color: "var(--bg-base)" }}
          >
            Login
          </button>
        </div>

        <button
          className="relative flex sm:hidden items-center justify-center w-8 h-8"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="absolute block w-5 h-0.5 transition-all duration-200 ease-in-out"
            style={{
              background: "var(--fg-primary)",
              transform: open ? "rotate(45deg)" : "translateY(-6px)",
            }}
          />

          <span
            className="absolute block w-5 h-0.5 transition-all duration-200 ease-in-out"
            style={{
              background: "var(--fg-primary)",
              opacity: open ? 0 : 1,
            }}
          />

          <span
            className="absolute block w-5 h-0.5 transition-all duration-200 ease-in-out"
            style={{
              background: "var(--fg-primary)",
              transform: open ? "rotate(-45deg)" : "translateY(6px)",
            }}
          />
        </button>
      </div>

      {open && (
        <div
          className="flex sm:hidden flex-col px-6 pb-4 gap-1"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-medium tracking-wide transition-colors"
              style={{
                color: "var(--fg-muted)",
                borderBottom: "1px solid var(--border)",
              }}
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
            className="mt-2 w-full py-2 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
            style={{ background: "var(--accent)", color: "var(--bg-base)" }}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
