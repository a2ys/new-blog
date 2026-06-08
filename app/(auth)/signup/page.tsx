"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";
import { createProfile, deleteUser } from "../../../lib/actions/auth";

function ConfirmationPending({ email }: { email: string }) {
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
          <h1 className="text-[64px] font-black tracking-tight text-black leading-none">
            Check your inbox
          </h1>
          <p className="mt-6 text-base font-medium text-gray-600 max-w-xs leading-relaxed">
            One last step before you join.
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

          <div className="w-16 h-16 border-2 border-black flex items-center justify-center mb-8">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-black mb-3">
            Confirm your email
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            We sent a confirmation link to{" "}
            <span className="font-semibold text-black">{email}</span>. Click it
            to activate your account and get to your dashboard.
          </p>

          <div className="border-2 border-black/10 rounded-none p-4 bg-gray-50">
            <p className="text-xs text-gray-500 leading-relaxed">
              Can&apos;t find it? Check your spam folder. The link expires in 24
              hours.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/login"
              className={[
                "w-full py-2.5 text-sm font-bold text-center no-underline border-2 border-black bg-black text-white",
                "hover:bg-transparent hover:text-black",
                "transition-all duration-150",
              ].join(" ")}
            >
              Go to Sign In
            </Link>
            <Link
              href="/"
              className="text-xs text-center text-gray-400 hover:text-black transition-colors no-underline"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !password.trim() || !username.trim()) {
      setError("Email, password and username are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      const m = signUpError.message.toLowerCase();
      if (
        m.includes("user already registered") ||
        m.includes("already been registered")
      )
        setError("An account with this email already exists.");
      else if (
        m.includes("password should be at least") ||
        m.includes("password is too short")
      )
        setError("Password must be at least 6 characters.");
      else if (m.includes("invalid email") || m.includes("unable to validate"))
        setError("Please enter a valid email address.");
      else if (m.includes("email rate limit") || m.includes("too many"))
        setError("Too many attempts. Please wait a moment and try again.");
      else setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (!authData.user || !authData.user.identities?.length) {
      setError("An account with this email already exists.");
      setLoading(false);
      return;
    }

    const result = await createProfile({
      userId: authData.user.id,
      username,
      displayName,
    });

    if (result.error) {
      await deleteUser(authData.user.id);
      setError(result.error);
      setLoading(false);
      return;
    }

    if (!authData.session) {
      setConfirmed(true);
      return;
    }

    router.push("/dashboard");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  if (confirmed) {
    return <ConfirmationPending email={email} />;
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
            Sign Up
            <svg
              viewBox="0 0 360 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 bottom-0 w-full overflow-visible"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 9 C22 17 48 3 78 13 C104 20 124 5 152 12 C176 18 196 6 220 11 C240 16 258 7 278 10"
                stroke="#7a2e0e"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 15 C24 12 50 17 80 14 C106 11 126 16 154 13 C178 10 198 15 222 12 C242 10 260 13 280 11"
                stroke="#7a2e0e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              />
            </svg>
          </h1>
          <p className="mt-6 text-base font-medium text-gray-600 max-w-xs leading-relaxed">
            Join a community built around sharing knowledge and ideas.
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
            Create an account
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-black font-semibold no-underline border-b-2 border-black hover:text-gray-500 transition-colors"
            >
              Sign In
            </Link>
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                Email <span className="text-black">★</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="hello@example.com"
                autoComplete="email"
                className="w-full px-4 py-2.5 text-sm border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 bg-white placeholder:text-gray-300 transition-shadow"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                Password <span className="text-black">★</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                className="w-full px-4 py-2.5 text-sm border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 bg-white placeholder:text-gray-300 transition-shadow"
              />
            </div>

            <div className="border-t-2 border-black/10" />

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                Username <span className="text-black">★</span>
              </label>
              <div className="flex">
                <span className="flex items-center px-3 text-xs text-gray-400 bg-gray-50 border-2 border-r-0 border-black">
                  @
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="yourhandle"
                  autoComplete="username"
                  className="flex-1 px-4 py-2.5 text-sm border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 bg-white placeholder:text-gray-300 transition-shadow"
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-400">
                Your public handle — lowercase, no spaces.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                Display Name{" "}
                <span className="normal-case font-medium text-gray-300">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 text-sm border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 bg-white placeholder:text-gray-300 transition-shadow"
              />
              <p className="mt-1.5 text-xs text-gray-400">
                Shown on your profile and articles. Defaults to your username.
              </p>
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
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              disabled
              className="w-full py-2.5 text-sm font-semibold border-2 border-gray-200 text-gray-300 cursor-not-allowed flex items-center justify-center gap-2.5"
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
              Sign up with GitHub
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
