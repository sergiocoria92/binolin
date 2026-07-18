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
    signIn: "Iniciar sesión",
    back: "Inicio",
    badge: "Clases en vivo de 30 minutos",
    title1: "Habla inglés.",
    title2: "Vive tu momento.",
    subtitle:
      "Elige el paquete que mejor se adapte a tus metas. Todas las sesiones son privadas y en vivo con coaches verificados.",
    popular: "MÁS POPULAR",
    firstClass: "PRIMERA CLASE",
    oneClass: "1 CLASE",
    starter: "STARTER",
    growth: "GROWTH",
    fluency: "FLUENCY",
    classes4: "4 CLASES",
    classes8: "8 CLASES",
    classes16: "16 CLASES",
    newUsers: "Solo para nuevos usuarios",
    minutes: "30 minutos",
    perClass: "por clase",
    tryIt: "PRUÉBALO",
    flexible: "FLEXIBLE",
    start: "EMPIEZA",
    chosen: "MÁS ELEGIDO",
    maxLevel: "MÁXIMO NIVEL",
    benefit1: "Clases en vivo",
    benefit1Text: "Habla, practica y mejora en tiempo real.",
    benefit2: "100% personalizado",
    benefit2Text: "Aprende a tu ritmo con coaches que te entienden.",
    benefit3: "Resultados reales",
    benefit3Text: "Más confianza, más fluidez y más oportunidades.",
  },
  en: {

    nav1: "How it works",
    nav2: "For partners",
    nav3: "Pricing",
    start: "Get started",
    signIn: "Sign in",
    back: "Home",
    badge: "30-minute live classes",
    title1: "Speak English.",
    title2: "Live your moment.",
    subtitle:
      "Choose the package that best fits your goals. Every session is private and live with a verified coach.",
    popular: "MOST POPULAR",
    firstClass: "FIRST CLASS",
    oneClass: "1 CLASS",
    starter: "STARTER",
    growth: "GROWTH",
    fluency: "FLUENCY",
    classes4: "4 CLASSES",
    classes8: "8 CLASSES",
    classes16: "16 CLASSES",
    newUsers: "New users only",
    minutes: "30 minutes",
    perClass: "per class",
    tryIt: "TRY IT",
    flexible: "FLEXIBLE",
    start: "START",
    chosen: "MOST CHOSEN",
    maxLevel: "MAXIMUM LEVEL",
    benefit1: "Live classes",
    benefit1Text: "Speak, practice and improve in real time.",
    benefit2: "100% personalized",
    benefit2Text: "Learn at your own pace with coaches who understand you.",
    benefit3: "Real results",
    benefit3Text: "More confidence, more fluency and more opportunities.",
  },
};

export default function PricingPage() {
  const [language, setLanguage] = useState("es");
  const t = content[language];

  const plans = [
    {
      icon: "🚀",
      name: t.firstClass,
      classes: "",
      price: "$9.99",
      detail: t.newUsers,
      button: t.tryIt,
      href: "/learner/goals",
    },
    {
      icon: "👤",
      name: t.oneClass,
      classes: "",
      price: "$15.99",
      detail: t.minutes,
      button: t.flexible,
      href: "/learner/goals",
    },
    {
      icon: "📅",
      name: t.starter,
      classes: t.classes4,
      price: "$59",
      detail: "$14.75 / " + t.perClass,
      button: t.start,
      href: "/learner/goals",
    },
    {
      icon: "⭐",
      name: t.growth,
      classes: t.classes8,
      price: "$99.99",
      detail: "$12.50 / " + t.perClass,
      button: t.chosen,
      href: "/learner/goals",
      popular: true,
    },
    {
      icon: "♛",
      name: t.fluency,
      classes: t.classes16,
      price: "$179",
      detail: "$11.19 / " + t.perClass,
      button: t.maxLevel,
      href: "/learner/goals",
    },
  ];

  return (
    <main className="min-h-screen bg-[#020706] px-4 py-4 text-white">
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_70%_10%,rgba(45,255,85,0.17),transparent_35%),linear-gradient(135deg,#06100f_0%,#020706_60%,#010303_100%)] px-6 py-6 shadow-2xl md:px-10">
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
        <div className="relative z-10 mx-auto max-w-4xl pb-12 pt-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75">
            <span className="h-2.5 w-2.5 rounded-full bg-[#39df4a] shadow-[0_0_14px_rgba(57,223,74,0.9)]" />
            {t.badge}
          </div>

          <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            {t.title1}
            <br />
            <span className="text-[#39df4a]">{t.title2}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="relative z-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex min-h-[430px] flex-col overflow-hidden rounded-[26px] border bg-[#07110f]/90 ${
                plan.popular
                  ? "border-[#39df4a] shadow-[0_0_35px_rgba(57,223,74,0.2)]"
                  : "border-white/15"
              }`}
            >
              {plan.popular && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl bg-[#63e83f] px-5 py-2 text-xs font-black text-[#041006]">
                  {t.popular}
                </div>
              )}

              <div className={`flex flex-1 flex-col p-6 ${plan.popular ? "pt-14" : ""}`}>
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#57e83e] text-2xl text-[#041006] shadow-[0_0_22px_rgba(87,232,62,0.28)]">
                  {plan.icon}
                </div>

                <h2 className="mt-7 text-2xl font-black leading-tight">
                  {plan.name}
                </h2>

                {plan.classes && (
                  <p className="mt-1 text-xl font-semibold text-white/80">
                    {plan.classes}
                  </p>
                )}

                <p className="mt-7 text-4xl font-black text-[#60df3d]">
                  {plan.price}
                </p>

                <div className="my-6 h-px w-12 bg-white/25" />

                <p className="text-sm leading-6 text-white/65">{plan.detail}</p>
              </div>

              <Link
                href={plan.href}
                className={`block px-4 py-4 text-center text-sm font-black ${
                  plan.popular
                    ? "bg-[#63e83f] text-[#041006]"
                    : "bg-[#173822] text-white"
                } hover:brightness-110`}
              >
                {plan.button}
              </Link>
            </article>
          ))}
        </div>

        <div className="relative z-10 mt-12 grid gap-6 rounded-[28px] border border-white/10 bg-white/[0.035] p-7 md:grid-cols-3">
          {[
            ["🛡️", t.benefit1, t.benefit1Text],
            ["🎯", t.benefit2, t.benefit2Text],
            ["🏆", t.benefit3, t.benefit3Text],
          ].map(([icon, title, description]) => (
            <div
              key={title}
              className="flex items-start gap-4 md:border-r md:border-white/10 md:pr-6 last:border-r-0"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#39df4a]/15 text-2xl">
                {icon}
              </div>

              <div>
                <h3 className="font-black uppercase">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}