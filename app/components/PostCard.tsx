"use client";

import Link from "next/link";
import { Author } from "@/types/author";

export interface PostCardProps {
  title: string;
  date: string;
  imageUrl?: string;
  authors: Author[];
  href?: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getImageUrl(
  imageUrl: string | undefined,
  title: string,
  authors: Author[],
): string {
  if (imageUrl) return imageUrl;
  const author = authors[0]?.display_name ?? authors[0]?.username ?? "Savant";
  return `/api/og?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`;
}

function buildAuthorLabel(authors: Author[]): string {
  if (authors.length === 0) return "Savant";
  if (authors.length === 1)
    return authors[0].display_name ?? authors[0].username;
  if (authors.length === 2)
    return `${authors[0].display_name ?? authors[0].username} & ${authors[1].display_name ?? authors[1].username}`;
  return `${authors[0].display_name ?? authors[0].username} & ${authors.length - 1} others`;
}

export function PostCard({
  title,
  date,
  imageUrl,
  authors,
  href = "#",
}: PostCardProps) {
  const resolvedImage = getImageUrl(imageUrl, title, authors);
  const primaryAuthor = authors[0];

  return (
    <Link href={href} className="group block h-full no-underline">
      <div className="flex flex-col h-full">
        <div
          className="m-6 border-2 border-black overflow-hidden"
          style={{ aspectRatio: "16 / 9" }}
        >
          <img
            src={resolvedImage}
            alt={title}
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-85"
            onError={(e) => {
              const fallback = `/api/og?title=${encodeURIComponent(title)}&author=${encodeURIComponent(
                primaryAuthor?.display_name ??
                  primaryAuthor?.username ??
                  "Savant",
              )}`;
              if (e.currentTarget.src !== fallback)
                e.currentTarget.src = fallback;
            }}
          />
        </div>

        <div className="flex flex-col flex-1 px-8 pb-6 pt-1">
          <h2 className="flex-1 mb-2 text-lg font-bold leading-snug tracking-tight text-black">
            {title}
          </h2>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              {primaryAuthor && (
                <div className="w-5 h-5 border border-black overflow-hidden shrink-0">
                  <img
                    src={
                      primaryAuthor.avatar_url ??
                      `https://github.com/${primaryAuthor.github}.png`
                    }
                    alt={primaryAuthor.display_name ?? primaryAuthor.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <span className="text-xs font-medium text-gray-500 truncate">
                {buildAuthorLabel(authors)}
              </span>
              <span className="text-xs text-gray-300 shrink-0">·</span>
              <span className="text-xs text-gray-400 shrink-0">
                {formatDate(date)}
              </span>
            </div>

            <span
              className={[
                "flex items-center justify-center w-7 h-7 shrink-0 rounded-full text-xs",
                "border-2 border-black text-black",
                "group-hover:bg-black group-hover:text-white",
                "transition-all duration-200",
              ].join(" ")}
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
