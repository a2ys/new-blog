"use client";

interface PublishDrawerProps {
  open: boolean;
  onClose: () => void;
  coverImageUrl: string;
  setCoverImageUrl: (v: string) => void;
  excerpt: string;
  setExcerpt: (v: string) => void;
  status: "draft" | "published";
  setStatus: (v: "draft" | "published") => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  loading: boolean;
}

export function PublishDrawer({
  open,
  onClose,
  coverImageUrl,
  setCoverImageUrl,
  excerpt,
  setExcerpt,
  status,
  setStatus,
  onSaveDraft,
  onPublish,
  loading,
}: PublishDrawerProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      )}

      <div
        className={[
          "fixed right-0 top-0 h-full z-50 w-full max-w-sm bg-white border-l-2 border-black",
          "flex flex-col transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-black">
          <h3 className="text-sm font-black uppercase tracking-[0.2em]">
            Publish
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              Cover Image URL
            </label>
            <input
              type="text"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 text-sm border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 bg-white placeholder:text-gray-300"
            />
            {coverImageUrl && (
              <div className="mt-3 border-2 border-black overflow-hidden aspect-video">
                <img
                  src={coverImageUrl}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short description shown in post cards..."
              rows={3}
              className="w-full px-4 py-2.5 text-sm resize-none border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 bg-white placeholder:text-gray-300"
            />
          </div>

          <div>
            <label className="mb-3 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              Visibility
            </label>
            <div className="flex flex-col gap-2">
              {(["draft", "published"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={[
                    "flex items-center justify-between px-4 py-3 border-2 text-left transition-all duration-200",
                    status === s
                      ? "border-black bg-black text-white"
                      : "border-black text-black hover:bg-gray-50",
                  ].join(" ")}
                >
                  <span className="text-sm font-semibold capitalize">{s}</span>
                  <span className="text-xs opacity-50">
                    {s === "draft" ? "Only you" : "Everyone"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-5 border-t-2 border-black flex flex-col gap-3">
          <button
            onClick={onPublish}
            disabled={loading || status !== "published"}
            className={[
              "w-full rounded-full py-2.5 text-sm font-bold border-2 border-black bg-black text-white",
              "hover:bg-transparent hover:text-black transition-all duration-200",
              loading || status !== "published"
                ? "opacity-40 cursor-not-allowed"
                : "",
            ].join(" ")}
          >
            {loading ? "Saving..." : "Publish Now"}
          </button>
          <button
            onClick={onSaveDraft}
            disabled={loading}
            className={[
              "w-full rounded-full py-2.5 text-sm font-semibold border-2 border-black text-black",
              "hover:bg-black hover:text-white transition-all duration-200",
              loading ? "opacity-40 cursor-not-allowed" : "",
            ].join(" ")}
          >
            Save Draft
          </button>
        </div>
      </div>
    </>
  );
}
