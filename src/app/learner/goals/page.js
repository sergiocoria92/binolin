"use client";

import { useState } from "react";
import Link from "next/link";
import PublicNavbar from "../../components/PublicNavbar";

const content = {
  es: {
    signIn: "Iniciar sesión",
    start: "Comenzar",
    nav1: "Cómo funciona",
    nav2: "Para compañeros",
    nav3: "Precios",

    back: "Volver a Binolin",
    step: "Paso 1",
    title: "¿Cuál es tu objetivo?",
    description:
      "Elige lo que deseas practicar. Binolin te conectará con un compañero de conversación y preparará una sesión de acuerdo con tu objetivo.",

    travelTitle: "Viajes",
    travelDescription:
      "Practica conversaciones para aeropuertos, hoteles, restaurantes y situaciones comunes.",

    interviewTitle: "Entrevista de trabajo",
    interviewDescription:
      "Practica tus respuestas y habla sobre tu experiencia con mayor confianza.",

    dailyTitle: "Conversación cotidiana",
    dailyDescription:
      "Practica conversaciones naturales para situaciones de la vida diaria.",

    businessTitle: "Inglés para el trabajo",
    businessDescription:
      "Practica reuniones, llamadas, presentaciones y conversaciones profesionales.",

    ieltsTitle: "IELTS",
    ieltsDescription:
      "Practica temas y respuestas de speaking para tu examen IELTS.",

    toeflTitle: "TOEFL",
    toeflDescription:
      "Practica respuestas orales y temas de speaking para tu examen TOEFL.",

    presentationTitle: "Presentaciones",
    presentationDescription:
      "Ensaya una presentación en inglés y practica cómo explicar tus ideas.",

    otherTitle: "Otro objetivo",
    otherDescription:
      "Practica cualquier situación específica en la que necesites hablar inglés.",
  },

  en: {
    signIn: "Sign in",
    start: "Get started",
    nav1: "How it works",
    nav2: "For partners",
    nav3: "Pricing",

    back: "Back to Binolin",
    step: "Step 1",
    title: "What is your goal?",
    description:
      "Choose what you want to practice. Binolin will connect you with a conversation partner and prepare a session based on your goal.",

    travelTitle: "Travel",
    travelDescription:
      "Practice conversations for airports, hotels, restaurants and common situations.",

    interviewTitle: "Job interview",
    interviewDescription:
      "Practice your answers and talk about your experience with greater confidence.",

    dailyTitle: "Daily conversation",
    dailyDescription:
      "Practice natural conversations for everyday situations.",

    businessTitle: "Workplace English",
    businessDescription:
      "Practice meetings, calls, presentations and professional conversations.",

    ieltsTitle: "IELTS",
    ieltsDescription:
      "Practice speaking topics and responses for your IELTS exam.",

    toeflTitle: "TOEFL",
    toeflDescription:
      "Practice speaking responses and topics for your TOEFL exam.",

    presentationTitle: "Presentations",
    presentationDescription:
      "Rehearse an English presentation and practice explaining your ideas.",

    otherTitle: "Another goal",
    otherDescription:
      "Practice any specific situation where you need to speak English.",
  },
};

export default function GoalsPage() {
  const [language, setLanguage] = useState("es");
  const t = content[language];

  const goals = [
    {
      value: "Travel",
      title: t.travelTitle,
      emoji: "✈️",
      description: t.travelDescription,
    },
    {
      value: "Job Interview",
      title: t.interviewTitle,
      emoji: "💼",
      description: t.interviewDescription,
    },
    {
      value: "Daily Conversation",
      title: t.dailyTitle,
      emoji: "☕",
      description: t.dailyDescription,
    },
    {
      value: "Business English",
      title: t.businessTitle,
      emoji: "📈",
      description: t.businessDescription,
    },
    {
      value: "IELTS",
      title: t.ieltsTitle,
      emoji: "🎓",
      description: t.ieltsDescription,
    },
    {
      value: "TOEFL",
      title: t.toeflTitle,
      emoji: "🎓",
      description: t.toeflDescription,
    },
    {
      value: "Presentation",
      title: t.presentationTitle,
      emoji: "🎤",
      description: t.presentationDescription,
    },
    {
      value: "Other",
      title: t.otherTitle,
      emoji: "💬",
      description: t.otherDescription,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
      <section className="relative mx-auto min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_15%_20%,rgba(57,223,74,0.18),transparent_28%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] px-6 py-6 shadow-2xl md:px-10">
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
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white/55 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
          >
            <span aria-hidden="true">←</span>
            {t.back}
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#39df4a]">
                  {t.step}
                </p>

                <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                  {t.title}
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
                  {t.description}
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {goals.map((goal) => (
                  <Link
                    key={goal.value}
                    href={`/learner/goals/about-you?goal=${encodeURIComponent(
                      goal.value
                    )}`}
                    className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#39df4a]/60 hover:bg-[#39df4a]/10"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#39df4a]/15 text-3xl transition group-hover:bg-[#39df4a]/25">
                        {goal.emoji}
                      </span>

                      <div>
                        <h2 className="text-xl font-black">{goal.title}</h2>

                        <p className="mt-2 text-sm leading-6 text-white/55">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-start justify-center lg:sticky lg:top-10 lg:justify-end lg:pt-12">
              <div className="relative flex h-[350px] w-full max-w-[380px] items-center justify-center">
                <div className="absolute h-[300px] w-[300px] rounded-full border border-[#39df4a]/15 bg-[#39df4a]/5" />

                <div className="absolute h-[230px] w-[230px] rounded-full bg-[#39df4a]/10" />

                <div className="absolute h-[330px] w-[330px] rounded-full bg-[#39df4a]/10 blur-3xl" />

                <img
                  src="/img/fase-1.png"
                  alt="Personaje de Binolin"
                  className="relative z-10 mx-auto w-[260px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.28)] lg:w-[350px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}