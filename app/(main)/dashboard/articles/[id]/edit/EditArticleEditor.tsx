"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RichEditor } from "@/components/editor/RichEditor";
import { PublishDrawer } from "@/components/editor/PublishDrawer";
import {
  updateArticle,
  deleteArticle,
} from "../../../../../../lib/actions/articles";

type InitialData = {
  title: string;
  content: string;
  excerpt: string;
  coverImageUrl: string;
  status: "draft" | "published" | "archived";
};

export function EditArticleEditor({
  articleId,
  initial,
}: {
  articleId: string;
  initial: InitialData;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [content, setContent] = useState(initial.content);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [coverImageUrl, setCoverImageUrl] = useState(initial.coverImageUrl);
  const [status, setStatus] = useState<"draft" | "published">(
    initial.status === "published" ? "published" : "draft",
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(s: "draft" | "published") {
    if (!title.trim()) return setError("Title is required.");
    setLoading(true);
    setError("");
    const result = await updateArticle(articleId, {
      title,
      excerpt,
      content,
      coverImageUrl,
      status: s,
    });
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    setLoading(true);
    await deleteArticle(articleId);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-30 bg-white border-b-2 border-black flex items-center justify-between px-6 lg:px-12 h-14">
        <Link
          href="/dashboard"
          className="text-sm font-semibold text-gray-400 hover:text-black transition-colors no-underline"
        >
          ← Dashboard
        </Link>
        <div className="flex items-center gap-3">
          {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-full px-4 py-1.5 text-sm font-semibold border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 disabled:opacity-50"
          >
            Delete
          </button>
          <button
            onClick={() => handleSave(status)}
            disabled={loading}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-semibold border-2 border-black text-black",
              "hover:bg-black hover:text-white transition-all duration-200",
              loading ? "opacity-50 cursor-not-allowed" : "",
            ].join(" ")}
          >
            Save
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            disabled={loading}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-semibold border-2 border-black bg-black text-white",
              "hover:bg-transparent hover:text-black transition-all duration-200",
              loading ? "opacity-50 cursor-not-allowed" : "",
            ].join(" ")}
          >
            Publish →
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-12 pt-12 pb-2">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onInput={(e) => {
            const t = e.currentTarget;
            t.style.height = "auto";
            t.style.height = `${t.scrollHeight}px`;
          }}
          placeholder="Title"
          rows={1}
          className="w-full resize-none overflow-hidden bg-transparent border-none text-[42px] sm:text-5xl lg:text-[64px] font-black tracking-tight leading-tight text-black placeholder:text-gray-200 focus:outline-none"
        />
      </div>

      <div className="mx-6 lg:mx-12 border-t-2 border-black/10 mb-2" />

      <div className="flex-1">
        <RichEditor initialContent={content} onChange={setContent} />
      </div>

      <PublishDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        coverImageUrl={coverImageUrl}
        setCoverImageUrl={setCoverImageUrl}
        excerpt={excerpt}
        setExcerpt={setExcerpt}
        status={status}
        setStatus={setStatus}
        onSaveDraft={() => handleSave("draft")}
        onPublish={() => handleSave("published")}
        loading={loading}
      />
    </div>
  );
}
