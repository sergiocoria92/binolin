"use client";
import PublicNavbar from "../components/PublicNavbar";
import { useState } from "react";
import Link from "next/link";

const content = {
  es: {

    nav1: "Cómo funciona",
    nav2: "Para compañeros",
    nav3: "Precios",
    start: "Comenzar",
    home: "Inicio",
    pricing: "Precios",
    partners: "Compañeros",
    signIn: "Iniciar sesión",
    badge: "Así funciona Binolin",

    title1: "Dos personas.",
    title2: "Una conversación real.",

    description:
      "Binolin conecta a personas que desean practicar inglés con compañeros de conversación verificados para tener sesiones privadas y en vivo de 30 minutos.",

    learnerLabel: "SOY PRACTICANTE",
    learnerTitle: "Quiero practicar inglés",
    learnerDescription:
      "El practicante es la persona que desea desarrollar confianza, fluidez y comprensión mediante conversaciones reales.",

    learnerStep1Title: "Selecciona tu objetivo",
    learnerStep1Text:
      "Cuéntanos por qué deseas practicar: trabajo, entrevistas, viajes, estudios o conversaciones cotidianas.",

    learnerStep2Title: "Elige una sesión",
    learnerStep2Text:
      "Selecciona una fecha y horario disponible para una sesión privada de 30 minutos.",

    learnerStep3Title: "Conéctate en vivo",
    learnerStep3Text:
      "Entra a la sala privada y conversa con un compañero verificado por Binolin.",

    learnerStep4Title: "Practica inglés real",
    learnerStep4Text:
      "Habla, escucha, formula preguntas y aprende expresiones utilizadas en conversaciones cotidianas.",

    learnerStep5Title: "Continúa progresando",
    learnerStep5Text:
      "Practica regularmente para ganar seguridad, mejorar tu fluidez y expresarte con mayor naturalidad.",

    learnerButton: "Empezar a practicar",

    partnerLabel: "SOY COMPAÑERO DE CONVERSACIÓN",
    partnerTitle: "Quiero conversar y generar ingresos",
    partnerDescription:
      "El compañero de conversación es una persona aprobada por Binolin que utiliza su inglés para ayudar al practicante a conversar.",

    partnerStep1Title: "Crea tu perfil",
    partnerStep1Text:
      "Completa tu información personal y proporciona los datos necesarios para la verificación.",

    partnerStep2Title: "Aprueba la evaluación",
    partnerStep2Text:
      "Binolin revisará tu fluidez, claridad, pronunciación y capacidad para mantener una conversación natural.",

    partnerStep3Title: "Publica tu disponibilidad",
    partnerStep3Text:
      "Después de ser aprobado, selecciona los días y horarios en los que deseas recibir sesiones.",

    partnerStep4Title: "Conversa y apoya",
    partnerStep4Text:
      "Escucha, formula preguntas y ayuda al practicante con expresiones o pronunciación cuando sea necesario.",

    partnerStep5Title: "Recibe tu ganancia",
    partnerStep5Text:
      "Al completar correctamente una sesión, el pago correspondiente se añade a tu cuenta.",

    partnerButton: "Información para compañeros",

    connectionTitle: "¿Qué sucede durante una sesión?",
    connectionIntro:
      "Cada sesión conecta a un practicante con un compañero de conversación dentro de una sala privada de Binolin.",

    during1Title: "Duración",
    during1Text: "Cada sesión tiene una duración aproximada de 30 minutos.",

    during2Title: "Conversación privada",
    during2Text:
      "La sesión se realiza únicamente entre el practicante y el compañero asignado.",

    during3Title: "Temas reales",
    during3Text:
      "Pueden hablar sobre trabajo, familia, viajes, cultura, entrevistas o situaciones cotidianas.",

    during4Title: "Apoyo práctico",
    during4Text:
      "El compañero puede ayudar con pronunciación, frases naturales y preguntas para mantener la conversación.",

    during5Title: "Seguridad",
    during5Text:
      "Ambas personas pueden finalizar y reportar la sesión si existe una conducta inapropiada.",

    during6Title: "Sin clases tradicionales",
    during6Text:
      "No hay tareas, exámenes ni un programa académico obligatorio.",

    differenceTitle: "Esto no es una clase tradicional",

    differenceText1:
      "El compañero de conversación no reemplaza a un maestro de inglés, una escuela o una certificación académica.",

    differenceText2:
      "Su función es crear un espacio real para hablar, escuchar y desarrollar confianza mediante la práctica.",

    teacherTitle: "Una clase tradicional",
    teacher1: "Programa académico y lecciones",
    teacher2: "Explicaciones formales de gramática",
    teacher3: "Tareas, ejercicios y evaluaciones",
    teacher4: "Relación entre maestro y estudiante",

    binolinTitle: "Una sesión en Binolin",
    binolin1: "Conversación natural de 30 minutos",
    binolin2: "Temas relevantes para el practicante",
    binolin3: "Apoyo básico con pronunciación y expresiones",
    binolin4: "Relación entre practicante y compañero",

    verifiedTitle: "¿Qué significa compañero verificado?",

    verifiedText:
      "Crear una cuenta no convierte automáticamente a una persona en compañero de conversación. Cada aspirante debe completar el proceso de revisión establecido por Binolin.",

    verified1: "Ser mayor de 18 años.",
    verified2: "Verificar su identidad y residencia en Estados Unidos.",
    verified3:
      "Hablar inglés como primer idioma o demostrar un dominio oral equivalente.",
    verified4:
      "Aprobar una evaluación de fluidez, claridad, pronunciación y conversación.",
    verified5: "Aceptar las reglas de seguridad y conducta.",

    finalTitle: "Elige cómo quieres participar.",
    finalText:
      "Practica inglés mediante conversaciones reales o utiliza tu inglés para ayudar a otras personas.",

    finalLearner: "Quiero practicar",
    finalPartner: "Quiero ser compañero",
  },

  en: {
    nav1: "How it works",
    nav2: "For partners",
    nav3: "Pricing",
    start: "Get started",
    home: "Home",
    pricing: "Pricing",
    partners: "Partners",
    signIn: "Sign in",
    badge: "How Binolin works",

    title1: "Two people.",
    title2: "One real conversation.",

    description:
      "Binolin connects people who want to practice English with verified conversation partners through private, live 30-minute sessions.",

    learnerLabel: "I AM A LEARNER",
    learnerTitle: "I want to practice English",
    learnerDescription:
      "The learner is the person who wants to build confidence, fluency and comprehension through real conversations.",

    learnerStep1Title: "Choose your goal",
    learnerStep1Text:
      "Tell us why you want to practice: work, interviews, travel, school or everyday conversations.",

    learnerStep2Title: "Choose a session",
    learnerStep2Text:
      "Select an available date and time for a private 30-minute session.",

    learnerStep3Title: "Join live",
    learnerStep3Text:
      "Enter the private room and talk with a conversation partner verified by Binolin.",

    learnerStep4Title: "Practice real English",
    learnerStep4Text:
      "Speak, listen, ask questions and learn expressions used in everyday conversations.",

    learnerStep5Title: "Keep progressing",
    learnerStep5Text:
      "Practice regularly to build confidence, improve fluency and express yourself more naturally.",

    learnerButton: "Start practicing",

    partnerLabel: "I AM A CONVERSATION PARTNER",
    partnerTitle: "I want to talk and earn",
    partnerDescription:
      "The conversation partner is a person approved by Binolin who uses their English to help the learner practice speaking.",

    partnerStep1Title: "Create your profile",
    partnerStep1Text:
      "Complete your personal information and provide the details required for verification.",

    partnerStep2Title: "Pass the evaluation",
    partnerStep2Text:
      "Binolin reviews your fluency, clarity, pronunciation and ability to maintain a natural conversation.",

    partnerStep3Title: "Set your availability",
    partnerStep3Text:
      "After approval, choose the days and times when you would like to receive sessions.",

    partnerStep4Title: "Talk and support",
    partnerStep4Text:
      "Listen, ask questions and help the learner with expressions or pronunciation when appropriate.",

    partnerStep5Title: "Receive your earnings",
    partnerStep5Text:
      "After successfully completing a session, the corresponding payment is added to your account.",

    partnerButton: "Conversation partner information",

    connectionTitle: "What happens during a session?",
    connectionIntro:
      "Each session connects one learner with one conversation partner inside a private Binolin room.",

    during1Title: "Duration",
    during1Text: "Each session lasts approximately 30 minutes.",

    during2Title: "Private conversation",
    during2Text:
      "The session only includes the learner and the assigned conversation partner.",

    during3Title: "Real topics",
    during3Text:
      "They can discuss work, family, travel, culture, interviews or everyday situations.",

    during4Title: "Practical support",
    during4Text:
      "The partner can help with pronunciation, natural phrases and questions that keep the conversation moving.",

    during5Title: "Safety",
    during5Text:
      "Either person can end and report the session if inappropriate conduct occurs.",

    during6Title: "No traditional classes",
    during6Text:
      "There is no homework, testing or mandatory academic curriculum.",

    differenceTitle: "This is not a traditional class",

    differenceText1:
      "A conversation partner does not replace an English teacher, school or academic certification.",

    differenceText2:
      "Their role is to create a real environment for speaking, listening and building confidence through practice.",

    teacherTitle: "A traditional class",
    teacher1: "Academic curriculum and lessons",
    teacher2: "Formal grammar explanations",
    teacher3: "Homework, exercises and testing",
    teacher4: "Teacher and student relationship",

    binolinTitle: "A Binolin session",
    binolin1: "Natural 30-minute conversation",
    binolin2: "Topics relevant to the learner",
    binolin3: "Basic pronunciation and expression support",
    binolin4: "Learner and conversation partner relationship",

    verifiedTitle: "What does verified partner mean?",

    verifiedText:
      "Creating an account does not automatically make someone a conversation partner. Every applicant must complete Binolin’s review process.",

    verified1: "Be at least 18 years old.",
    verified2: "Verify their identity and U.S. residency.",
    verified3:
      "Speak English as a first language or demonstrate equivalent spoken proficiency.",
    verified4:
      "Pass an evaluation of fluency, clarity, pronunciation and conversational ability.",
    verified5: "Accept the safety and conduct rules.",

    finalTitle: "Choose how you want to participate.",
    finalText:
      "Practice English through real conversations or use your English to help other people.",

    finalLearner: "I want to practice",
    finalPartner: "I want to become a partner",
  },
};

