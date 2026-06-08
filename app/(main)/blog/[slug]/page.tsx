import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { getPostBySlug } from "../../../../lib/queries/posts";
import { getUser } from "../../../../lib/supabase/get-user";
import { ContentRenderer } from "@/components/blog/ContentRenderer";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function EditButton({
  articleId,
  authorId,
}: {
  articleId: string;
  authorId: string;
}) {
  const user = await getUser();
  if (user?.id !== authorId) return null;
  return (
    <Link
      href={`/dashboard/articles/${articleId}/edit`}
      className={[
        "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold no-underline mt-2",
        "border-2 border-black text-black",
        "hover:bg-black hover:text-white",
        "transition-all duration-200",
      ].join(" ")}
    >
      Edit
    </Link>
  );
}

async function ArticleContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPostBySlug(slug);

  if (!article) notFound();

  const author = Array.isArray(article.author)
    ? article.author[0]
    : article.author;

  return (
    <main>
      <div
        className="px-6 lg:px-12 pt-14 pb-12 lg:pt-20 lg:pb-16 border-b-2 border-black"
        style={{ backgroundColor: "#c0d4ec" }}
      >
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-[42px] font-black leading-tight tracking-tight sm:text-5xl lg:text-[72px] text-black max-w-5xl">
            {article.title}
          </h1>
          <Suspense fallback={null}>
            <EditButton articleId={article.id} authorId={article.author_id} />
          </Suspense>
        </div>

        {article.excerpt && (
          <p className="mt-5 text-lg leading-relaxed text-gray-700 max-w-3xl">
            {article.excerpt}
          </p>
        )}

        {author && (
          <Link
            href={`/author/${author.username}`}
            className="mt-8 flex items-center gap-3 no-underline group w-fit"
          >
            <div className="w-9 h-9 border-2 border-black overflow-hidden shrink-0">
              <img
                src={
                  author.avatar_url ?? `https://github.com/${author.github}.png`
                }
                alt={author.display_name ?? author.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p
                className={[
                  "text-sm font-bold text-black w-fit relative pb-0.5",
                  "after:absolute after:bottom-0 after:left-0",
                  "after:h-[2px] after:w-0 after:bg-black",
                  "after:transition-[width] after:duration-300 after:ease-in-out",
                  "group-hover:after:w-full",
                ].join(" ")}
              >
                {author.display_name ?? author.username}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                {formatDate(article.published_at ?? article.created_at)}
              </p>
            </div>
          </Link>
        )}
      </div>

      <div className="py-12 flex justify-center">
        <div className="w-full max-w-2xl px-6">
          <article>
            {article.content ? (
              <ContentRenderer content={article.content} />
            ) : (
              <p className="text-gray-500">No content yet.</p>
            )}
          </article>
        </div>
      </div>

      <div className="border-t-2 border-black px-6 lg:px-12 py-8">
        <Link
          href="/posts"
          className={[
            "rounded-full px-5 py-2 text-sm font-semibold no-underline inline-block",
            "border-2 border-black text-black",
            "hover:bg-black hover:text-white",
            "transition-all duration-200",
          ].join(" ")}
        >
          ← All Posts
        </Link>
      </div>
    </main>
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-base text-gray-500">Loading...</p>
        </div>
      }
    >
      <ArticleContent params={params} />
    </Suspense>
  );
}
