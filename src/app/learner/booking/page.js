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
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
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
    <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
      <section className="relative mx-auto min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_15%_85%,rgba(57,223,74,0.18),transparent_32%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] p-6 shadow-2xl md:p-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <a href="/" className="mb-10 inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#38e34d] shadow-[0_0_25px_rgba(56,227,77,0.55)]">
              <img
                src="/img/prueba1-recortada-negro.png"
                alt="Binolin"
                className="h-7 w-7 object-contain"
              />
            </div>
            <span className="text-2xl font-black tracking-tight">Binolin</span>
          </a>

          <div className="grid min-h-[650px] gap-10 lg:grid-cols-[360px_1fr]">
            <div className="relative block min-h-[260px]">
              <img
                src="/img/fase-4.png"
                alt="Binolin"
                className="mx-auto w-[240px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.28)] lg:w-[360px]"
              />
            </div>

            <div>
              <a
                href="/learner/quick-match"
                className="text-sm font-semibold text-white/55 hover:text-white"
              >
                ← Back
              </a>

              <div className="mt-10">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#39df4a]">
                  Step 4
                </p>

                <h1 className="text-5xl font-black tracking-tight">
                  When do you want to practice?
                </h1>

                <p className="mt-4 text-lg leading-8 text-white/60">
                  Binolin will automatically match you with an available coach.
                </p>
              </div>

              <div className="mt-10 space-y-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur">
                <div>
                  <label className="mb-2 block text-sm font-bold text-white/80">
                    Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none focus:border-[#39df4a]/70"
                  >
                    {topics.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-white/80">
                      Day
                    </label>
                    <select
                      value={requestedDay}
                      onChange={(e) => setRequestedDay(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none focus:border-[#39df4a]/70"
                    >
                      {days.map((day) => (
                        <option key={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-white/80">
                      Time
                    </label>
                    <select
                      value={requestedTime}
                      onChange={(e) => setRequestedTime(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none focus:border-[#39df4a]/70"
                    >
                      {times.map((time) => (
                        <option key={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#39df4a]/20 bg-[#39df4a]/10 p-5">
                  <p className="font-black text-white">How matching works</p>
                  <p className="mt-2 leading-7 text-white/60">
                    We search for coaches available at your selected time and
                    assign one automatically. If no coach is available, your
                    request will stay pending.
                  </p>
                </div>

                <button
                  onClick={handleFindCoach}
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#39df4a] px-6 py-4 font-black text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.45)] hover:bg-[#50ef5f] disabled:bg-white/25 disabled:text-white/60 disabled:shadow-none"
                >
                  {loading ? "Finding your coach..." : "Find my coach"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}