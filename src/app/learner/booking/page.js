"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import PublicNavbar from "../../components/PublicNavbar";

const days = [
  { value: "Monday", es: "Lunes", en: "Monday" },
  { value: "Tuesday", es: "Martes", en: "Tuesday" },
  { value: "Wednesday", es: "Miércoles", en: "Wednesday" },
  { value: "Thursday", es: "Jueves", en: "Thursday" },
  { value: "Friday", es: "Viernes", en: "Friday" },
  { value: "Saturday", es: "Sábado", en: "Saturday" },
  { value: "Sunday", es: "Domingo", en: "Sunday" },
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
  {
    value: "Conversation",
    es: "Conversación cotidiana",
    en: "Daily conversation",
  },
  {
    value: "Job Interview",
    es: "Entrevista de trabajo",
    en: "Job interview",
  },
  {
    value: "Business English",
    es: "Inglés para el trabajo",
    en: "Workplace English",
  },
  {
    value: "Travel English",
    es: "Inglés para viajes",
    en: "Travel English",
  },
  {
    value: "Pronunciation",
    es: "Pronunciación",
    en: "Pronunciation",
  },
  {
    value: "Presentation",
    es: "Presentaciones",
    en: "Presentations",
  },
  {
    value: "IELTS",
    es: "IELTS",
    en: "IELTS",
  },
  {
    value: "TOEFL",
    es: "TOEFL",
    en: "TOEFL",
  },
  {
    value: "General English",
    es: "Inglés general",
    en: "General English",
  },
];

const content = {
  es: {
    signIn: "Iniciar sesión",
    start: "Comenzar",
    nav1: "Cómo funciona",
    nav2: "Para compañeros",
    nav3: "Precios",

    back: "Regresar a tu información",
    step: "Paso 3",
    title: "Elige tu sesión de práctica",
    description:
      "Selecciona el tema, el día y el horario. Binolin buscará un compañero de conversación disponible para tu sesión.",

    topic: "Tema de práctica",
    day: "Día",
    time: "Hora",

    matchingTitle: "Cómo funciona la asignación",
    matchingText:
      "Buscaremos compañeros de conversación disponibles para el día y horario seleccionados. Si no encontramos disponibilidad inmediata, tu solicitud permanecerá pendiente hasta encontrar una opción.",

    button: "Buscar compañero disponible",
    loading: "Buscando compañero...",

    availabilityError:
      "No pudimos consultar la disponibilidad. Inténtalo nuevamente.",
    bookingError:
      "No pudimos crear tu solicitud. Inténtalo nuevamente.",

    imageAlt: "Personaje de Binolin organizando una sesión",
  },

  en: {
    signIn: "Sign in",
    start: "Get started",
    nav1: "How it works",
    nav2: "For partners",
    nav3: "Pricing",

    back: "Back to your information",
    step: "Step 3",
    title: "Choose your practice session",
    description:
      "Select your topic, day and time. Binolin will look for an available conversation partner for your session.",

    topic: "Practice topic",
    day: "Day",
    time: "Time",

    matchingTitle: "How matching works",
    matchingText:
      "We will search for conversation partners available at your selected day and time. If no one is immediately available, your request will remain pending until an option is found.",

    button: "Find an available partner",
    loading: "Finding a partner...",

    availabilityError:
      "We could not check availability. Please try again.",
    bookingError:
      "We could not create your request. Please try again.",

    imageAlt: "Binolin character organizing a session",
  },
};

