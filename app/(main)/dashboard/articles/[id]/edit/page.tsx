import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "../../../../../../lib/supabase/server";
import { EditArticleEditor } from "./EditorWrapper";

async function ArticleLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article, error } = await supabase
    .from("articles")
    .select("id, title, excerpt, content, cover_image_url, status")
    .eq("id", id)
    .single();

  if (error || !article) notFound();

  return (
    <EditArticleEditor
      articleId={article.id}
      initial={{
        title: article.title,
        content: article.content ?? "",
        excerpt: article.excerpt ?? "",
        coverImageUrl: article.cover_image_url ?? "",
        status: article.status,
      }}
    />
  );
}

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-base text-gray-500">Loading...</p>
        </div>
      }
    >
      <ArticleLoader params={params} />
    </Suspense>
  );
}
