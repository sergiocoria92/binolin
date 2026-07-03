const goals = [
  {
    title: "Travel",
    emoji: "✈️",
    description:
      "Practice airports, hotels, restaurants, and simple conversations.",
  },
  {
    title: "Job Interview",
    emoji: "💼",
    description: "Practice answering questions with confidence.",
  },
  {
    title: "Daily Conversation",
    emoji: "☕",
    description: "Practice casual conversations for everyday life.",
  },
  {
    title: "Business English",
    emoji: "📈",
    description: "Practice meetings, calls, emails, and workplace situations.",
  },
  {
    title: "IELTS",
    emoji: "🎓",
    description: "Practice speaking topics for your IELTS test.",
  },
  {
    title: "TOEFL",
    emoji: "🎓",
    description: "Practice speaking responses for your TOEFL test.",
  },
];

export default function GoalsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030807] px-4 py-4 text-white">
      <section className="relative mx-auto min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_15%_20%,rgba(57,223,74,0.18),transparent_28%),linear-gradient(135deg,#06100f_0%,#030807_55%,#020403_100%)] p-6 shadow-2xl md:p-10">
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

          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <a
                href="/"
                className="text-sm font-semibold text-white/55 hover:text-white"
              >
                ← Back to Binolin
              </a>

              <div className="mt-10">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#39df4a]">
                  Step 1
                </p>

                <h1 className="text-5xl font-black tracking-tight">
                  What is your goal?
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/60">
                  Choose what you want to practice. Binolin will recommend a
                  coach and a session plan for you.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {goals.map((goal) => (
                  <a
                    key={goal.title}
                    href={`/learner/goals/about-you?goal=${encodeURIComponent(
                      goal.title
                    )}`}
                    className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-[#39df4a]/60 hover:bg-[#39df4a]/10"
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#39df4a]/15 text-3xl group-hover:bg-[#39df4a]/25">
                        {goal.emoji}
                      </span>

                      <div>
                        <h2 className="text-xl font-black">{goal.title}</h2>
                        <p className="mt-1 text-sm leading-6 text-white/55">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-start justify-end pt-10">
              <img
                src="/img/fase-1.png"
                alt="Binolin"
                className="mx-auto w-[240px] object-contain drop-shadow-[0_20px_45px_rgba(0,255,120,0.28)] lg:w-[360px]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}