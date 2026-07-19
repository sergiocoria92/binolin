"use client";

import { useEffect, useRef, useState } from "react";
import { getLevel } from "@/lib/gameVocabulary";

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN GENERAL DEL PROTOTIPO
|--------------------------------------------------------------------------
|
| Cambia estos valores para probar diferentes comportamientos.
|
*/

const MAX_LIVES = 5;

/*
| Una hora expresada en milisegundos.
|
| Para hacer pruebas rápidas puedes cambiar temporalmente:
|
| 60 * 60 * 1000
|
| por:
|
| 30 * 1000
|
| Eso haría que las vidas regresen después de 30 segundos.
*/
const LIFE_RECOVERY_TIME = 60 * 60 * 1000;

/*
| Nivel inicial.
|
| En el futuro este valor puede venir desde Supabase:
|
| profile.game_level
*/
const STARTING_LEVEL = 1;

/*
|--------------------------------------------------------------------------
| COMPONENTE PRINCIPAL
|--------------------------------------------------------------------------
*/

export default function AlienVocabularyGame() {
  /*
  |--------------------------------------------------------------------------
  | REFERENCIAS DE PHASER
  |--------------------------------------------------------------------------
  |
  | Phaser necesita un elemento HTML donde colocar su canvas.
  |
  | gameContainerRef:
  | Es el div donde aparecerá el juego.
  |
  | gameRef:
  | Guarda la instancia de Phaser para poder destruirla al salir.
  |
  | sceneRef:
  | Guarda acceso a la escena actual para continuar después
  | de responder una pregunta.
  |
  */

  const gameContainerRef = useRef(null);
  const gameRef = useRef(null);
  const sceneRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | ESTADO DEL JUGADOR
  |--------------------------------------------------------------------------
  */

  const [levelNumber, setLevelNumber] =
    useState(STARTING_LEVEL);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);

  /*
  |--------------------------------------------------------------------------
  | ESTADO DE PREGUNTAS
  |--------------------------------------------------------------------------
  |
  | currentChallenge puede contener:
  |
  | {
  |   type: "learn" | "multiple-choice" | "typing",
  |   word: objeto de vocabulario,
  |   options: arreglo de respuestas
  | }
  |
  */

  const [currentChallenge, setCurrentChallenge] =
    useState(null);

  /*
  | Guarda lo que el usuario está escribiendo.
  */
  const [typedAnswer, setTypedAnswer] = useState("");

  /*
  | Mensaje visual:
  |
  | "Correct!"
  | "Try again"
  | etc.
  */
  const [feedback, setFeedback] = useState("");

  /*
  |--------------------------------------------------------------------------
  | GAME OVER Y RECUPERACIÓN
  |--------------------------------------------------------------------------
  */

  const [gameOver, setGameOver] = useState(false);

  /*
  | Fecha exacta en que puede recuperar vidas.
  */
  const [recoveryAt, setRecoveryAt] = useState(null);

  /*
  | Texto mostrado en el contador.
  */
  const [recoveryText, setRecoveryText] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | INFORMACIÓN DEL NIVEL
  |--------------------------------------------------------------------------
  */

  const levelData = getLevel(levelNumber);
  const requiredPoints = levelData.requiredPoints;

  const progressPercent = Math.min(
    (score / requiredPoints) * 100,
    100
  );

  /*
  |--------------------------------------------------------------------------
  | RECUPERAR INFORMACIÓN GUARDADA
  |--------------------------------------------------------------------------
  |
  | Por ahora se usa localStorage.
  |
  | Después puedes cambiar esto por Supabase:
  |
  | learner_game_progress
  | learner_game_lives
  | learner_game_level
  |
  */

  useEffect(() => {
  /*
  |--------------------------------------------------------------------------
  | CARGAR PROGRESO GUARDADO
  |--------------------------------------------------------------------------
  */

  const savedLives = window.localStorage.getItem(
    "binolin-game-lives"
  );

  const savedScore = window.localStorage.getItem(
    "binolin-game-score"
  );

  const savedLevel = window.localStorage.getItem(
    "binolin-game-level"
  );

  const savedRecoveryAt =
    window.localStorage.getItem(
      "binolin-game-recovery-at"
    );

  const parsedLives =
    savedLives !== null
      ? Number(savedLives)
      : MAX_LIVES;

  const parsedRecoveryAt = savedRecoveryAt
    ? Number(savedRecoveryAt)
    : null;

  /*
  |--------------------------------------------------------------------------
  | SI EL TIEMPO YA TERMINÓ
  |--------------------------------------------------------------------------
  |
  | Aunque el usuario haya cerrado la página,
  | comprobamos la hora real cuando regresa.
  |
  */

  if (
    parsedRecoveryAt &&
    parsedRecoveryAt <= Date.now()
  ) {
    setLives(MAX_LIVES);
    setGameOver(false);
    setRecoveryAt(null);

    window.localStorage.setItem(
      "binolin-game-lives",
      String(MAX_LIVES)
    );

    window.localStorage.removeItem(
      "binolin-game-recovery-at"
    );
  } else {
    /*
    |--------------------------------------------------------------------------
    | SI TODAVÍA NO TERMINA EL TIEMPO
    |--------------------------------------------------------------------------
    */

    setLives(parsedLives);
    setRecoveryAt(parsedRecoveryAt);

    /*
    | Esta es la parte que faltaba:
    | si tiene 0 vidas y todavía hay tiempo pendiente,
    | mostramos Game Over inmediatamente.
    */

    if (
      parsedLives <= 0 &&
      parsedRecoveryAt &&
      parsedRecoveryAt > Date.now()
    ) {
      setGameOver(true);
    }
  }

  if (savedScore !== null) {
    setScore(Number(savedScore));
  }

  if (savedLevel !== null) {
    setLevelNumber(Number(savedLevel));
  }
}, []);






