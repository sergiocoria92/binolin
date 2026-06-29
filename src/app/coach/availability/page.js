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

function addThirtyMinutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute + 30, 0, 0);
  return date.toTimeString().slice(0, 5);
}

export default function CoachAvailabilityPage() {
  const [coach, setCoach] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAvailability();
  }, []);

  async function loadAvailability() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/sign-in";
      return;
    }

    const { data: coachData, error: coachError } = await supabase
      .from("coach_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (coachError || !coachData) {
      window.location.href = "/coach/create-profile";
      return;
    }

    const { data: availabilityData, error: availabilityError } = await supabase
      .from("coach_availability")
      .select("*")
      .eq("coach_id", coachData.id)
      .eq("is_active", true);

    if (availabilityError) {
      alert(availabilityError.message);
    }

    setCoach(coachData);
    setSlots(availabilityData || []);
    setLoading(false);
  }

  function normalizeTime(value) {
    if (!value) return "";
    return value.slice(0, 5);
  }

  function findSlot(day, time) {
    return slots.find(
      (slot) =>
        slot.day_of_week === day &&
        normalizeTime(slot.start_time) === normalizeTime(time)
    );
  }

  async function assignPendingBooking(day, time) {
    if (!coach) return;

    const { data: pendingBookings, error: pendingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "pending")
      .eq("requested_day", day)
      .eq("requested_time", time)
      .order("created_at", { ascending: true })
      .limit(1);

    if (pendingError) {
      alert(pendingError.message);
      return;
    }

    const bookingToAssign = pendingBookings?.[0];

    if (!bookingToAssign) return;

    const { error: updateBookingError } = await supabase
      .from("bookings")
      .update({
        coach_id: coach.id,
        coach_name: coach.full_name,
        status: "scheduled",
        match_status: "matched",
      })
      .eq("id", bookingToAssign.id);

    if (updateBookingError) {
      alert(updateBookingError.message);
    }
  }

  async function toggleSlot(day, time) {
    if (!coach) return;

    const existingSlot = findSlot(day, time);

    if (existingSlot) {
      const { error: updateBookingsError } = await supabase
        .from("bookings")
        .update({
          coach_id: null,
          coach_name: null,
          status: "pending",
          match_status: "pending",
        })
        .eq("coach_id", coach.id)
        .eq("session_date", day)
        .eq("session_time", time)
        .in("status", ["scheduled", "in_progress"]);

      if (updateBookingsError) {
        alert(updateBookingsError.message);
        return;
      }

      const { error } = await supabase
        .from("coach_availability")
        .delete()
        .eq("id", existingSlot.id);

      if (error) {
        alert(error.message);
        return;
      }

      setSlots((current) =>
        current.filter((slot) => slot.id !== existingSlot.id)
      );

      return;
    }

    const { data, error } = await supabase
      .from("coach_availability")
      .insert({
        coach_id: coach.id,
        day_of_week: day,
        start_time: time,
        end_time: addThirtyMinutes(time),
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    await assignPendingBooking(day, time);

    setSlots((current) => [...current, data]);
  }

  if (loading) {
    return <main className="p-8">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
              Coach Schedule
            </p>

            <h1 className="mt-3 text-4xl font-bold">Weekly availability</h1>

            <p className="mt-2 text-slate-300">
              Click the time blocks when you are available. Learners can only
              match with you during active blocks.
            </p>
          </div>

          <Link
            href="/coach/dashboard"
            className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-slate-950"
          >
            Back to dashboard
          </Link>
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
                    const active = Boolean(findSlot(day, time));

                    return (
                      <button
                        key={`${day}-${time}`}
                        onClick={() => toggleSlot(day, time)}
                        className={`rounded-xl p-3 text-sm font-bold transition ${
                          active
                            ? "bg-cyan-300 text-slate-950"
                            : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                        }`}
                      >
                        {active ? "Available" : "—"}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <p className="font-bold">Active blocks: {slots.length}</p>
          <p className="mt-2 text-sm text-slate-400">
            Each block represents a 30-minute session.
          </p>
        </div>
      </section>
    </main>
  );
}