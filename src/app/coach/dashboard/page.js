"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function CoachDashboardPage() {
  const [coach, setCoach] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const sessionRate = 10;

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/create-account?role=coach";
        return;
      }

      const { data: coachData, error: coachError } = await supabase
        .from("coach_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (coachError || !coachData) {
        window.location.href = "/coach/create-profile";
        return;
      }

      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select(`
          *,
          learner_profiles (
            id,
            full_name,
            native_language,
            english_level,
            goal,
            coach_preference,
            preferred_schedule
          )
        `)
        .eq("coach_id", coachData.id)
        .order("created_at", { ascending: false });

      if (bookingError) {
        alert(bookingError.message);
      }

      setCoach(coachData);
      setBookings(bookingData || []);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  const stats = useMemo(() => {
    const scheduled = bookings.filter((b) => b.status === "scheduled");
    const completed = bookings.filter((b) => b.status === "completed");

    return {
      scheduledCount: scheduled.length,
      completedCount: completed.length,
      todayCount: bookings.filter((b) => b.session_date === "Today").length,
      weeklyCount: bookings.length,
      estimatedEarnings: bookings.length * sessionRate,
    };
  }, [bookings]);

  function renderTags(items) {
    if (!items || items.length === 0) {
      return <p className="text-slate-500">Not added yet.</p>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  async function handleSignOut() {
  await supabase.auth.signOut();
  window.location.href = "/";
  }

  if (loading) {
    return <main className="p-8">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
              Voxae Coach
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Welcome, {coach.full_name}
            </h1>

            <p className="mt-2 text-slate-300">
              Manage your sessions, profile, and automatic matching status.
            </p>
          </div>

          <div className="flex gap-3">
          <Link
            href="/coach/create-profile"
            className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-slate-950"
          >
            Edit profile
          </Link>

          <Link
            href="/coach/availability"
            className="rounded-2xl border border-white/20 px-5 py-3 text-center font-semibold text-white hover:bg-white/10"
          >
            Availability
          </Link>

          <button
            onClick={handleSignOut}
            className="rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Today&apos;s sessions</p>
            <p className="mt-2 text-3xl font-bold">{stats.todayCount}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Weekly sessions</p>
            <p className="mt-2 text-3xl font-bold">{stats.weeklyCount}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Scheduled</p>
            <p className="mt-2 text-3xl font-bold">{stats.scheduledCount}</p>
          </div>

          <div className="rounded-3xl border border-emerald-800 bg-emerald-950 p-6">
            <p className="text-sm text-emerald-200">Estimated earnings</p>
            <p className="mt-2 text-3xl font-bold">
              ${stats.estimatedEarnings}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-4">
              {coach.avatar_url ? (
                <img
                  src={coach.avatar_url}
                  alt={coach.full_name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800 text-2xl font-bold">
                  {coach.full_name?.[0]?.toUpperCase() || "C"}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold">{coach.full_name}</h2>
                <p className="text-slate-400">
                  {coach.state}, {coach.country}
                </p>
                <p className="mt-1 text-sm text-cyan-300">
                  {coach.is_available ? "Available for matching" : "Not available"}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-400">
                  Specialty
                </p>
                <p className="text-lg font-bold">
                  {coach.specialty || "Conversation"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-400">
                  Topics
                </p>
                {renderTags(coach.topics)}
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-400">
                  Interests
                </p>
                {renderTags(coach.interests)}
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-400">
                  Experience
                </p>
                <p className="text-slate-300">
                  {coach.experience || "No experience added yet."}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-400">Bio</p>
                <p className="text-slate-300">
                  {coach.bio || "No bio added yet."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-white p-6 text-slate-950">
            <h2 className="text-2xl font-bold">Upcoming sessions</h2>

            {bookings.length === 0 ? (
              <p className="mt-4 text-slate-600">
                No sessions assigned yet.
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          Learner session
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                          {booking.topic || "Conversation Practice"}
                        </h3>

                        <p className="mt-2 text-slate-700">
                          Student: <span className="font-semibold">
                            {booking.learner_profiles?.full_name || "Learner"}
                          </span>
                        </p>

                        <p className="text-slate-600">
                          Level: {booking.learner_profiles?.english_level || "Not set"} · 
                          Native language: {booking.learner_profiles?.native_language || "Not set"}
                        </p>

                        <p className="mt-1 text-slate-600">
                          {booking.session_date || "Date TBD"} ·{" "}
                          {booking.session_time || "Time TBD"} ·{" "}
                          {booking.duration_minutes || 30} minutes
                        </p>
                      </div>

                      <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                        {booking.status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-slate-500">Learner goal</p>
                        <p className="mt-1 font-semibold">
                          {booking.learner_profiles?.goal || booking.learner_goal || booking.topic || "Practice English"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-slate-500">
                          Estimated pay
                        </p>
                        <p className="mt-1 font-semibold">
                          ${booking.payment_amount || sessionRate}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-slate-600">
                      {booking.learner_notes ||
                        "No learner notes yet. The session is ready for practice."}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}