"use client";

import { useState } from "react";
import Link from "next/link";
import PublicNavbar from "./components/PublicNavbar";

const text = {
  en: {
    signIn: "Sign in",
    start: "Get started",

    nav1: "How it works",
    nav2: "For conversation partners",
    nav3: "Pricing",

    badge: "Live 30-minute sessions",

    title1: "Your English,",
    title2: "your moment.",

    description:
      "Practice real English conversations with verified conversation partners in private 30-minute sessions.",

    mainPromise:
      "Real people. Real English. No classes, no scripts and no AI.",

    mainPromiseText:
      "Just useful conversation for the moments when you truly need to speak.",

    studentButton: "Start practicing",
    speakerButton: "Become a conversation partner",

    bubble: "Let's practice!",

    situationsBadge: "REAL SITUATIONS",
    situationsTitle1: "Do you need to speak English",
    situationsTitle2: "tomorrow?",
    situationsDescription:
      "You may already know the vocabulary and grammar. Sometimes you simply need to speak with a real person before the important moment arrives.",

    interviewTitle: "I have a job interview",
    interviewText:
      "Practice your answers, introduce your experience and speak before facing the real interview.",

    presentationTitle: "I have a presentation",
    presentationText:
      "Rehearse your ideas out loud and explain your presentation to someone who is listening in real time.",

    examTitle: "I have an exam",
    examText:
      "Practice speaking for TOEFL, IELTS, DET or an oral exam at school or college.",

    workTitle: "I need English at work",
    workText:
      "Practice meetings, calls, technical explanations and everyday workplace conversations.",

    situationsCallout:
      "Opportunities do not always give you time to prepare.",

    situationsCalloutStrong:
      "Practice today. Speak with confidence tomorrow.",

    situationButton: "Practice now",

    differenceBadge: "THE BINOLIN DIFFERENCE",
    differenceTitle1: "Technology can help you study.",
    differenceTitle2: "People help you communicate.",

    differenceDescription:
      "An interview, a presentation and a real conversation happen with people. Binolin gives you a space to practice that human interaction before you need it.",

    feature1: "Real conversations",
    feature1Text:
      "Talk naturally and respond to questions you did not prepare in advance.",

    feature2: "Verified partners",
    feature2Text:
      "Practice with real people approved by Binolin to participate in the platform.",

    feature3: "Flexible sessions",
    feature3Text:
      "Choose a time that works for you and practice from wherever you are.",

    feature4: "Functional English",
    feature4Text:
      "Focus on the English you need for work, school, travel and everyday life.",

    finalTitle: "Your next opportunity could arrive tomorrow.",
    finalText:
      "Do not wait until the interview, presentation or conversation begins. Practice with a real person today.",

    finalButton: "Start a practice session",
    finalSecondary: "See how it works",
  },

  es: {
    signIn: "Iniciar sesión",
    start: "Comenzar",

    nav1: "Cómo funciona",
    nav2: "Para compañeros",
    nav3: "Precios",

    badge: "Sesiones en vivo de 30 minutos",

    title1: "Tu inglés,",
    title2: "tu momento.",

    description:
      "Practica conversaciones reales en inglés con compañeros de conversación verificados en sesiones privadas de 30 minutos.",

    mainPromise:
      "Personas reales. Inglés real. Sin clases, sin guiones y sin IA.",

    mainPromiseText:
      "Solo conversación útil para cuando de verdad necesites hablar.",

    studentButton: "Empezar a practicar",
    speakerButton: "Ser compañero de conversación",

    bubble: "Let's practice!",

    situationsBadge: "SITUACIONES REALES",
    situationsTitle1: "¿Necesitas hablar inglés",
    situationsTitle2: "mañana?",
    situationsDescription:
      "Quizá ya estudiaste el vocabulario y la gramática. A veces solo necesitas hablar con una persona real antes de que llegue el momento importante.",

    interviewTitle: "Tengo una entrevista de trabajo",
    interviewText:
      "Practica tus respuestas, presenta tu experiencia y suéltate antes de enfrentar la entrevista real.",

    presentationTitle: "Tengo una presentación",
    presentationText:
      "Ensaya tus ideas en voz alta y explica tu presentación a alguien que te escucha en tiempo real.",

    examTitle: "Tengo un examen",
    examText:
      "Practica speaking para TOEFL, IELTS, DET o un examen oral de preparatoria o universidad.",

    workTitle: "Necesito inglés en el trabajo",
    workText:
      "Practica reuniones, llamadas, explicaciones técnicas y conversaciones cotidianas de trabajo.",

    situationsCallout:
      "Las oportunidades no siempre te dan tiempo para prepararte.",

    situationsCalloutStrong:
      "Practica hoy. Habla con confianza mañana.",

    situationButton: "Practicar ahora",

    differenceBadge: "LA DIFERENCIA BINOLIN",
    differenceTitle1: "La tecnología puede ayudarte a estudiar.",
    differenceTitle2: "Las personas te ayudan a comunicarte.",

    differenceDescription:
      "Una entrevista, una presentación y una conversación real suceden con personas. Binolin te permite practicar esa interacción humana antes de necesitarla.",

    feature1: "Conversaciones reales",
    feature1Text:
      "Habla naturalmente y responde preguntas que no preparaste con anticipación.",

    feature2: "Compañeros verificados",
    feature2Text:
      "Practica con personas reales aprobadas por Binolin para participar en la plataforma.",

    feature3: "Sesiones flexibles",
    feature3Text:
      "Elige un horario conveniente y practica desde donde te encuentres.",

    feature4: "Inglés funcional",
    feature4Text:
      "Enfócate en el inglés que necesitas para el trabajo, la escuela, los viajes y la vida diaria.",

    finalTitle: "Tu próxima oportunidad podría llegar mañana.",
    finalText:
      "No esperes hasta que comience la entrevista, la presentación o la conversación. Practica hoy con una persona real.",

    finalButton: "Comenzar una práctica",
    finalSecondary: "Ver cómo funciona",
  },
};

