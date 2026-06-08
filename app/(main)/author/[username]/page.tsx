import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAuthorByUsername } from "../../../../lib/queries/authors";

const ICONS: Record<string, React.ReactNode> = {
  Email: (
    <svg
      width="18"
      height="18"
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
  ),
  Twitter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  GitHub: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Website: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
};

async function AuthorContent({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const author = await getAuthorByUsername(username);
  if (!author) notFound();

  const links = [
    author.email && { label: "Email", href: `mailto:${author.email}` },
    author.twitter && {
      label: "Twitter",
      href: `https://twitter.com/${author.twitter}`,
    },
    author.github && {
      label: "GitHub",
      href: `https://github.com/${author.github}`,
    },
    author.linkedin && {
      label: "LinkedIn",
      href: `https://linkedin.com/in/${author.linkedin}`,
    },
    author.website && { label: "Website", href: author.website },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <main>
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
        <div className="flex items-start justify-between gap-8 mt-3">
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-3">
              Author
            </p>
            <h1 className="text-[42px] font-black tracking-tight sm:text-5xl lg:text-[72px] text-black leading-none">
              {author.display_name ?? author.username}
            </h1>
            <p className="mt-4 text-base font-medium text-gray-500">
              @{author.username}
            </p>
          </div>
          <div className="shrink-0 mt-2">
            <div className="border-2 border-black overflow-hidden w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44">
              <img
                src={
                  author.avatar_url ?? `https://github.com/${author.github}.png`
                }
                alt={author.display_name ?? author.username}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row border-b-2 border-black">
        <div className="px-6 lg:px-12 py-8 sm:py-10 sm:w-32 lg:w-48 shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            Bio
          </span>
        </div>
        <div className="px-6 lg:px-12 py-8 sm:py-10 flex-1">
          <p className="text-base leading-relaxed text-gray-700">
            {author.bio ?? "This author hasn't written a bio yet."}
          </p>
        </div>
      </div>

      {links.length > 0 && (
        <div className="flex flex-col sm:flex-row border-b-2 border-black">
          <div className="px-6 lg:px-12 py-8 sm:py-10 sm:w-32 lg:w-48 shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              Links
            </span>
          </div>
          <div className="px-6 lg:px-12 py-8 sm:py-10 flex-1 flex flex-wrap gap-3">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={[
                  "p-3 no-underline inline-flex items-center justify-center",
                  "border-2 border-black text-black rounded-full",
                  "hover:bg-black hover:text-white",
                  "transition-all duration-200",
                ].join(" ")}
              >
                {ICONS[label]}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="px-6 lg:px-12 py-8">
        <Link
          href="/authors"
          className={[
            "rounded-full px-5 py-2 text-sm font-semibold no-underline inline-block",
            "border-2 border-black text-black",
            "hover:bg-black hover:text-white",
            "transition-all duration-200",
          ].join(" ")}
        >
          ← All Authors
        </Link>
      </div>
    </main>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-base text-gray-500">Loading...</p>
        </div>
      }
    >
      <AuthorContent params={params} />
    </Suspense>
  );
}
