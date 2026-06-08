"use server";

import { revalidateTag } from "next/cache";
import { createClient } from "../supabase/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

type ArticleData = {
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  status: "draft" | "published" | "archived";
};

export async function createArticle(
  data: Omit<ArticleData, "status"> & { status: "draft" | "published" },
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const { error } = await supabase.from("articles").insert({
    author_id: user.id,
    title: data.title.trim(),
    slug: slugify(data.title),
    excerpt: data.excerpt.trim() || null,
    content: data.content.trim() || null,
    cover_image_url: data.coverImageUrl.trim() || null,
    status: data.status,
    published_at: data.status === "published" ? new Date().toISOString() : null,
  });
  if (error) return { error: error.message };
  revalidateTag("posts", "default");
  return {};
}

export async function updateArticle(
  id: string,
  data: ArticleData,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("articles")
    .update({
      title: data.title.trim(),
      slug: slugify(data.title),
      excerpt: data.excerpt.trim() || null,
      content: data.content.trim() || null,
      cover_image_url: data.coverImageUrl.trim() || null,
      status: data.status,
      published_at:
        data.status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidateTag("posts", "default");
  return {};
}

export async function deleteArticle(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("articles").delete().eq("id", id);
  revalidateTag("posts", "default");
}
