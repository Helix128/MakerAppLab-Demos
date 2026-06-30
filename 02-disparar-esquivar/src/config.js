// ============================================================
//  PANEL DE AJUSTES
//  Cambia estos valores para ver cómo cambia el juego.
// ============================================================

export const CONFIG = {
  // Tamaño de la pantalla (en píxeles)
  ancho: 600,
  alto: 700,

  // Jugador (la nave está abajo y se mueve en todas direcciones)
  jugadorTamano: 34,
  jugadorVelocidad: 5,

  // Reglas del juego
  vidasIniciales: 3,
  puntosParaGanar: 200,
  puntosPorEnemigo: 10,

  // Balas
  balaTamano: 8,
  balaVelocidad: 9,
  balaCadencia: 12, // cuadros mínimos entre un disparo y el siguiente

  // Enemigos
  enemigoTamano: 30,
  enemigoVelocidad: 2.5,
  enemigoAmplitudZigzag: 3, // qué tan brusco es el zigzag
  enemigoAmplitudSeno: 80, // qué tan ancha es la onda del seno

  // Cada cuántos cuadros aparece un enemigo nuevo
  spawnEnemigoCada: 50,

  // Colores
  colorFondo: "#0f1020",
  colorJugador: "#4ee1a0",
  colorBala: "#ffd166",
  colorEnemigo: "#ef476f",
  colorTexto: "#ffffff",

  // ---- Sprites (imágenes) ----
  // Para cambiar un dibujo, reemplaza el PNG correspondiente en assets/.
  sprites: {
    jugador: {
      ruta: "./assets/player_ship.png", // PNG en assets/
      escala: 48, // tamaño con el que se dibuja en pantalla
    },
    enemigo: {
      ruta: "./assets/enemy_ship.png",
      escala: 40,
    },
    bala: {
      ruta: "./assets/bullet.png",
      escala: 18,
    },
    // El fondo es una imagen fija que cubre todo el canvas.
    fondo: {
      ruta: "./assets/bg_space.png",
    },
  },
};
