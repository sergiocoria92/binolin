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
  <main className="min-h-screen px-4 py-4">
    {/* Contenedor principal de Binolin..  */}

    <section
        className="relative w-full overflow-hidden bg-transparent" /* esto fue para el color de fondo  */
      >
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
 
        {/* PORTADA */}
        <div className="binolin-page relative z-10 grid min-h-[760px] items-center gap-10 pb-12 pt-12 lg:grid-cols-[1fr_0.95fr] lg:pb-16 lg:pt-4">
          <div>
            <div className="binolin-badge mb-7 inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold">
              <span className="binolin-status-dot h-2.5 w-2.5 rounded-full" />
              {t.badge}
            </div>

            <h1 className="binolin-heading max-w-2xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              {t.title1}
              <br />
              <span className="binolin-accent">{t.title2}</span>
            </h1>

            <p className="binolin-description mt-7 max-w-xl text-lg leading-8">
              {t.description}
            </p>

            {/* LEMA PRINCIPAL */}
            <div className="binolin-accent-border mt-7 max-w-2xl border-l-4 pl-5">
              <p className="binolin-heading text-lg font-black leading-7 md:text-xl">
                {t.mainPromise}
              </p>

              <p className="binolin-description mt-2 text-sm leading-6">
                {t.mainPromiseText}
              </p>
            </div>

            <div className="mt-9 flex max-w-xl flex-col gap-4 sm:flex-row">
              <Link
                href="/learner/goals"
                className="binolin-primary-btn rounded-2xl px-7 py-4 text-center font-extrabold"
              >
                {t.studentButton}
              </Link>

              <Link
                href="/conversation-partners"
                className="binolin-secondary-btn rounded-2xl px-7 py-4 text-center font-extrabold"
              >
                {t.speakerButton}
              </Link>
            </div>
          </div>

          {/* AQUI ESTA LA ANIMACION*/}
          
          {/* ANIMACIÓN PRINCIPAL DE BINOLIN */}
          <div className="binolin-video-container relative mx-auto flex h-[420px] w-full max-w-[560px] items-center justify-center lg:h-[620px]">
            <video
              className="binolin-hero-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source
                src="/videos/binolin-animation2-v2.webm"
                type="video/webm"
              />
              Tu navegador no soporta videos HTML5.
            </video>
          </div>
        </div>


        {/* CASOS DE USO */}
        <section className="binolin-page binolin-section-divider relative z-10 border-t py-20">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="binolin-accent text-xs font-black tracking-[0.28em]">
                {t.situationsBadge}
              </p>

              <h2 className="binolin-heading mt-5 text-4xl font-black leading-[1] tracking-tight md:text-6xl">
                {t.situationsTitle1}
                <br />
                <span className="binolin-accent">
                  {t.situationsTitle2}
                </span>
              </h2>
            </div>

            <p className="binolin-description max-w-2xl text-lg leading-8">
              {t.situationsDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {situations.map((situation) => (
              <article
                key={situation.title}
                className="binolin-card group rounded-[26px] p-6"
              >
                <div className="binolin-icon-bg grid h-14 w-14 place-items-center rounded-full text-2xl transition">
                  {situation.icon}
                </div>

                <h3 className="binolin-heading mt-6 text-xl font-black leading-7">
                  {situation.title}
                </h3>

                <p className="binolin-description mt-4 text-sm leading-7">
                  {situation.description}
                </p>
              </article>
            ))}
          </div>

          <div className="binolin-callout mt-8 flex flex-col items-start justify-between gap-6 rounded-[26px] p-7 md:flex-row md:items-center md:p-9">
            <div>
              <p className="binolin-description text-sm leading-6">
                {t.situationsCallout}
              </p>

              <p className="binolin-heading mt-1 text-xl font-black md:text-2xl">
                {t.situationsCalloutStrong}
              </p>
            </div>

            <Link
              href="/learner/goals"
              className="binolin-primary-btn shrink-0 rounded-2xl px-7 py-4 text-center font-black"
            >
              {t.situationButton}
            </Link>
          </div>
        </section>

        {/* DIFERENCIADOR */}
        <section className="binolin-page binolin-section-divider relative z-10 border-t py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="binolin-accent text-xs font-black tracking-[0.28em]">
              {t.differenceBadge}
            </p>

            <h2 className="binolin-heading mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              {t.differenceTitle1}
              <br />
              <span className="binolin-accent">
                {t.differenceTitle2}
              </span>
            </h2>

            <p className="binolin-description mx-auto mt-7 max-w-3xl text-lg leading-8">
              {t.differenceDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="binolin-card rounded-[24px] p-6"
              >
                <div className="binolin-icon-bg grid h-12 w-12 place-items-center rounded-full text-xl font-black">
                  {feature.icon}
                </div>

                <h3 className="binolin-heading mt-5 text-lg font-black">
                  {feature.title}
                </h3>

                <p className="binolin-description mt-3 text-sm leading-7">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* LLAMADO FINAL */}
        <section className="binolin-page binolin-final-cta relative z-10 mb-4 overflow-hidden rounded-[30px] px-7 py-16 text-center md:px-12">
          <div className="binolin-final-glow pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full" />

          <div className="relative z-10">
            <h2 className="binolin-heading mx-auto max-w-4xl text-3xl font-black leading-tight md:text-5xl">
              {t.finalTitle}
            </h2>

            <p className="binolin-description mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg">
              {t.finalText}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/learner/goals"
                className="binolin-primary-btn rounded-2xl px-8 py-4 font-black"
              >
                {t.finalButton}
              </Link>

              <Link
                href="/how-it-works"
                className="binolin-secondary-btn rounded-2xl px-8 py-4 font-black"
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
