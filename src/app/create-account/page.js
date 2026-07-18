"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import PublicNavbar from "../components/PublicNavbar";

const content = {
  es: {
    signIn: "Iniciar sesión",
    start: "Comenzar",
    nav1: "Cómo funciona",
    nav2: "Para compañeros",
    nav3: "Precios",

    backLearner: "Regresar a tu sesión",
    backPartner: "Regresar a información para compañeros",

    learnerStep: "Paso 4",
    partnerStep: "Cuenta de compañero",

    learnerTitle: "Crea tu cuenta",
    partnerTitle: "Crea tu cuenta de compañero de conversación",

    learnerDescription:
      "¡Ya casi terminas! Hemos guardado tus preferencias. Solo crea tu cuenta y nosotros nos encargaremos del resto.",

    partnerDescription:
      "Crea tu cuenta para continuar con tu perfil y el proceso de verificación como compañero de conversación.",

    savedTitle: "Tus preferencias están guardadas",
    savedText:
      "Al crear tu cuenta cargaremos automáticamente tu objetivo, nivel, horario y solicitud de práctica. No tendrás que volver a llenar la información.",

    partnerNoticeTitle: "Siguiente paso",
    partnerNoticeText:
      "Después de crear tu cuenta podrás completar tu perfil, disponibilidad y la información necesaria para el proceso de aprobación.",

    formLearnerTitle: "Crea tu cuenta",
    formPartnerTitle: "Cuenta de compañero",

    formLearnerText:
      "Solo necesitamos tus datos de acceso para continuar con tu solicitud.",

    formPartnerText:
      "Regístrate para comenzar el proceso como compañero de conversación.",

    fullName: "Nombre completo",
    fullNamePlaceholder: "Tu nombre",

    email: "Correo electrónico",
    emailPlaceholder: "tu@email.com",

    password: "Contraseña",
    passwordPlaceholder: "Mínimo 6 caracteres",

    learnerButton: "Crear cuenta y continuar",
    partnerButton: "Crear cuenta y completar perfil",

    learnerLoading: "Creando tu cuenta...",
    partnerLoading: "Creando cuenta...",

    existingAccount: "¿Ya tienes una cuenta?",
    loginLink: "Inicia sesión",

    userError: "No fue posible crear el usuario.",

    learnerProfileError:
      "No fue posible crear tu perfil de practicante.",

    confirmationMessage:
      "Cuenta creada. Revisa tu correo electrónico y confirma tu cuenta antes de continuar.",

    imageAlt: "Personaje de Binolin",
    loadingPage: "Cargando...",
  },

  en: {
    signIn: "Sign in",
    start: "Get started",
    nav1: "How it works",
    nav2: "For partners",
    nav3: "Pricing",

    backLearner: "Back to your session",
    backPartner: "Back to partner information",

    learnerStep: "Step 4",
    partnerStep: "Partner account",

    learnerTitle: "Create your account",
    partnerTitle: "Create your partner account",

    learnerDescription:
      "You're almost done! We saved your preferences. Just create your account and we will take care of the rest.",

    partnerDescription:
      "Create your account to continue with your profile and conversation partner verification process.",

    savedTitle: "Your preferences are saved",
    savedText:
      "After you create your account, we will automatically load your goal, level, schedule and practice request. You will not need to enter that information again.",

    partnerNoticeTitle: "Next step",
    partnerNoticeText:
      "After creating your account, you can complete your profile, availability and the information required for the approval process.",

    formLearnerTitle: "Create your account",
    formPartnerTitle: "Partner account",

    formLearnerText:
      "We only need your account details to continue with your request.",

    formPartnerText:
      "Register to begin the conversation partner process.",

    fullName: "Full name",
    fullNamePlaceholder: "Your name",

    email: "Email",
    emailPlaceholder: "you@email.com",

    password: "Password",
    passwordPlaceholder: "At least 6 characters",

    learnerButton: "Create account and continue",
    partnerButton: "Create account and complete profile",

    learnerLoading: "Creating your account...",
    partnerLoading: "Creating account...",

    existingAccount: "Already have an account?",
    loginLink: "Sign in",

    userError: "The user could not be created.",

    learnerProfileError:
      "Your learner profile could not be created.",

    confirmationMessage:
      "Account created. Check your email and confirm your account before continuing.",

    imageAlt: "Binolin character",
    loadingPage: "Loading...",
  },
};

