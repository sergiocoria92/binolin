"use client";

import Link from "next/link";

export default function CoachWelcomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-lg text-center">

        <h1 className="text-4xl font-bold">
          Become a Binolin Coach
        </h1>

        <p className="mt-4 text-slate-600">
          Share your English skills, meet students from around the world,
          and earn money helping them improve.
        </p>

        <Link
          href="/create-account?role=coach"
          className="mt-8 inline-block rounded-xl bg-slate-900 px-8 py-4 text-white font-semibold"
        >
          Continue
        </Link>

      </div>
    </main>
  );
}