import { Suspense } from "react";
import { createClient } from "../../../lib/supabase/server";
import Link from "next/link";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function ArticlesList() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, status, created_at")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  if (error) console.error(error);

  if (!articles || articles.length === 0) {
    return (
      <div className="px-6 lg:px-12 py-16 text-center border-b-2 border-black">
        <p className="text-base text-gray-500">
          No articles yet.{" "}
          <Link
            href="/dashboard/articles/new"
            className="text-black font-semibold underline"
          >
            Write your first one.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      {articles.map((article, i) => (
        <div
          key={article.id}
          className={[
            "flex items-center justify-between gap-4 px-6 lg:px-12 py-5",
            i !== articles.length - 1 ? "border-b-2 border-black" : "",
          ].join(" ")}
        >
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold truncate text-black">
              {article.title}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {formatDate(article.created_at)} ·{" "}
              <span
                className={
                  article.status === "published"
                    ? "text-green-700 font-semibold"
                    : "text-gray-400"
                }
              >
                {article.status.toUpperCase()}
              </span>
            </p>
          </div>
          <Link
            href={`/dashboard/articles/${article.id}/edit`}
            className={[
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold no-underline",
              "border-2 border-black text-black",
              "hover:bg-black hover:text-white",
              "transition-all duration-200",
            ].join(" ")}
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main>
      <section
        className="px-6 lg:px-12 pt-14 pb-12 lg:pt-20 lg:pb-16 border-b-2 border-black"
        style={{
          backgroundColor: "#e8e4dc",
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 11px 11px",
        }}
      >
        <div className="flex items-end justify-between mt-3">
          <div>
            <h1 className="relative inline-block pb-4 text-[42px] font-black tracking-tight sm:text-5xl lg:text-[72px] text-black leading-none">
              Dashboard
              <svg
                viewBox="0 0 360 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 bottom-0 w-full overflow-visible"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M4 14 C18 6 38 18 62 9 C82 2 105 16 130 8 C152 1 172 15 198 7 C220 1 242 17 268 9 C288 3 308 16 330 10 C342 7 352 13 358 10"
                  stroke="#4a3020"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 17 C22 14 42 18 66 14 C88 11 110 17 136 13 C158 10 178 16 204 12 C226 9 248 15 274 12 C294 9 314 14 334 12"
                  stroke="#4a3020"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.4"
                />
              </svg>
            </h1>
            <p className="mt-4 text-base font-medium text-gray-600">
              Manage your articles
            </p>
          </div>
          <div className="flex items-center gap-3 mb-1">
            <Link
              href="/dashboard/settings"
              className={[
                "rounded-full px-5 py-2 text-sm font-semibold no-underline",
                "border-2 border-black text-black",
                "hover:bg-black hover:text-white",
                "transition-all duration-200",
              ].join(" ")}
            >
              Settings
            </Link>
            <Link
              href="/dashboard/articles/new"
              className={[
                "rounded-full px-5 py-2 text-sm font-semibold no-underline",
                "border-2 border-black bg-black text-white",
                "hover:bg-transparent hover:text-black",
                "transition-all duration-200",
              ].join(" ")}
            >
              New Article
            </Link>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between px-6 lg:px-12 py-8 border-b-2 border-black">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1.5">
            Your Work
          </p>
          <h2 className="text-2xl font-bold tracking-tight">All Articles</h2>
        </div>
      </div>

      <Suspense
        fallback={
          <p className="text-base text-gray-500 px-6 lg:px-12 py-8">
            Loading...
          </p>
        }
      >
        <ArticlesList />
      </Suspense>
    </main>
  );
}