function CreateAccountContent() {
  const searchParams = useSearchParams();

  const role = searchParams.get("role") || "learner";
  const isCoach = role === "coach";

  const [language, setLanguage] = useState("es");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const t = content[language];

  const backHref = isCoach
    ? "/conversation-partners"
    : "/learner/booking";

  function getPendingBooking() {
    if (typeof window === "undefined") {
      return null;
    }

    const savedBooking = localStorage.getItem("pendingBooking");

    if (!savedBooking) {
      return null;
    }

    try {
      return JSON.parse(savedBooking);
    } catch (error) {
      console.error("Invalid pendingBooking data:", error);
      return null;
    }
  }

  async function handleCreateAccount(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/sign-in?role=${role}`
          : `http://localhost:3000/sign-in?role=${role}`;

      let { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName.trim(),
            role,
          },
        },
      });

      /*
        Conservamos este comportamiento:
        si el correo ya existe, intentamos iniciar sesión
        con la contraseña proporcionada.
      */
      if (
        error &&
        error.message.toLowerCase().includes("already")
      ) {
        const loginResult =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        data = loginResult.data;
        error = loginResult.error;
      }

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      const user = data?.user;
      const session = data?.session;

      if (!user) {
        alert(t.userError);
        setLoading(false);
        return;
      }

      /*
        Si Supabase exige confirmación de correo,
        todavía no existe una sesión activa.
      */
      if (!session) {
        alert(t.confirmationMessage);
        setLoading(false);
        return;
      }

      /*
        Conservamos "coach" como nombre técnico interno
        porque las rutas y tablas actuales utilizan ese nombre.
      */
      if (isCoach) {
        window.location.href =
          `/coach/create-profile?fullName=${encodeURIComponent(
            fullName.trim()
          )}`;

        return;
      }

      const pendingBooking = getPendingBooking();

      const learnerGoal =
        pendingBooking?.topic ||
        pendingBooking?.goal ||
        "Conversation";

      const nativeLanguage =
        pendingBooking?.native_language ||
        pendingBooking?.nativeLanguage ||
        "Spanish";

      const englishLevel =
        pendingBooking?.english_level ||
        pendingBooking?.englishLevel ||
        "Beginner";

      const preferredSchedule =
        pendingBooking?.preferred_schedule ||
        pendingBooking?.preferredSchedule ||
        "No preference";

      const { data: profileData, error: profileError } =
        await supabase
          .from("learner_profiles")
          .upsert(
            {
              user_id: user.id,
              full_name:
                fullName.trim() || "New Learner",
              native_language: nativeLanguage,
              english_level: englishLevel,
              goal: learnerGoal,

              /*
                Se conserva esta columna porque actualmente
                existe en Supabase, aunque ya no se muestra
                la preferencia en el formulario.
              */
              coach_preference: "No preference",

              preferred_schedule: preferredSchedule,
            },
            {
              onConflict: "user_id",
            }
          )
          .select()
          .maybeSingle();

      if (profileError || !profileData) {
        alert(
          profileError?.message ||
            t.learnerProfileError
        );

        setLoading(false);
        return;
      }

      /*
        No eliminamos pendingBooking aquí.
        La página /success puede utilizarlo para terminar
        de crear o confirmar la reservación pendiente.
      */
      window.location.href = "/success";
    } catch (error) {
      console.error("Create account error:", error);

      alert(
        error instanceof Error
          ? error.message
          : t.userError
      );

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
      <section className="relative mx-auto min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_80%_30%,rgba(57,223,74,0.22),transparent_32%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] px-6 py-6 shadow-2xl md:px-10">
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
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white/55 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
          >
            <span aria-hidden="true">←</span>

            {isCoach
              ? t.backPartner
              : t.backLearner}
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* INFORMACIÓN E IMAGEN */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#39df4a]">
                {isCoach
                  ? t.partnerStep
                  : t.learnerStep}
              </p>

              <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                {isCoach
                  ? t.partnerTitle
                  : t.learnerTitle}
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
                {isCoach
                  ? t.partnerDescription
                  : t.learnerDescription}
              </p>

              <div className="mt-7 max-w-xl rounded-[24px] border border-[#39df4a]/25 bg-[#39df4a]/10 p-5">
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#39df4a] font-black text-[#031006]">
                    ✓
                  </span>

                  <div>
                    <h2 className="font-black text-white">
                      {isCoach
                        ? t.partnerNoticeTitle
                        : t.savedTitle}
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-white/65">
                      {isCoach
                        ? t.partnerNoticeText
                        : t.savedText}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 flex h-[350px] max-w-[430px] items-center justify-center">
                <div className="absolute h-[300px] w-[300px] rounded-full border border-[#39df4a]/15 bg-[#39df4a]/5" />

                <div className="absolute h-[230px] w-[230px] rounded-full bg-[#39df4a]/10" />

                <div className="absolute h-[340px] w-[340px] rounded-full bg-[#39df4a]/10 blur-3xl" />

                <img
                  src="/img/alien-tom.png"
                  alt={t.imageAlt}
                  className="relative z-10 w-[260px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.35)] md:w-[330px]"
                />
              </div>
            </div>

            {/* FORMULARIO */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur md:p-9">
                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  {isCoach
                    ? t.formPartnerTitle
                    : t.formLearnerTitle}
                </h2>

                <p className="mt-3 leading-7 text-white/55">
                  {isCoach
                    ? t.formPartnerText
                    : t.formLearnerText}
                </p>

                <form
                  onSubmit={handleCreateAccount}
                  className="mt-8 space-y-5"
                >
                  <div>
                    <label
                      htmlFor="full-name"
                      className="mb-2 block text-sm font-bold text-white/80"
                    >
                      {t.fullName}
                    </label>

                    <input
                      id="full-name"
                      type="text"
                      placeholder={t.fullNamePlaceholder}
                      value={fullName}
                      onChange={(event) =>
                        setFullName(event.target.value)
                      }
                      required
                      autoComplete="name"
                      className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#39df4a]/70 focus:shadow-[0_0_0_4px_rgba(57,223,74,0.12)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-white/80"
                    >
                      {t.email}
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      required
                      autoComplete="email"
                      className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#39df4a]/70 focus:shadow-[0_0_0_4px_rgba(57,223,74,0.12)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-bold text-white/80"
                    >
                      {t.password}
                    </label>

                    <input
                      id="password"
                      type="password"
                      placeholder={t.passwordPlaceholder}
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#39df4a]/70 focus:shadow-[0_0_0_4px_rgba(57,223,74,0.12)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-[#39df4a] px-6 py-4 font-black text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.45)] transition hover:bg-[#50ef5f] disabled:cursor-not-allowed disabled:bg-white/25 disabled:text-white/60 disabled:shadow-none"
                  >
                    {loading
                      ? isCoach
                        ? t.partnerLoading
                        : t.learnerLoading
                      : isCoach
                        ? t.partnerButton
                        : t.learnerButton}
                  </button>
                </form>

                <p className="mt-7 text-center text-sm text-white/45">
                  {t.existingAccount}{" "}
                  <Link
                    href={`/sign-in?role=${role}`}
                    className="font-bold text-[#39df4a] hover:text-[#65f273]"
                  >
                    {t.loginLink}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CreateAccountPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#030807] text-white">
          <p className="text-white/60">
            Cargando...
          </p>
        </main>
      }
    >
      <CreateAccountContent />
    </Suspense>
  );
}