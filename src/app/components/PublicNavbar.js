"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PublicNavbar({
  language,
  setLanguage,
  signInText,
  startText,
  howText,
  partnersText,
  pricingText,
  startHref = "/learner/goals",
}) {
  const pathname = usePathname();

  function navClass(path) {
    const isActive = pathname === path;

    return `transition ${
      isActive
        ? "font-bold text-[#39df4a]"
        : "text-white/65 hover:text-white"
    }`;
  }

  return (
    <>
      <nav className="relative z-10 flex items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#38e34d] shadow-[0_0_25px_rgba(56,227,77,0.55)]">
            <img
              src="/img/prueba1-recortada-negro.png"
              alt="Binolin"
              className="h-7 w-7 object-contain"
            />
          </div>

          <span className="text-2xl font-bold tracking-tight">Binolin</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link
            href="/how-it-works"
            className={navClass("/how-it-works")}
          >
            {howText}
          </Link>

          <Link
            href="/conversation-partners"
            className={navClass("/conversation-partners")}
          >
            {partnersText}
          </Link>

          <Link
            href="/pricing"
            className={navClass("/pricing")}
          >
            {pricingText}
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 sm:px-4"
          >
            {language === "es" ? "EN" : "ES"}
          </button>

          <Link
            href="/sign-in"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition hover:text-white sm:block"
          >
            {signInText}
          </Link>

          <Link
            href={startHref}
            className="rounded-xl bg-[#39df4a] px-4 py-3 text-sm font-bold text-[#031006] shadow-[0_0_22px_rgba(57,223,74,0.45)] transition hover:bg-[#50ef5f] sm:px-5"
          >
            {startText}
          </Link>
        </div>
      </nav>

      <div className="relative z-10 mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-center text-xs font-semibold backdrop-blur md:hidden">
        <Link
          href="/how-it-works"
          className={`rounded-xl px-2 py-3 transition ${
            pathname === "/how-it-works"
              ? "bg-[#39df4a]/15 text-[#6af378]"
              : "text-white/65 hover:bg-white/5 hover:text-white"
          }`}
        >
          {howText}
        </Link>

        <Link
          href="/conversation-partners"
          className={`rounded-xl px-2 py-3 transition ${
            pathname === "/conversation-partners"
              ? "bg-[#39df4a]/15 text-[#6af378]"
              : "text-white/65 hover:bg-white/5 hover:text-white"
          }`}
        >
          {partnersText}
        </Link>

        <Link
          href="/pricing"
          className={`rounded-xl px-2 py-3 transition ${
            pathname === "/pricing"
              ? "bg-[#39df4a]/15 text-[#6af378]"
              : "text-white/65 hover:bg-white/5 hover:text-white"
          }`}
        >
          {pricingText}
        </Link>
      </div>
    </>
  );
}