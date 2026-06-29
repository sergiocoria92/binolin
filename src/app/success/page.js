export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-8 text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center text-center">
        <p className="mb-4 text-5xl">🎉</p>

        <h1 className="text-4xl font-bold tracking-tight">
          Your session is almost ready
        </h1>

        <p className="mt-4 max-w-xl text-lg text-slate-600">
          Your learner profile was saved. You can now continue to your dashboard.
        </p>

        <div className="mt-10 w-full rounded-3xl border border-slate-200 p-6 text-left">
          <p className="text-sm font-medium text-slate-500">Session</p>
          <h2 className="mt-1 text-2xl font-bold">Sarah</h2>
          <p className="mt-2 text-slate-600">Job Interview · Today at 6:30 PM</p>
        </div>

        <a
          href="/learner"
          className="mt-8 rounded-2xl bg-slate-950 px-6 py-4 font-semibold text-white"
        >
          Go to dashboard
        </a>
      </section>
    </main>
  );
}