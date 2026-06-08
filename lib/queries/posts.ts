import { unstable_cache } from "next/cache";
import { createStaticClient } from "./static";
import { Author } from "@/types/author";

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  published_at: string | null;
  created_at: string;
  cover_image_url: string | null;
  author: Author[] | Author | null;
};

export const getLatestPosts = unstable_cache(
  async (): Promise<PostSummary[]> => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id, title, slug, published_at, created_at, cover_image_url,
        author:profiles(id, display_name, username, avatar_url, github)
      `,
      )
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3);

    if (error) console.error(error);
    return (data ?? []) as PostSummary[];
  },
  ["latest-posts"],
  { revalidate: 60, tags: ["posts"] },
);

export const getAllPosts = unstable_cache(
  async (): Promise<PostSummary[]> => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id, title, slug, published_at, created_at, cover_image_url,
        author:profiles(id, display_name, username, avatar_url, github)
      `,
      )
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) console.error(error);
    return (data ?? []) as PostSummary[];
  },
  ["all-posts"],
  { revalidate: 60, tags: ["posts"] },
);

export const getPostBySlug = unstable_cache(
  async (slug: string) => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        *, author:profiles(id, display_name, username, avatar_url, github, bio, twitter, website)
      `,
      )
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) console.error(error);
    return data ?? null;
  },
  ["post-by-slug"],
  { revalidate: 300, tags: ["posts"] },
);
