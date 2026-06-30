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
  // El jugador usa este sprite. Para cambiar el dibujo, reemplazá
  // el PNG en public/assets/ (mismo formato: tira horizontal).
  sprites: {
    jugador: {
      ruta: "/assets/player_ship.png", // PNG en public/assets/
      frameAncho: 32, // tamaño de un cuadro dentro del PNG
      frameAlto: 32,
      frames: 4, // cuántos cuadros tiene la tira
      fps: 8, // velocidad de la animación
      escala: 48, // tamaño con el que se dibuja en pantalla
    },
    enemigo: {
      ruta: "/assets/enemy_ship.png",
      frameAncho: 32,
      frameAlto: 32,
      frames: 4,
      fps: 8,
      escala: 40,
    },
    bala: {
      ruta: "/assets/bullet.png",
      frameAncho: 32,
      frameAlto: 32,
      frames: 4,
      fps: 12,
      escala: 18,
    },
    // El fondo es una imagen fija que cubre todo el canvas.
    fondo: {
      ruta: "/assets/bg_space.png",
    },
  },
};
