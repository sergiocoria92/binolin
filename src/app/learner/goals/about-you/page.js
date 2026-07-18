"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PublicNavbar from "../../../components/PublicNavbar";

const content = {
  es: {
    signIn: "Iniciar sesión",
    start: "Comenzar",
    nav1: "Cómo funciona",
    nav2: "Para compañeros",
    nav3: "Precios",

    back: "Regresar a objetivos",
    step: "Paso 2",
    title: "Cuéntanos sobre ti",
    description:
      "Esta información ayudará a Binolin a encontrar un compañero de conversación y una sesión adecuados para tu nivel y disponibilidad.",

    nativeLanguage: "Idioma nativo",
    spanish: "Español",
    portuguese: "Portugués",
    japanese: "Japonés",
    korean: "Coreano",
    french: "Francés",
    other: "Otro",

    englishLevel: "Nivel de inglés",
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",

    preferredSchedule: "Horario preferido",
    noPreference: "Sin preferencia",
    morning: "Mañana",
    afternoon: "Tarde",
    evening: "Noche",

    requirementsTitle: "Antes de continuar",

    ageOption: "Confirmo que tengo 18 años o más.",

    equipmentOption:
      "Confirmo que cuento con conexión estable a Internet y una computadora o teléfono con cámara y micrófono para realizar la sesión.",

    quietPlaceOption:
      "Confirmo que puedo participar desde un lugar adecuado para mantener una conversación de 30 minutos.",

    button: "Encontrar compañero de conversación",

    incompleteMessage:
      "Debes confirmar los requisitos antes de continuar.",

    imageAlt: "Personajes de Binolin conversando",
  },

  en: {
    signIn: "Sign in",
    start: "Get started",
    nav1: "How it works",
    nav2: "For partners",
    nav3: "Pricing",

    back: "Back to goals",
    step: "Step 2",
    title: "Tell us about yourself",
    description:
      "This information will help Binolin find a conversation partner and a session that match your level and availability.",

    nativeLanguage: "Native language",
    spanish: "Spanish",
    portuguese: "Portuguese",
    japanese: "Japanese",
    korean: "Korean",
    french: "French",
    other: "Other",

    englishLevel: "English level",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",

    preferredSchedule: "Preferred schedule",
    noPreference: "No preference",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",

    requirementsTitle: "Before continuing",

    ageOption: "I confirm that I am 18 years old or older.",

    equipmentOption:
      "I confirm that I have a stable Internet connection and a computer or phone with a camera and microphone for the session.",

    quietPlaceOption:
      "I confirm that I can participate from an appropriate place for a 30-minute conversation.",

    button: "Find a conversation partner",

    incompleteMessage:
      "You must confirm the requirements before continuing.",

    imageAlt: "Binolin characters having a conversation",
  },
};

