"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function CreateAccountContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "learner";
  const isCoach = role === "coach";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateAccount(e) {
    e.preventDefault();
    setLoading(true);

    const redirectUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/sign-in?role=${role}`
        : `http://localhost:3000/sign-in?role=${role}`;

    let { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    if (error && error.message.toLowerCase().includes("already")) {
      const loginResult = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      data = loginResult.data;
      error = loginResult.error;
    }

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    const user = data.user;
    const session = data.session;

    if (!user) {
      setLoading(false);
      alert("Could not create user.");
      return;
    }

    if (!session) {
      setLoading(false);
      alert(
        "Account created. Please check your email and confirm your account before continuing."
      );
      return;
    }

    if (isCoach) {
      window.location.href = `/coach/create-profile?fullName=${encodeURIComponent(
        fullName || ""
      )}`;
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("learner_profiles")
      .upsert(
        {
          user_id: user.id,
          full_name: fullName || "New Learner",
          native_language: "Spanish",
          english_level: "Intermediate",
          goal: "Job Interview",
          coach_preference: "No preference",
          preferred_schedule: "Evening",
        },
        { onConflict: "user_id" }
      )
      .select()
      .maybeSingle();

    if (profileError || !profileData) {
      setLoading(false);
      alert(profileError?.message || "Learner profile was not created.");
      return;
    }

    window.location.href = "/success";
  }

  return (
  <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
    <section className="relative mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_80%_30%,rgba(57,223,74,0.22),transparent_32%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />

      <div className="relative z-10 hidden flex-col justify-between p-10 lg:flex">
        <a
          href={isCoach ? "/" : "/learner/booking"}
          className="text-sm font-semibold text-white/70 hover:text-white"
        >
          ← Volver
        </a>

        <div>
          <div className="mb-8 h-1 w-44 rounded-full bg-gradient-to-r from-[#39df4a] to-transparent" />

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#39df4a]">
            {isCoach ? "Coach account" : "Step 5"}
          </p>

          <h1 className="max-w-md text-5xl font-black tracking-tight">
            {isCoach ? "Crear cuenta de coach" : "Crear tu cuenta"}
          </h1>

          <p className="mt-4 max-w-sm text-lg leading-8 text-white/60">
            Únete a Binolin y comienza tu camino para practicar inglés con personas reales.
          </p>
        </div>

        <img
          src="/img/alien-tom.png"
          alt="Binolin alien"
          className="w-[340px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.35)]"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur md:p-9">
          <a
            href={isCoach ? "/" : "/learner/booking"}
            className="mb-8 inline-block text-sm font-semibold text-white/60 hover:text-white lg:hidden"
          >
            ← Volver
          </a>

          <div>
            <h2 className="text-4xl font-black tracking-tight">
              {isCoach ? "Crear cuenta de coach" : "Crear tu cuenta"}
            </h2>
            <p className="mt-3 text-white/55">
              {isCoach
                ? "Crea tu perfil para comenzar a recibir sesiones."
                : "Únete a Binolin y empieza tu práctica."}
            </p>
          </div>

          <form onSubmit={handleCreateAccount} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-white/80">
                Nombre completo
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#39df4a]/70 focus:shadow-[0_0_0_4px_rgba(57,223,74,0.12)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-white/80">
                Email
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#39df4a]/70 focus:shadow-[0_0_0_4px_rgba(57,223,74,0.12)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-white/80">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-2xl border border-white/10 bg-[#06100f] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#39df4a]/70 focus:shadow-[0_0_0_4px_rgba(57,223,74,0.12)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#39df4a] px-6 py-4 font-black text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.45)] transition hover:bg-[#50ef5f] disabled:opacity-50"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-white/45">
            ¿Ya tienes cuenta?{" "}
            <a href="/sign-in" className="font-bold text-[#39df4a]">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </section>
  </main>
);
}

export default function CreateAccountPage() {
  return (
    <Suspense fallback={<main className="p-8">Loading...</main>}>
      <CreateAccountContent />
    </Suspense>
  );
}