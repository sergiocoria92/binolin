"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

const dayIndexes = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function getNextDateForDay(dayName) {
  const today = new Date();
  const targetDay = dayIndexes[dayName];

  const result = new Date(today);
  const diff = (targetDay + 7 - today.getDay()) % 7;

  result.setDate(today.getDate() + diff);

  return result.toISOString().split("T")[0];
}



export default function LearnerSchedulePage() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedTime, setSelectedTime] = useState("15:30");
  const [topic, setTopic] = useState("Job Interview");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    loadLearner();
  }, []);

  async function loadLearner() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if (!user) {
      window.location.href = "/sign-in";
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("learner_profiles")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (profileError || !profileData) {
      alert(profileError?.message || "Learner profile not found");
      window.location.href = "/";
      return;
    }

    const { data: bookingData } = await supabase
      .from("bookings")
      .select("*")
      .eq("learner_id", profileData.id)
      .in("status", ["scheduled", "pending"])
      .order("created_at", { ascending: false });

    setProfile(profileData);
    setBookings(bookingData || []);
    setLoading(false);
  }

  function alreadyBooked(day, time) {
  const date = getNextDateForDay(day);

  return bookings.some(
    (booking) =>
      booking.session_date === date &&
      booking.session_time === time &&
      ["scheduled", "pending"].includes(booking.status)
  );
}

  async function handleSchedule() {
    setBookingLoading(true);

    const credits = profile.session_credits ?? 4;
    const used = profile.sessions_used ?? 0;
    const remaining = credits - used - bookings.length;

    if (remaining <= 0) {
      alert("You have no session credits available.");
      setBookingLoading(false);
      return;
    }

    if (alreadyBooked(selectedDay, selectedTime)) {
      alert("You already booked this time slot.");
      setBookingLoading(false);
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
      .eq("day_of_week", selectedDay)
      .eq("is_active", true)
      .lte("start_time", selectedTime)
      .gte("end_time", selectedTime);

    if (availabilityError) {
      alert(availabilityError.message);
      setBookingLoading(false);
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

    const selectedDate = getNextDateForDay(selectedDay);
    const { error: bookingError } = await supabase.from("bookings").insert({
      learner_id: profile.id,
      coach_id: selectedCoach?.id || null,
      coach_name: selectedCoach?.full_name || null,
      topic,
      learner_goal: profile.goal || topic,
      learner_notes: `Learner requested ${topic} practice on ${selectedDay}, ${selectedDate} at ${selectedTime}.`,
      duration_minutes: 30,
      requested_day: selectedDay,
      requested_time: selectedTime,
      session_date: selectedDate,
      session_time: selectedTime,
      payment_amount: 10,
      booking_type: "membership",
      status: selectedCoach ? "scheduled" : "pending",
      match_status: selectedCoach ? "matched" : "pending",
      room_name: `booking_${crypto.randomUUID()}`,
    });

    if (bookingError) {
      alert(bookingError.message);
      setBookingLoading(false);
      return;
    }

    window.location.href = "/learner";
  }

  if (loading) {
    return <main className="p-8">Loading...</main>;
  }

  const credits = profile.session_credits ?? 4;
  const used = profile.sessions_used ?? 0;
  const scheduledCount = bookings.length;
  const remaining = credits - used - scheduledCount;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
              Binolin Schedule
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Schedule your sessions
            </h1>

            <p className="mt-2 text-slate-300">
              Choose a time. Binolin will automatically match you with an available coach.
            </p>
          </div>

          <Link
            href="/learner"
            className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-slate-950"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Plan credits</p>
            <p className="mt-2 text-3xl font-bold">{credits}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Completed</p>
            <p className="mt-2 text-3xl font-bold">{used}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Scheduled</p>
            <p className="mt-2 text-3xl font-bold">{scheduledCount}</p>
          </div>

          <div className="rounded-3xl border border-emerald-800 bg-emerald-950 p-5">
            <p className="text-sm text-emerald-200">Remaining</p>
            <p className="mt-2 text-3xl font-bold">{remaining}</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
              >
                {topics.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Selected day
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
              >
                {days.map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Selected time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
              >
                {times.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSchedule}
            disabled={bookingLoading || remaining <= 0}
            className="mt-5 w-full rounded-2xl bg-cyan-300 px-6 py-4 font-bold text-slate-950 disabled:opacity-50"
          >
            {bookingLoading ? "Finding your coach..." : "Schedule selected session"}
          </button>
        </div>

        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900 p-4">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-8 gap-2">
              <div className="rounded-xl bg-slate-950 p-3 text-sm font-bold text-slate-400">
                Time
              </div>

              {days.map((day) => (
                <div
                  key={day}
                  className="rounded-xl bg-slate-950 p-3 text-center text-sm font-bold"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="mt-2 space-y-2">
              {times.map((time) => (
                <div key={time} className="grid grid-cols-8 gap-2">
                  <div className="rounded-xl bg-slate-950 p-3 text-sm font-semibold text-slate-300">
                    {time}
                  </div>

                  {days.map((day) => {
                    const booked = alreadyBooked(day, time);
                    const selected = selectedDay === day && selectedTime === time;

                    return (
                      <button
                        key={`${day}-${time}`}
                        onClick={() => {
                          setSelectedDay(day);
                          setSelectedTime(time);
                        }}
                        disabled={booked}
                        className={`rounded-xl p-3 text-sm font-bold transition ${
                          booked
                            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                            : selected
                            ? "bg-cyan-300 text-slate-950"
                            : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                        }`}
                      >
                        {booked ? "Booked" : selected ? "Selected" : "—"}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}