export default function AboutYouPage() {
  const [language, setLanguage] = useState("es");

  const [nativeLanguage, setNativeLanguage] = useState("Spanish");
  const [englishLevel, setEnglishLevel] = useState("Beginner");
  const [preferredSchedule, setPreferredSchedule] =
    useState("No preference");

  const [isAdult, setIsAdult] = useState(false);
  const [hasEquipment, setHasEquipment] = useState(false);
  const [hasAppropriatePlace, setHasAppropriatePlace] = useState(false);

  const searchParams = useSearchParams();
  const goal = searchParams.get("goal") || "Daily Conversation";

  const t = content[language];

  const requirementsAccepted =
    isAdult && hasEquipment && hasAppropriatePlace;

  const nextUrl = `/learner/booking?goal=${encodeURIComponent(
    goal
  )}&nativeLanguage=${encodeURIComponent(
    nativeLanguage
  )}&englishLevel=${encodeURIComponent(
    englishLevel
  )}&preferredSchedule=${encodeURIComponent(preferredSchedule)}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
      <section className="relative mx-auto min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_85%_20%,rgba(57,223,74,0.18),transparent_28%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] px-6 py-6 shadow-2xl md:px-10">
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
            href="/learner/goals"
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

              <form className="mt-10 space-y-6 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:p-8">
                <div>
                  <label
                    htmlFor="native-language"
                    className="mb-2 block font-semibold text-white/80"
                  >
                    {t.nativeLanguage}
                  </label>

                  <select
                    id="native-language"
                    value={nativeLanguage}
                    onChange={(event) =>
                      setNativeLanguage(event.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#071110] px-5 py-4 text-white outline-none transition focus:border-[#39df4a]/60"
                  >
                    <option value="Spanish">{t.spanish}</option>
                    <option value="Portuguese">{t.portuguese}</option>
                    <option value="Japanese">{t.japanese}</option>
                    <option value="Korean">{t.korean}</option>
                    <option value="French">{t.french}</option>
                    <option value="Other">{t.other}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="english-level"
                    className="mb-2 block font-semibold text-white/80"
                  >
                    {t.englishLevel}
                  </label>

                  <select
                    id="english-level"
                    value={englishLevel}
                    onChange={(event) =>
                      setEnglishLevel(event.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#071110] px-5 py-4 text-white outline-none transition focus:border-[#39df4a]/60"
                  >
                    <option value="Beginner">{t.beginner}</option>
                    <option value="Intermediate">
                      {t.intermediate}
                    </option>
                    <option value="Advanced">{t.advanced}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="preferred-schedule"
                    className="mb-2 block font-semibold text-white/80"
                  >
                    {t.preferredSchedule}
                  </label>

                  <select
                    id="preferred-schedule"
                    value={preferredSchedule}
                    onChange={(event) =>
                      setPreferredSchedule(event.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#071110] px-5 py-4 text-white outline-none transition focus:border-[#39df4a]/60"
                  >
                    <option value="No preference">
                      {t.noPreference}
                    </option>
                    <option value="Morning">{t.morning}</option>
                    <option value="Afternoon">{t.afternoon}</option>
                    <option value="Evening">{t.evening}</option>
                  </select>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 md:p-6">
                  <h2 className="font-black text-white">
                    {t.requirementsTitle}
                  </h2>

                  <div className="mt-5 space-y-4">
                    <RequirementCheckbox
                      checked={isAdult}
                      onChange={setIsAdult}
                      label={t.ageOption}
                    />

                    <RequirementCheckbox
                      checked={hasEquipment}
                      onChange={setHasEquipment}
                      label={t.equipmentOption}
                    />

                    <RequirementCheckbox
                      checked={hasAppropriatePlace}
                      onChange={setHasAppropriatePlace}
                      label={t.quietPlaceOption}
                    />
                  </div>
                </div>

                {requirementsAccepted ? (
                  <Link
                    href={nextUrl}
                    className="block rounded-2xl bg-[#39df4a] py-4 text-center font-black text-[#031006] shadow-[0_0_30px_rgba(57,223,74,0.45)] transition hover:bg-[#50ef5f]"
                  >
                    {t.button}
                  </Link>
                ) : (
                  <div>
                    <button
                      type="button"
                      disabled
                      className="block w-full cursor-not-allowed rounded-2xl bg-white/10 py-4 text-center font-black text-white/35"
                    >
                      {t.button}
                    </button>

                    <p className="mt-3 text-center text-sm text-white/40">
                      {t.incompleteMessage}
                    </p>
                  </div>
                )}
              </form>
            </div>

            <div className="flex items-start justify-center lg:sticky lg:top-10 lg:justify-end lg:pt-16">
              <div className="relative flex h-[360px] w-full max-w-[380px] items-center justify-center">
                <div className="absolute h-[300px] w-[300px] rounded-full border border-[#39df4a]/15 bg-[#39df4a]/5" />

                <div className="absolute h-[230px] w-[230px] rounded-full bg-[#39df4a]/10" />

                <div className="absolute h-[340px] w-[340px] rounded-full bg-[#39df4a]/10 blur-3xl" />

                <img
                  src="/img/fase-2.png"
                  alt={t.imageAlt}
                  className="relative z-10 mx-auto w-[260px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.28)] lg:w-[360px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function RequirementCheckbox({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-[#39df4a]/30 hover:bg-[#39df4a]/5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 accent-[#39df4a]"
      />

      <span className="text-sm leading-6 text-white/65">{label}</span>
    </label>
  );
}