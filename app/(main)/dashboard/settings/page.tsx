import { Suspense } from "react";
import { createClient } from "../../../../lib/supabase/server";
import { getSession } from "../../../../lib/supabase/get-session";
import { SettingsForm } from "./SettingsForm";

async function SettingsLoader() {
  const session = await getSession();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "username, display_name, bio, avatar_url, email, twitter, github, linkedin, website",
    )
    .eq("id", session!.user.id)
    .single();

  const initialProfile = profile
    ? {
        username: profile.username ?? "",
        displayName: profile.display_name ?? "",
        bio: profile.bio ?? "",
        avatarUrl: profile.avatar_url ?? "",
        email: profile.email ?? "",
        twitter: profile.twitter ?? "",
        github: profile.github ?? "",
        linkedin: profile.linkedin ?? "",
        website: profile.website ?? "",
      }
    : null;

  return (
    <SettingsForm initialProfile={initialProfile} userId={session!.user.id} />
  );
}

export default function SettingsPage() {
  return (
    <main className="min-h-screen">
      <section
        className="px-6 lg:px-12 pt-14 pb-12 lg:pt-20 lg:pb-16 border-b-2 border-black"
        style={{
          backgroundColor: "#e8e4dc",
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
          backgroundPosition: "0 0, 11px 11px",
        }}
      >
        <div className="mt-3">
          <h1 className="text-[42px] font-black tracking-tight sm:text-5xl lg:text-[72px] text-black leading-none">
            Settings
          </h1>
          <p className="mt-4 text-base font-medium text-gray-600">
            Update your public profile
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <p className="text-base text-gray-500 px-6 lg:px-12 py-8">
            Loading...
          </p>
        }
      >
        <SettingsLoader />
      </Suspense>
    </main>
  );
}
