"use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between px-12 pt-14 pb-12 border-r-2 border-black"
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
        <Link href="/" className="text-xl font-black text-black no-underline">
          Savant
        </Link>

        <div>
          <h1 className="relative inline-block self-start pb-4 text-[64px] font-black tracking-tight text-black leading-none">
            Sign In
            <svg
              viewBox="0 0 360 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 bottom-0 w-full overflow-visible"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 11 C28 4 58 17 95 8 C126 1 152 16 182 7 C208 0 232 15 258 8 C278 3 295 14 312 9"
                stroke="#7a2e0e"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 16 C30 13 60 18 96 14 C128 11 154 17 184 13 C210 10 234 16 260 12 C280 9 297 13 314 11"
                stroke="#7a2e0e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              />
            </svg>
          </h1>
          <p className="mt-6 text-base font-medium text-gray-600 max-w-xs leading-relaxed">
            Welcome back. The community has been waiting for you.
          </p>
        </div>

        <p className="text-xs text-gray-400">© 2026 Savant</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-16 py-16">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="lg:hidden text-xl font-black text-black no-underline block mb-10"
          >
            Savant
          </Link>

          <h2 className="text-2xl font-black tracking-tight text-black mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-black font-semibold no-underline border-b-2 border-black hover:text-gray-500 transition-colors"
            >
              Sign Up
            </Link>
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-2.5 text-sm border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 bg-white placeholder:text-gray-300 transition-shadow"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-2.5 text-sm border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 bg-white placeholder:text-gray-300 transition-shadow"
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-600">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={[
                "w-full py-2.5 text-sm font-bold border-2 border-black bg-black text-white",
                "hover:bg-transparent hover:text-black",
                "active:scale-[0.97] active:opacity-90",
                "transition-all duration-150",
                loading ? "opacity-50 cursor-not-allowed" : "",
              ].join(" ")}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              disabled
              className="w-full py-2.5 text-sm font-semibold border-2 border-gray-200 text-gray-300 cursor-not-allowed flex items-center justify-center gap-2.5 transition-all duration-150"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Sign in with GitHub
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 border border-gray-200 px-1.5 py-0.5 leading-none">
                Soon
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
