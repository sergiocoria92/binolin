"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProfessionalDashboard from "@/components/learner/ProfessionalDashboard";
import GameDashboard from "@/components/learner/GameDashboard";

export default function LearnerDashboardPage() {
  const [profile, setProfile] = useState(null);
  const [booking, setBooking] = useState(null);
  const [activeBookings, setActiveBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [dashboardTheme, setDashboardTheme] = useState("professional");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(
      "binolin-dashboard-theme"
    );

    if (savedTheme === "professional" || savedTheme === "game") {
      setDashboardTheme(savedTheme);
    }

    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.error(sessionError);
      }

      const user = sessionData?.session?.user;

      if (!user) {
        window.location.href = "/create-account";
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("learner_profiles")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (profileError) {
        console.error(profileError);
        alert(profileError.message);
        return;
      }

      if (!profileData) {
        window.location.href = "/learner/goals";
        return;
      }

      setProfile(profileData);

      const bookingSelect = `
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
      `;

      const { data: activeData, error: activeError } = await supabase
        .from("bookings")
        .select(bookingSelect)
        .eq("learner_id", profileData.id)
        .in("status", ["scheduled", "pending"])
        .order("session_date", { ascending: true })
        .order("session_time", { ascending: true });

      if (activeError) {
        console.error(activeError);
      }

      const normalizedBookings = activeData || [];

      setActiveBookings(normalizedBookings);
      setUpcomingBookings(normalizedBookings);
      setBooking(normalizedBookings[0] || null);
    } catch (error) {
      console.error("Dashboard error:", error);
      alert("The dashboard could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  function changeDashboardTheme(theme) {
    if (theme !== "professional" && theme !== "game") return;

    setDashboardTheme(theme);

    window.localStorage.setItem(
      "binolin-dashboard-theme",
      theme
    );
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/";
  }

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

    const remainingBookings = activeBookings.filter(
      (item) => item.id !== bookingId
    );

    setActiveBookings(remainingBookings);
    setUpcomingBookings(remainingBookings);

    if (booking?.id === bookingId) {
      setBooking(remainingBookings[0] || null);
    }
  }

  async function handleCompleteBooking(bookingId) {
    if (!profile) return;

    const confirmComplete = window.confirm(
      "Complete this session?"
    );

    if (!confirmComplete) return;

    const newUsed = (profile.sessions_used || 0) + 1;
    const newXp = (profile.total_points || 25) + 50;
    const newCoins = (profile.coins || 0) + 20;

    const { data: bookingUpdate, error: bookingError } =
      await supabase
        .from("bookings")
        .update({
          status: "completed",
          match_status: "completed",
          xp_awarded: 50,
          coins_awarded: 20,
        })
        .eq("id", bookingId)
        .select();

    if (
      bookingError ||
      !bookingUpdate ||
      bookingUpdate.length === 0
    ) {
      alert(
        bookingError?.message ||
          "Booking was not completed."
      );
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

    setProfile((current) => ({
      ...current,
      sessions_used: newUsed,
      total_points: newXp,
      coins: newCoins,
    }));

    const remainingBookings = activeBookings.filter(
      (item) => item.id !== bookingId
    );

    setActiveBookings(remainingBookings);
    setUpcomingBookings(remainingBookings);

    if (booking?.id === bookingId) {
      setBooking(remainingBookings[0] || null);
    }
  }

  function formatSessionDate(dateText) {
    if (!dateText || !dateText.includes("-")) {
      return "Date TBD";
    }

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

    date.setHours(Number(hour), Number(minute), 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function canStartSession(item) {
    if (!item?.session_date || !item?.session_time) {
      return false;
    }

    if (!item.session_date.includes("-")) {
      return false;
    }

    const sessionStart = new Date(
      `${item.session_date}T${item.session_time}:00`
    );

    if (Number.isNaN(sessionStart.getTime())) {
      return false;
    }

    const now = new Date();

    const fiveMinutesBefore = new Date(
      sessionStart.getTime() - 5 * 60 * 1000
    );

    const thirtyFiveMinutesAfter = new Date(
      sessionStart.getTime() + 35 * 60 * 1000
    );

    return (
      now >= fiveMinutesBefore &&
      now <= thirtyFiveMinutesAfter
    );
  }

  if (loading || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-cyan-400" />

          <p className="mt-5 font-semibold">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  const coach = booking?.coach_profiles;

  const isPending =
    booking?.match_status === "pending" ||
    booking?.status === "pending";

  const coachName =
    coach?.full_name ||
    booking?.coach_name ||
    "Pending coach";

  const topic =
    booking?.topic || "Choose your first mission";

  const duration = booking?.duration_minutes || 30;

  const credits = profile.session_credits ?? 4;
  const used = profile.sessions_used ?? 0;
  const scheduled = activeBookings.length;

  const remaining = Math.max(
    credits - used - scheduled,
    0
  );

  const xp = profile.total_points || 25;
  const level = Math.floor(xp / 100) + 1;
  const currentLevelXp = xp % 100;
  const nextLevelXp = 100;

  const progressPercent = Math.min(
    (currentLevelXp / nextLevelXp) * 100,
    100
  );

  const cefrMap = {
    Beginner: "A1",
    Elementary: "A2",
    Intermediate: "B1",
    UpperIntermediate: "B2",
    Advanced: "C1",
    Fluent: "C2",
  };

  const cefr = cefrMap[profile.english_level] || "";

  const sharedProps = {
    profile,
    booking,
    activeBookings,
    upcomingBookings,
    dashboardTheme,
    coach,
    coachName,
    isPending,
    topic,
    duration,
    credits,
    used,
    scheduled,
    remaining,
    xp,
    level,
    currentLevelXp,
    nextLevelXp,
    progressPercent,
    cefr,
    changeDashboardTheme,
    handleSignOut,
    handleCancelBooking,
    handleCompleteBooking,
    formatSessionDate,
    formatSessionTime,
    canStartSession,
  };

  if (dashboardTheme === "game") {
    return <GameDashboard {...sharedProps} />;
  }

  return <ProfessionalDashboard {...sharedProps} />;
}