function BookingContent() {
  const [language, setLanguage] = useState("es");
  const [requestedDay, setRequestedDay] = useState("Monday");
  const [requestedTime, setRequestedTime] = useState("15:30");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const goal = searchParams.get("goal") || "Conversation";
  const nativeLanguage =
    searchParams.get("nativeLanguage") || "Spanish";
  const englishLevel =
    searchParams.get("englishLevel") || "Beginner";
  const preferredSchedule =
    searchParams.get("preferredSchedule") || "No preference";

  const validTopic = topics.some((item) => item.value === goal)
    ? goal
    : goal === "Travel"
      ? "Travel English"
      : goal === "Daily Conversation"
        ? "Conversation"
        : goal === "Other"
          ? "General English"
          : "Conversation";

  const [topic, setTopic] = useState(validTopic);

  const t = content[language];

  const backUrl = `/learner/goals/about-you?goal=${encodeURIComponent(
    goal
  )}`;

  function savePendingBooking() {
    localStorage.setItem(
      "pendingBooking",
      JSON.stringify({
        topic,
        requested_day: requestedDay,
        requested_time: requestedTime,
        session_date: requestedDay,
        session_time: requestedTime,
        native_language: nativeLanguage,
        english_level: englishLevel,
        preferred_schedule: preferredSchedule,
      })
    );
  }

  async function handleFindPartner() {
    if (loading) return;

    setLoading(true);

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      const user = sessionData?.session?.user;

      if (!user) {
        savePendingBooking();
        window.location.href = "/create-account";
        return;
      }

      const { data: profileData, error: profileError } =
        await supabase
          .from("learner_profiles")
          .select("id, goal")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

      if (profileError || !profileData) {
        await supabase.auth.signOut();
        savePendingBooking();
        window.location.href = "/create-account";
        return;
      }

      /*
        Conservamos los nombres técnicos coach_availability,
        coach_profiles y coach_id porque así están actualmente
        configurados en Supabase. El usuario solamente verá
        "compañero de conversación".
      */
      const { data: availableSlots, error: availabilityError } =
        await supabase
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
        alert(t.availabilityError);
        setLoading(false);
        return;
      }

      const matches = (availableSlots || []).filter((slot) => {
        const partner = slot.coach_profiles;

        if (!partner?.is_available) return false;

        if (!partner.topics || partner.topics.length === 0) {
          return true;
        }

        return partner.topics.includes(topic);
      });

      let selectedPartner = null;

      if (matches.length > 0) {
        const randomSlot =
          matches[Math.floor(Math.random() * matches.length)];

        selectedPartner = randomSlot.coach_profiles;
      }

      const { error: bookingError } = await supabase
        .from("bookings")
        .insert({
          learner_id: profileData.id,
          coach_id: selectedPartner?.id || null,
          coach_name: selectedPartner?.full_name || null,
          topic,
          learner_goal: profileData.goal || goal || topic,
          learner_notes: `Learner requested ${topic} practice on ${requestedDay} at ${requestedTime}. Native language: ${nativeLanguage}. English level: ${englishLevel}. Preferred schedule: ${preferredSchedule}.`,
          duration_minutes: 30,
          requested_day: requestedDay,
          requested_time: requestedTime,
          session_date: requestedDay,
          session_time: requestedTime,
          payment_amount: 10,
          status: selectedPartner ? "scheduled" : "pending",
          match_status: selectedPartner ? "matched" : "pending",
          room_name: `booking_${crypto.randomUUID()}`,
        });

      if (bookingError) {
        alert(t.bookingError);
        setLoading(false);
        return;
      }

      window.location.href = "/learner";
    } catch (error) {
      console.error("Booking error:", error);
      alert(t.bookingError);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
      <section className="relative mx-auto min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_15%_85%,rgba(57,223,74,0.18),transparent_32%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] px-6 py-6 shadow-2xl md:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />

        <PublicNavbar
          language={language}
          setLanguage={setLanguage}
          signInText={t.signIn}
          startText={t.start}
          howText={t.nav1}
          partnersText={t.nav2}
          pricingText={t.nav3}
        />

        <div className="relative z-10 mx-auto max-w-6xl pb-12 pt-10">
          <Link
            href={backUrl}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white/55 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
          >
            <span aria-hidden="true">←</span>
            {t.back}
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[380px_1fr] lg:items-start">
            <div className="flex items-start justify-center lg:sticky lg:top-10 lg:pt-12">
              <div className="relative flex h-[380px] w-full max-w-[380px] items-center justify-center">
                <div className="absolute h-[310px] w-[310px] rounded-full border border-[#39df4a]/15 bg-[#39df4a]/5" />

                <div className="absolute h-[240px] w-[240px] rounded-full bg-[#39df4a]/10" />

                <div className="absolute h-[350px] w-[350px] rounded-full bg-[#39df4a]/10 blur-3xl" />

                <img
                  src="/img/fase-4.png"
                  alt={t.imageAlt}
                  className="relative z-10 mx-auto w-[270px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.28)] lg:w-[370px]"
                />
              </div>
            </div>

            <div>
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#39df4a]">
                  {t.step}
                </p>

                <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                  {t.title}
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
                  {t.description}
                </p>
              </div>

              <div className="mt-10 space-y-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur md:p-8">
                <div>
                  <label
                    htmlFor="topic"
                    className="mb-2 block text-sm font-bold text-white/80"
                  >
                    {t.topic}
                  </label>

                  <select
                    id="topic"
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition focus:border-[#39df4a]/70"
                  >
                    {topics.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="requested-day"
                      className="mb-2 block text-sm font-bold text-white/80"
                    >
                      {t.day}
                    </label>

                    <select
                      id="requested-day"
                      value={requestedDay}
                      onChange={(event) =>
                        setRequestedDay(event.target.value)
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition focus:border-[#39df4a]/70"
                    >
                      {days.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day[language]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="requested-time"
                      className="mb-2 block text-sm font-bold text-white/80"
                    >
                      {t.time}
                    </label>

                    <select
                      id="requested-time"
                      value={requestedTime}
                      onChange={(event) =>
                        setRequestedTime(event.target.value)
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition focus:border-[#39df4a]/70"
                    >
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#39df4a]/20 bg-[#39df4a]/10 p-5">
                  <p className="font-black text-white">
                    {t.matchingTitle}
                  </p>

                  <p className="mt-2 leading-7 text-white/60">
                    {t.matchingText}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleFindPartner}
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#39df4a] px-6 py-4 font-black text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.45)] transition hover:bg-[#50ef5f] disabled:cursor-not-allowed disabled:bg-white/25 disabled:text-white/60 disabled:shadow-none"
                >
                  {loading ? t.loading : t.button}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#030807] text-white">
          <p className="text-white/60">Cargando...</p>
        </main>
      }
    >
      <BookingContent />
    </Suspense>
  );
}