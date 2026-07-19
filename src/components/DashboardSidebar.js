"use client";

export default function DashboardSidebar({
  dashboardTheme,
  profile,
  remaining,
  credits,
  streak,
}) {
  const isGame = dashboardTheme === "game";

    const menuItems = [
    {
      href: "/learner",
      professionalIcon: "▦",
      gameIcon: "⚔",
      label: "Dashboard",
      active: true,
    },
    {
      href: "/learner/schedule",
      professionalIcon: "▣",
      gameIcon: "📜",
      label: "My Sessions",
    },
    {
      href: "/learner/schedule",
      professionalIcon: "⚡",
      gameIcon: "⚡",
      label: "Quick Match",
    },
    {
      href: "/learner",
      professionalIcon: "♙",
      gameIcon: "🧙",
      label: "My Coaches",
    },
    {
      href: "/learner/games",
      professionalIcon: "◈",
      gameIcon: "🎮",
      label: "Practice Games",
    },
    {
      href: "/learner",
      professionalIcon: "↗",
      gameIcon: "🏆",
      label: "Goals & Progress",
    },
    {
      href: "/learner",
      professionalIcon: "★",
      gameIcon: "🎁",
      label: "Rewards",
    },
    {
      href: "/learner",
      professionalIcon: "✉",
      gameIcon: "✉",
      label: "Messages",
    },
  ];

  return (
    <aside
      className={`hidden w-[280px] shrink-0 lg:flex lg:flex-col ${
        isGame
          ? "border-r-4 border-[#263653] bg-[#071024]"
          : "border-r border-slate-200 bg-white"
      }`}
    >
      <div
        className={`flex h-[136px] items-center border-b px-7 ${
          isGame
            ? "border-[#263653]"
            : "border-slate-200"
        }`}
      >
        <a
          href="/learner"
          className="flex items-center gap-4"
        >
          <div
            className={`flex h-14 w-14 items-center justify-center text-2xl font-black ${
              isGame
                ? "border-4 border-amber-600 bg-gradient-to-br from-yellow-300 to-amber-600 text-slate-950 shadow-[4px_4px_0_#000]"
                : "rounded-2xl bg-cyan-500 text-white"
            }`}
          >
            B
          </div>

          <div>
            <p
              className={`text-2xl font-black ${
                isGame
                  ? "uppercase text-yellow-400"
                  : "text-slate-950"
              }`}
              style={
                isGame
                  ? {
                      textShadow:
                        "2px 2px 0 #7c2d12, 4px 4px 0 #000",
                    }
                  : undefined
              }
            >
              binolin
            </p>

            <p
              className={`text-xs ${
                isGame
                  ? "uppercase tracking-[0.18em] text-blue-300"
                  : "text-slate-400"
              }`}
            >
              Speak with confidence
            </p>
          </div>
        </a>
      </div>

      <nav className="flex-1 space-y-3 px-5 py-7">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            href={item.href}
            icon={isGame ? item.gameIcon : item.icon}
            label={item.label}
            active={item.active}
            isGame={isGame}
          />
        ))}
      </nav>

      <div className="space-y-5 px-5 pb-6">
        <div
          className={`p-5 ${
            isGame
              ? "border-4 border-[#34466b] bg-[#0d1425] shadow-[5px_5px_0_#02040a]"
              : "rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-800 text-white"
          }`}
        >
          <p
            className={`text-xs font-black uppercase tracking-wider ${
              isGame
                ? "text-cyan-300"
                : "text-violet-200"
            }`}
          >
            Current streak
          </p>

          <div className="mt-4 text-center">
            <p className="text-4xl">🔥</p>

            <p
              className={`mt-2 text-4xl font-black ${
                isGame
                  ? "text-yellow-300"
                  : "text-white"
              }`}
            >
              {streak || 0}
            </p>

            <p
              className={`text-sm font-black uppercase ${
                isGame
                  ? "text-amber-100"
                  : "text-violet-100"
              }`}
            >
              Days
            </p>
          </div>
        </div>

        <div
          className={`p-5 ${
            isGame
              ? "border-4 border-[#34466b] bg-[#0d1425] shadow-[5px_5px_0_#02040a]"
              : "rounded-3xl bg-slate-950 text-white"
          }`}
        >
          <p
            className={`text-xs font-black uppercase tracking-wider ${
              isGame
                ? "text-cyan-300"
                : "text-slate-400"
            }`}
          >
            Current plan
          </p>

          <p
            className={`mt-3 text-3xl font-black ${
              isGame
                ? "text-cyan-300"
                : "text-white"
            }`}
          >
            {remaining} / {credits}
          </p>

          <p
            className={`mt-1 text-sm ${
              isGame
                ? "text-slate-400"
                : "text-slate-400"
            }`}
          >
            Sessions remaining
          </p>

          <a
            href="/learner/schedule"
            className={`mt-5 block px-4 py-3 text-center text-sm font-black ${
              isGame
                ? "border-2 border-emerald-700 bg-emerald-600 uppercase text-white shadow-[3px_3px_0_#000] hover:bg-emerald-500"
                : "rounded-xl bg-white text-slate-950"
            }`}
          >
            Schedule session
          </a>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  active,
  isGame,
}) {
  return (
    <a
      href={href}
      className={`flex h-[58px] items-center gap-4 px-4 text-sm font-black transition ${
        isGame
          ? active
            ? "border-2 border-violet-500 bg-violet-700 uppercase text-white shadow-[3px_3px_0_#000]"
            : "border-2 border-[#374866] bg-[#11182a] uppercase text-slate-300 shadow-[3px_3px_0_#000] hover:bg-[#1a2540]"
          : active
            ? "rounded-2xl bg-blue-50 text-blue-700"
            : "rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-slate-950"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center ${
          isGame
            ? "text-lg"
            : "rounded-xl bg-slate-100 text-slate-500"
        }`}
      >
        {icon}
      </span>

      <span className="truncate">{label}</span>
    </a>
  );
}