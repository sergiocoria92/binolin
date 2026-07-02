"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    const role = user.user_metadata?.role || "learner";

    if (role === "coach") {
      const { data: coachData, error: coachError } = await supabase
        .from("coach_profiles")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (coachError) {
        alert(coachError.message);
        setLoading(false);
        return;
      }

      if (!coachData) {
        window.location.href = `/coach/create-profile?fullName=${encodeURIComponent(
          user.user_metadata?.full_name || ""
        )}`;
        return;
      }

      window.location.href = "/coach/dashboard";
      return;
    }
        
        const pendingBooking = JSON.parse(
      localStorage.getItem("pendingBooking") || "{}"
    );
    console.log(user.id);

const result = await supabase
  .from("learner_profiles")
  .upsert(
    {
      user_id: user.id,
      full_name: user.user_metadata?.full_name || "New Learner",
      native_language: "Spanish",
      english_level: "Intermediate",
      goal: "Job Interview",
      coach_preference: "No preference",
      preferred_schedule: "Evening",
    },
    { onConflict: "user_id" }
  )
  .select();

console.log("PROFILE RESULT", result);

const profileData = result.data?.[0];
const profileError = result.error;
if (!profileData) {
  alert("No learner profile was returned.");
  setLoading(false);
  return;
}
console.log(result);
/*
const { data: profileData, error: profileError } = await supabase
  .from("learner_profiles")
  .upsert(
    {
      user_id: user.id,
      full_name: user.user_metadata?.full_name || "New Learner",
      native_language: "Spanish",
      english_level: "Intermediate",
      goal: "Job Interview",
      coach_preference: "No preference",
      preferred_schedule: "Evening",
    },
    { onConflict: "user_id" }
  )
  .select()
  .single(); */

  if (profileError) {
    alert(profileError.message);
    return;
  }

  const hasPendingBooking =
  pendingBooking?.requested_day && pendingBooking?.requested_time;

  if (!hasPendingBooking) {
    window.location.href = "/learner";
    return;
  }

  const { data: existingBooking, error: existingBookingError } = await supabase
    .from("bookings")
    .select("*")
    .eq("learner_id", profileData.id)
    .in("status", ["scheduled", "pending", "in_progress"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingBookingError) {
    alert("Existing booking error: " + existingBookingError.message);
    setLoading(false);
    return;
  }

  if (existingBooking) {
    localStorage.removeItem("pendingBooking");
    window.location.href = "/learner";
    return;
  }


  const { data: availableSlots, error: availabilityError } = await supabase
  .from("coach_availability")
  .select(`
    *,
    coach_profiles (
      id,
      full_name,
      topics,
      is_available
    )
  `)
  .eq("day_of_week", pendingBooking.requested_day)
  .eq("is_active", true)
  .lte("start_time", pendingBooking.requested_time)
  .gte("end_time", pendingBooking.requested_time);

if (availabilityError) {
  alert("Availability error: " + availabilityError.message);
  setLoading(false);
  return;
}

const matches = (availableSlots || []).filter((slot) => {
  const coach = slot.coach_profiles;

  if (!coach?.is_available) return false;

  if (!coach.topics || coach.topics.length === 0) return true;

  return coach.topics.includes(pendingBooking.topic || "Job Interview");
});

const selectedCoach =
  matches.length > 0
    ? matches[Math.floor(Math.random() * matches.length)].coach_profiles
    : null;

const { error: bookingError } = await supabase.from("bookings").insert({
  learner_id: profileData.id,
  coach_id: selectedCoach?.id || null,
  coach_name: selectedCoach?.full_name || null,
  topic: pendingBooking.topic || "Job Interview",
  learner_goal: pendingBooking.topic || "Job Interview",
  learner_notes: `Learner requested ${
    pendingBooking.topic || "Job Interview"
  } practice on ${pendingBooking.requested_day || "Date TBD"} at ${
    pendingBooking.requested_time || "Time TBD"
  }.`,
  duration_minutes: 30,
  requested_day: pendingBooking.requested_day || null,
  requested_time: pendingBooking.requested_time || null,
  session_date: pendingBooking.session_date || pendingBooking.requested_day || "Date TBD",
  session_time: pendingBooking.session_time || pendingBooking.requested_time || "Time TBD",
  payment_amount: 10,
  status: selectedCoach ? "scheduled" : "pending",
  match_status: selectedCoach ? "matched" : "pending",
  room_name: `booking_${crypto.randomUUID()}`,
});

if (bookingError) {
  alert("Booking error: " + bookingError.message);
  setLoading(false);
  return;
}

localStorage.removeItem("pendingBooking");

  window.location.href = "/learner";

    
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-slate-950">
      <section className="mx-auto max-w-md">
        <a href="/" className="text-sm font-medium text-slate-500">
          ← Back
        </a>

        <div className="mt-10">
          <h1 className="text-4xl font-bold">Sign in</h1>
          <p className="mt-3 text-slate-600">
            Access your Binolin dashboard.
          </p>
        </div>

        <form
          onSubmit={handleSignIn}
          className="mt-8 space-y-5 rounded-3xl border border-slate-200 p-6"
        >
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
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}   