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
    signIn: "Iniciar sesión",
    apply: "Crear perfil",
    badge: "Información para compañeros de conversación",

    title1: "Conversa en inglés.",
    title2: "Ayuda y genera ingresos.",

    description:
    "Utiliza tu inglés para ayudar a otras personas a practicar conversaciones reales mediante sesiones privadas y en vivo de 30 minutos.",

    clarification:
    "No necesitas ser maestro ni tener experiencia enseñando. Todos los aspirantes deberán cumplir los requisitos y aprobar el proceso de verificación de Binolin.",

    whatTitle: "¿Qué es un compañero de conversación?",

    

    whatText1:
      "En Binolin creemos que muchas personas tienen la capacidad de mantener conversaciones de calidad y crear un espacio útil para quienes desean practicar inglés.",

    whatText2:
    "Un compañero de conversación es una persona mayor de 18 años, residente en Estados Unidos, que habla inglés como primer idioma o demuestra un dominio equivalente. También debe mantener conversaciones claras, naturales y respetuosas.",

    whatText3:
    "Su función no es impartir una clase tradicional. Su función es conversar, escuchar, formular preguntas y ayudar al practicante a ganar confianza, mejorar su comprensión y familiarizarse con la pronunciación y las expresiones del inglés cotidiano.",
        roleTitle: "Tu función durante la sesión",

    role1: "Mantener una conversación natural en inglés.",
    role2: "Escuchar con paciencia y permitir que el practicante se exprese.",
    role3: "Hacer preguntas para mantener activa la conversación.",
    role4: "Ayudar con pronunciación o expresiones cuando sea necesario.",
    role5: "Ofrecer retroalimentación respetuosa y sencilla.",

    verificationTitle: "Verificación de compañeros",

    verificationIntro:
    "Crear una cuenta no garantiza la aprobación automática como compañero de conversación. Antes de recibir sesiones, cada aspirante deberá completar el proceso de revisión establecido por Binolin.",

    verification1: "Confirmar que tiene 18 años o más.",
    verification2: "Verificar su identidad y residencia en Estados Unidos.",
    verification3:
    "Demostrar que habla inglés como primer idioma o con un dominio oral equivalente.",
    verification4:
    "Aprobar una evaluación de fluidez, claridad, pronunciación y capacidad para mantener una conversación.",
    verification5: "Aceptar las reglas de seguridad y el código de conducta.",

    verificationNote:
    "Binolin podrá rechazar o solicitar información adicional cuando no sea posible comprobar que el aspirante cumple los estándares necesarios para ofrecer una experiencia de práctica clara y confiable.",

    processTitle: "¿Cómo funciona?",

    process1Title: "Crea tu perfil",
    process1Text:
    "Completa tu información personal, verifica tu identidad y realiza la evaluación de conversación requerida por Binolin.",

    process2Title: "Publica tu disponibilidad",
    process2Text:
    "Después de ser aprobado, tendrás acceso a una agenda donde podrás seleccionar los días y horarios en los que deseas recibir sesiones.",

    process3Title: "Conéctate",
    process3Text:
      "Las sesiones se realizan en vivo dentro de Binolin y tienen una duración aproximada de 30 minutos.",

    process4Title: "Recibe tu pago",
    process4Text:
      "Cuando una sesión se complete correctamente, la ganancia correspondiente se añadirá a tu cuenta.",

    paymentTitle: "Ganancias por sesión",

    paymentAmount: "$7",
    paymentLabel: "Pago base por sesión de 30 minutos",

    paymentText:
      "El pago base inicial es de $7 por cada sesión completada correctamente. Las tarifas, incentivos o promociones podrán variar dependiendo de la demanda, experiencia, disponibilidad y otras condiciones informadas previamente.",

    paymentNote:
      "Una sesión cancelada, abandonada o marcada para revisión puede quedar pendiente hasta que Binolin determine lo ocurrido.",

    peopleTitle: "¿Quién puede participar?",

    peopleIntro:
     "No necesitas tener una profesión específica. Binolin busca personas reales que cumplan los requisitos de idioma, comunicación, residencia y seguridad.",

    people1: "Madres y padres de familia",
    people2: "Estudiantes universitarios",
    people3: "Trabajadores y profesionistas",
    people4: "Personas jubiladas",
    people5: "Personas que buscan empleo",
    people6: "Adultos de diferentes ocupaciones y experiencias",

    peopleRequirement:
    "Tu profesión, título académico o experiencia enseñando no determinan tu aprobación. Debes ser mayor de 18 años, residir en Estados Unidos, hablar inglés como primer idioma o con dominio oral equivalente y aprobar la evaluación de Binolin.",
    safetyTitle: "Seguridad durante las sesiones",

    safetyIntro:
      "La seguridad de los compañeros de conversación y de los practicantes es una prioridad para Binolin.",

    safety1:
      "Ambas personas podrán finalizar la sesión cuando exista una conducta inapropiada, insegura o contraria a las reglas de la plataforma.",

    safety2:
      "Los reportes podrán ser revisados por Binolin y pueden ocasionar advertencias, suspensión temporal o cancelación permanente de una cuenta.",

    safety3:
      "Una sesión reportada puede quedar sin pago o sin reembolso mientras se realiza la investigación correspondiente.",

    safety4:
      "La existencia de un reporte no significa automáticamente que una persona sea responsable. Binolin revisará la información disponible antes de tomar una decisión.",

    conductTitle: "Reglas básicas de conducta",

    conduct1: "Mantener una conversación respetuosa y profesional.",
    conduct2: "No compartir información personal sensible.",
    conduct3:
      "No solicitar teléfonos, direcciones, contraseñas, información financiera ni documentos personales.",
    conduct4:
      "No ofrecer ni solicitar servicios, pagos o encuentros fuera de Binolin.",
    conduct5:
      "No realizar actividades ilegales, discriminatorias, sexuales, violentas o intimidatorias.",
    conduct6:
      "No grabar, fotografiar o distribuir una sesión sin autorización.",
    conduct7:
      "Usar vestimenta apropiada y mantener un espacio visual respetuoso.",

    clothingTitle: "Vestimenta y espacio",

    clothingText:
      "Binolin no exige uniforme ni vestimenta formal. Solamente pedimos una presentación apropiada, un espacio razonablemente tranquilo y una conducta respetuosa durante toda la sesión.",

    privacyTitle: "Información y privacidad",

    privacyText1:
      "Durante el registro podremos solicitar información personal para verificar tu identidad, procesar pagos, prevenir fraudes y proteger a los usuarios.",

    privacyText2:
      "Tu información no se mostrará públicamente, excepto por los datos necesarios para presentar tu perfil. Su tratamiento deberá estar explicado en la Política de Privacidad de Binolin.",

    independentTitle: "Actividad independiente e impuestos",

    independentText1:
      "La participación como compañero de conversación está diseñada como una actividad independiente. Tú decides qué horarios publicar y puedes aceptar disponibilidad de acuerdo con tus circunstancias.",

    independentText2:
      "Los compañeros de conversación no deben asumir que Binolin retendrá automáticamente impuestos de sus pagos. Cada participante es responsable de revisar, declarar y pagar los impuestos que le correspondan conforme a su situación personal y a las leyes aplicables.",

    independentText3:
      "Cuando sea requerido, Binolin podrá solicitar documentación fiscal y emitir los formularios correspondientes.",

    legalNotice:
      "La clasificación legal de cada relación depende de las circunstancias reales y de la legislación aplicable. Los términos definitivos se establecerán en el Acuerdo para compañeros de conversación.",

    finalTitle: "Tu conversación puede marcar una diferencia.",

    finalText:
      "Ayuda a una persona a ganar confianza al hablar inglés mientras utilizas tu tiempo disponible para generar ingresos adicionales.",

    finalButton: "Quiero ser compañero de conversación",
  },

  en: {

    nav1: "How it works",
    nav2: "For partners",
    nav3: "Pricing",
    start: "Get started",

    home: "Home",
    signIn: "Sign in",
    apply: "Create profile",
    badge: "Conversation partner information",

    title1: "Have real conversations.",
    title2: "Help others and earn.",

    description:
    "Use your English to help people practice real conversations through private, live 30-minute sessions.",

    clarification:
    "You do not need to be a teacher or have teaching experience. Every applicant must meet the requirements and pass Binolin’s verification process.",

    whatTitle: "What is a conversation partner?",

    whatText1:
      "At Binolin, we believe many people have the ability to hold meaningful conversations and create a useful environment for people who want to practice English.",

    whatText2:
    "A conversation partner is a person who is at least 18 years old, resides in the United States, and speaks English as a first language or demonstrates equivalent spoken proficiency. They must also be able to hold clear, natural and respectful conversations.",

    whatText3:
    "The role is not to teach a traditional class. The role is to talk, listen, ask questions and help the learner gain confidence, improve comprehension and become familiar with everyday English pronunciation and expressions.",
        roleTitle: "Your role during a session",

    role1: "Maintain a natural conversation in English.",
    role2: "Listen patiently and allow the learner to express themselves.",
    role3: "Ask questions to keep the conversation active.",
    role4: "Help with pronunciation or expressions when appropriate.",
    role5: "Provide simple and respectful feedback.",

    verificationTitle: "Conversation partner verification",

    verificationIntro:
    "Creating an account does not guarantee automatic approval as a conversation partner. Before receiving sessions, every applicant must complete Binolin’s review process.",

    verification1: "Confirm that they are at least 18 years old.",
    verification2: "Verify their identity and U.S. residency.",
    verification3:
    "Demonstrate that English is their first language or that they have equivalent spoken proficiency.",
    verification4:
    "Pass an evaluation of fluency, clarity, pronunciation and conversational ability.",
    verification5: "Accept the safety rules and code of conduct.",

    verificationNote:
    "Binolin may reject an application or request additional information when it cannot verify that the applicant meets the standards required to provide a clear and reliable practice experience.",

    processTitle: "How does it work?",

    process1Title: "Create your profile",
    process1Text:
     "Complete your personal information, verify your identity and take Binolin’s required conversation evaluation.",

    process2Title: "Set your availability",
    process2Text:
    "After approval, you will receive access to a calendar where you can select the days and times when you would like to receive sessions.",

    process3Title: "Join the session",
    process3Text:
      "Sessions are held live inside Binolin and last approximately 30 minutes.",

    process4Title: "Receive payment",
    process4Text:
      "After a session is completed successfully, the corresponding earnings are added to your account.",

    paymentTitle: "Session earnings",

    paymentAmount: "$7",
    paymentLabel: "Base payment per 30-minute session",

    paymentText:
      "The initial base payment is $7 for each successfully completed session. Rates, incentives and promotions may vary depending on demand, experience, availability and other conditions communicated in advance.",

    paymentNote:
      "A canceled, abandoned or reported session may remain pending while Binolin reviews what happened.",

    peopleTitle: "Who can participate?",

    peopleIntro:
    "You do not need a specific profession. Binolin looks for real people who meet its language, communication, residency and safety requirements.",


    people1: "Parents and caregivers",
    people2: "College students",
    people3: "Workers and professionals",
    people4: "Retired adults",
    people5: "People seeking employment",
    people6: "Adults from different occupations and backgrounds",

    peopleRequirement:
    "Your profession, academic degree or teaching experience does not determine approval. You must be at least 18 years old, reside in the United States, speak English as a first language or with equivalent spoken proficiency, and pass Binolin’s evaluation.",
    safetyTitle: "Session safety",

    safetyIntro:
      "The safety of conversation partners and learners is a priority for Binolin.",

    safety1:
      "Either person may end a session when conduct is inappropriate, unsafe or inconsistent with platform rules.",

    safety2:
      "Reports may be reviewed by Binolin and may result in warnings, temporary suspension or permanent account removal.",

    safety3:
      "A reported session may remain unpaid or nonrefundable while the review is conducted.",

    safety4:
      "A report does not automatically establish responsibility. Binolin will review the available information before making a decision.",

    conductTitle: "Basic conduct rules",

    conduct1: "Maintain a respectful and professional conversation.",
    conduct2: "Do not share sensitive personal information.",
    conduct3:
      "Do not request phone numbers, addresses, passwords, financial information or personal documents.",
    conduct4:
      "Do not offer or request services, payments or meetings outside Binolin.",
    conduct5:
      "Do not engage in illegal, discriminatory, sexual, violent or intimidating conduct.",
    conduct6:
      "Do not record, photograph or distribute a session without authorization.",
    conduct7:
      "Wear appropriate clothing and maintain a respectful visual environment.",

    clothingTitle: "Clothing and environment",

    clothingText:
      "Binolin does not require a uniform or formal clothing. We only require an appropriate appearance, a reasonably quiet environment and respectful conduct throughout the session.",

    privacyTitle: "Information and privacy",

    privacyText1:
      "During registration, we may request personal information to verify identity, process payments, prevent fraud and protect users.",

    privacyText2:
      "Your personal information will not be publicly displayed except for the information needed for your profile. Its use must be explained in Binolin’s Privacy Policy.",

    independentTitle: "Independent activity and taxes",

    independentText1:
      "Participation as a conversation partner is designed as an independent activity. You decide which time slots to publish according to your circumstances.",

    independentText2:
      "Conversation partners should not assume that Binolin will automatically withhold taxes from payments. Each participant is responsible for reviewing, reporting and paying applicable taxes according to their circumstances and applicable law.",

    independentText3:
      "When required, Binolin may request tax documentation and issue applicable tax forms.",

    legalNotice:
      "The legal classification of each relationship depends on the actual circumstances and applicable law. Final conditions will be established in the Conversation Partner Agreement.",

    finalTitle: "Your conversation can make a difference.",

    finalText:
      "Help someone become more confident speaking English while using your available time to earn additional income.",

    finalButton: "Become a conversation partner",
  },
};

