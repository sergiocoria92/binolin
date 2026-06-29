"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LearnerDashboardPage() {
  const [profile, setProfile] = useState(null);
  const [booking, setBooking] = useState(null);
  const [activeBookings, setActiveBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (!user) {
        window.location.href = "/create-account";
        return;
      }

      const { data: profileData } = await supabase
        .from("learner_profiles")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      setProfile(profileData);

      const { data: bookingData } = await supabase
        .from("bookings")
        .select(`
          *,
          coach_profiles (
            id,
            full_name,
            avatar_url,
            specialty,
            country,
            state,
            topics,
            interests,
            bio,
            rating
          )
        `)
        .eq("learner_id", profileData.id)
        .in("status", ["scheduled", "pending"])
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      setBooking(bookingData);

      const { data: activeData } = await supabase
        .from("bookings")
        .select(`
          *,
          coach_profiles (
            id,
            full_name,
            avatar_url,
            specialty,
            country,
            state
          )
        `)
        .eq("learner_id", profileData.id)
        .in("status", ["scheduled", "pending"])
        .order("created_at", { ascending: false });

      setActiveBookings(activeData || []);
      setUpcomingBookings(activeData || []);
    }

    loadDashboard();
  }, []);
/** */

      async function handleSignOut() {
      await supabase.auth.signOut();
      window.location.href = "/";
    }
/** */
    async function handleCancelBooking(bookingId) {
  const confirmCancel = window.confirm("Cancel this session?");

  if (!confirmCancel) return;

  const { data, error } = await supabase
    .from("bookings")
    .update({
      status: "cancelled_by_learner",
      match_status: "cancelled",
    })
    .eq("id", bookingId)
    .select();

  if (error) {
    alert(error.message);
    return;
  }

  if (!data || data.length === 0) {
    alert("Booking was not updated. Check your RLS policy.");
    return;
  }

  setActiveBookings((current) =>
    current.filter((item) => item.id !== bookingId)
  );

  setUpcomingBookings((current) =>
    current.filter((item) => item.id !== bookingId)
  );

  if (booking?.id === bookingId) {
    setBooking(null);
  }
}


