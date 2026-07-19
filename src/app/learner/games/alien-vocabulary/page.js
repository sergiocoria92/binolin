"use client";

import dynamic from "next/dynamic";

/*
|--------------------------------------------------------------------------
| CARGA EXCLUSIVA DEL JUEGO DEL ALIEN
|--------------------------------------------------------------------------
|
| Phaser solo se descarga cuando el usuario entra a esta ruta:
|
| /learner/games/alien-vocabulary
|
*/

const AlienVocabularyGame = dynamic(
  () =>
    import(
      "@/components/games/AlienVocabularyGame"
    ),
  {
    ssr: false,

    loading: () => (
      <main className="flex min-h-screen items-center justify-center bg-[#061126] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-white/20 border-t-cyan-400" />

          <p className="mt-5 font-black uppercase tracking-widest text-cyan-300">
            Loading alien mission...
          </p>
        </div>
      </main>
    ),
  }
);

export default function AlienVocabularyPage() {
  return <AlienVocabularyGame />;
}