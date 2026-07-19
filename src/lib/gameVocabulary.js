/*
|--------------------------------------------------------------------------
| VOCABULARIO DEL JUEGO
|--------------------------------------------------------------------------
|
| Este archivo contiene todas las palabras que aparecerán en el juego.
|
| Por ahora usamos emojis como imágenes temporales:
|
|   emoji: "🧴"
|
| Cuando tengas dibujos pixel art, podrás agregar:
|
|   image: "/games/objects/bottle.png"
|
| Después modificaremos el juego para cargar esa imagen en lugar del emoji.
|
| IMPORTANTE:
| Cada palabra necesita un "id" único.
|
*/

export const LEVELS = [
  {
    /*
    |--------------------------------------------------------------------------
    | NIVEL 1
    |--------------------------------------------------------------------------
    |
    | Tema: objetos cotidianos.
    |
    | Para la prueba inicial usamos 10 palabras.
    | Más adelante puedes agregar las 30 palabras completas.
    |
    */

    id: 1,
    title: "Everyday Objects",
    requiredPoints: 30,

    words: [
      {
        id: "bottle",
        word: "bottle",
        translation: "botella",

        /*
        | Imagen temporal.
        | Después puede cambiarse por un sprite PNG.
        */
        emoji: "🧴",

        /*
        | AUDIO OPCIONAL:
        |
        | Cuando tengas un audio profesional, agrega:
        |
        | audio: "/games/audio/bottle.mp3"
        |
        | Por ahora el navegador pronunciará la palabra
        | usando speechSynthesis.
        */
        audio: null,
      },

      {
        id: "book",
        word: "book",
        translation: "libro",
        emoji: "📘",
        audio: null,
      },

      {
        id: "chair",
        word: "chair",
        translation: "silla",
        emoji: "🪑",
        audio: null,
      },

      {
        id: "key",
        word: "key",
        translation: "llave",
        emoji: "🔑",
        audio: null,
      },

      {
        id: "phone",
        word: "phone",
        translation: "teléfono",
        emoji: "📱",
        audio: null,
      },

      {
        id: "apple",
        word: "apple",
        translation: "manzana",
        emoji: "🍎",
        audio: null,
      },

      {
        id: "shoe",
        word: "shoe",
        translation: "zapato",
        emoji: "👟",
        audio: null,
      },

      {
        id: "clock",
        word: "clock",
        translation: "reloj",
        emoji: "⏰",
        audio: null,
      },

      {
        id: "car",
        word: "car",
        translation: "automóvil",
        emoji: "🚗",
        audio: null,
      },

      {
        id: "house",
        word: "house",
        translation: "casa",
        emoji: "🏠",
        audio: null,
      },
    ],
  },
];

/*
|--------------------------------------------------------------------------
| FUNCIÓN PARA OBTENER UN NIVEL
|--------------------------------------------------------------------------
*/

export function getLevel(levelNumber) {
  return (
    LEVELS.find((level) => level.id === levelNumber) ||
    LEVELS[0]
  );
}