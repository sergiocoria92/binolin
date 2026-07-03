"use client";

import { useState } from "react";
import Link from "next/link";

const text = {
  en: {
    signIn: "Sign in",
    nav1: "How it works",
    nav2: "For coaches",
    nav3: "Pricing",
    badge: "30-minute live sessions",
    title1: "Your English,",
    title2: "your moment.",
    description:
      "Practice real conversations with verified coaches in personalized sessions designed to help you speak with confidence.",
    studentButton: "Find a coach",
    speakerButton: "I'm a coach",
    card1: "Real conversations",
    card1Text: "Everyday topics to improve your fluency.",
    card2: "Verified coaches",
    card2Text: "People who understand you and help you grow.",
    card3: "Flexible schedule",
    card3Text: "Practice whenever and wherever you are.",
    bubble: "Let's practice!",
  },
  es: {
    signIn: "Iniciar sesión",
    nav1: "Cómo funciona",
    nav2: "Para coaches",
    nav3: "Precios",
    badge: "Sesiones en vivo de 30 minutos",
    title1: "Tu inglés,",
    title2: "tu momento.",
    description:
      "Habla, practica y mejora con coaches verificados en sesiones personalizadas para ganar confianza.",
    studentButton: "Encontrar un coach",
    speakerButton: "Soy coach",
    card1: "Conversaciones reales",
    card1Text: "Temas de la vida real para mejorar tu fluidez.",
    card2: "Coaches verificados",
    card2Text: "Personas que te entienden y te ayudan a crecer.",
    card3: "Horarios flexibles",
    card3Text: "Aprende cuando quieras, donde estés.",
    bubble: "Let's practice!",
  },
};

export default function Home() {
  const [language, setLanguage] = useState("es");
  const t = text[language];

  return (
    <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
      <section className="relative mx-auto min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_70%_35%,rgba(45,255,85,0.22),transparent_34%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] px-6 py-6 shadow-2xl md:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />

        <nav className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#38e34d] shadow-[0_0_25px_rgba(56,227,77,0.55)]">
              <img
                src="/img/prueba1-recortada-negro.png"
                alt="Binolin"
                className="h-7 w-7 object-contain"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight">Binolin</span>
          </Link>

          <div className="hidden items-center gap-10 text-sm font-medium text-white/65 md:flex">
            <a href="#how">{t.nav1}</a>
            <a href="#coaches">{t.nav2}</a>
            <a href="#pricing">{t.nav3}</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              {language === "es" ? "EN" : "ES"}
            </button>

            <Link
              href="/sign-in"
              className="hidden rounded-full px-5 py-2 text-sm font-semibold text-white/80 hover:text-white sm:block"
            >
              {t.signIn}
            </Link>

            <Link
              href="/learner/goals"
              className="rounded-xl bg-[#39df4a] px-5 py-3 text-sm font-bold text-[#031006] shadow-[0_0_22px_rgba(57,223,74,0.45)] hover:bg-[#50ef5f]"
            >
              Comenzar
            </Link>
          </div>
        </nav>

        <div className="relative z-10 grid min-h-[78vh] items-center gap-10 pt-12 lg:grid-cols-[1fr_0.95fr] lg:pt-4">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-white/75 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-[#39df4a] shadow-[0_0_14px_rgba(57,223,74,0.9)]" />
              {t.badge}
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              {t.title1}
              <br />
              <span className="text-[#39df4a]">{t.title2}</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
              {t.description}
            </p>

            <div className="mt-10 flex max-w-md flex-col gap-4 sm:flex-row">
              <Link
                href="/learner/goals"
                className="rounded-2xl bg-[#39df4a] px-7 py-4 text-center font-extrabold text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.48)] hover:bg-[#50ef5f]"
              >
                {t.studentButton}
              </Link>

              <Link
                href="/create-account?role=coach"
                className="rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-center font-extrabold text-white hover:bg-white/10"
              >
                {t.speakerButton}
              </Link>
            </div>

            <div
              id="how"
              className="mt-16 grid gap-6 sm:grid-cols-3"
            >
              {[
                [t.card1, t.card1Text, "💬"],
                [t.card2, t.card2Text, "👤"],
                [t.card3, t.card3Text, "📅"],
              ].map(([title, desc, icon]) => (
                <div key={title}>
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#39df4a] text-xl text-[#031006] shadow-[0_0_20px_rgba(57,223,74,0.35)]">
                    {icon}
                  </div>
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto hidden h-[620px] w-full max-w-[560px] items-center justify-center lg:flex">

            {/* Círculo exterior */}
            <div className="absolute h-[520px] w-[520px] rounded-full border border-[#53ff68]/20 bg-[#39df4a]/5" />

            {/* Círculo interior */}
            <div className="absolute h-[390px] w-[390px] rounded-full bg-[#39df4a]/12 backdrop-blur-sm" />

            {/* Glow */}
            <div className="absolute h-[560px] w-[560px] rounded-full bg-[#39df4a]/10 blur-3xl" />

            {/* Alien */}
            <img
              src="/img/alien-tom.png"
              alt="Alien"
              className="
                relative
                z-20
                h-[520px]
                object-contain
                drop-shadow-[0_20px_45px_rgba(0,255,120,0.35)]
              "
            />

            {/* Burbuja */}
            <div className="absolute bottom-24 right-0 z-30 rounded-3xl border border-white/10 bg-[#1f612d]/90 px-8 py-5 text-xl font-bold text-white backdrop-blur">
              {t.bubble}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}