
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

  const navItems = [
    { href: "/how-it-works", label: howText },
    { href: "/conversation-partners", label: partnersText },
    { href: "/pricing", label: pricingText },
  ];

  function navClass(path) {
    return pathname === path
      ? "binolin-nav-link binolin-nav-active"
      : "binolin-nav-link";
  }

  return (
    <>
      {/* NAVEGACIÓN PRINCIPAL */}
      <nav className="binolin-navbar relative z-10 flex items-center justify-between gap-4">

        {/* LOGOTIPO */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <div className="binolin-logo flex h-11 w-11 items-center justify-center rounded-full">
            <img
              src="/img/prueba1-recortada-negro.png"
              alt="Binolin"
              className="h-7 w-7 object-contain"
            />
          </div>

          <span className="binolin-heading text-2xl font-bold tracking-tight">
            Binolin
          </span>
        </Link>

        {/* ENLACES DE ESCRITORIO */}
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* IDIOMA, SESIÓN Y COMENZAR */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() =>
              setLanguage(language === "es" ? "en" : "es")
            }
            className="binolin-language-btn rounded-full px-3 py-2 text-sm font-semibold sm:px-4"
          >
            {language === "es" ? "EN" : "ES"}
          </button>

          <Link
            href="/sign-in"
            className="binolin-nav-link hidden rounded-full px-4 py-2 text-sm font-semibold sm:block"
          >
            {signInText}
          </Link>

          <Link
            href={startHref}
            className="binolin-primary-btn rounded-xl px-4 py-3 text-sm font-bold sm:px-5"
          >
            {startText}
          </Link>
        </div>
      </nav>

      {/* NAVEGACIÓN MÓVIL */}
      <div className="binolin-mobile-nav relative z-10 mt-6 grid grid-cols-3 gap-2 rounded-2xl p-2 text-center text-xs font-semibold md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-xl px-2 py-3 transition ${
              pathname === item.href
                ? "binolin-mobile-active"
                : "binolin-mobile-link"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
