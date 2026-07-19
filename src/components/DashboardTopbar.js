"use client";


export default function DashboardTopbar({
  profile,
  dashboardTheme,
  changeDashboardTheme,
  handleSignOut,
}) {
  const isGame = dashboardTheme === "game";

  const profileInitial =
    profile?.full_name?.trim()?.[0]?.toUpperCase() || "L";

  return (
    <header
      className={`sticky top-0 z-40 h-[92px] border-b ${
        isGame
          ? "border-[#253555] bg-[#071024] text-white"
          : "border-slate-200 bg-white text-slate-950"
      }`}
    >
      <div className="flex h-full items-center justify-between gap-4 px-5 sm:px-8">
        {/* LEFT SIDE */}
        <div className="min-w-0">
          <p
            className={`text-sm ${
              isGame ? "text-cyan-300" : "text-slate-500"
            }`}
          >
            Welcome back
          </p>

          <h1
            className={`truncate text-xl font-black sm:text-2xl ${
              isGame ? "text-white" : "text-slate-950"
            }`}
          >
            Hello, {profile.full_name} 👋
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex shrink-0 items-center gap-3">
          {/* THEME SELECTOR */}
          <div
            className={`hidden rounded-2xl border p-1 md:flex ${
              isGame
                ? "border-[#34466b] bg-[#10182b]"
                : "border-slate-200 bg-slate-100"
            }`}
          >
            <button
              type="button"
              onClick={() =>
                changeDashboardTheme("professional")
              }
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                dashboardTheme === "professional"
                  ? isGame
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-white text-slate-950 shadow-sm"
                  : isGame
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-950"
              }`}
            >
              Professional
            </button>

            <button
              type="button"
              onClick={() => changeDashboardTheme("game")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                dashboardTheme === "game"
                  ? isGame
                    ? "bg-violet-600 text-white"
                    : "bg-white text-slate-950 shadow-sm"
                  : isGame
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-950"
              }`}
            >
              Game Mode
            </button>
          </div>

          {/* SIGN OUT */}
          <button
            type="button"
            onClick={handleSignOut}
            className={`hidden rounded-xl border px-4 py-2.5 text-sm font-bold transition sm:block ${
              isGame
                ? "border-[#34466b] bg-[#10182b] text-slate-200 hover:bg-[#192541]"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            Sign out
          </button>

          {/* PROFILE BUTTON - DISABLED FOR NOW */}
          <button
            type="button"
            disabled
            aria-label="Profile settings coming soon"
            title="Profile settings coming soon"
            className={`relative flex h-12 w-12 cursor-not-allowed items-center justify-center overflow-hidden rounded-full border-2 font-black opacity-90 ${
              isGame
                ? "border-amber-500 bg-[#17233d] text-amber-300 shadow-[3px_3px_0_#000]"
                : "border-slate-200 bg-slate-950 text-white"
            }`}
          >
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{profileInitial}</span>
            )}

            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 ${
                isGame
                  ? "border-[#071024] bg-slate-500"
                  : "border-white bg-slate-400"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}