const processIcons = ["👤", "📅", "💬", "💵"];

export default function ConversationPartnersPage() {
  const [language, setLanguage] = useState("es");
  const t = content[language];

  const roles = [t.role1, t.role2, t.role3, t.role4, t.role5];

  const verification = [
  t.verification1,
  t.verification2,
  t.verification3,
  t.verification4,
  t.verification5,
];

  const process = [
    [t.process1Title, t.process1Text],
    [t.process2Title, t.process2Text],
    [t.process3Title, t.process3Text],
    [t.process4Title, t.process4Text],
  ];

  const people = [
    t.people1,
    t.people2,
    t.people3,
    t.people4,
    t.people5,
    t.people6,
  ];

  const safety = [t.safety1, t.safety2, t.safety3, t.safety4];

  const conduct = [
    t.conduct1,
    t.conduct2,
    t.conduct3,
    t.conduct4,
    t.conduct5,
    t.conduct6,
    t.conduct7,
  ];

  return (
    <main className="min-h-screen bg-[#020706] px-4 py-4 text-white">
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_72%_10%,rgba(45,255,85,0.18),transparent_32%),linear-gradient(135deg,#06100f_0%,#020706_60%,#010303_100%)] px-6 py-6 shadow-2xl md:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />

      <PublicNavbar
        language={language}
        setLanguage={setLanguage}
        signInText={t.signIn}
        startText={t.start}
        startHref="/create-account?role=coach"
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

          <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-[#39df4a]/25 bg-[#39df4a]/10 px-6 py-4 text-sm font-bold text-[#a7ffaf]">
            {t.clarification}
          </div>
        </header>

        <div className="relative z-10 space-y-10">
          <section className="grid gap-8 rounded-[28px] border border-[#39df4a]/25 bg-[linear-gradient(135deg,rgba(57,223,74,0.11),rgba(255,255,255,0.025))] p-7 md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
                <SectionLabel number="01" />

                <h2 className="mt-4 text-3xl font-black">
                {t.verificationTitle}
                </h2>

                <p className="mt-5 leading-8 text-white/65">
                {t.verificationIntro}
                </p>

                <div className="mt-6 rounded-2xl border border-[#39df4a]/20 bg-[#39df4a]/10 p-5 text-sm font-semibold leading-7 text-[#afffb6]">
                {t.verificationNote}
                </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#07110f]/90 p-7">
                <ul className="space-y-5">
                {verification.map((item, index) => (
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
          <section>
            <SectionLabel number="02" />

            <h2 className="mt-4 text-3xl font-black">{t.processTitle}</h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {process.map(([title, description], index) => (
                <article
                  key={title}
                  className="rounded-[24px] border border-white/10 bg-[#07110f]/90 p-6"
                >
                  <div className="grid h-13 w-13 place-items-center rounded-full bg-[#39df4a] text-2xl text-[#031006]">
                    {processIcons[index]}
                  </div>

                  <p className="mt-6 text-xs font-black text-[#39df4a]">
                    0{index + 1}
                  </p>

                  <h3 className="mt-2 text-xl font-black">{title}</h3>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-7 rounded-[28px] border border-[#39df4a]/25 bg-[linear-gradient(135deg,rgba(57,223,74,0.13),rgba(255,255,255,0.025))] p-7 md:p-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#78f185]">
                {t.paymentTitle}
              </p>

              <p className="mt-4 text-7xl font-black text-[#39df4a]">
                {t.paymentAmount}
              </p>

              <p className="mt-3 max-w-xs font-bold text-white/80">
                {t.paymentLabel}
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-base leading-8 text-white/70">
                {t.paymentText}
              </p>

              <p className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-6 text-white/55">
                {t.paymentNote}
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7 md:p-9">
              <SectionLabel number="03" />
              <h2 className="mt-4 text-3xl font-black">{t.peopleTitle}</h2>

              <p className="mt-5 leading-7 text-white/65">{t.peopleIntro}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {people.map((person) => (
                  <div
                    key={person}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm font-bold text-white/80"
                  >
                    {person}
                  </div>
                ))}
              </div>

              <p className="mt-7 rounded-2xl bg-[#39df4a]/10 p-5 text-sm font-semibold leading-7 text-[#adffb4]">
                {t.peopleRequirement}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#07110f]/90 p-7 md:p-9">
              <SectionLabel number="04" />
              <h2 className="mt-4 text-3xl font-black">{t.safetyTitle}</h2>

              <p className="mt-5 leading-7 text-white/65">{t.safetyIntro}</p>

              <ul className="mt-7 space-y-4">
                {safety.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7 md:p-10">
            <SectionLabel number="05" />

            <h2 className="mt-4 text-3xl font-black">{t.conductTitle}</h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {conduct.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#39df4a]/15 text-sm font-black text-[#5bea6b]">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-white/70">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-[#07110f] p-6">
              <h3 className="font-black text-white">{t.clothingTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                {t.clothingText}
              </p>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <InfoCard title={t.privacyTitle} icon="🔒">
              <p>{t.privacyText1}</p>
              <p>{t.privacyText2}</p>
            </InfoCard>

            <InfoCard title={t.independentTitle} icon="📄">
              <p>{t.independentText1}</p>
              <p>{t.independentText2}</p>
              <p>{t.independentText3}</p>

              <div className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-xs leading-6 text-amber-100/65">
                {t.legalNotice}
              </div>
            </InfoCard>
          </section>

          <section className="rounded-[30px] border border-[#39df4a]/25 bg-[radial-gradient(circle_at_50%_0%,rgba(57,223,74,0.18),transparent_55%),#06100d] px-7 py-14 text-center md:px-10">
            <h2 className="text-3xl font-black md:text-5xl">
              {t.finalTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/65">
              {t.finalText}
            </p>

            <Link
              href="/create-account?role=coach"
              className="mt-8 inline-flex rounded-2xl bg-[#39df4a] px-8 py-4 font-black text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.4)] hover:bg-[#50ef5f]"
            >
              {t.finalButton}
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}

function SectionLabel({ number }) {
  return (
    <span className="text-xs font-black tracking-[0.3em] text-[#39df4a]">
      {number}
    </span>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#39df4a]/15 text-xs font-black text-[#59eb69]">
        ✓
      </span>

      <span className="text-sm leading-7 text-white/70">{children}</span>
    </li>
  );
}

function InfoCard({ title, icon, children }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-[#07110f]/90 p-7 md:p-9">
      <div className="grid h-13 w-13 place-items-center rounded-full bg-[#39df4a]/15 text-2xl">
        {icon}
      </div>

      <h2 className="mt-6 text-2xl font-black">{title}</h2>

      <div className="mt-5 space-y-4 text-sm leading-7 text-white/60">
        {children}
      </div>
    </article>
  );
}