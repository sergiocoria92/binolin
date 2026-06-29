"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function CreateAccountContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "learner";
  const isCoach = role === "coach";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("sergiocoria.my@gmail.com");
  const [password, setPassword] = useState("1234567890");
  const [loading, setLoading] = useState(false);

  async function handleCreateAccount(e) {
    e.preventDefault();
    setLoading(true);

    const redirectUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/sign-in?role=${role}`
        : `http://localhost:3000/sign-in?role=${role}`;

    let { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    if (error && error.message.toLowerCase().includes("already")) {
      const loginResult = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      data = loginResult.data;
      error = loginResult.error;
    }

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    const user = data.user;
    const session = data.session;

    if (!user) {
      setLoading(false);
      alert("Could not create user.");
      return;
    }

    if (!session) {
      setLoading(false);
      alert(
        "Account created. Please check your email and confirm your account before continuing."
      );
      return;
    }

    if (isCoach) {
      window.location.href = `/coach/create-profile?fullName=${encodeURIComponent(
        fullName || ""
      )}`;
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("learner_profiles")
      .upsert(
        {
          user_id: user.id,
          full_name: fullName || "New Learner",
          native_language: "Spanish",
          english_level: "Intermediate",
          goal: "Job Interview",
          coach_preference: "No preference",
          preferred_schedule: "Evening",
        },
        { onConflict: "user_id" }
      )
      .select()
      .maybeSingle();

    if (profileError || !profileData) {
      setLoading(false);
      alert(profileError?.message || "Learner profile was not created.");
      return;
    }

    window.location.href = "/success";
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-slate-950">
      <section className="mx-auto max-w-3xl">
        <a
          href={isCoach ? "/coach" : "/learner/booking"}
          className="text-sm font-medium text-slate-500"
        >
          ← Back
        </a>

        <div className="mt-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {isCoach ? "Coach account" : "Step 5"}
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            {isCoach ? "Create coach account" : "Create your Voxae account"}
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Create your account for MVP testing.
          </p>
        </div>

        <form
          onSubmit={handleCreateAccount}
          className="mt-10 space-y-6 rounded-3xl border border-slate-200 p-6"
        >
          <div>
            <label className="mb-2 block font-medium">Full name</label>
            <input
              type="text"
              placeholder="Sergio Coria"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function CreateAccountPage() {
  return (
    <Suspense fallback={<main className="p-8">Loading...</main>}>
      <CreateAccountContent />
    </Suspense>
  );
}