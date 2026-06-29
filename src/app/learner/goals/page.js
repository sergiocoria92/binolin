const goals = [
  {
    title: "Travel",
    emoji: "✈️",
    description: "Practice airports, hotels, restaurants, and simple conversations.",
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
    <main className="min-h-screen bg-white px-6 py-8 text-slate-950">
      <section className="mx-auto max-w-3xl">
        <a href="/" className="text-sm font-medium text-slate-500">
          ← Back to Voxae
        </a>

        <div className="mt-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Step 1
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            What is your goal?
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Choose what you want to practice. Voxae will recommend a coach and a
            session plan for you.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {goals.map((goal) => (
            <a
              key={goal.title}
              href={`/learner/goals/about-you?goal=${encodeURIComponent(goal.title)}`}
              className="rounded-3xl border border-slate-200 p-6 transition hover:border-slate-950"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{goal.emoji}</span>
                <div>
                  <h2 className="text-xl font-semibold">{goal.title}</h2>
                  <p className="mt-1 text-slate-600">{goal.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}