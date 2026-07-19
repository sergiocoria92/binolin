"use client";

export default function LearnerGamesPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-xl text-center">
        <div className="text-7xl">🎮</div>

        <p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
          Practice Games
        </p>

        <h1 className="mt-3 text-4xl font-black">
          English missions are coming
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Complete challenges, earn XP, protect your lives,
          compete with other learners, and improve your English.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-3xl">❤️</p>
              <p className="mt-2 font-bold">Lives</p>
            </div>

            <div>
              <p className="text-3xl">⭐</p>
              <p className="mt-2 font-bold">XP</p>
            </div>

            <div>
              <p className="text-3xl">🏆</p>
              <p className="mt-2 font-bold">Rankings</p>
            </div>
          </div>
        </div>

        <a
          href="/learner"
          className="mt-8 inline-block rounded-2xl bg-cyan-400 px-6 py-4 font-black text-slate-950 hover:bg-cyan-300"
        >
          Back to dashboard
        </a>
      </div>
    </main>
  );
}