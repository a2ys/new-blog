import { Suspense } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PostCard } from "@/components/PostCard";
import { Author } from "@/types/author";
import { getLatestPosts } from "../../lib/queries/posts";

async function PostsList() {
  const articles = await getLatestPosts();

  if (!articles || articles.length === 0) {
    return <p className="text-base text-gray-500 p-6">No posts yet.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 border-l-2 border-black">
      {articles.map((article) => {
        const raw = article.author;
        const authors = (
          Array.isArray(raw) ? raw : raw ? [raw] : []
        ) as Author[];

        return (
          <div key={article.id} className="border-r-2 border-b-2 border-black">
            <PostCard
              title={article.title}
              date={article.published_at ?? article.created_at}
              imageUrl={article.cover_image_url ?? undefined}
              authors={authors}
              href={`/blog/${article.slug}`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <main className="w-full">
        <div
          className="flex items-center justify-between px-6 lg:px-12 py-8 border-b-2 border-black"
          style={{ backgroundColor: "#fdf6e3" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1.5">
              Curated Selection
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Picked by our Moderators
            </h2>
          </div>
          <Link
            href="/posts"
            className={[
              "rounded-full px-5 py-2 text-sm font-semibold no-underline",
              "border-2 border-black text-black",
              "hover:bg-black hover:text-white",
              "transition-all duration-200",
            ].join(" ")}
          >
            View all →
          </Link>
        </div>
        <Suspense
          fallback={
            <p className="text-base text-gray-500 p-6">Loading posts…</p>
          }
        >
          <PostsList />
        </Suspense>
      </main>
    </div>
  );
}
