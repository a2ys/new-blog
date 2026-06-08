export interface Author {
  id: string;
  username: string;
  display_name: string;
  bio?: string | null;
  avatar_url?: string | null;
  email?: string | null;
  twitter?: string | null;
  github?: string | null;
  linkedin?: string | null;
  website?: string | null;
  role?: "admin" | "author" | "reader";
  created_at?: string;
}