async function handleCompleteBooking(bookingId) {
  const confirmComplete = window.confirm("Complete this session?");

  if (!confirmComplete) return;

  const newUsed = (profile.sessions_used || 0) + 1;
  const newXp = (profile.total_points || 25) + 50;
  const newCoins = (profile.coins || 0) + 20;

  const { data: bookingUpdate, error: bookingError } = await supabase
    .from("bookings")
    .update({
      status: "completed",
      match_status: "completed",
      xp_awarded: 50,
      coins_awarded: 20,
    })
    .eq("id", bookingId)
    .select();

  if (bookingError || !bookingUpdate || bookingUpdate.length === 0) {
    alert(bookingError?.message || "Booking was not completed.");
    return;
  }

  const { error: profileError } = await supabase
    .from("learner_profiles")
    .update({
      sessions_used: newUsed,
      total_points: newXp,
      coins: newCoins,
    })
    .eq("id", profile.id);

  if (profileError) {
    alert(profileError.message);
    return;
  }

  setProfile({
    ...profile,
    sessions_used: newUsed,
    total_points: newXp,
    coins: newCoins,
  });

  setActiveBookings((current) =>
    current.filter((item) => item.id !== bookingId)
  );

  setUpcomingBookings((current) =>
    current.filter((item) => item.id !== bookingId)
  );

  if (booking?.id === bookingId) {
    setBooking(null);
  }
}


  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading your quest...
      </main>
    );
  }

  const coach = booking?.coach_profiles;
  const isPending = booking?.match_status === "pending" || booking?.status === "pending";

  const coachName = coach?.full_name || booking?.coach_name || "Pending coach";
  const topic = booking?.topic || "Choose your first mission";
  const duration = booking?.duration_minutes || 30;

  const credits = profile.session_credits ?? 4;
  const used = profile.sessions_used ?? 0;
  const scheduled = activeBookings.length;
  const remaining = Math.max(credits - used - scheduled, 0);

  const xp = profile.total_points || 25;
  const level = Math.floor(xp / 100) + 1;
  const currentLevelXp = xp % 100;
  const nextLevelXp = 100;
  const progressPercent = (currentLevelXp / nextLevelXp) * 100;

  const cefrMap = {
    Beginner: "A1",
    Elementary: "A2",
    Intermediate: "B1",
    UpperIntermediate: "B2",
    Advanced: "C1",
    Fluent: "C2",
  };

  const cefr = cefrMap[profile.english_level] || "";

  function renderTags(items) {
    if (!items || items.length === 0) return null;

    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  function formatSessionDate(dateText) {
  if (!dateText || !dateText.includes("-")) return "Date TBD";

  const date = new Date(`${dateText}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatSessionTime(timeText) {
  if (!timeText) return "Time TBD";

  const [hour, minute] = timeText.split(":");
  const date = new Date();
  date.setHours(Number(hour), Number(minute));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function canStartSession(item) {
  if (!item?.session_date || !item?.session_time) return false;
  if (!item.session_date.includes("-")) return false;

  const sessionStart = new Date(`${item.session_date}T${item.session_time}:00`);
  const now = new Date();

  const fiveMinutesBefore = new Date(sessionStart.getTime() - 5 * 60 * 1000);
  const thirtyFiveMinutesAfter = new Date(sessionStart.getTime() + 35 * 60 * 1000);

  return now >= fiveMinutesBefore && now <= thirtyFiveMinutesAfter;
}

  function canStartSession(item) {
  if (!item?.session_date || !item?.session_time) return false;

  const sessionStart = new Date(`${item.session_date}T${item.session_time}:00`);
  const now = new Date();

  const fiveMinutesBefore = new Date(sessionStart.getTime() - 5 * 60 * 1000);
  const thirtyMinutesAfter = new Date(sessionStart.getTime() + 30 * 60 * 1000);

  return now >= fiveMinutesBefore && now <= thirtyMinutesAfter;
}

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="mx-auto max-w-5xl">

        <div className="mb-6 flex items-start justify-between">
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Voxae Quest
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight">
              Welcome back, {profile.full_name} 🎮
            </h1>

            <p className="mt-3 text-slate-300">
              Your English speaking mission is ready.
            </p>
          </div>

          <div className="ml-5 flex flex-col gap-3">

          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-center">
            <p className="text-xs uppercase tracking-wider text-cyan-200">
              Membership
            </p>

            <p className="mt-1 text-xl font-black">
              {remaining} / {credits}
            </p>

            <p className="text-xs text-cyan-100">
              Sessions remaining
            </p>
          </div>

          <a
            href="/learner/schedule"
            className="rounded-2xl bg-cyan-400 px-6 py-4 text-center font-bold text-slate-950 hover:bg-cyan-300"
          >
            Schedule session
          </a>

          <button
            onClick={handleSignOut}
            className="rounded-2xl border border-white/20 px-6 py-4 font-semibold text-white hover:bg-white/10"
          >
            Sign out
          </button>

        </div>

        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-5">
            <p className="text-sm uppercase tracking-wide text-cyan-200">
              English Level
            </p>
            <p className="mt-2 text-3xl font-black">{profile.english_level}</p>
            <p className="mt-2 text-sm text-cyan-100">CEFR {cefr}</p>
          </div>

          <div className="rounded-3xl border border-purple-400/40 bg-gradient-to-br from-purple-500/20 to-indigo-950/40 p-5 shadow-lg shadow-purple-950/30">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-200">
                Player Level
              </p>
              <span className="rounded-full bg-purple-500/30 px-3 py-1 text-xs font-bold text-purple-100">
                RPG Rank
              </span>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-4xl font-black leading-none">Level {level}</p>
                <p className="mt-2 text-sm text-purple-200">
                  English Adventurer
                </p>
              </div>
              <p className="text-sm font-bold text-purple-100">
                {currentLevelXp} / {nextLevelXp} XP
              </p>
            </div>

            <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-black/30 ring-1 ring-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-400"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="mt-3 text-xs text-purple-200">
              {nextLevelXp - currentLevelXp} XP to reach Level {level + 1}
            </p>
          </div>

          <div className="rounded-3xl border border-orange-400/30 bg-orange-400/10 p-5">
            <p className="text-sm text-orange-200">Streak</p>
            <p className="mt-2 text-3xl font-black">
              🔥 {profile.streak || 0} days
            </p>
          </div>
        </div>

       <div className="mt-6 grid gap-5 lg:grid-cols-3">
  <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950">
    <p className="text-sm font-bold uppercase tracking-wide text-purple-600">
      🎯 Daily Quest
    </p>

    <h2 className="mt-3 text-3xl font-black">{topic}</h2>

    <div className="mt-4 rounded-2xl border border-purple-200 bg-purple-50 p-4">
      <p className="text-sm font-bold text-purple-700">Reward</p>

      <div className="mt-2 flex gap-3">
        <span className="rounded-full bg-purple-600 px-3 py-1 text-sm font-bold text-white">
          +50 XP
        </span>

        <span className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-slate-950">
          ⭐ 20 Coins
        </span>
      </div>
    </div>

    {booking ? (
      isPending ? (
        <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <p className="text-sm font-bold uppercase text-yellow-700">
            Match pending
          </p>
          <p className="mt-2 text-slate-700">
            No coach is available yet for {formatSessionDate(booking.session_date)} at{" "}
            {formatSessionTime(booking.session_time)}.
          </p>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-bold uppercase text-slate-500">
            You matched with
          </p>

          <div className="mt-4 flex gap-4">
            {coach?.avatar_url ? (
              <img
                src={coach.avatar_url}
                alt={coachName}
                className="h-16 w-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-2xl font-black text-white">
                {coachName?.[0]?.toUpperCase()}
              </div>
            )}

            <div>
              <p className="text-2xl font-black">{coachName}</p>
              <p className="text-slate-600">
                {coach?.state || "USA"}, {coach?.country || "United States"}
              </p>
              <p className="mt-1 text-sm font-bold text-purple-700">
                {coach?.specialty || "Conversation"} Coach
              </p>
            </div>
          </div>

          {renderTags(coach?.interests)}

          <p className="mt-4 text-slate-600">
            {coach?.bio || `Practice with ${coachName}.`}
          </p>
        </div>
      )
    ) : (
      <p className="mt-5 text-slate-600">
        Choose a time and Voxae will match you with an available coach.
      </p>
    )}

    <div className="mt-5 rounded-2xl bg-slate-100 p-4">
      <p className="text-sm text-slate-500">Booking status</p>
      <p className="font-bold">{booking?.status || "No booking yet"}</p>
      {booking?.requested_day && (
        <p className="mt-1 text-sm text-slate-600">
          {formatSessionDate(booking.session_date)} · {formatSessionTime(booking.session_time)}
        </p>
      )}
    </div>

    {booking && !isPending ? (
  canStartSession(booking) ? (
    <a
      href={`/room?booking=${booking.id}&name=${encodeURIComponent(profile.full_name)}`}
      className="mt-5 block rounded-2xl bg-slate-950 px-6 py-4 text-center font-bold text-white"
    >
      Start Quest
    </a>
  ) : (
    <button
      disabled
      className="mt-5 block w-full rounded-2xl bg-slate-300 px-6 py-4 text-center font-bold text-slate-500"
    >
      Available {formatSessionDate(booking.session_date)} ·{" "}
      {formatSessionTime(booking.session_time)}
    </button>
  )
) : (
  <a
    href="/learner/schedule"
    className="mt-5 block rounded-2xl bg-slate-950 px-6 py-4 text-center font-bold text-white"
  >
    {activeBookings.length > 0 ? "Schedule another session" : "Find my coach"}
  </a>
)}
  </div>

  <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950">
    <p className="text-sm font-bold uppercase tracking-wide text-cyan-600">
      Upcoming Sessions
    </p>

    {upcomingBookings.length === 0 ? (
      <p className="mt-4 text-slate-600">
        You do not have upcoming sessions yet.
      </p>
    ) : (
      
      <div className="mt-5 space-y-4">
  {upcomingBookings.map((item) => (
    <div
      key={item.id}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-black">
            {item.topic || "English Practice"}
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {formatSessionDate(item.session_date)} · {formatSessionTime(item.session_time)}
          </p>

          <p className="mt-2 text-sm text-slate-700">
            Coach:{" "}
            <span className="font-bold">
              {item.coach_profiles?.full_name || item.coach_name || "Pending"}
            </span>
          </p>

          <button
            onClick={() => handleCancelBooking(item.id)}
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100"
          >
            Cancel session
          </button>

      
        </div>

        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
          {item.status}
        </span>
      </div>
    </div>
  ))}
</div>
    )}
  </div>

  <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6">
    <p className="text-sm font-bold uppercase tracking-wide text-cyan-300">
      Progress map
    </p>

    <div className="mt-5 space-y-4">
      <div className="rounded-2xl bg-white/10 p-4">
        ✅ Choose your goal
      </div>
      <div className="rounded-2xl bg-white/10 p-4">
        {booking ? "✅" : "⬜"} Match with a coach
      </div>
      <div className="rounded-2xl bg-white/10 p-4">
        ✅ Create learner profile
      </div>
      <div className="rounded-2xl border border-cyan-400 bg-cyan-400/20 p-4">
        🎯 Complete your first video call
      </div>
      <div className="rounded-2xl bg-white/5 p-4 text-slate-400">
        🔒 Unlock feedback
      </div>
    </div>
  </div>
</div>
      </section>
    </main>
  );
}