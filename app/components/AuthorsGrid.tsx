"use client";

import { useState } from "react";
import { AuthorCard } from "./AuthorCard";
import { Author } from "@/types/author";

const COLS = 6;
const PER_PAGE = 12;

export function AuthorsGrid({ authors }: { authors: Author[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(authors.length / PER_PAGE);
  const visible =
    totalPages > 1
      ? authors.slice(page * PER_PAGE, (page + 1) * PER_PAGE)
      : authors;
  const lastRowStart = Math.floor((visible.length - 1) / COLS) * COLS;

  return (
    <>
      <div className="grid grid-cols-6 border-l-2 border-black">
        {visible.map((author, i) => (
          <div
            key={author.id}
            className={[
              "border-r-2 border-black",
              i < lastRowStart ? "border-b-2" : "",
            ].join(" ")}
          >
            <AuthorCard author={author} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 lg:px-12 py-6 border-t-2 border-black">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className={[
              "rounded-full px-5 py-2 text-sm font-semibold border-2 transition-all duration-200",
              page === 0
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-black text-black hover:bg-black hover:text-white",
            ].join(" ")}
          >
            ← Prev
          </button>
          <span className="text-sm font-semibold text-gray-400 tracking-widest">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className={[
              "rounded-full px-5 py-2 text-sm font-semibold border-2 transition-all duration-200",
              page === totalPages - 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-black text-black hover:bg-black hover:text-white",
            ].join(" ")}
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}
