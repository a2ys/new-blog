import { unstable_cache } from "next/cache";
import { createStaticClient } from "./static";

export const getAllAuthors = unstable_cache(
  async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id, username, display_name, avatar_url, bio, github, twitter, website, role
      `,
      )
      .in("role", ["admin", "author"])
      .order("display_name");

    if (error) console.error(error);
    return data ?? [];
  },
  ["all-authors"],
  { revalidate: 300, tags: ["authors"] },
);

export const getAuthorByUsername = unstable_cache(
  async (username: string) => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id, username, display_name, avatar_url, bio,
        email, twitter, github, linkedin, website, role
      `,
      )
      .eq("username", username)
      .single();

    if (error) console.error(error);
    return data ?? null;
  },
  ["author-by-username"],
  { revalidate: 300, tags: ["authors"] },
);
