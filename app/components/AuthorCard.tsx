import Link from "next/link";
import { Author } from "@/types/author";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link
      href={`/author/${author.username}`}
      className="group block no-underline"
    >
      <div className="m-3 border-2 border-black overflow-hidden aspect-square">
        <img
          src={author.avatar_url ?? `https://github.com/${author.github}.png`}
          alt={author.display_name ?? author.username}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="px-4 pb-4 pt-1 flex flex-col gap-1">
        <p className="text-base font-black tracking-tight text-black">
          {author.display_name ?? author.username}
        </p>
        <p className="text-xs text-gray-400">@{author.username}</p>
        <div className="flex items-end justify-between gap-3 mt-1">
          <p className="text-xs leading-relaxed text-gray-500">
            {author.bio ?? "Click to know more about me!"}
          </p>
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
    </Link>
  );
}
