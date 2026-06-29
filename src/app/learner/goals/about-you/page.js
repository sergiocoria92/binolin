export default function AboutYouPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-8 text-slate-950">
      <section className="mx-auto max-w-3xl">
        <a href="/learner/goals" className="text-sm font-medium text-slate-500">
          ← Back
        </a>

        <div className="mt-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Step 2
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Tell us about you
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            This helps Voxae recommend the right coach and session for your
            level.
          </p>
        </div>

        <form className="mt-10 space-y-6 rounded-3xl border border-slate-200 p-6">
          <div>
            <label className="mb-2 block font-medium">Native language</label>
            <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none">
              <option>Spanish</option>
              <option>Portuguese</option>
              <option>Japanese</option>
              <option>Korean</option>
              <option>French</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">English level</label>
            <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">Coach preference</label>
            <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none">
              <option>No preference</option>
              <option>Female coach</option>
              <option>Male coach</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">Preferred schedule</label>
            <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none">
              <option>No preference</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>

          <a
            href="/learner/quick-match"
            className="block w-full rounded-2xl bg-slate-950 px-6 py-4 text-center font-semibold text-white"
          >
            Find my coach
          </a>
        </form>
      </section>
    </main>
  );
}