useEffect(() => {
        /*
        |--------------------------------------------------------------------------
        | PAUSAR O REANUDAR PHASER SEGÚN LAS VIDAS
        |--------------------------------------------------------------------------
        */

        const scene = sceneRef.current;

        if (!scene) return;

        if (gameOver || lives <= 0) {
            scene.physics.pause();
        } else {
            scene.physics.resume();
        }
        }, [gameOver, lives]);


  /*
  |--------------------------------------------------------------------------
  | GUARDAR CAMBIOS LOCALMENTE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    window.localStorage.setItem(
      "binolin-game-lives",
      String(lives)
    );

    window.localStorage.setItem(
      "binolin-game-score",
      String(score)
    );

    window.localStorage.setItem(
      "binolin-game-level",
      String(levelNumber)
    );
  }, [lives, score, levelNumber]);

  /*
  |--------------------------------------------------------------------------
  | RELOJ DE RECUPERACIÓN DE VIDAS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!recoveryAt) {
      setRecoveryText("");
      return;
    }

    function updateRecoveryClock() {
      const remainingTime = recoveryAt - Date.now();

      /*
      | Si ya terminó la espera:
      |
      | - devuelve las cinco vidas;
      | - elimina el Game Over;
      | - limpia el tiempo guardado.
      */

      if (remainingTime <= 0) {
        setLives(MAX_LIVES);
        setGameOver(false);
        setRecoveryAt(null);
        setRecoveryText("");

        window.localStorage.removeItem(
          "binolin-game-recovery-at"
        );

        return;
      }

      const totalSeconds = Math.ceil(
        remainingTime / 1000
      );

      const minutes = Math.floor(
        totalSeconds / 60
      );

      const seconds = totalSeconds % 60;

      setRecoveryText(
        `${minutes}:${String(seconds).padStart(
          2,
          "0"
        )}`
      );
    }

    updateRecoveryClock();

    const interval = window.setInterval(
      updateRecoveryClock,
      1000
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [recoveryAt]);

  /*
  |--------------------------------------------------------------------------
  | CREAR EL JUEGO PHASER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let cancelled = false;

    async function createGame() {
      /*
      | Importamos Phaser dentro de useEffect para asegurarnos de
      | que estamos dentro del navegador.
      */
      const PhaserModule = await import("phaser");

      if (cancelled) return;

      const Phaser = PhaserModule.default;


    
      /*
      |--------------------------------------------------------------------------
      | ESCENA PRINCIPAL
      |--------------------------------------------------------------------------
      */

      class AlienWorldScene extends Phaser.Scene {
        constructor() {
          super("AlienWorldScene");

          /*
          | Propiedades internas de la escena.
          */
          this.player = null;
          this.cursors = null;
          this.jumpKey = null;
          this.encounters = null;

          /*
          | Evita abrir dos preguntas simultáneamente.
          */
          this.challengeOpen = false;

          /*
          | Guarda el objeto que activó la pregunta actual.
          */
          this.activeEncounter = null;
        }

        /*
        |--------------------------------------------------------------------------
        | PRELOAD
        |--------------------------------------------------------------------------
        |
        | Aquí cargarás tus imágenes, sprites y audios reales.
        |
        | Ejemplo para el alien:
        |
        | this.load.spritesheet(
        |   "alien",
        |   "/games/alien/alien-walk.png",
        |   {
        |     frameWidth: 64,
        |     frameHeight: 64,
        |   }
        | );
        |
        | Ejemplo para el fondo:
        |
        | this.load.image(
        |   "background",
        |   "/games/backgrounds/level-1.png"
        | );
        |
        | Ejemplo para un objeto:
        |
        | this.load.image(
        |   "bottle",
        |   "/games/objects/bottle.png"
        | );
        |
        | Ejemplo para audio:
        |
        | this.load.audio(
        |   "bottle-audio",
        |   "/games/audio/bottle.mp3"
        | );
        |
        | Este prototipo todavía no necesita archivos externos.
        */

        preload() {}

        /*
        |--------------------------------------------------------------------------
        | CREATE
        |--------------------------------------------------------------------------
        |
        | Aquí construimos:
        |
        | - cielo;
        | - montañas;
        | - suelo;
        | - alien;
        | - objetos;
        | - controles.
        |
        */

        create() {
          /*
          |--------------------------------------------------------------------------
          | TAMAÑO DEL MUNDO
          |--------------------------------------------------------------------------
          |
          | El canvas visible mide aproximadamente 1100 x 620.
          | El mundo completo mide 8,000 px de largo.
          |
          | Puedes aumentar el mundo cuando agregues más objetos.
          */

          const worldWidth = 8000;
          const worldHeight = 620;

          this.physics.world.setBounds(
            0,
            0,
            worldWidth,
            worldHeight
          );

          this.cameras.main.setBounds(
            0,
            0,
            worldWidth,
            worldHeight
          );

          /*
          |--------------------------------------------------------------------------
          | FONDO TEMPORAL
          |--------------------------------------------------------------------------
          |
          | Todo este fondo está generado con figuras.
          |
          | Cuando tengas una imagen de fondo real, reemplaza esta sección por:
          |
          | const background = this.add
          |   .image(0, 0, "background")
          |   .setOrigin(0, 0);
          |
          | background.setScrollFactor(0.2);
          */

          this.cameras.main.setBackgroundColor(
            "#61c7f2"
          );

          /*
          | Sol.
          */
          this.add.circle(
            300,
            115,
            55,
            0xffdd55
          );

          /*
          | Nubes repetidas por el mundo.
          */
          for (let x = 200; x < worldWidth; x += 700) {
            this.add
              .ellipse(
                x,
                110 + Math.random() * 80,
                170,
                55,
                0xffffff,
                0.8
              )
              .setScrollFactor(0.35);
          }

          /*
          | Montañas decorativas.
          */
          for (let x = 0; x < worldWidth; x += 500) {
            this.add
              .triangle(
                x,
                470,
                0,
                220,
                220,
                0,
                440,
                220,
                0x467da8
              )
              .setOrigin(0, 1)
              .setScrollFactor(0.55);
          }

          /*
          | Árboles decorativos.
          */
          for (let x = 450; x < worldWidth; x += 900) {
            this.add.rectangle(
              x,
              470,
              35,
              150,
              0x76512f
            );

            this.add.circle(
              x,
              370,
              90,
              0x269c57
            );
          }

          /*
          |--------------------------------------------------------------------------
          | SUELO
          |--------------------------------------------------------------------------
          */

          const ground = this.add.rectangle(
            worldWidth / 2,
            575,
            worldWidth,
            90,
            0x244f2a
          );

          this.physics.add.existing(
            ground,
            true
          );

          /*
          | Línea superior del pasto.
          */
          this.add.rectangle(
            worldWidth / 2,
            535,
            worldWidth,
            18,
            0x63c74d
          );

          /*
          |--------------------------------------------------------------------------
          | PLATAFORMAS
          |--------------------------------------------------------------------------
          |
          | Son bloques sencillos para que el alien pueda saltar.
          */

          const platforms =
            this.physics.add.staticGroup();

          const platformPositions = [
            { x: 800, y: 445, width: 220 },
            { x: 1450, y: 395, width: 180 },
            { x: 2250, y: 455, width: 250 },
            { x: 3100, y: 390, width: 200 },
            { x: 4000, y: 440, width: 280 },
            { x: 5000, y: 380, width: 220 },
            { x: 6100, y: 430, width: 250 },
            { x: 7100, y: 370, width: 190 },
          ];

          platformPositions.forEach(
            (platformData) => {
              const platform =
                this.add.rectangle(
                  platformData.x,
                  platformData.y,
                  platformData.width,
                  28,
                  0x8d653d
                );

              platforms.add(platform);
            }
          );

          /*
          |--------------------------------------------------------------------------
          | ALIEN TEMPORAL
          |--------------------------------------------------------------------------
          |
          | Por ahora el alien está formado por figuras geométricas.
          |
          | Cuando tengas tu sprite, reemplaza esta sección.
          |
          | Ejemplo:
          |
          | this.player = this.physics.add.sprite(
          |   160,
          |   450,
          |   "alien"
          | );
          |
          */

          const alienBody =
            this.add.container(160, 450);

          /*
          | Cabeza.
          */
          const head = this.add.ellipse(
            0,
            -12,
            52,
            62,
            0x7cff4f
          );

          /*
          | Ojos.
          */
          const leftEye = this.add.ellipse(
            -12,
            -18,
            13,
            20,
            0x050914
          );

          const rightEye = this.add.ellipse(
            12,
            -18,
            13,
            20,
            0x050914
          );

          /*
          | Cuerpo.
          */
          const body = this.add.rectangle(
            0,
            34,
            38,
            45,
            0x5ee637
          );

          alienBody.add([
            body,
            head,
            leftEye,
            rightEye,
          ]);

          /*
          | Convertimos el contenedor en objeto físico.
          */
          this.physics.add.existing(alienBody);

          this.player = alienBody;

          this.player.body.setSize(42, 92);

          this.player.body.setOffset(
            -21,
            -46
          );

          this.player.body.setCollideWorldBounds(
            true
          );

          this.player.body.setGravityY(900);

          /*
          | Colisiones del alien con el suelo
          | y con las plataformas.
          */
          this.physics.add.collider(
            this.player,
            ground
          );

          this.physics.add.collider(
            this.player,
            platforms
          );

          /*
          |--------------------------------------------------------------------------
          | CÁMARA
          |--------------------------------------------------------------------------
          |
          | La cámara sigue al alien.
          */

          this.cameras.main.startFollow(
            this.player,
            true,
            0.08,
            0.08
          );

          this.cameras.main.setDeadzone(
            250,
            150
          );

          /*
          |--------------------------------------------------------------------------
          | CONTROLES
          |--------------------------------------------------------------------------
          */

          this.cursors =
            this.input.keyboard.createCursorKeys();

          /*
          | También permitimos saltar con Space.
          */
          this.jumpKey =
            this.input.keyboard.addKey(
              Phaser.Input.Keyboard.KeyCodes.SPACE
            );

          /*
          |--------------------------------------------------------------------------
          | TEXTO DE INSTRUCCIONES
          |--------------------------------------------------------------------------
          |
          | setScrollFactor(0) hace que el texto se quede fijo
          | aunque la cámara se mueva.
          */

          this.add
            .text(
              22,
              20,
              "← → Move    ↑ / SPACE Jump",
              {
                fontFamily: "Arial",
                fontSize: "18px",
                fontStyle: "bold",
                color: "#ffffff",
                backgroundColor: "#071024cc",
                padding: {
                  x: 14,
                  y: 9,
                },
              }
            )
            .setScrollFactor(0)
            .setDepth(100);

          /*
          |--------------------------------------------------------------------------
          | CREAR LOS ENCUENTROS
          |--------------------------------------------------------------------------
          */

          this.createVocabularyEncounters(
            Phaser
          );

          /*
          | Guardamos esta escena en React.
          */
          sceneRef.current = this;
        }

        /*
        |--------------------------------------------------------------------------
        | CREAR OBJETOS DE VOCABULARIO
        |--------------------------------------------------------------------------
        */

        createVocabularyEncounters(Phaser) {
          this.encounters =
            this.physics.add.staticGroup();

          /*
          | Creamos dos rondas de objetos:
          |
          | Ronda 1:
          | El usuario aprende las palabras.
          |
          | Ronda 2 y siguientes:
          | El usuario responde preguntas.
          |
          | Para llegar a 30 puntos, los objetos se repiten.
          */

          const repetitions = 5;

          let encounterIndex = 0;

          for (
            let round = 0;
            round < repetitions;
            round += 1
          ) {
            levelData.words.forEach(
              (wordData, wordIndex) => {
                /*
                | Cada objeto aparece cada 240 píxeles.
                */
                const x =
                  650 + encounterIndex * 240;

                /*
                | Algunos aparecen en el suelo y otros
                | un poco más elevados.
                */
                const y =
                  wordIndex % 3 === 0
                    ? 460
                    : 490;

                /*
                | Contenedor visual del objeto.
                */
                const objectContainer =
                  this.add.container(x, y);

                /*
                | Resplandor detrás del objeto.
                */
                const glow = this.add.circle(
                  0,
                  0,
                  45,
                  round === 0
                    ? 0x22d3ee
                    : 0xffc933,
                  0.35
                );

                /*
                | Emoji temporal.
                |
                | Cuando tengas imágenes reales:
                |
                | const objectImage = this.add.image(
                |   0,
                |   0,
                |   wordData.id
                | );
                |
                | objectImage.setScale(0.75);
                */
                const emojiText = this.add.text(
                  0,
                  0,
                  wordData.emoji,
                  {
                    fontSize: "48px",
                  }
                );

                emojiText.setOrigin(0.5);

                objectContainer.add([
                  glow,
                  emojiText,
                ]);

                /*
                | Agregamos física al contenedor.
                */
                this.physics.add.existing(
                  objectContainer,
                  true
                );

                /*
                | Información personalizada.
                */
                objectContainer.wordData =
                  wordData;

                objectContainer.challengeType =
                  round === 0
                    ? "learn"
                    : this.getRandomChallengeType();

                objectContainer.completed =
                  false;

                this.encounters.add(
                  objectContainer
                );

                encounterIndex += 1;
              }
            );
          }

          /*
          |--------------------------------------------------------------------------
          | DETECCIÓN DE OBJETOS
          |--------------------------------------------------------------------------
          |
          | overlap detecta cuando el alien toca un objeto.
          */

          this.physics.add.overlap(
            this.player,
            this.encounters,
            (player, encounter) => {
              this.openEncounter(encounter);
            }
          );
        }

        /*
        |--------------------------------------------------------------------------
        | ELEGIR TIPO DE PREGUNTA
        |--------------------------------------------------------------------------
        */

        getRandomChallengeType() {
          return Math.random() > 0.5
            ? "multiple-choice"
            : "typing";
        }

        /*
        |--------------------------------------------------------------------------
        | ABRIR ENCUENTRO
        |--------------------------------------------------------------------------
        */

        openEncounter(encounter) {
          if (
            this.challengeOpen ||
            encounter.completed
          ) {
            return;
          }

          this.challengeOpen = true;
          this.activeEncounter = encounter;

          /*
          | Detenemos el movimiento del alien mientras
          | el usuario responde.
          */
          this.player.body.setVelocity(0, 0);

          this.physics.pause();

          const wordData =
            encounter.wordData;

          if (
            encounter.challengeType ===
            "learn"
          ) {
            /*
            | Primera aparición:
            | solamente enseñamos la palabra.
            */
            setCurrentChallenge({
              type: "learn",
              word: wordData,
              options: [],
            });

            speakWord(wordData);
            return;
          }

          if (
            encounter.challengeType ===
            "typing"
          ) {
            /*
            | Pregunta donde el usuario debe escribir.
            */
            setCurrentChallenge({
              type: "typing",
              word: wordData,
              options: [],
            });

            return;
          }

          /*
          | Pregunta con cuatro opciones.
          */
          const incorrectWords =
            Phaser.Utils.Array.Shuffle(
              levelData.words.filter(
                (word) =>
                  word.id !== wordData.id
              )
            ).slice(0, 3);

          const options =
            Phaser.Utils.Array.Shuffle([
              wordData,
              ...incorrectWords,
            ]);

          setCurrentChallenge({
            type: "multiple-choice",
            word: wordData,
            options,
          });
        }

        /*
        |--------------------------------------------------------------------------
        | TERMINAR ENCUENTRO
        |--------------------------------------------------------------------------
        */

        finishEncounter() {
          if (this.activeEncounter) {
            this.activeEncounter.completed =
              true;

            /*
            | Ocultamos el objeto para mostrar
            | que ya se utilizó.
            */
            this.activeEncounter.setVisible(
              false
            );

            this.activeEncounter.body.enable =
              false;
          }

          this.activeEncounter = null;
          this.challengeOpen = false;

          this.physics.resume();
        }

        /*
        |--------------------------------------------------------------------------
        | UPDATE
        |--------------------------------------------------------------------------
        |
        | Se ejecuta muchas veces por segundo.
        |
        | Aquí controlamos caminar y saltar.
        */

        update() {
          if (
            !this.player ||
            this.challengeOpen ||
            gameOver
          ) {
            return;
          }

          const speed = 235;

          /*
          | Movimiento hacia la izquierda.
          */
          if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(
              -speed
            );

            /*
            | Invertimos el personaje.
            | Esto será más visible cuando uses un sprite.
            */
            this.player.setScale(-1, 1);
          }

          /*
          | Movimiento hacia la derecha.
          */
          else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(
              speed
            );

            this.player.setScale(1, 1);
          }

          /*
          | Sin movimiento.
          */
          else {
            this.player.body.setVelocityX(0);
          }

          /*
          | Salto.
          */
          const wantsToJump =
            Phaser.Input.Keyboard.JustDown(
              this.cursors.up
            ) ||
            Phaser.Input.Keyboard.JustDown(
              this.jumpKey
            );

          if (
            wantsToJump &&
            this.player.body.blocked.down
          ) {
            this.player.body.setVelocityY(
              -530
            );
          }
        }
      }

      /*
      |--------------------------------------------------------------------------
      | CONFIGURACIÓN DE PHASER
      |--------------------------------------------------------------------------
      */

      const config = {
        type: Phaser.AUTO,

        /*
        | Tamaño base del juego.
        |
        | Phaser lo adapta al tamaño disponible.
        */
        width: 1100,
        height: 620,

        parent: gameContainerRef.current,

        backgroundColor: "#61c7f2",

        /*
        | Configuración de físicas Arcade.
        */
        physics: {
          default: "arcade",

          arcade: {
            gravity: {
              y: 0,
            },

            debug: false,

            /*
            | Cambia debug a true si necesitas ver
            | los cuerpos de colisión.
            */
          },
        },

        /*
        | Ajusta el canvas automáticamente.
        */
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter:
            Phaser.Scale.CENTER_BOTH,
        },

        scene: [AlienWorldScene],
      };

      gameRef.current = new Phaser.Game(config);
    }

    createGame();

    /*
    |--------------------------------------------------------------------------
    | LIMPIEZA
    |--------------------------------------------------------------------------
    |
    | Destruimos Phaser cuando el usuario sale de la página.
    | Esto evita duplicar canvases y eventos.
    */

    return () => {
      cancelled = true;

      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }

      sceneRef.current = null;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | PRONUNCIAR UNA PALABRA
  |--------------------------------------------------------------------------
  |
  | Primero intenta usar un archivo de audio.
  |
  | Si no existe, utiliza la voz automática del navegador.
  |
  | Phaser también tiene un administrador de audio integrado para cargar
  | y reproducir sonidos compatibles con el navegador. :contentReference[oaicite:1]{index=1}
  */

  function speakWord(wordData) {
    /*
    | Cuando agregues audio:
    |
    | audio: "/games/audio/bottle.mp3"
    */

    if (wordData.audio) {
      const audio = new Audio(wordData.audio);

      audio.play().catch((error) => {
        console.error(
          "Audio could not play:",
          error
        );
      });

      return;
    }

    /*
    | Voz temporal del navegador.
    */

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance =
        new SpeechSynthesisUtterance(
          wordData.word
        );

      utterance.lang = "en-US";
      utterance.rate = 0.8;

      window.speechSynthesis.speak(
        utterance
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | CONTINUAR DESPUÉS DE APRENDER UNA PALABRA
  |--------------------------------------------------------------------------
  */

  function handleContinueLearning() {
    setCurrentChallenge(null);
    setFeedback("");

    sceneRef.current?.finishEncounter();
  }

  /*
  |--------------------------------------------------------------------------
  | RESPONDER OPCIÓN MÚLTIPLE
  |--------------------------------------------------------------------------
  */

  function handleMultipleChoice(option) {
    if (!currentChallenge) return;

    const isCorrect =
      option.id ===
      currentChallenge.word.id;

    processAnswer(isCorrect);
  }

  /*
  |--------------------------------------------------------------------------
  | RESPONDER ESCRIBIENDO
  |--------------------------------------------------------------------------
  */

  function handleTypingSubmit(event) {
    event.preventDefault();

    if (!currentChallenge) return;

    const normalizedAnswer = typedAnswer
      .trim()
      .toLowerCase();

    const correctWord =
      currentChallenge.word.word
        .trim()
        .toLowerCase();

    const isCorrect =
      normalizedAnswer === correctWord;

    processAnswer(isCorrect);
  }

  /*
  |--------------------------------------------------------------------------
  | PROCESAR RESPUESTA
  |--------------------------------------------------------------------------
  */

  function processAnswer(isCorrect) {
    if (!currentChallenge) return;

    if (isCorrect) {
      setFeedback("Correct! +1 point");

      /*
      | Pronunciamos la palabra para reforzarla.
      */
      speakWord(currentChallenge.word);

      const newScore = score + 1;

      /*
      |--------------------------------------------------------------------------
      | SUBIR DE NIVEL
      |--------------------------------------------------------------------------
      */

      if (newScore >= requiredPoints) {
        /*
        | Para este prototipo reiniciamos los puntos
        | y aumentamos el nivel.
        |
        | Todavía solo existe vocabulario para Level 1.
        | Cuando agregues Level 2 en gameVocabulary.js,
        | aquí podrá cargar automáticamente.
        */

        setScore(0);
        setLevelNumber((current) =>
          current + 1
        );

        window.setTimeout(() => {
          window.alert(
            `Level completed! You reached Level ${
              levelNumber + 1
            }.`
          );
        }, 300);
      } else {
        setScore(newScore);
      }

      window.setTimeout(() => {
        closeChallenge();
      }, 800);

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | RESPUESTA INCORRECTA
    |--------------------------------------------------------------------------
    */

    const newLives = Math.max(
      lives - 1,
      0
    );

    setLives(newLives);

    setFeedback(
      `Incorrect. The answer is "${currentChallenge.word.word}".`
    );

    speakWord(currentChallenge.word);

    if (newLives === 0) {
      startGameOver();
      return;
    }

    window.setTimeout(() => {
      closeChallenge();
    }, 1500);
  }

  /*
  |--------------------------------------------------------------------------
  | CERRAR PREGUNTA
  |--------------------------------------------------------------------------
  */

  function closeChallenge() {
    setCurrentChallenge(null);
    setTypedAnswer("");
    setFeedback("");

    sceneRef.current?.finishEncounter();
  }

  /*
  |--------------------------------------------------------------------------
  | ACTIVAR GAME OVER
  |--------------------------------------------------------------------------
  */

  function startGameOver() {
    setGameOver(true);
    setCurrentChallenge(null);
    setTypedAnswer("");
    setFeedback("");

    /*
    | Fecha en la que se recuperan las vidas.
    */
    const nextRecovery =
      Date.now() + LIFE_RECOVERY_TIME;

    setRecoveryAt(nextRecovery);

    window.localStorage.setItem(
      "binolin-game-recovery-at",
      String(nextRecovery)
    );

    /*
    | El juego queda pausado.
    */
    if (sceneRef.current) {
      sceneRef.current.physics.pause();
    }
  }

  /*
  |--------------------------------------------------------------------------
  | RECUPERAR VIDAS CON CLASE
  |--------------------------------------------------------------------------
  |
  | Por ahora este botón es una demostración.
  |
  | Más adelante debe verificar en Supabase si el usuario:
  |
  | - completó una sesión;
  | - tiene una reservación válida;
  | - recibió la recompensa.
  */

  function recoverWithSession() {
    window.alert(
      "Later this button will verify a completed speaking session."
    );
  }

  /*
  |--------------------------------------------------------------------------
  | COMPRAR VIDAS
  |--------------------------------------------------------------------------
  |
  | Por ahora NO cobra dinero.
  |
  | Más adelante aquí se conecta:
  |
  | - Stripe para la web;
  | - Apple In-App Purchase para iPhone;
  | - Google Play Billing para Android.
  */

  function purchaseLives() {
    const confirmPurchase =
      window.confirm(
        "Prototype only: restore all lives without charging money?"
      );

    if (!confirmPurchase) return;

    restoreAllLives();
  }

  /*
  |--------------------------------------------------------------------------
  | RESTAURAR VIDAS
  |--------------------------------------------------------------------------
  */

  function restoreAllLives() {
    setLives(MAX_LIVES);
    setGameOver(false);
    setRecoveryAt(null);

    window.localStorage.removeItem(
      "binolin-game-recovery-at"
    );

    /*
    | Reanudamos Phaser.
    */
    if (sceneRef.current) {
      sceneRef.current.physics.resume();
    }
  }

  /*
  |--------------------------------------------------------------------------
  | REINICIAR PROGRESO PARA PRUEBAS
  |--------------------------------------------------------------------------
  |
  | Este botón es únicamente para desarrollo.
  | Debes eliminarlo cuando publiques el juego.
  */

  function resetPrototype() {
    const confirmReset = window.confirm(
      "Reset game score, level and lives?"
    );

    if (!confirmReset) return;

    window.localStorage.removeItem(
      "binolin-game-lives"
    );

    window.localStorage.removeItem(
      "binolin-game-score"
    );

    window.localStorage.removeItem(
      "binolin-game-level"
    );

    window.localStorage.removeItem(
      "binolin-game-recovery-at"
    );

    window.location.reload();
  }

  /*
  |--------------------------------------------------------------------------
  | JSX DE LA PÁGINA
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-[#040916] text-white">
      {/* BARRA SUPERIOR DEL JUEGO */}
      <header className="border-b-4 border-[#253555] bg-[#071024]">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <a
              href="/learner"
              className="flex h-11 w-11 items-center justify-center border-2 border-slate-600 bg-[#111a30] text-xl font-black hover:bg-[#1a2745]"
              aria-label="Back to dashboard"
            >
              ←
            </a>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                Binolin Games
              </p>

              <h1 className="text-xl font-black sm:text-2xl">
                Alien Vocabulary Mission
              </h1>
            </div>
          </div>

          {/* HUD: NIVEL, PUNTOS Y VIDAS */}
          <div className="flex flex-wrap items-center gap-3">
            <HudItem
              label="Level"
              value={levelNumber}
              icon="🏆"
            />

            <HudItem
              label="Points"
              value={`${score}/${requiredPoints}`}
              icon="⭐"
            />

            <div className="border-2 border-red-700 bg-red-950/50 px-4 py-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-red-300">
                Lives
              </p>

              <div className="mt-1 flex gap-1">
                {Array.from({
                  length: MAX_LIVES,
                }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < lives
                        ? "opacity-100"
                        : "grayscale opacity-25"
                    }
                  >
                    ❤️
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PROGRESO DEL NIVEL */}
      <section className="border-b border-[#253555] bg-[#0b1428] px-5 py-3 sm:px-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-center justify-between text-xs font-black uppercase text-slate-300">
            <span>
              Level {levelNumber}:{" "}
              {levelData.title}
            </span>

            <span>
              {score} / {requiredPoints} points
            </span>
          </div>

          <div className="mt-2 h-4 border-2 border-black bg-[#02040a] p-[2px]">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all"
              style={{
                width: `${progressPercent}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* CONTENEDOR GENERAL */}
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-8">
        {/* CANVAS DE PHASER */}
        <section className="relative overflow-hidden border-4 border-[#34466b] bg-black shadow-[8px_8px_0_#01030a]">
          {/*
          |--------------------------------------------------------------------------
          | PHASER COLOCA SU CANVAS DENTRO DE ESTE DIV
          |--------------------------------------------------------------------------
          */}
          <div
            ref={gameContainerRef}
            className="aspect-[16/9] w-full"
          />

          {/* PREGUNTA O LECCIÓN */}
          {currentChallenge && !gameOver && (
            <ChallengeModal
              challenge={currentChallenge}
              typedAnswer={typedAnswer}
              setTypedAnswer={setTypedAnswer}
              feedback={feedback}
              onContinue={
                handleContinueLearning
              }
              onMultipleChoice={
                handleMultipleChoice
              }
              onTypingSubmit={
                handleTypingSubmit
              }
              onSpeak={() =>
                speakWord(
                  currentChallenge.word
                )
              }
            />
          )}

          {/* GAME OVER */}
          {gameOver && (
            <GameOverModal
              recoveryText={recoveryText}
              onPurchase={purchaseLives}
              onSession={recoverWithSession}
            />
          )}
        </section>

        {/* INFORMACIÓN PARA LA PRUEBA */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoCard
            icon="⌨️"
            title="Controls"
            text="Use the arrow keys to move. Press Up or Space to jump."
          />

          <InfoCard
            icon="📖"
            title="Learn"
            text="The first encounter shows and pronounces each new word."
          />

          <InfoCard
            icon="⚔️"
            title="Challenge"
            text="Later encounters ask you to type or choose the correct answer."
          />
        </section>

        {/* BOTÓN SOLO PARA DESARROLLO */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={resetPrototype}
            className="border border-red-800 bg-red-950/40 px-5 py-3 text-xs font-black uppercase text-red-300 hover:bg-red-900"
          >
            Reset prototype data
          </button>

          <p className="mt-2 text-xs text-slate-500">
            Remove this button before publishing.
          </p>
        </div>
      </div>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| MODAL DE PREGUNTA
|--------------------------------------------------------------------------
*/

function ChallengeModal({
  challenge,
  typedAnswer,
  setTypedAnswer,
  feedback,
  onContinue,
  onMultipleChoice,
  onTypingSubmit,
  onSpeak,
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#02040a]/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl border-4 border-violet-500 bg-[#10172a] p-6 text-center shadow-[8px_8px_0_#000] sm:p-8">
        {/* OBJETO TEMPORAL */}
        <div className="text-7xl">
          {challenge.word.emoji}
        </div>

        {challenge.type === "learn" && (
          <>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
              New word discovered
            </p>

            <h2 className="mt-2 text-4xl font-black text-white">
              {challenge.word.word}
            </h2>

            <p className="mt-2 text-lg text-slate-300">
              {challenge.word.translation}
            </p>

            <button
              type="button"
              onClick={onSpeak}
              className="mt-5 border-2 border-cyan-500 bg-cyan-950/60 px-5 py-3 font-black text-cyan-200 hover:bg-cyan-900"
            >
              🔊 Listen again
            </button>

            <button
              type="button"
              onClick={onContinue}
              className="mt-4 block w-full border-4 border-emerald-700 bg-emerald-600 px-6 py-4 font-black uppercase text-white shadow-[4px_4px_0_#000] hover:bg-emerald-500"
            >
              Continue mission
            </button>
          </>
        )}

        {challenge.type ===
          "multiple-choice" && (
          <>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Choose the correct word
            </p>

            <h2 className="mt-2 text-3xl font-black">
              What is this?
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {challenge.options.map(
                (option) => (
                  <button
                    key={option.id}
                    type="button"
                    disabled={Boolean(feedback)}
                    onClick={() =>
                      onMultipleChoice(option)
                    }
                    className="border-2 border-[#44557a] bg-[#18233d] px-5 py-4 text-lg font-black capitalize text-white shadow-[3px_3px_0_#000] hover:border-cyan-400 hover:bg-[#223251] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {option.word}
                  </button>
                )
              )}
            </div>
          </>
        )}

        {challenge.type === "typing" && (
          <>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Write the word in English
            </p>

            <h2 className="mt-2 text-3xl font-black">
              What is this?
            </h2>

            <form
              onSubmit={onTypingSubmit}
              className="mt-6"
            >
              <input
                type="text"
                autoFocus
                disabled={Boolean(feedback)}
                value={typedAnswer}
                onChange={(event) =>
                  setTypedAnswer(
                    event.target.value
                  )
                }
                placeholder="Type your answer"
                autoComplete="off"
                className="w-full border-4 border-[#44557a] bg-[#050914] px-5 py-4 text-center text-2xl font-black text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />

              <button
                type="submit"
                disabled={
                  !typedAnswer.trim() ||
                  Boolean(feedback)
                }
                className="mt-4 w-full border-4 border-blue-800 bg-blue-600 px-6 py-4 font-black uppercase shadow-[4px_4px_0_#000] hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit answer
              </button>
            </form>
          </>
        )}

        {feedback && (
          <div
            className={`mt-5 border-2 p-4 font-black ${
              feedback.startsWith(
                "Correct"
              )
                ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                : "border-red-500 bg-red-950/60 text-red-300"
            }`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| MODAL DE GAME OVER
|--------------------------------------------------------------------------
*/

function GameOverModal({
  recoveryText,
  onPurchase,
  onSession,
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#02040a]/90 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl border-4 border-red-700 bg-[#16090d] p-6 text-center shadow-[8px_8px_0_#000] sm:p-8">
        <div className="text-7xl">💔</div>

        <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-red-300">
          Mission paused
        </p>

        <h2 className="mt-2 text-4xl font-black">
          You are out of lives
        </h2>

        <p className="mt-3 text-slate-300">
          Recover your lives to continue the
          vocabulary mission.
        </p>

        <div className="mt-6 border-2 border-[#4b2630] bg-black/30 p-5">
          <p className="text-sm uppercase text-slate-400">
            Free recovery
          </p>

          <p className="mt-2 text-4xl font-black text-cyan-300">
            {recoveryText || "Calculating..."}
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={onPurchase}
            className="border-4 border-yellow-700 bg-yellow-500 px-6 py-4 font-black uppercase text-slate-950 shadow-[4px_4px_0_#000] hover:bg-yellow-400"
          >
            Restore all lives · $0.99
          </button>

          <button
            type="button"
            onClick={onSession}
            className="border-4 border-emerald-800 bg-emerald-600 px-6 py-4 font-black uppercase shadow-[4px_4px_0_#000] hover:bg-emerald-500"
          >
            Recover with speaking session
          </button>

          <a
            href="/learner"
            className="border-2 border-slate-600 bg-[#111827] px-6 py-4 font-black uppercase text-slate-300 hover:bg-slate-800"
          >
            Return to dashboard
          </a>
        </div>

        <p className="mt-5 text-xs text-red-300">
          Prototype: the purchase button does not
          charge real money.
        </p>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| ELEMENTO DEL HUD
|--------------------------------------------------------------------------
*/

function HudItem({ label, value, icon }) {
  return (
    <div className="border-2 border-[#34466b] bg-[#10182b] px-4 py-2">
      <div className="flex items-center gap-3">
        <span>{icon}</span>

        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="font-black text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| TARJETA INFORMATIVA
|--------------------------------------------------------------------------
*/

function InfoCard({ icon, title, text }) {
  return (
    <article className="border-2 border-[#34466b] bg-[#0d1425] p-5">
      <div className="text-3xl">{icon}</div>

      <h2 className="mt-3 font-black uppercase text-cyan-300">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {text}
      </p>
    </article>
  );
}




