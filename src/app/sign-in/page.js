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

    // 1. Check admin first
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError) {
      alert("Admin check error: " + adminError.message);
      setLoading(false);
      return;
    }

    if (adminData) {
      window.location.href = "/admin";
      return;
    }

    // 2. Check coach profile
    const { data: coachData, error: coachError } = await supabase
      .from("coach_profiles")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (coachError) {
      alert("Coach check error: " + coachError.message);
      setLoading(false);
      return;
    }

    if (coachData) {
      window.location.href = "/coach/dashboard";
      return;
    }

    // 3. Learner flow
    const pendingBooking = JSON.parse(
      localStorage.getItem("pendingBooking") || "{}"
    );

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

    const profileData = result.data?.[0];
    const profileError = result.error;

    if (profileError) {
      alert("Learner profile error: " + profileError.message);
      setLoading(false);
      return;
    }

    if (!profileData) {
      alert("No learner profile was returned.");
      setLoading(false);
      return;
    }

    const hasPendingBooking =
      pendingBooking?.requested_day && pendingBooking?.requested_time;

    if (!hasPendingBooking) {
      window.location.href = "/learner";
      return;
    }

    const { data: existingBooking, error: existingBookingError } =
      await supabase
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
      session_date:
        pendingBooking.session_date ||
        pendingBooking.requested_day ||
        "Date TBD",
      session_time:
        pendingBooking.session_time ||
        pendingBooking.requested_time ||
        "Time TBD",
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
  <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
    <section className="relative mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_20%_80%,rgba(57,223,74,0.22),transparent_32%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />

      <div className="relative z-10 hidden flex-col justify-between p-10 lg:flex">
        <a href="/" className="text-sm font-semibold text-white/70 hover:text-white">
          ← Volver al inicio
        </a>

        <div>
          <div className="mb-8 h-1 w-44 rounded-full bg-gradient-to-r from-[#39df4a] to-transparent" />

          <h1 className="text-5xl font-black tracking-tight">
            Iniciar sesión
          </h1>

          <p className="mt-4 max-w-sm text-lg leading-8 text-white/60">
            Bienvenido de nuevo. Accede a tu dashboard de Binolin.
          </p>
        </div>

        <img
          src="/img/alien-tom.png"
          alt="Binolin alien"
          className="w-[360px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.35)]"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur md:p-9">
          <a href="/" className="mb-8 inline-block text-sm font-semibold text-white/60 hover:text-white lg:hidden">
            ← Volver
          </a>

          <div>
            <h2 className="text-4xl font-black tracking-tight">
              Iniciar sesión
            </h2>
            <p className="mt-3 text-white/55">
              Accede a tu cuenta y continúa practicando.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-white/80">
                Email
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#39df4a]/70 focus:shadow-[0_0_0_4px_rgba(57,223,74,0.12)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-white/80">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#39df4a]/70 focus:shadow-[0_0_0_4px_rgba(57,223,74,0.12)]"
              />
            </div>

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-[#39df4a] px-6 py-4 font-black text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.45)] transition hover:bg-[#50ef5f] disabled:opacity-50"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-white/45">
            ¿No tienes cuenta?{" "}
            <a href="/create-account" className="font-bold text-[#39df4a]">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </section>
  </main>
);
}