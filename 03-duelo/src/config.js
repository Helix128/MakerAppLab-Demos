// ============================================================
//  PANEL DE AJUSTES
//  Cambia estos valores para ver cómo cambia el juego.
//  Incluye los controles de teclado de cada jugador.
// ============================================================

export const CONFIG = {
  // Tamaño de la pantalla (en píxeles)
  ancho: 800,
  alto: 500,

  // Jugadores (paletas / mazos)
  jugadorTamano: 40,
  jugadorVelocidad: 5.5,

  // Pelota
  pelota: {
    tamano: 26,
    velocidad: 5, // velocidad inicial al sacar
    velocidadMax: 10, // tope de velocidad
    aceleracion: 1.04, // cuánto se acelera en cada rebote con un jugador
  },

  // Porterías (goles)
  golAlto: 180, // alto del hueco de la portería en cada costado

  // Partida
  puntosParaGanar: 5,

  // Colores
  colorFondo: "#11151c",
  colorTexto: "#ffffff",
  colorLinea: "#2a3340",

  // ---- Sprites (imágenes) ----
  sprites: {
    // El jugador (mazo) es una imagen fija (un solo cuadro).
    jugador: {
      ruta: "./assets/player_duel.png", // PNG en assets/
      escala: 48, // tamaño 1:1 con el PNG (se ve nítido)
    },
    // La pelota es una imagen fija.
    pelota: {
      ruta: "./assets/ball_spin.png", // PNG en assets/
      escala: 34, // tamaño con el que se dibuja en pantalla
    },
    // El fondo (pista de hielo) es una imagen fija que cubre el canvas.
    // Las líneas y porterías las dibuja el juego encima.
    fondo: {
      ruta: "./assets/bg_rink.png",
    },
  },

  // ---- Jugador 1 (izquierda) ----
  jugador1: {
    nombre: "Jugador 1",
    color: "#4ee1a0",
    // Códigos de tecla (así los nombra el navegador).
    arriba: "KeyW",
    abajo: "KeyS",
    izquierda: "KeyA",
    derecha: "KeyD",
  },

  // ---- Jugador 2 (derecha) ----
  jugador2: {
    nombre: "Jugador 2",
    color: "#ef476f",
    arriba: "ArrowUp",
    abajo: "ArrowDown",
    izquierda: "ArrowLeft",
    derecha: "ArrowRight",
  },
};
