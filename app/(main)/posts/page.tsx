import { Suspense } from "react";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "../../../lib/queries/posts";
import { Author } from "@/types/author";

async function PostsList() {
  const articles = await getAllPosts();

  if (articles.length === 0) {
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

export default async function PostsPage() {
  return (
    <main>
      <section
        className="px-6 lg:px-12 pt-14 pb-12 lg:pt-20 lg:pb-16 border-b-2 border-black"
        style={{
          backgroundColor: "#d6e8f5",
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 11px 11px",
        }}
      >
        <h1 className="mt-3 relative inline-block pb-4 text-[52px] font-black tracking-tight sm:text-6xl lg:text-[80px]">
          All Posts
          <svg
            viewBox="0 0 360 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 bottom-0 w-full overflow-visible"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M4 8 C25 16 55 4 90 13 C120 19 148 5 185 11 C218 16 245 4 282 12 C308 17 330 6 356 10"
              stroke="#1a4a6b"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 15 C30 11 62 17 100 13 C132 10 162 16 200 12 C232 9 265 15 310 12 C330 11 346 13 356 12"
              stroke="#1a4a6b"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />
          </svg>
        </h1>
        <p className="mt-5 max-w-lg text-[17px] font-medium leading-relaxed text-gray-700">
          A collection of all the independent articles on Savant.
        </p>
      </section>

      <section className="w-full">
        <div className="flex items-center justify-between px-6 lg:px-12 py-8 border-b-2 border-black">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1.5">
              All Articles
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Every piece ever published
            </h2>
          </div>
        </div>
        <Suspense
          fallback={
            <p className="text-base text-gray-500 p-6">Loading posts…</p>
          }
        >
          <PostsList />
        </Suspense>
      </section>
    </main>
  );
}
