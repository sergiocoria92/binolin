"use client";

export default function SecondGamePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#061126] px-6 text-white">
      <div className="w-full max-w-2xl text-center">
        <div className="text-8xl">🗺️</div>

        <p className="mt-6 text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
          Binolin Games
        </p>

        <h1 className="mt-3 text-4xl font-black">
          Mystery English Quest
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          This game is currently being designed.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="font-bold text-slate-300">
            Planned features
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-3xl">🧩</p>
              <p className="mt-2 font-bold">
                Puzzles
              </p>
            </div>

            <div>
              <p className="text-3xl">🎧</p>
              <p className="mt-2 font-bold">
                Listening
              </p>
            </div>

            <div>
              <p className="text-3xl">🏆</p>
              <p className="mt-2 font-bold">
                Rewards
              </p>
            </div>
          </div>
        </div>

        <a
          href="/learner/games"
          className="mt-8 inline-block rounded-2xl bg-cyan-400 px-7 py-4 font-black text-slate-950 hover:bg-cyan-300"
        >
          Back to game library
        </a>
      </div>
    </main>
  );
}