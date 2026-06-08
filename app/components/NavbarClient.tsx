"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "../../lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

const links = [
  { label: "Posts", href: "/posts" },
  { label: "Authors", href: "/authors" },
  { label: "About", href: "/about" },
];

interface NavbarClientProps {
  initialUser: User | null;
}

export function NavbarClient({ initialUser }: NavbarClientProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b-2 border-black">
      <nav className="relative flex h-20 items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Link
            href="/"
            className="text-black hover:text-gray-500 transition-colors no-underline"
          >
            Savant
          </Link>
        </div>

        <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={[
                "relative text-lg font-medium text-black no-underline pb-0.5",
                "after:absolute after:bottom-0 after:left-0",
                "after:h-[3px] after:w-0 after:bg-black",
                "after:transition-[width] after:duration-300 after:ease-in-out",
                "hover:after:w-full",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className={[
                  "rounded-full px-5 py-2 text-base font-semibold",
                  "border-2 border-black text-black",
                  "hover:bg-black hover:text-white",
                  "transition-all duration-200",
                ].join(" ")}
              >
                Log Out
              </button>
              <Link
                href="/dashboard"
                className={[
                  "rounded-full px-5 py-2 text-base font-semibold no-underline inline-block",
                  "border-2 border-black bg-black text-white",
                  "hover:bg-transparent hover:text-black",
                  "transition-all duration-200",
                ].join(" ")}
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={[
                  "rounded-full px-5 py-2 text-base font-semibold no-underline inline-block",
                  "border-2 border-black text-black",
                  "hover:bg-black hover:text-white",
                  "transition-all duration-200",
                ].join(" ")}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className={[
                  "rounded-full px-5 py-2 text-base font-semibold no-underline inline-block",
                  "border-2 border-black bg-black text-white",
                  "hover:bg-transparent hover:text-black",
                  "transition-all duration-200",
                ].join(" ")}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="sm:hidden relative flex items-center justify-center w-8 h-8"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="absolute w-5 bg-black transition-all duration-200"
            style={{
              height: "1.5px",
              transform: open ? "rotate(45deg)" : "translateY(-5px)",
            }}
          />
          <span
            className="absolute w-5 bg-black transition-all duration-200"
            style={{ height: "1.5px", opacity: open ? 0 : 1 }}
          />
          <span
            className="absolute w-5 bg-black transition-all duration-200"
            style={{
              height: "1.5px",
              transform: open ? "rotate(-45deg)" : "translateY(5px)",
            }}
          />
        </button>
      </nav>

      {open && (
        <div className="sm:hidden px-6 pt-4 pb-8">
          <div className="flex flex-col">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={[
                  "relative text-xl font-medium text-black no-underline",
                  "py-3 w-fit",
                  "after:absolute after:bottom-2 after:left-0",
                  "after:h-[2.5px] after:w-0 after:bg-black",
                  "after:transition-[width] after:duration-300 after:ease-in-out",
                  "hover:after:w-full",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-5 mb-5 border-t-2 border-black" />

          {user ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard"
                className={[
                  "rounded-full px-5 py-2.5 text-base font-semibold text-center no-underline",
                  "border-2 border-black bg-black text-white",
                  "hover:bg-transparent hover:text-black",
                  "transition-all duration-200",
                ].join(" ")}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className={[
                  "rounded-full px-5 py-2.5 text-base font-semibold text-center",
                  "border-2 border-black text-black",
                  "hover:bg-black hover:text-white",
                  "transition-all duration-200",
                ].join(" ")}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={[
                  "rounded-full px-5 py-2.5 text-base font-semibold text-center no-underline",
                  "border-2 border-black text-black",
                  "hover:bg-black hover:text-white",
                  "transition-all duration-200",
                ].join(" ")}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className={[
                  "rounded-full px-5 py-2.5 text-base font-semibold text-center no-underline",
                  "border-2 border-black bg-black text-white",
                  "hover:bg-transparent hover:text-black",
                  "transition-all duration-200",
                ].join(" ")}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
