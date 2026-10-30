"use client";

import DashboardTopbar from "@/components/DashboardTopbar";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function ProfessionalDashboard({
  profile,
  booking,
  upcomingBookings,
  dashboardTheme,
  coach,
  coachName,
  isPending,
  topic,
  duration,
  credits,
  remaining,
  xp,
  level,
  currentLevelXp,
  nextLevelXp,
  progressPercent,
  cefr,
  changeDashboardTheme,
  handleSignOut,
  handleCancelBooking,
  formatSessionDate,
  formatSessionTime,
  canStartSession,
}) {
  const sessionsTaken = profile.sessions_used || 0;
  const coins = profile.coins || 0;
  const streak = profile.streak || 0;

  function renderTags(items) {
    if (!items || items.length === 0) return null;

    return (
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <DashboardSidebar
          dashboardTheme={dashboardTheme}
          remaining={remaining}
          credits={credits}
          streak={streak}
        />

        <div className="min-w-0 flex-1">
          <DashboardTopbar
            profile={profile}
            dashboardTheme={dashboardTheme}
            changeDashboardTheme={changeDashboardTheme}
            handleSignOut={handleSignOut}
          />

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            {/* OVERALL PROGRESS */}
            <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 p-6 text-white shadow-xl sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                    Your overall progress
                  </p>

                  <div className="mt-4 flex flex-wrap items-end gap-4">
                    <div>
                      <p className="text-sm text-indigo-200">
                        Current level
                      </p>

                      <h2 className="mt-1 text-3xl font-black sm:text-4xl">
                        {cefr || "CEFR"}{" "}
                        {profile.english_level}
                      </h2>
                    </div>

                    <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                      Level {level}
                    </span>
                  </div>

                  <div className="mt-7">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-indigo-200">
                        {currentLevelXp} XP
                      </span>

                      <span className="font-bold">
                        {nextLevelXp} XP
                      </span>
                    </div>

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-black/30">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{
                          width: `${progressPercent}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-4">
                    <StatItem
                      label="Classes taken"
                      value={sessionsTaken}
                    />

                    <StatItem
                      label="Sessions remaining"
                      value={remaining}
                    />

                    <StatItem
                      label="Total XP"
                      value={xp}
                    />

                    <StatItem
                      label="Coins"
                      value={coins}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-white/10">
                    <div className="absolute inset-[-12px] rounded-full border-[12px] border-cyan-400 border-b-transparent border-l-transparent" />

                    <div className="text-center">
                      <p className="text-3xl font-black">
                        {Math.round(progressPercent)}%
                      </p>

                      <p className="text-xs text-indigo-200">
                        current level
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MAIN CONTENT */}
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              {/* LEFT COLUMN */}
              <div className="space-y-6">
                {/* NEXT SESSION */}
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                        Next session
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        {topic}
                      </h2>
                    </div>

                    <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700">
                      {duration} min
                    </span>
                  </div>

                  {booking ? (
                    isPending ? (
                      <PendingMatch
                        booking={booking}
                        formatSessionDate={
                          formatSessionDate
                        }
                        formatSessionTime={
                          formatSessionTime
                        }
                      />
                    ) : (
                      <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center">
                        {coach?.avatar_url ? (
                          <img
                            src={coach.avatar_url}
                            alt={coachName}
                            className="h-20 w-20 rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-3xl font-black text-white">
                            {coachName?.[0]?.toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="text-xl font-black">
                            {coachName}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {coach?.state || "USA"},{" "}
                            {coach?.country ||
                              "United States"}
                          </p>

                          <p className="mt-2 text-sm font-bold text-violet-700">
                            {coach?.specialty ||
                              "Conversation"}{" "}
                            Coach
                          </p>

                          {renderTags(coach?.interests)}
                        </div>

                        <div className="sm:text-right">
                          <p className="font-bold">
                            {formatSessionDate(
                              booking.session_date
                            )}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {formatSessionTime(
                              booking.session_time
                            )}
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                      <p className="font-semibold text-slate-600">
                        You do not have a session scheduled.
                      </p>
                    </div>
                  )}

                  <div className="mt-5">
                    {booking && !isPending ? (
                      canStartSession(booking) ? (
                        <a
                          href={`/room?booking=${booking.id}&name=${encodeURIComponent(
                            profile.full_name
                          )}`}
                          className="block rounded-2xl bg-blue-600 px-6 py-4 text-center font-bold text-white hover:bg-blue-500"
                        >
                          Enter the room
                        </a>
                      ) : (
                        <button
                          disabled
                          className="block w-full cursor-not-allowed rounded-2xl bg-slate-200 px-6 py-4 text-center font-bold text-slate-500"
                        >
                          Available{" "}
                          {formatSessionDate(
                            booking.session_date
                          )}{" "}
                          ·{" "}
                          {formatSessionTime(
                            booking.session_time
                          )}
                        </button>
                      )
                    ) : (
                      <a
                        href="/learner/schedule"
                        className="block rounded-2xl bg-slate-950 px-6 py-4 text-center font-bold text-white hover:bg-slate-800"
                      >
                        {upcomingBookings.length > 0
                          ? "Schedule another session"
                          : "Find my coach"}
                      </a>
                    )}
                  </div>
                </section>

                {/* QUICK MATCH */}
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-cyan-600">
                        Quick Match
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        Practice English today
                      </h2>

                      <p className="mt-2 text-slate-500">
                        Choose a time and Binolin will find
                        an available coach.
                      </p>
                    </div>

                    <div className="hidden text-5xl sm:block">
                      ⚡
                    </div>
                  </div>

                  <a
                    href="/learner/schedule"
                    className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3.5 font-bold text-white"
                  >
                    Practice now
                  </a>
                </section>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                {/* MEMBERSHIP */}
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                        Membership
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        {remaining} of {credits}
                      </h2>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-2xl">
                      🎟
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Sessions remaining in your current
                    membership.
                  </p>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{
                        width: `${
                          credits > 0
                            ? (remaining / credits) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>

                  <a
                    href="/learner/schedule"
                    className="mt-5 block rounded-2xl border border-slate-200 px-5 py-3 text-center font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Schedule session
                  </a>
                </section>

                {/* UPCOMING SESSIONS */}
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Upcoming sessions
                  </p>

                  {upcomingBookings.length === 0 ? (
                    <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-center text-sm text-slate-500">
                      No upcoming sessions.
                    </div>
                  ) : (
                    <div className="mt-5 space-y-4">
                      {upcomingBookings.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-slate-200 p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-black">
                                {item.topic ||
                                  "English Practice"}
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {formatSessionDate(
                                  item.session_date
                                )}
                              </p>

                              <p className="text-sm text-slate-500">
                                {formatSessionTime(
                                  item.session_time
                                )}
                              </p>
                            </div>

                            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
                              {item.status}
                            </span>
                          </div>

                          <p className="mt-3 text-sm text-slate-600">
                            Coach:{" "}
                            <span className="font-bold">
                              {item.coach_profiles
                                ?.full_name ||
                                item.coach_name ||
                                "Pending"}
                            </span>
                          </p>

                          <button
                            onClick={() =>
                              handleCancelBooking(item.id)
                            }
                            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100"
                          >
                            Cancel session
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* PROGRESS MAP */}
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Progress map
                  </p>

                  <div className="mt-5 space-y-3">
                    <ProgressStep
                      label="Choose your goal"
                      status="completed"
                    />

                    <ProgressStep
                      label="Match with a coach"
                      status={
                        booking ? "completed" : "pending"
                      }
                    />

                    <ProgressStep
                      label="Create learner profile"
                      status="completed"
                    />

                    <ProgressStep
                      label="Complete your first video call"
                      status="current"
                    />

                    <ProgressStep
                      label="Unlock feedback"
                      status="locked"
                    />
                  </div>
                </section>

                <button
                  onClick={handleSignOut}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 font-bold text-slate-700 lg:hidden"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatItem({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-indigo-200">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}

function PendingMatch({
  booking,
  formatSessionDate,
  formatSessionTime,
}) {
  return (
    <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
      <p className="font-black text-amber-800">
        Match pending
      </p>

      <p className="mt-2 text-sm text-amber-700">
        No coach is available yet for{" "}
        {formatSessionDate(booking.session_date)} at{" "}
        {formatSessionTime(booking.session_time)}.
      </p>
    </div>
  );
}

function ProgressStep({ label, status }) {
  const styles = {
    completed: "bg-emerald-50 text-emerald-800",
    current:
      "border border-cyan-300 bg-cyan-50 text-cyan-800",
    pending: "bg-slate-50 text-slate-600",
    locked: "bg-slate-100 text-slate-400",
  };

  const icons = {
    completed: "✓",
    current: "🎯",
    pending: "○",
    locked: "🔒",
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl p-4 font-semibold ${styles[status]}`}
    >
      <span>{icons[status]}</span>
      <span>{label}</span>
    </div>
  );
}