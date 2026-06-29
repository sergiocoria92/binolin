"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CoachCreateProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fullName, setFullName] = useState(searchParams.get("fullName") || "");
  const [specialty, setSpecialty] = useState("Conversation");
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState("Michigan");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [topics, setTopics] = useState("Conversation, Job Interview");
  const [interests, setInterests] = useState("Star Wars, food, travel");
  const [avatarFile, setAvatarFile] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  function textToArray(value) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  async function uploadAvatar(userId) {
    if (!avatarFile) return null;

    const fileExt = avatarFile.name.split(".").pop();
    const filePath = `${userId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("coach-avatars")
      .upload(filePath, avatarFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("coach-avatars")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User not found.");
      setLoading(false);
      return;
    }

    try {
      const avatarUrl = await uploadAvatar(user.id);

      const payload = {
        user_id: user.id,
        full_name: fullName,
        specialty,
        country,
        state,
        bio,
        experience,
        topics: textToArray(topics),
        interests: textToArray(interests),
        is_available: isAvailable,
      };

      if (avatarUrl) {
        payload.avatar_url = avatarUrl;
      }

      const { error } = await supabase.from("coach_profiles").upsert(payload, {
        onConflict: "user_id",
      });

      if (error) throw error;

      router.push("/coach/dashboard");
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Create your Coach Profile</h1>

        <p className="mt-3 text-slate-300">
          This profile helps Voxae match you automatically with learners.
        </p>

        <form
          onSubmit={handleSave}
          className="mt-10 space-y-6 rounded-3xl border border-slate-700 bg-white p-8 text-slate-950 shadow-xl"
        >
          <div>
            <label className="mb-2 block font-medium">Profile photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Full name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Specialty</label>
            <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full rounded-xl border p-3"
            >
            <option value="Conversation">Conversation</option>
            <option value="Job Interview">Job Interview</option>
            <option value="Business English">Business English</option>
            <option value="Travel English">Travel English</option>
            <option value="Pronunciation">Pronunciation</option>
            <option value="General English">General English</option>
            </select>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Choose the main area where you feel most comfortable helping learners.
            </p>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border p-3"
                >
                <option value="United States">United States</option>
                </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full rounded-xl border p-3"
                >
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
                <option>Hawaii</option>
                <option>Idaho</option>
                <option>Illinois</option>
                <option>Indiana</option>
                <option>Iowa</option>
                <option>Kansas</option>
                <option>Kentucky</option>
                <option>Louisiana</option>
                <option>Maine</option>
                <option>Maryland</option>
                <option>Massachusetts</option>
                <option>Michigan</option>
                <option>Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
                <option>North Carolina</option>
                <option>North Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode Island</option>
                <option>South Carolina</option>
                <option>South Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Utah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
                </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">Topics you can teach</label>
            <input
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Interests</label>
            <input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Experience</label>
            <textarea
              rows={4}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Bio</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <label className="flex items-center gap-3 rounded-2xl bg-slate-100 p-4">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
            <span className="font-medium">Available for automatic matching</span>
          </label>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-black py-4 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Coach Profile"}
          </button>
        </form>
      </div>
    </main>
  );
}