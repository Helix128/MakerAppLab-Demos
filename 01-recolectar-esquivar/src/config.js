// ============================================================
//  PANEL DE AJUSTES
//  Cambia estos valores para ver cómo cambia el juego.
//  Es la forma más rápida y segura de experimentar.
// ============================================================

export const CONFIG = {
  // Tamaño de la pantalla (en píxeles)
  ancho: 600,
  alto: 600,

  // Jugador
  jugadorTamano: 30, // diámetro del jugador
  jugadorVelocidad: 5, // cuántos píxeles se mueve por cuadro

  // Reglas del juego
  vidasIniciales: 3, // vidas con las que empiezas
  puntosParaGanar: 100, // puntos necesarios para ganar
  puntosPorObjeto: 10, // puntos que da cada objeto bueno

  // Objetos beneficiosos (los que suman puntos)
  objetoTamano: 20,

  // Enemigos (los que hay que esquivar)
  enemigoTamano: 26,
  enemigoVelocidadMin: 2,
  enemigoVelocidadMax: 4,

  // Cada cuántos cuadros aparece algo nuevo
  // (60 cuadros = 1 segundo aprox.)
  spawnObjetoCada: 60,
  spawnEnemigoCada: 90,

  // Colores
  colorFondo: "#16213e",
  colorJugador: "#4ee1a0",
  colorObjeto: "#ffd166",
  colorEnemigo: "#ef476f",
  colorTexto: "#ffffff",

  // ---- Sprites (imágenes) ----
  // Para cambiar un dibujo, reemplaza el PNG correspondiente en assets/.
  sprites: {
    jugador: {
      ruta: "./assets/player_walk.png", // PNG en assets/
      escala: 48, // tamaño con el que se dibuja en pantalla
    },
    enemigo: {
      ruta: "./assets/enemy_spike.png",
      escala: 36, // un poco más grande que el cuadrado original
    },
    objeto: {
      ruta: "./assets/gem.png",
      escala: 28,
    },
    // El fondo es una imagen fija que cubre todo el canvas.
    fondo: {
      ruta: "./assets/bg_field.png",
    },
  },
};
