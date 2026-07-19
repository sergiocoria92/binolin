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
  const coins = profile.coins || 0;
  const streak = profile.streak || 0;
  const sessionsTaken = profile.sessions_used || 0;

  function renderTags(items) {
    if (!items || items.length === 0) return null;

    return (
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-amber-700 bg-amber-950/60 px-3 py-1 text-xs font-black uppercase text-amber-300"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050a18] text-white">
      <div
        className="flex min-h-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, rgba(30,64,175,0.35), transparent 35%), linear-gradient(to bottom, #071329 0%, #050816 60%, #02040c 100%)",
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

          <div className="space-y-5 px-5 py-6 sm:px-8">
            {/* HERO */}
            <section className="border-4 border-[#34466b] bg-[#10172a] p-5 shadow-[7px_7px_0_#02040a] sm:p-7">
              <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
                <div>
                  <p className="font-black uppercase tracking-[0.2em] text-cyan-300">
                    Hero profile
                  </p>

                  <h1
                    className="mt-3 text-3xl font-black sm:text-4xl"
                    style={{
                      textShadow: "3px 3px 0 #000",
                    }}
                  >
                    Welcome, {profile.full_name}! 👋
                  </h1>

                  <p className="mt-2 text-slate-300">
                    Your English mission is ready.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center border-4 border-amber-600 bg-gradient-to-b from-blue-700 to-indigo-950 text-4xl shadow-[4px_4px_0_#000]">
                    {profile.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt={profile.full_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "🧑‍🚀"
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase text-amber-300">
                      English adventurer
                    </p>

                    <p className="mt-1 text-2xl font-black">
                      Level {level}
                    </p>

                    <p className="text-sm text-blue-300">
                      {cefr} {profile.english_level}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* STATS */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <GameStat
                icon="📖"
                label="Classes taken"
                value={sessionsTaken}
              />

              <GameStat
                icon="⌛"
                label="Sessions left"
                value={remaining}
              />

              <GameStat
                icon="⭐"
                label="Total XP"
                value={xp}
              />

              <GameStat
                icon="🪙"
                label="Coins"
                value={coins}
              />
            </section>

            {/* XP */}
            <section className="border-4 border-violet-700 bg-gradient-to-b from-[#211245] to-[#100a24] p-5 shadow-[7px_7px_0_#02040a] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">
                    Player progress
                  </p>

                  <p className="mt-2 text-3xl font-black">
                    Level {level}
                  </p>

                  <p className="text-sm text-violet-200">
                    English Adventurer
                  </p>
                </div>

                <div className="border-2 border-violet-500 bg-black/30 px-4 py-3 text-right">
                  <p className="text-xs uppercase text-violet-300">
                    Experience
                  </p>

                  <p className="font-black">
                    {currentLevelXp} / {nextLevelXp} XP
                  </p>
                </div>
              </div>

              <div className="mt-5 h-6 border-4 border-black bg-[#030309] p-[3px]">
                <div
                  className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400"
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs font-bold uppercase text-violet-200">
                {nextLevelXp - currentLevelXp} XP to reach
                Level {level + 1}
              </p>
            </section>

            {/* MAIN GRID */}
            <div className="grid gap-5 xl:grid-cols-[1.15fr_1fr_0.9fr]">
              {/* DAILY QUEST */}
              <section className="border-4 border-amber-700 bg-[#17130d] shadow-[7px_7px_0_#02040a]">
                <div className="border-b-4 border-amber-800 bg-gradient-to-r from-amber-800 to-yellow-700 px-5 py-4">
                  <p
                    className="font-black uppercase tracking-wide text-yellow-100"
                    style={{
                      textShadow: "2px 2px 0 #000",
                    }}
                  >
                    🎯 Daily Quest
                  </p>
                </div>

                <div className="p-5">
                  <h2 className="text-3xl font-black text-amber-100">
                    {topic}
                  </h2>

                  <div className="mt-4 border-2 border-amber-700 bg-amber-950/40 p-4">
                    <p className="text-xs font-black uppercase text-amber-300">
                      Quest reward
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3">
                      <span className="border-2 border-violet-400 bg-violet-700 px-3 py-2 text-sm font-black shadow-[2px_2px_0_#000]">
                        +50 XP
                      </span>

                      <span className="border-2 border-yellow-300 bg-yellow-500 px-3 py-2 text-sm font-black text-slate-950 shadow-[2px_2px_0_#000]">
                        🪙 20 Coins
                      </span>
                    </div>
                  </div>

                  {booking ? (
                    isPending ? (
                      <div className="mt-5 border-2 border-yellow-600 bg-yellow-950/40 p-4">
                        <p className="font-black uppercase text-yellow-300">
                          Match pending
                        </p>

                        <p className="mt-2 text-sm text-yellow-100">
                          No coach is available yet for{" "}
                          {formatSessionDate(
                            booking.session_date
                          )}{" "}
                          at{" "}
                          {formatSessionTime(
                            booking.session_time
                          )}
                          .
                        </p>
                      </div>
                    ) : (
                      <div className="mt-5 border-2 border-[#44557a] bg-[#0b1224] p-4">
                        <p className="text-xs font-black uppercase text-blue-300">
                          You matched with
                        </p>

                        <div className="mt-4 flex gap-4">
                          {coach?.avatar_url ? (
                            <img
                              src={coach.avatar_url}
                              alt={coachName}
                              className="h-16 w-16 border-4 border-amber-700 object-cover"
                            />
                          ) : (
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center border-4 border-amber-700 bg-slate-950 text-2xl font-black">
                              {coachName?.[0]?.toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="text-xl font-black">
                              {coachName}
                            </p>

                            <p className="text-sm text-slate-400">
                              {coach?.state || "USA"},{" "}
                              {coach?.country ||
                                "United States"}
                            </p>

                            <p className="mt-1 text-sm font-black text-violet-300">
                              {coach?.specialty ||
                                "Conversation"}{" "}
                              Coach
                            </p>
                          </div>
                        </div>

                        {renderTags(coach?.interests)}

                        <p className="mt-4 text-sm text-slate-300">
                          {coach?.bio ||
                            `Practice with ${coachName}.`}
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="mt-5 border-2 border-dashed border-slate-600 bg-black/20 p-4 text-sm text-slate-300">
                      Choose a time and Binolin will find
                      your coach.
                    </div>
                  )}

                  <div className="mt-5 border-2 border-[#3b4761] bg-[#0a1020] p-4">
                    <p className="text-xs font-black uppercase text-slate-400">
                      Booking status
                    </p>

                    <p className="mt-1 font-black uppercase text-cyan-300">
                      {booking?.status ||
                        "No booking yet"}
                    </p>

                    {booking?.session_date && (
                      <p className="mt-2 text-sm text-slate-300">
                        {formatSessionDate(
                          booking.session_date
                        )}{" "}
                        ·{" "}
                        {formatSessionTime(
                          booking.session_time
                        )}
                      </p>
                    )}
                  </div>

                  {booking && !isPending ? (
                    canStartSession(booking) ? (
                      <a
                        href={`/room?booking=${booking.id}&name=${encodeURIComponent(
                          profile.full_name
                        )}`}
                        className="mt-5 block border-4 border-emerald-800 bg-emerald-600 px-6 py-4 text-center font-black uppercase shadow-[4px_4px_0_#000] hover:bg-emerald-500"
                      >
                        Enter the quest
                      </a>
                    ) : (
                      <button
                        disabled
                        className="mt-5 block w-full cursor-not-allowed border-4 border-slate-700 bg-slate-800 px-6 py-4 text-center font-black uppercase text-slate-400 shadow-[4px_4px_0_#000]"
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
                      className="mt-5 block border-4 border-blue-800 bg-blue-600 px-6 py-4 text-center font-black uppercase shadow-[4px_4px_0_#000] hover:bg-blue-500"
                    >
                      {upcomingBookings.length > 0
                        ? "Schedule another quest"
                        : "Find my coach"}
                    </a>
                  )}
                </div>
              </section>

              {/* UPCOMING */}
              <section className="border-4 border-[#34466b] bg-[#0d1425] shadow-[7px_7px_0_#02040a]">
                <div className="border-b-4 border-[#34466b] bg-[#111d35] px-5 py-4">
                  <p className="font-black uppercase text-cyan-300">
                    Upcoming sessions
                  </p>
                </div>

                <div className="p-5">
                  {upcomingBookings.length === 0 ? (
                    <div className="border-2 border-dashed border-slate-700 bg-black/20 p-5 text-center text-sm text-slate-400">
                      You do not have upcoming missions.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingBookings.map((item) => (
                        <div
                          key={item.id}
                          className="border-2 border-[#3c4b68] bg-[#11182a] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-black">
                                {item.topic ||
                                  "English Practice"}
                              </p>

                              <p className="mt-1 text-xs text-blue-200">
                                {formatSessionDate(
                                  item.session_date
                                )}
                              </p>

                              <p className="text-xs text-blue-200">
                                {formatSessionTime(
                                  item.session_time
                                )}
                              </p>
                            </div>

                            <span className="border border-violet-500 bg-violet-900 px-2 py-1 text-[10px] font-black uppercase text-violet-200">
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
                              handleCancelBooking(item.id)
                            }
                            className="mt-4 border-2 border-red-800 bg-red-950/60 px-4 py-2 text-xs font-black uppercase text-red-300 hover:bg-red-900"
                          >
                            Cancel session
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* PROGRESS */}
              <section className="border-4 border-[#34466b] bg-[#0d1425] shadow-[7px_7px_0_#02040a]">
                <div className="border-b-4 border-[#34466b] bg-[#111d35] px-5 py-4">
                  <p className="font-black uppercase text-cyan-300">
                    Progress map
                  </p>
                </div>

                <div className="space-y-4 p-5">
                  <GameProgressStep
                    icon="✓"
                    label="Choose your goal"
                    status="completed"
                  />

                  <GameProgressStep
                    icon={booking ? "✓" : "○"}
                    label="Match with a coach"
                    status={
                      booking ? "completed" : "pending"
                    }
                  />

                  <GameProgressStep
                    icon="✓"
                    label="Create learner profile"
                    status="completed"
                  />

                  <GameProgressStep
                    icon="🎯"
                    label="Complete your first video call"
                    status="current"
                  />

                  <GameProgressStep
                    icon="🔒"
                    label="Unlock feedback"
                    status="locked"
                  />
                </div>
              </section>
            </div>

            {/* BOTTOM */}
            <section className="grid gap-5 md:grid-cols-2">
              <GamePanel title="Quick Match">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-2xl font-black">
                      Find a coach now
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Start a new English adventure.
                    </p>

                    <a
                      href="/learner/schedule"
                      className="mt-5 inline-block border-4 border-yellow-700 bg-yellow-500 px-5 py-3 font-black uppercase text-slate-950 shadow-[4px_4px_0_#000] hover:bg-yellow-400"
                    >
                      Practice now
                    </a>
                  </div>

                  <div className="text-6xl">⚡</div>
                </div>
              </GamePanel>

              <GamePanel title="Account">
                <p className="text-sm text-slate-400">
                  Current visual theme
                </p>

                <p className="mt-2 text-xl font-black uppercase text-violet-300">
                  Game Mode
                </p>

                <button
                  onClick={handleSignOut}
                  className="mt-5 w-full border-2 border-red-800 bg-red-950/60 px-5 py-3 font-black uppercase text-red-300 shadow-[3px_3px_0_#000] hover:bg-red-900"
                >
                  Sign out
                </button>
              </GamePanel>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function GameStat({ icon, label, value }) {
  return (
    <div className="border-4 border-[#34466b] bg-[#10172a] p-5 shadow-[5px_5px_0_#02040a]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-3xl font-black">
            {value}
          </p>
        </div>

        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}

function GamePanel({ title, children }) {
  return (
    <section className="border-4 border-[#34466b] bg-[#0d1425] shadow-[6px_6px_0_#02040a]">
      <div className="border-b-4 border-[#34466b] bg-[#111d35] px-4 py-3">
        <p className="font-black uppercase tracking-wide text-cyan-300">
          {title}
        </p>
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}

function GameProgressStep({
  icon,
  label,
  status,
}) {
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

  return (
    <div
      className={`flex items-center gap-3 border-2 p-4 text-sm font-black ${styles[status]}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}