export default function Home() {
  const [language, setLanguage] = useState("es");
  const t = text[language];

  const situations = [
    {
      icon: "💼",
      title: t.interviewTitle,
      description: t.interviewText,
    },
    {
      icon: "🎤",
      title: t.presentationTitle,
      description: t.presentationText,
    },
    {
      icon: "🎓",
      title: t.examTitle,
      description: t.examText,
    },
    {
      icon: "🏢",
      title: t.workTitle,
      description: t.workText,
    },
  ];

  const features = [
    {
      icon: "💬",
      title: t.feature1,
      description: t.feature1Text,
    },
    {
      icon: "✓",
      title: t.feature2,
      description: t.feature2Text,
    },
    {
      icon: "📅",
      title: t.feature3,
      description: t.feature3Text,
    },
    {
      icon: "🗣️",
      title: t.feature4,
      description: t.feature4Text,
    },
  ];

  return (
    <main className="min-h-screen bg-[#030807] px-4 py-4 text-white">
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_70%_15%,rgba(45,255,85,0.18),transparent_30%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] px-6 py-6 shadow-2xl md:px-10">
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

        {/* PORTADA */}
        <div className="relative z-10 grid min-h-[760px] items-center gap-10 pb-12 pt-12 lg:grid-cols-[1fr_0.95fr] lg:pb-16 lg:pt-4">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/75 backdrop-blur">
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

            {/* LEMA PRINCIPAL */}
            <div className="mt-7 max-w-2xl border-l-4 border-[#39df4a] pl-5">
              <p className="text-lg font-black leading-7 text-white md:text-xl">
                {t.mainPromise}
              </p>

              <p className="mt-2 text-sm leading-6 text-white/55">
                {t.mainPromiseText}
              </p>
            </div>

            <div className="mt-9 flex max-w-xl flex-col gap-4 sm:flex-row">
              <Link
                href="/learner/goals"
                className="rounded-2xl bg-[#39df4a] px-7 py-4 text-center font-extrabold text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.48)] transition hover:bg-[#50ef5f]"
              >
                {t.studentButton}
              </Link>

              <Link
                href="/conversation-partners"
                className="rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-center font-extrabold text-white transition hover:bg-white/10"
              >
                {t.speakerButton}
              </Link>
            </div>
          </div>

          {/* PERSONAJE */}
          <div className="relative mx-auto flex h-[420px] w-full max-w-[560px] items-center justify-center lg:h-[620px]">
            <div className="absolute h-[350px] w-[350px] rounded-full border border-[#53ff68]/20 bg-[#39df4a]/5 sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]" />

            <div className="absolute h-[270px] w-[270px] rounded-full bg-[#39df4a]/10 backdrop-blur-sm sm:h-[340px] sm:w-[340px] lg:h-[390px] lg:w-[390px]" />

            <div className="absolute h-[360px] w-[360px] rounded-full bg-[#39df4a]/10 blur-3xl sm:h-[470px] sm:w-[470px] lg:h-[560px] lg:w-[560px]" />

            <img
              src="/img/alien-tom.png"
              alt="Personaje de Binolin"
              className="relative z-20 h-[350px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.35)] lg:h-[520px]"
            />

            <div className="absolute bottom-5 right-0 z-30 rounded-3xl border border-white/10 bg-[#1f612d]/90 px-6 py-4 text-lg font-bold text-white backdrop-blur sm:bottom-16 sm:px-8 sm:py-5 sm:text-xl">
              {t.bubble}
            </div>
          </div>
        </div>

        {/* CASOS DE USO */}
        <section className="relative z-10 border-t border-white/10 py-20">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-black tracking-[0.28em] text-[#39df4a]">
                {t.situationsBadge}
              </p>

              <h2 className="mt-5 text-4xl font-black leading-[1] tracking-tight md:text-6xl">
                {t.situationsTitle1}
                <br />

                <span className="text-[#39df4a]">
                  {t.situationsTitle2}
                </span>
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-white/60">
              {t.situationsDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {situations.map((situation) => (
              <article
                key={situation.title}
                className="group rounded-[26px] border border-white/10 bg-[#07110f]/90 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#39df4a]/35 hover:bg-[#0a1713]"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#39df4a]/15 text-2xl transition group-hover:bg-[#39df4a]">
                  {situation.icon}
                </div>

                <h3 className="mt-6 text-xl font-black leading-7">
                  {situation.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/55">
                  {situation.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-[26px] border border-[#39df4a]/25 bg-[linear-gradient(135deg,rgba(57,223,74,0.13),rgba(255,255,255,0.025))] p-7 md:flex-row md:items-center md:p-9">
            <div>
              <p className="text-sm leading-6 text-white/55">
                {t.situationsCallout}
              </p>

              <p className="mt-1 text-xl font-black text-white md:text-2xl">
                {t.situationsCalloutStrong}
              </p>
            </div>

            <Link
              href="/learner/goals"
              className="shrink-0 rounded-2xl bg-[#39df4a] px-7 py-4 text-center font-black text-[#031006] shadow-[0_0_25px_rgba(57,223,74,0.3)] transition hover:bg-[#50ef5f]"
            >
              {t.situationButton}
            </Link>
          </div>
        </section>

        {/* DIFERENCIADOR */}
        <section className="relative z-10 border-t border-white/10 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black tracking-[0.28em] text-[#39df4a]">
              {t.differenceBadge}
            </p>

            <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              {t.differenceTitle1}
              <br />

              <span className="text-[#39df4a]">
                {t.differenceTitle2}
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/60">
              {t.differenceDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#39df4a] text-xl font-black text-[#031006] shadow-[0_0_20px_rgba(57,223,74,0.25)]">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-black">{feature.title}</h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* LLAMADO FINAL */}
        <section className="relative z-10 mb-4 overflow-hidden rounded-[30px] border border-[#39df4a]/25 bg-[radial-gradient(circle_at_50%_0%,rgba(57,223,74,0.2),transparent_58%),#06100d] px-7 py-16 text-center md:px-12">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#39df4a]/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mx-auto max-w-4xl text-3xl font-black leading-tight md:text-5xl">
              {t.finalTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
              {t.finalText}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/learner/goals"
                className="rounded-2xl bg-[#39df4a] px-8 py-4 font-black text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.4)] transition hover:bg-[#50ef5f]"
              >
                {t.finalButton}
              </Link>

              <Link
                href="/how-it-works"
                className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-black text-white transition hover:bg-white/10"
              >
                {t.finalSecondary}
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}