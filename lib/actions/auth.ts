"use server";

import { createAdminClient } from "../supabase/admin";
import { revalidateTag } from "next/cache";

function mapError(message: string): string {
  const m = message.toLowerCase();
  if (
    m.includes("unique") ||
    m.includes("duplicate") ||
    m.includes("already exists")
  )
    return "That username is already taken — try another one.";
  if (m.includes("row-level security") || m.includes("rls"))
    return "Could not save your profile. Please try again.";
  if (m.includes("service_role") || m.includes("api key"))
    return "Server configuration error. Please contact the admin.";
  return `Profile error: ${message}`;
}

export async function createProfile(data: {
  userId: string;
  username: string;
  displayName: string;
}): Promise<{ error?: string }> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error("[createProfile] SUPABASE_SERVICE_ROLE_KEY is not set");
    return { error: "Server configuration error." };
  }

  const admin = createAdminClient();
  const { error } = await admin.from("profiles").upsert({
    id: data.userId,
    username: data.username.trim().toLowerCase(),
    display_name: data.displayName.trim() || null,
  });

  if (error) {
    console.error("[createProfile] error:", error.message, error.code);
    return { error: mapError(error.message) };
  }

  revalidateTag("authors", "default");
  return {};
}

export async function deleteUser(userId: string): Promise<void> {
  const admin = createAdminClient();
  await admin.auth.admin.deleteUser(userId);
}
