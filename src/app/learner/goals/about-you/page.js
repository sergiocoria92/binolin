export default function AboutYouPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
      <section className="relative mx-auto min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_85%_20%,rgba(57,223,74,0.18),transparent_28%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] p-6 shadow-2xl md:p-10">

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />

        <div className="relative z-10 mx-auto max-w-5xl">

          <a href="/" className="mb-10 inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#38e34d] shadow-[0_0_25px_rgba(56,227,77,0.55)]">
              <img
                src="/img/prueba1-recortada-negro.png"
                alt="Binolin"
                className="h-7 w-7 object-contain"
              />
            </div>

            <span className="text-2xl font-black tracking-tight">
              Binolin
            </span>
          </a>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

            {/* LEFT */}

            <div>

              <a
                href="/learner/goals"
                className="text-sm font-semibold text-white/55 hover:text-white"
              >
                ← Back
              </a>

              <div className="mt-10">

                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#39df4a]">
                  Step 2
                </p>

                <h1 className="text-5xl font-black tracking-tight">
                  Tell us about you
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/60">
                  This helps Binolin recommend the right coach and session
                  for your level.
                </p>

              </div>

              <form className="mt-10 space-y-6 rounded-[30px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur">

                <div>
                  <label className="mb-2 block font-semibold text-white/80">
                    Native language
                  </label>

                  <select className="w-full rounded-2xl border border-white/10 bg-[#071110] px-5 py-4 text-white outline-none">
                    <option>Spanish</option>
                    <option>Portuguese</option>
                    <option>Japanese</option>
                    <option>Korean</option>
                    <option>French</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-white/80">
                    English level
                  </label>

                  <select className="w-full rounded-2xl border border-white/10 bg-[#071110] px-5 py-4 text-white outline-none">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-white/80">
                    Coach preference
                  </label>

                  <select className="w-full rounded-2xl border border-white/10 bg-[#071110] px-5 py-4 text-white outline-none">
                    <option>No preference</option>
                    <option>Female coach</option>
                    <option>Male coach</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-white/80">
                    Preferred schedule
                  </label>

                  <select className="w-full rounded-2xl border border-white/10 bg-[#071110] px-5 py-4 text-white outline-none">
                    <option>No preference</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>

                <a
                  href="/learner/quick-match"
                  className="block rounded-2xl bg-[#39df4a] py-4 text-center font-black text-[#031006] shadow-[0_0_30px_rgba(57,223,74,0.45)] transition hover:bg-[#50ef5f]"
                >
                  Find my coach
                </a>

              </form>

            </div>

            {/* RIGHT */}

            <div className="hidden justify-end lg:flex">

              <img
                src="/img/fase-2.png"
                alt="About you"
                className="w-[360px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.28)]"
              />

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}