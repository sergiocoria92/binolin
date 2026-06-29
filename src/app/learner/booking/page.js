"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const times = [
  "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00",
];

const topics = [
  "Conversation",
  "Job Interview",
  "Business English",
  "Travel English",
  "Pronunciation",
  "General English",
];

export default function BookingPage() {
  const [requestedDay, setRequestedDay] = useState("Monday");
  const [requestedTime, setRequestedTime] = useState("15:30");
  const [topic, setTopic] = useState("Job Interview");
  const [loading, setLoading] = useState(false);

  async function handleFindCoach() {
    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if (!user) {
      localStorage.setItem(
        "pendingBooking",
        JSON.stringify({
          topic,
          requested_day: requestedDay,
          requested_time: requestedTime,  
          session_date: requestedDay,
          session_time: requestedTime,
        })
      );

      window.location.href = "/create-account";
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("learner_profiles")
      .select("id, goal")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (profileError || !profileData) {
        await supabase.auth.signOut();

        localStorage.setItem(
          "pendingBooking",
          JSON.stringify({
            topic,
            requested_day: requestedDay,
            requested_time: requestedTime,
            session_date: requestedDay,
            session_time: requestedTime,
          })
        );

        window.location.href = "/create-account";
        return;
      }

    const { data: availableSlots, error: availabilityError } = await supabase
      .from("coach_availability")
      .select(`
        *,
        coach_profiles (
          id,
          full_name,
          specialty,
          country,
          state,
          topics,
          is_available
        )
      `)
      .eq("day_of_week", requestedDay)
      .eq("is_active", true)
      .lte("start_time", requestedTime)
      .gte("end_time", requestedTime);

    if (availabilityError) {
      alert(availabilityError.message);
      setLoading(false);
      return;
    }

    const matches = (availableSlots || []).filter((slot) => {
      const coach = slot.coach_profiles;

      if (!coach?.is_available) return false;

      if (!coach.topics || coach.topics.length === 0) return true;

      return coach.topics.includes(topic);
    });

    let selectedCoach = null;

    if (matches.length > 0) {
      const randomSlot = matches[Math.floor(Math.random() * matches.length)];
      selectedCoach = randomSlot.coach_profiles;
    }

    const { error: bookingError } = await supabase.from("bookings").insert({
      learner_id: profileData.id,
      coach_id: selectedCoach?.id || null,
      coach_name: selectedCoach?.full_name || null,
      topic,
      learner_goal: profileData.goal || topic,
      learner_notes: `Learner requested ${topic} practice on ${requestedDay} at ${requestedTime}.`,
      duration_minutes: 30,
      requested_day: requestedDay,
      requested_time: requestedTime,
      session_date: requestedDay,
      session_time: requestedTime,
      payment_amount: 10,
      status: selectedCoach ? "scheduled" : "pending",
      match_status: selectedCoach ? "matched" : "pending",
      room_name: `booking_${crypto.randomUUID()}`,
    });

    if (bookingError) {
      alert(bookingError.message);
      setLoading(false);
      return;
    }

    window.location.href = "/learner";
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-slate-950">
      <section className="mx-auto max-w-3xl">
        <a href="/learner/quick-match" className="text-sm font-medium text-slate-500">
          ← Back
        </a>

        <div className="mt-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Step 4
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            When do you want to practice?
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Voxae will automatically match you with an available coach.
          </p>
        </div>

        <div className="mt-10 space-y-6 rounded-3xl border border-slate-200 p-6">
          <div>
            <label className="mb-2 block font-medium">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3"
            >
              {topics.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Day</label>
              <select
                value={requestedDay}
                onChange={(e) => setRequestedDay(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              >
                {days.map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Time</label>
              <select
                value={requestedTime}
                onChange={(e) => setRequestedTime(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3"
              >
                {times.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="font-semibold">How matching works</p>
            <p className="mt-2 text-slate-600">
              We search for coaches available at your selected time and assign
              one automatically. If no coach is available, your request will stay pending.
            </p>
          </div>

          <button
            onClick={handleFindCoach}
            disabled={loading}
            className="w-full rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Finding your coach..." : "Find my coach"}
          </button>
        </div>
      </section>
    </main>
  );
}