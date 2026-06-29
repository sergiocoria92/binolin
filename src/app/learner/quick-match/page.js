export default function QuickMatchPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-8 text-slate-950">
      <section className="mx-auto max-w-3xl">
        <a
          href="/learner/goals/about-you"
          className="text-sm font-medium text-slate-500"
        >
          ← Back
        </a>

        <div className="mt-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Step 3
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Ready to find your coach?
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Voxae will match you automatically based on your topic, preferred
            time, and coach availability.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
            How it works
          </p>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-white p-4">
              ✅ Choose what you want to practice
            </div>

            <div className="rounded-2xl bg-white p-4">
              ✅ Pick the day and time that works for you
            </div>

            <div className="rounded-2xl bg-white p-4">
              ✅ Voxae assigns an available coach automatically
            </div>
          </div>

          <a
            href="/learner/booking"
            className="mt-6 block w-full rounded-2xl bg-slate-950 px-6 py-4 text-center font-semibold text-white"
          >
            Continue
          </a>
        </div>
      </section>
    </main>
  );
}