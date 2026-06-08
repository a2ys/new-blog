"use client";

import { useState } from "react";
import { createClient } from "../../../../lib/supabase/client";

type ProfileState = {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  email: string;
  twitter: string;
  github: string;
  linkedin: string;
  website: string;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
        {label}
      </label>
      <div className="flex">
        {prefix && (
          <span className="flex items-center px-3 text-xs text-gray-400 bg-gray-50 border-2 border-r-0 border-black">
            {prefix}
          </span>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 text-sm border-2 border-black text-black placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 bg-white"
        />
      </div>
    </div>
  );
}

export function SettingsForm({
  initialProfile,
  userId,
}: {
  initialProfile: Partial<ProfileState> | null;
  userId: string;
}) {
  const [profile, setProfile] = useState<ProfileState>({
    username: initialProfile?.username ?? "",
    displayName: initialProfile?.displayName ?? "",
    bio: initialProfile?.bio ?? "",
    avatarUrl: initialProfile?.avatarUrl ?? "",
    email: initialProfile?.email ?? "",
    twitter: initialProfile?.twitter ?? "",
    github: initialProfile?.github ?? "",
    linkedin: initialProfile?.linkedin ?? "",
    website: initialProfile?.website ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function set(key: keyof ProfileState) {
    return (v: string) => setProfile((p) => ({ ...p, [key]: v }));
  }

  async function handleSave() {
    if (!profile.username.trim()) return setError("Username is required.");
    setLoading(true);
    setError("");
    setSaved(false);

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        username: profile.username.trim(),
        display_name: profile.displayName.trim() || null,
        bio: profile.bio.trim() || null,
        avatar_url: profile.avatarUrl.trim() || null,
        email: profile.email.trim() || null,
        twitter: profile.twitter.trim() || null,
        github: profile.github.trim() || null,
        linkedin: profile.linkedin.trim() || null,
        website: profile.website.trim() || null,
      })
      .eq("id", userId);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSaved(true);
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row border-b-2 border-black">
        <div className="px-6 lg:px-12 py-8 sm:py-10 sm:w-32 lg:w-48 shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            Basic
          </span>
        </div>
        <div className="px-6 lg:px-12 py-8 sm:py-10 flex-1 flex flex-col gap-5">
          <Field
            label="Username *"
            value={profile.username}
            onChange={set("username")}
            placeholder="a2ys"
          />
          <Field
            label="Display Name"
            value={profile.displayName}
            onChange={set("displayName")}
            placeholder="Aayush Shukla"
          />
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => set("bio")(e.target.value)}
              placeholder="A short description about yourself..."
              rows={3}
              className="w-full px-4 py-2.5 text-sm resize-none border-2 border-black text-black placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 bg-white"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Field
              label="Avatar URL"
              value={profile.avatarUrl}
              onChange={set("avatarUrl")}
              placeholder="https://github.com/a2ys.png"
            />
            {profile.avatarUrl && (
              <div className="w-16 h-16 border-2 border-black overflow-hidden">
                <img
                  src={profile.avatarUrl}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row border-b-2 border-black">
        <div className="px-6 lg:px-12 py-8 sm:py-10 sm:w-32 lg:w-48 shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            Links
          </span>
        </div>
        <div className="px-6 lg:px-12 py-8 sm:py-10 flex-1 flex flex-col gap-5">
          <Field
            label="Email"
            value={profile.email}
            onChange={set("email")}
            placeholder="you@example.com"
          />
          <Field
            label="Twitter / X"
            value={profile.twitter}
            onChange={set("twitter")}
            placeholder="handle"
            prefix="twitter.com/"
          />
          <Field
            label="GitHub"
            value={profile.github}
            onChange={set("github")}
            placeholder="a2ys"
            prefix="github.com/"
          />
          <Field
            label="LinkedIn"
            value={profile.linkedin}
            onChange={set("linkedin")}
            placeholder="handle"
            prefix="linkedin.com/in/"
          />
          <Field
            label="Website"
            value={profile.website}
            onChange={set("website")}
            placeholder="https://yoursite.com"
          />
        </div>
      </div>

      <div className="px-6 lg:px-12 py-8 flex items-center gap-5">
        <button
          onClick={handleSave}
          disabled={loading}
          className={[
            "rounded-full px-6 py-2.5 text-sm font-bold",
            "border-2 border-black bg-black text-white",
            "hover:bg-transparent hover:text-black",
            "transition-all duration-200",
            loading ? "opacity-50 cursor-not-allowed" : "",
          ].join(" ")}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        {saved && (
          <p className="text-sm font-semibold text-green-700">Saved ✓</p>
        )}
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      </div>
    </>
  );
}
