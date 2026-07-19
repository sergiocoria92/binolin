"use client";

export default function GamesMenuPage() {
  /*
  |--------------------------------------------------------------------------
  | JUEGOS DISPONIBLES
  |--------------------------------------------------------------------------
  |
  | Cada objeto representa una tarjeta dentro de la biblioteca.
  |
  | Para agregar otro juego:
  |
  | 1. Copia uno de estos objetos.
  | 2. Cambia el id.
  | 3. Cambia el título y descripción.
  | 4. Cambia href por la ruta del nuevo juego.
  | 5. Cambia available a true cuando esté terminado.
  |
  */

  const games = [
    {
      id: "alien-vocabulary",

      title: "Alien Vocabulary Mission",

      description:
        "Explore a 2D world, discover objects, hear new words, and answer vocabulary challenges.",

      /*
      | Emoji temporal.
      |
      | Cuando tengas una imagen real del juego puedes cambiar:
      |
      | icon: "👽"
      |
      | por:
      |
      | image: "/games/covers/alien-vocabulary.png"
      |
      | Más abajo hay una sección preparada para mostrar image.
      */
      icon: "👽",

      image: null,

      href: "/learner/games/alien-vocabulary",

      status: "Available",

      available: true,

      buttonText: "Start game",

      features: [
        "Vocabulary",
        "Listening",
        "Typing",
      ],

      /*
      | Colores temporales de la portada.
      |
      | Después puedes reemplazar el fondo completo
      | con una imagen diseñada específicamente.
      */
      background:
        "from-[#071329] via-[#102c55] to-[#136a78]",
    },

    {
      id: "second-game",

      title: "Mystery English Quest",

      description:
        "A second English-learning adventure currently being designed.",

      icon: "🗺️",

      image: null,

      href: "/learner/games/second-game",

      status: "Coming soon",

      available: false,

      buttonText: "Coming soon",

      features: [
        "New missions",
        "Rewards",
        "Adventure",
      ],

      background:
        "from-[#17102f] via-[#312063] to-[#175d75]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#eef3f9] text-slate-950">
      {/*
      |--------------------------------------------------------------------------
      | CONTENEDOR PRINCIPAL
      |--------------------------------------------------------------------------
      |
      | En computadora:
      |
      | - izquierda: biblioteca de juegos;
      | - derecha: panel morado con progreso.
      |
      | En celular:
      |
      | - primero aparecen los juegos;
      | - después aparece el panel de progreso.
      |
      */}

      <div className="mx-auto max-w-[1450px] px-5 py-6 sm:px-8 sm:py-10">
        {/*
        |--------------------------------------------------------------------------
        | BOTÓN PEQUEÑO PARA REGRESAR
        |--------------------------------------------------------------------------
        |
        | Ya no usamos la barra superior blanca.
        | Solo dejamos un botón discreto para regresar.
        */}

        <div className="mb-6">
          <a
            href="/learner"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-950"
          >
            <span aria-hidden="true">←</span>
            <span>Back to dashboard</span>
          </a>
        </div>

        <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.75fr)]">
          {/*
          |--------------------------------------------------------------------------
          | COLUMNA IZQUIERDA: LISTA DE JUEGOS
          |--------------------------------------------------------------------------
          */}

          <section>
            <div className="mb-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-600">
                Binolin Games
              </p>

              <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                Choose a game
              </h1>

              <p className="mt-2 max-w-2xl text-slate-500">
                Select a mission and start practicing
                immediately.
              </p>
            </div>

            {/*
            | Los juegos aparecen verticalmente porque usamos:
            |
            | space-y-5
            |
            | Cada tarjeta ocupa todo el ancho disponible.
            */}

            <div className="space-y-5">
              {games.map((game) => (
                <GameListCard
                  key={game.id}
                  game={game}
                />
              ))}
            </div>
          </section>

          {/*
          |--------------------------------------------------------------------------
          | COLUMNA DERECHA: PANEL MORADO
          |--------------------------------------------------------------------------
          |
          | Esta información antes ocupaba toda la parte superior.
          |
          | Ahora funciona como una columna lateral para no distraer
          | al usuario antes de ver los juegos.
          */}

          <aside className="xl:sticky xl:top-6">
            <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-950 via-violet-900 to-purple-700 p-6 text-white shadow-xl sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Learn by playing
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight">
                Complete missions and improve your
                English
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-indigo-100">
                Practice for a few minutes, earn rewards,
                and build your vocabulary, listening, and
                grammar skills.
              </p>

              {/*
              |--------------------------------------------------------------------------
              | VIDAS Y MONEDAS
              |--------------------------------------------------------------------------
              |
              | Por ahora estos valores son visuales.
              |
              | Más adelante puedes obtenerlos desde Supabase:
              |
              | profile.game_lives
              | profile.game_coins
              | profile.game_xp
              */}

              <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <SideStat
                  icon="❤️"
                  value="5"
                  label="Available lives"
                />

                <SideStat
                  icon="/games/coin2.png"
                  value="0"
                  label="Game coins"
                />
              </div>

              {/*
              |--------------------------------------------------------------------------
              | INFORMACIÓN DEL JUGADOR
              |--------------------------------------------------------------------------
              */}

              <div className="mt-6 space-y-3">
                <ProgressRow
                  icon="⭐"
                  label="Total game XP"
                  value="0"
                />

                <ProgressRow
                  icon="🔥"
                  label="Game streak"
                  value="0 days"
                />

                <ProgressRow
                  icon="🏆"
                  label="Current league"
                  value="Unranked"
                />
              </div>

              {/*
              |--------------------------------------------------------------------------
              | PROGRESO GENERAL TEMPORAL
              |--------------------------------------------------------------------------
              |
              | Cuando conectes Supabase, cambia 0 por el porcentaje real.
              */}

              <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-violet-200">
                      Weekly progress
                    </p>

                    <p className="mt-1 font-bold">
                      Start your first mission
                    </p>
                  </div>

                  <p className="text-2xl font-black">
                    0%
                  </p>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/30">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
                    style={{
                      width: "0%",
                    }}
                  />
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-white/10 p-5">
                <p className="text-sm font-black text-white">
                  More games are coming
                </p>

                <p className="mt-2 text-sm leading-relaxed text-indigo-100">
                  Future updates can include daily
                  missions, rankings, tournaments, and
                  competitions between countries.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| TARJETA HORIZONTAL DE JUEGO
|--------------------------------------------------------------------------
|
| Esta tarjeta está diseñada como una fila.
|
| En computadora:
|
| [imagen] [información del juego] [botón]
|
| En celular:
|
| los elementos se acomodan uno debajo del otro.
|
*/

function GameListCard({ game }) {
  return (
    <article
      className={`overflow-hidden rounded-[2rem] border bg-white shadow-sm transition ${
        game.available
          ? "border-slate-200 hover:-translate-y-1 hover:shadow-xl"
          : "border-slate-200 opacity-90"
      }`}
    >
      <div className="grid min-h-[245px] md:grid-cols-[230px_minmax(0,1fr)]">
        {/*
        |--------------------------------------------------------------------------
        | PORTADA DEL JUEGO
        |--------------------------------------------------------------------------
        |
        | Cuando tengas una imagen real:
        |
        | image: "/games/covers/alien-vocabulary.png"
        |
        | La tarjeta la mostrará automáticamente.
        */}

        <div
          className={`relative flex min-h-[220px] items-center justify-center overflow-hidden bg-gradient-to-br ${game.background}`}
        >
          {game.image ? (
            <img
              src={game.image}
              alt={game.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              {/*
              | Decoración temporal.
              | Puedes borrar estos círculos cuando agregues
              | una portada ilustrada.
              */}

              <div className="absolute -left-14 -top-14 h-44 w-44 rounded-full bg-violet-400/20" />

              <div className="absolute -bottom-14 -right-14 h-48 w-48 rounded-full bg-cyan-300/20" />

              <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/20 bg-black/20 text-7xl shadow-xl backdrop-blur">
                {game.icon}
              </div>
            </>
          )}

          <span
            className={`absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-black uppercase ${
              game.available
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {game.status}
          </span>
        </div>

        {/*
        |--------------------------------------------------------------------------
        | INFORMACIÓN Y BOTÓN
        |--------------------------------------------------------------------------
        */}

        <div className="flex flex-col justify-between p-6 sm:p-7">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">
              {game.title}
            </h2>

            <p className="mt-3 max-w-2xl leading-relaxed text-slate-500">
              {game.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {game.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7">
            {game.available ? (
              <a
                href={game.href}
                className="block rounded-2xl bg-slate-950 px-6 py-4 text-center text-lg font-black text-white transition hover:bg-cyan-500 hover:text-slate-950"
              >
                Start game
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="block w-full cursor-not-allowed rounded-2xl bg-slate-200 px-6 py-4 text-center text-lg font-black text-slate-500"
              >
                Coming soon
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| TARJETA PEQUEÑA DE VIDAS O MONEDAS
|--------------------------------------------------------------------------
*/

function SideStat({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center">
          {typeof icon === "string" && icon.startsWith("/") ? (
            <img
              src={icon}
              alt={label}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <span className="text-2xl">{icon}</span>
          )}
        </div>

        <div>
          <p className="text-xl font-black">
            {value}
          </p>

          <p className="text-xs text-indigo-200">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| FILA DE ESTADÍSTICA
|--------------------------------------------------------------------------
*/

function ProgressRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">
          {icon}
        </span>

        <span className="text-sm text-indigo-100">
          {label}
        </span>
      </div>

      <span className="text-sm font-black text-white">
        {value}
      </span>
    </div>
  );
}