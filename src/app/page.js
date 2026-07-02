"use client";

import { useState } from "react";
import Link from "next/link";

const text = {
  en: {
    signIn: "Sign in",
    badge: "30-minute live sessions",
    title: "Speak English with confidence.",
    description:
      "Practice real conversations with real people. Choose your goal, match with a coach, and build confidence one session at a time.",
    studentButton: "Find me a coach",
    speakerButton: "Become a coach",
  },
  es: {
    signIn: "Iniciar sesión",
    badge: "Sesiones en vivo de 30 minutos",
    title: "Habla inglés con confianza.",
    description:
      "Practica conversaciones reales con personas reales. Elige tu meta, conecta con un coach y gana confianza sesión por sesión.",
    studentButton: "Encontrar un coach",
    speakerButton: "Ser coach",
  },
};

export default function Home() {
  const [language, setLanguage] = useState("es");
  const t = text[language];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Binolin</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium"
            >
              {language === "es" ? "EN" : "ES"}
            </button>

            <Link
            href="/sign-in"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium"
          >
            {t.signIn}
          </Link>
          </div>
        </nav>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="mb-4 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
            {t.badge}
          </p>

          <h2 className="max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
            {t.title}
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            {t.description}
          </p>

          <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row">
            <Link
              href="/learner/goals"
              className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-center font-semibold text-white"
            >
              {t.studentButton}
            </Link>

            <Link
              href="/create-account?role=coach"
              className="w-full rounded-2xl border border-slate-300 px-6 py-4 text-center font-semibold"
            >
              {t.speakerButton}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}