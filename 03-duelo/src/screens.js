// ============================================================
//  PANTALLAS
//  Dibuja la pantalla de inicio y la de fin (con el ganador).
// ============================================================

import { CONFIG } from "./config.js";

function fondo(p) {
  p.background(CONFIG.colorFondo);
  p.fill(CONFIG.colorTexto);
  p.textAlign(p.CENTER, p.CENTER);
}

export function dibujarInicio(p) {
  fondo(p);

  p.textSize(44);
  p.text("Hockey", CONFIG.ancho / 2, CONFIG.alto / 2 - 120);

  // Controles del jugador 1
  p.fill(CONFIG.jugador1.color);
  p.textSize(20);
  p.text(CONFIG.jugador1.nombre, CONFIG.ancho / 2 - 180, CONFIG.alto / 2 - 50);
  p.fill(CONFIG.colorTexto);
  p.textSize(16);
  p.text("Mover: W A S D", CONFIG.ancho / 2 - 180, CONFIG.alto / 2 + 5);

  // Controles del jugador 2
  p.fill(CONFIG.jugador2.color);
  p.textSize(20);
  p.text(CONFIG.jugador2.nombre, CONFIG.ancho / 2 + 180, CONFIG.alto / 2 - 50);
  p.fill(CONFIG.colorTexto);
  p.textSize(16);
  p.text("Mover: FLECHAS", CONFIG.ancho / 2 + 180, CONFIG.alto / 2 + 5);

  p.textSize(15);
  p.text(
    "Mete la pelota en la portería rival. Gana el primero en llegar a " +
      CONFIG.puntosParaGanar + ".\n" +
      "En móvil usen los controles táctiles de cada lado.",
    CONFIG.ancho / 2,
    CONFIG.alto / 2 + 60
  );

  p.textSize(22);
  p.text("Presiona la BARRA o toca para empezar", CONFIG.ancho / 2, CONFIG.alto / 2 + 130);
}

// ganador: el objeto Player que ganó.
export function dibujarFin(p, ganador) {
  fondo(p);

  p.fill(ganador.color);
  p.textSize(48);
  p.text("¡Ganó " + ganador.nombre + "!", CONFIG.ancho / 2, CONFIG.alto / 2 - 60);

  p.fill(CONFIG.colorTexto);
  p.textSize(22);
  p.text(
    ganador.puntos + " - " + CONFIG.puntosParaGanar,
    CONFIG.ancho / 2,
    CONFIG.alto / 2 - 10
  );

  dibujarBotonReinicio(p);
}

export function areaBotonReinicio() {
  const ancho = 240;
  const alto = 54;
  return {
    x: CONFIG.ancho / 2 - ancho / 2,
    y: CONFIG.alto / 2 + 40,
    ancho,
    alto,
  };
}

function dibujarBotonReinicio(p) {
  const b = areaBotonReinicio();
  p.noStroke();
  p.fill(CONFIG.colorTexto);
  p.rectMode(p.CORNER);
  p.rect(b.x, b.y, b.ancho, b.alto, 10);

  p.fill(CONFIG.colorFondo);
  p.textSize(20);
  p.textAlign(p.CENTER, p.CENTER);
  p.text("Empezar de nuevo", b.x + b.ancho / 2, b.y + b.alto / 2);
}

export function clicEnReinicio(mx, my) {
  const b = areaBotonReinicio();
  return mx >= b.x && mx <= b.x + b.ancho && my >= b.y && my <= b.y + b.alto;
}