export default function HowItWorksPage() {
  const [language, setLanguage] = useState("es");
  const t = content[language];

  const learnerSteps = [
    [t.learnerStep1Title, t.learnerStep1Text],
    [t.learnerStep2Title, t.learnerStep2Text],
    [t.learnerStep3Title, t.learnerStep3Text],
    [t.learnerStep4Title, t.learnerStep4Text],
    [t.learnerStep5Title, t.learnerStep5Text],
  ];

  const partnerSteps = [
    [t.partnerStep1Title, t.partnerStep1Text],
    [t.partnerStep2Title, t.partnerStep2Text],
    [t.partnerStep3Title, t.partnerStep3Text],
    [t.partnerStep4Title, t.partnerStep4Text],
    [t.partnerStep5Title, t.partnerStep5Text],
  ];

  const sessionDetails = [
    ["⏱️", t.during1Title, t.during1Text],
    ["🔒", t.during2Title, t.during2Text],
    ["💬", t.during3Title, t.during3Text],
    ["🗣️", t.during4Title, t.during4Text],
    ["🛡️", t.during5Title, t.during5Text],
    ["📚", t.during6Title, t.during6Text],
  ];

  const teacherItems = [
    t.teacher1,
    t.teacher2,
    t.teacher3,
    t.teacher4,
  ];

  const binolinItems = [
    t.binolin1,
    t.binolin2,
    t.binolin3,
    t.binolin4,
  ];

  const verifiedItems = [
    t.verified1,
    t.verified2,
    t.verified3,
    t.verified4,
    t.verified5,
  ];

  return (
    <main className="min-h-screen bg-[#020706] px-4 py-4 text-white">
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_72%_8%,rgba(45,255,85,0.18),transparent_30%),linear-gradient(135deg,#06100f_0%,#020706_60%,#010303_100%)] px-6 py-6 shadow-2xl md:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />

     <PublicNavbar
            language={language}
            setLanguage={setLanguage}
            signInText={t.signIn}
            startText={t.start}
            howText={t.nav1}
            partnersText={t.nav2}
            pricingText={t.nav3}
            />

        <header className="relative z-10 mx-auto max-w-4xl pb-16 pt-20 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75">
            <span className="h-2.5 w-2.5 rounded-full bg-[#39df4a] shadow-[0_0_14px_rgba(57,223,74,0.9)]" />
            {t.badge}
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            {t.title1}
            <br />
            <span className="text-[#39df4a]">{t.title2}</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/65">
            {t.description}
          </p>
        </header>

        <div className="relative z-10 space-y-12">
          <section className="grid gap-7 xl:grid-cols-2">
            <RoleCard
              icon="🎧"
              label={t.learnerLabel}
              title={t.learnerTitle}
              description={t.learnerDescription}
              steps={learnerSteps}
              buttonText={t.learnerButton}
              buttonHref="/learner/goals"
            />

            <RoleCard
              icon="💬"
              label={t.partnerLabel}
              title={t.partnerTitle}
              description={t.partnerDescription}
              steps={partnerSteps}
              buttonText={t.partnerButton}
              buttonHref="/conversation-partners"
              highlighted
            />
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7 md:p-10">
            <SectionNumber number="01" />

            <h2 className="mt-4 text-3xl font-black">
              {t.connectionTitle}
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-white/65">
              {t.connectionIntro}
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {sessionDetails.map(([icon, title, description]) => (
                <article
                  key={title}
                  className="rounded-[24px] border border-white/10 bg-[#07110f]/90 p-6"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#39df4a]/15 text-xl">
                    {icon}
                  </div>

                  <h3 className="mt-5 text-lg font-black">{title}</h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-amber-300/20 bg-amber-300/[0.045] p-7 md:p-10">
            <SectionNumber number="02" />

            <h2 className="mt-4 text-3xl font-black">
              {t.differenceTitle}
            </h2>

            <div className="mt-5 max-w-4xl space-y-3 leading-8 text-white/65">
              <p>{t.differenceText1}</p>
              <p>{t.differenceText2}</p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <ComparisonCard
                icon="📚"
                title={t.teacherTitle}
                items={teacherItems}
              />

              <ComparisonCard
                icon="🗣️"
                title={t.binolinTitle}
                items={binolinItems}
                highlighted
              />
            </div>
          </section>

          <section className="grid gap-8 rounded-[28px] border border-[#39df4a]/25 bg-[linear-gradient(135deg,rgba(57,223,74,0.11),rgba(255,255,255,0.025))] p-7 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionNumber number="03" />

              <h2 className="mt-4 text-3xl font-black">
                {t.verifiedTitle}
              </h2>

              <p className="mt-5 leading-8 text-white/65">
                {t.verifiedText}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#07110f]/90 p-7">
              <ul className="space-y-5">
                {verifiedItems.map((item, index) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#39df4a] text-sm font-black text-[#031006]">
                      {index + 1}
                    </span>

                    <span className="pt-1 text-sm leading-7 text-white/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-[30px] border border-[#39df4a]/25 bg-[radial-gradient(circle_at_50%_0%,rgba(57,223,74,0.18),transparent_55%),#06100d] px-7 py-14 text-center md:px-10">
            <h2 className="text-3xl font-black md:text-5xl">
              {t.finalTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/65">
              {t.finalText}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/learner/goals"
                className="rounded-2xl bg-[#39df4a] px-8 py-4 font-black text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.4)] hover:bg-[#50ef5f]"
              >
                {t.finalLearner}
              </Link>

              <Link
                href="/conversation-partners"
                className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-black text-white hover:bg-white/10"
              >
                {t.finalPartner}
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function RoleCard({
  icon,
  label,
  title,
  description,
  steps,
  buttonText,
  buttonHref,
  highlighted = false,
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[28px] border p-7 md:p-9 ${
        highlighted
          ? "border-[#39df4a]/35 bg-[linear-gradient(145deg,rgba(57,223,74,0.12),rgba(7,17,15,0.95))] shadow-[0_0_35px_rgba(57,223,74,0.08)]"
          : "border-white/10 bg-[#07110f]/90"
      }`}
    >
      <div
        className={`grid h-14 w-14 place-items-center rounded-full text-2xl ${
          highlighted
            ? "bg-[#39df4a] text-[#031006]"
            : "bg-white/10 text-white"
        }`}
      >
        {icon}
      </div>

      <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-[#39df4a]">
        {label}
      </p>

      <h2 className="mt-3 text-3xl font-black">{title}</h2>

      <p className="mt-4 leading-7 text-white/60">{description}</p>

      <div className="mt-8 space-y-4">
        {steps.map(([stepTitle, stepText], index) => (
          <div
            key={stepTitle}
            className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black ${
                highlighted
                  ? "bg-[#39df4a] text-[#031006]"
                  : "bg-white/10 text-white"
              }`}
            >
              {index + 1}
            </span>

            <div>
              <h3 className="font-black">{stepTitle}</h3>

              <p className="mt-1 text-sm leading-6 text-white/55">
                {stepText}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href={buttonHref}
        className={`mt-8 block rounded-2xl px-6 py-4 text-center font-black ${
          highlighted
            ? "bg-[#39df4a] text-[#031006] hover:bg-[#50ef5f]"
            : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
        }`}
      >
        {buttonText}
      </Link>
    </article>
  );
}

function ComparisonCard({ icon, title, items, highlighted = false }) {
  return (
    <article
      className={`rounded-[24px] border p-6 ${
        highlighted
          ? "border-[#39df4a]/30 bg-[#39df4a]/10"
          : "border-white/10 bg-black/20"
      }`}
    >
      <div className="text-3xl">{icon}</div>

      <h3 className="mt-5 text-xl font-black">{title}</h3>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-black ${
                highlighted
                  ? "bg-[#39df4a] text-[#031006]"
                  : "bg-white/10 text-white"
              }`}
            >
              ✓
            </span>

            <span className="text-sm leading-7 text-white/65">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SectionNumber({ number }) {
  return (
    <span className="text-xs font-black tracking-[0.3em] text-[#39df4a]">
      {number}
    </span>
  );
}