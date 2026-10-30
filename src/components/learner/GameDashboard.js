"use client";

import DashboardTopbar from "@/components/DashboardTopbar";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function GameDashboard({
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
            className="border-2 border-amber-700 bg-amber-950/60 px-3 py-1 text-xs font-black uppercase text-amber-300 shadow-[2px_2px_0_#000]"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div
        className="flex min-h-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, rgba(30,64,175,0.32), transparent 34%), linear-gradient(to bottom, #071329 0%, #050816 58%, #02040c 100%)",
        }}
      >
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
            <section className="overflow-hidden border-4 border-violet-700 bg-gradient-to-br from-[#261150] via-[#17123a] to-[#091a3a] p-6 shadow-[8px_8px_0_#02040a] sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                    Player progress
                  </p>

                  <div className="mt-4 flex flex-wrap items-end gap-4">
                    <div>
                      <p className="text-sm font-bold text-violet-200">
                        Current rank
                      </p>

                      <h2
                        className="mt-1 text-3xl font-black sm:text-4xl"
                        style={{
                          textShadow: "3px 3px 0 #000",
                        }}
                      >
                        {cefr || "CEFR"}{" "}
                        {profile.english_level}
                      </h2>
                    </div>

                    <span className="border-2 border-amber-400 bg-amber-600 px-4 py-2 text-sm font-black uppercase text-white shadow-[3px_3px_0_#000]">
                      Level {level}
                    </span>
                  </div>

                  <div className="mt-7">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-black text-violet-200">
                        {currentLevelXp} XP
                      </span>

                      <span className="font-black text-cyan-200">
                        {nextLevelXp} XP
                      </span>
                    </div>

                    <div className="mt-2 h-5 border-4 border-black bg-[#030309] p-[2px]">
                      <div
                        className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400"
                        style={{
                          width: `${progressPercent}%`,
                        }}
                      />
                    </div>

                    <p className="mt-3 text-xs font-black uppercase tracking-wide text-violet-200">
                      {nextLevelXp - currentLevelXp} XP to
                      reach Level {level + 1}
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-4">
                    <GameStatItem
                      icon="📖"
                      label="Classes taken"
                      value={sessionsTaken}
                    />

                    <GameStatItem
                      icon="⌛"
                      label="Sessions remaining"
                      value={remaining}
                    />

                    <GameStatItem
                      icon="⭐"
                      label="Total XP"
                      value={xp}
                    />

                    <GameStatItem
                      icon="🪙"
                      label="Coins"
                      value={coins}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative flex h-36 w-36 items-center justify-center border-4 border-cyan-500 bg-black/30 shadow-[6px_6px_0_#000]">
                    <div className="absolute inset-2 border-4 border-violet-500" />

                    <div className="relative z-10 text-center">
                      <p
                        className="text-3xl font-black"
                        style={{
                          textShadow: "3px 3px 0 #000",
                        }}
                      >
                        {Math.round(progressPercent)}%
                      </p>

                      <p className="mt-1 text-xs font-black uppercase text-cyan-200">
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
                <section className="border-4 border-amber-700 bg-[#17130d] shadow-[7px_7px_0_#02040a]">
                  <div className="border-b-4 border-amber-800 bg-gradient-to-r from-amber-800 to-yellow-700 px-6 py-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p
                          className="text-sm font-black uppercase tracking-wider text-yellow-100"
                          style={{
                            textShadow: "2px 2px 0 #000",
                          }}
                        >
                          Next quest
                        </p>

                        <h2
                          className="mt-2 text-2xl font-black text-white"
                          style={{
                            textShadow: "3px 3px 0 #000",
                          }}
                        >
                          {topic}
                        </h2>
                      </div>

                      <span className="border-2 border-yellow-300 bg-yellow-500 px-4 py-2 text-sm font-black uppercase text-slate-950 shadow-[3px_3px_0_#000]">
                        {duration} min
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {booking ? (
                      isPending ? (
                        <PendingGameMatch
                          booking={booking}
                          formatSessionDate={
                            formatSessionDate
                          }
                          formatSessionTime={
                            formatSessionTime
                          }
                        />
                      ) : (
                        <div className="flex flex-col gap-5 border-4 border-[#34466b] bg-[#0b1224] p-5 shadow-[4px_4px_0_#000] sm:flex-row sm:items-center">
                          {coach?.avatar_url ? (
                            <img
                              src={coach.avatar_url}
                              alt={coachName}
                              className="h-20 w-20 border-4 border-amber-600 object-cover shadow-[3px_3px_0_#000]"
                            />
                          ) : (
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center border-4 border-amber-600 bg-slate-950 text-3xl font-black text-white shadow-[3px_3px_0_#000]">
                              {coachName?.[0]?.toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black uppercase tracking-wide text-cyan-300">
                              You matched with
                            </p>

                            <p
                              className="mt-1 text-xl font-black"
                              style={{
                                textShadow:
                                  "2px 2px 0 #000",
                              }}
                            >
                              {coachName}
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                              {coach?.state || "USA"},{" "}
                              {coach?.country ||
                                "United States"}
                            </p>

                            <p className="mt-2 text-sm font-black text-violet-300">
                              {coach?.specialty ||
                                "Conversation"}{" "}
                              Coach
                            </p>

                            {renderTags(coach?.interests)}
                          </div>

                          <div className="border-2 border-[#44557a] bg-[#11182a] p-4 sm:text-right">
                            <p className="font-black text-blue-100">
                              {formatSessionDate(
                                booking.session_date
                              )}
                            </p>

                            <p className="mt-1 text-sm font-bold text-blue-300">
                              {formatSessionTime(
                                booking.session_time
                              )}
                            </p>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="border-4 border-dashed border-slate-600 bg-black/20 p-6 text-center">
                        <p className="font-black uppercase text-slate-300">
                          You do not have a quest scheduled.
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
                            className="block border-4 border-emerald-800 bg-emerald-600 px-6 py-4 text-center font-black uppercase text-white shadow-[4px_4px_0_#000] hover:bg-emerald-500"
                          >
                            Enter the quest
                          </a>
                        ) : (
                          <button
                            disabled
                            className="block w-full cursor-not-allowed border-4 border-slate-700 bg-slate-800 px-6 py-4 text-center font-black uppercase text-slate-400 shadow-[4px_4px_0_#000]"
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
                          className="block border-4 border-blue-800 bg-blue-600 px-6 py-4 text-center font-black uppercase text-white shadow-[4px_4px_0_#000] hover:bg-blue-500"
                        >
                          {upcomingBookings.length > 0
                            ? "Schedule another quest"
                            : "Find my coach"}
                        </a>
                      )}
                    </div>
                  </div>
                </section>

                {/* QUICK MATCH */}
                <section className="border-4 border-cyan-700 bg-[#0d1425] p-6 shadow-[7px_7px_0_#02040a]">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
                        Quick Match
                      </p>

                      <h2
                        className="mt-2 text-2xl font-black"
                        style={{
                          textShadow: "2px 2px 0 #000",
                        }}
                      >
                        Practice English today
                      </h2>

                      <p className="mt-2 text-slate-400">
                        Choose a time and Binolin will find
                        an available coach.
                      </p>
                    </div>

                    <div
                      className="hidden text-5xl sm:block"
                      style={{
                        filter:
                          "drop-shadow(3px 3px 0 #000)",
                      }}
                    >
                      ⚡
                    </div>
                  </div>

                  <a
                    href="/learner/schedule"
                    className="mt-6 inline-block border-4 border-yellow-700 bg-yellow-500 px-6 py-3.5 font-black uppercase text-slate-950 shadow-[4px_4px_0_#000] hover:bg-yellow-400"
                  >
                    Practice now
                  </a>
                </section>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                {/* MEMBERSHIP */}
                <section className="border-4 border-[#34466b] bg-[#0d1425] p-6 shadow-[7px_7px_0_#02040a]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
                        Quest passes
                      </p>

                      <h2
                        className="mt-2 text-2xl font-black"
                        style={{
                          textShadow: "2px 2px 0 #000",
                        }}
                      >
                        {remaining} of {credits}
                      </h2>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center border-4 border-amber-700 bg-amber-950/60 text-2xl shadow-[3px_3px_0_#000]">
                      🎟
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Sessions remaining in your current
                    membership.
                  </p>

                  <div className="mt-5 h-5 border-4 border-black bg-[#030309] p-[2px]">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
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
                    className="mt-5 block border-4 border-[#34466b] bg-[#111d35] px-5 py-3 text-center font-black uppercase text-cyan-200 shadow-[4px_4px_0_#000] hover:bg-[#182845]"
                  >
                    Schedule session
                  </a>
                </section>

                {/* UPCOMING SESSIONS */}
                <section className="border-4 border-[#34466b] bg-[#0d1425] shadow-[7px_7px_0_#02040a]">
                  <div className="border-b-4 border-[#34466b] bg-[#111d35] px-6 py-4">
                    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
                      Upcoming quests
                    </p>
                  </div>

                  <div className="p-6">
                    {upcomingBookings.length === 0 ? (
                      <div className="border-4 border-dashed border-slate-700 bg-black/20 p-5 text-center text-sm font-bold text-slate-400">
                        No upcoming quests.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {upcomingBookings.map((item) => (
                          <div
                            key={item.id}
                            className="border-2 border-[#3c4b68] bg-[#11182a] p-4 shadow-[3px_3px_0_#000]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-black">
                                  {item.topic ||
                                    "English Practice"}
                                </p>

                                <p className="mt-1 text-sm text-blue-200">
                                  {formatSessionDate(
                                    item.session_date
                                  )}
                                </p>

                                <p className="text-sm text-blue-200">
                                  {formatSessionTime(
                                    item.session_time
                                  )}
                                </p>
                              </div>

                              <span className="border-2 border-violet-500 bg-violet-900 px-3 py-1 text-xs font-black uppercase text-violet-200 shadow-[2px_2px_0_#000]">
                                {item.status}
                              </span>
                            </div>

                            <p className="mt-3 text-sm text-slate-300">
                              Coach:{" "}
                              <span className="font-black text-amber-300">
                                {item.coach_profiles
                                  ?.full_name ||
                                  item.coach_name ||
                                  "Pending"}
                              </span>
                            </p>

                            <button
                              onClick={() =>
                                handleCancelBooking(
                                  item.id
                                )
                              }
                              className="mt-4 border-2 border-red-800 bg-red-950/60 px-4 py-2 text-sm font-black uppercase text-red-300 shadow-[3px_3px_0_#000] hover:bg-red-900"
                            >
                              Cancel session
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {/* PROGRESS MAP */}
                <section className="border-4 border-[#34466b] bg-[#0d1425] shadow-[7px_7px_0_#02040a]">
                  <div className="border-b-4 border-[#34466b] bg-[#111d35] px-6 py-4">
                    <p className="text-sm font-black uppercase tracking-wider text-cyan-300">
                      Adventure map
                    </p>
                  </div>

                  <div className="space-y-3 p-6">
                    <GameProgressStep
                      label="Choose your goal"
                      status="completed"
                    />

                    <GameProgressStep
                      label="Match with a coach"
                      status={
                        booking ? "completed" : "pending"
                      }
                    />

                    <GameProgressStep
                      label="Create learner profile"
                      status="completed"
                    />

                    <GameProgressStep
                      label="Complete your first video call"
                      status="current"
                    />

                    <GameProgressStep
                      label="Unlock feedback"
                      status="locked"
                    />
                  </div>
                </section>

                <button
                  onClick={handleSignOut}
                  className="w-full border-4 border-red-800 bg-red-950/60 px-5 py-4 font-black uppercase text-red-300 shadow-[4px_4px_0_#000] lg:hidden"
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

function GameStatItem({ icon, label, value }) {
  return (
    <div className="border-2 border-violet-500 bg-black/25 p-4 shadow-[3px_3px_0_#000]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-violet-200">
            {label}
          </p>

          <p className="mt-1 text-2xl font-black">
            {value}
          </p>
        </div>

        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

function PendingGameMatch({
  booking,
  formatSessionDate,
  formatSessionTime,
}) {
  return (
    <div className="border-4 border-yellow-700 bg-yellow-950/50 p-5 shadow-[4px_4px_0_#000]">
      <p className="font-black uppercase text-yellow-300">
        Match pending
      </p>

      <p className="mt-2 text-sm text-yellow-100">
        No coach is available yet for{" "}
        {formatSessionDate(booking.session_date)} at{" "}
        {formatSessionTime(booking.session_time)}.
      </p>
    </div>
  );
}

function GameProgressStep({ label, status }) {
  const styles = {
    completed:
      "border-emerald-700 bg-emerald-950/50 text-emerald-300",
    current:
      "border-cyan-500 bg-cyan-950/60 text-cyan-200",
    pending:
      "border-slate-600 bg-slate-900 text-slate-300",
    locked:
      "border-slate-800 bg-slate-950 text-slate-600",
  };

  const icons = {
    completed: "✓",
    current: "🎯",
    pending: "○",
    locked: "🔒",
  };

  return (
    <div
      className={`flex items-center gap-3 border-2 p-4 text-sm font-black shadow-[2px_2px_0_#000] ${styles[status]}`}
    >
      <span>{icons[status]}</span>
      <span>{label}</span>
    </div>
  );
}