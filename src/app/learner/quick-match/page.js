export default function QuickMatchPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
      <section className="relative mx-auto min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_18%_18%,rgba(57,223,74,0.18),transparent_30%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] p-6 shadow-2xl md:p-10">
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
            <span className="text-2xl font-black tracking-tight">Binolin</span>
          </a>

          <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
            <div className="hidden items-start justify-start pt-4 lg:flex">
              <img
                src="/img/fase-3.png"
                alt="Quick match"
                className="w-[360px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.28)]"
              />
            </div>

            <div>
              <a
                href="/learner/goals/about-you"
                className="text-sm font-semibold text-white/55 hover:text-white"
              >
                ← Back
              </a>

              <div className="mt-10">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#39df4a]">
                  Step 3
                </p>

                <h1 className="text-5xl font-black tracking-tight">
                  Ready to find your coach?
                </h1>

                <p className="mt-4 text-lg leading-8 text-white/60">
                  Binolin will match you automatically based on your topic,
                  preferred time, and coach availability.
                </p>
              </div>

              <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#39df4a]">
                  How it works
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#06100f] p-4 text-white/80">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#39df4a] text-sm font-black text-[#031006]">
                      ✓
                    </span>
                    Choose what you want to practice
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#06100f] p-4 text-white/80">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#39df4a] text-sm font-black text-[#031006]">
                      ✓
                    </span>
                    Pick the day and time that works for you
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#06100f] p-4 text-white/80">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#39df4a] text-sm font-black text-[#031006]">
                      ✓
                    </span>
                    Binolin assigns an available coach automatically
                  </div>
                </div>

                <a
                  href="/learner/booking"
                  className="mt-6 block w-full rounded-2xl bg-[#39df4a] px-6 py-4 text-center font-black text-[#031006] shadow-[0_0_28px_rgba(57,223,74,0.45)] hover:bg-[#50ef5f]"
                >
                  Continue
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}