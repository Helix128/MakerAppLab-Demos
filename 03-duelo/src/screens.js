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

  const base = Math.min(CONFIG.ancho, CONFIG.alto);
  p.textSize(base * 0.078);
  p.text("Hockey", CONFIG.ancho / 2, CONFIG.alto / 2 - 120);

  p.fill(CONFIG.jugador1.color);
  p.textSize(base * 0.036);
  p.text(CONFIG.jugador1.nombre, CONFIG.ancho / 2 - 150, CONFIG.alto / 2 - 48);
  p.fill(CONFIG.colorTexto);
  p.textSize(base * 0.028);
  p.text("W A S D", CONFIG.ancho / 2 - 150, CONFIG.alto / 2 + 2);

  p.fill(CONFIG.jugador2.color);
  p.textSize(base * 0.036);
  p.text(CONFIG.jugador2.nombre, CONFIG.ancho / 2 + 150, CONFIG.alto / 2 - 48);
  p.fill(CONFIG.colorTexto);
  p.textSize(base * 0.028);
  p.text("FLECHAS", CONFIG.ancho / 2 + 150, CONFIG.alto / 2 + 2);

  p.textSize(base * 0.027);
  p.text(
    "Mete la pelota en la portería rival. Gana a " +
      CONFIG.puntosParaGanar + ".\n" +
      "En móvil usen controles de cada lado.",
    CONFIG.ancho / 2,
    CONFIG.alto / 2 + 58
  );

  p.textSize(base * 0.038);
  p.text("BARRA o toca para empezar", CONFIG.ancho / 2, CONFIG.alto / 2 + 126);
}

// ganador: el objeto Player que ganó.
export function dibujarFin(p, ganador) {
  fondo(p);

  const base = Math.min(CONFIG.ancho, CONFIG.alto);
  p.fill(ganador.color);
  p.textSize(base * 0.084);
  p.text("¡Ganó " + ganador.nombre + "!", CONFIG.ancho / 2, CONFIG.alto / 2 - 60);

  p.fill(CONFIG.colorTexto);
  p.textSize(base * 0.04);
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
  p.textSize(Math.min(CONFIG.ancho, CONFIG.alto) * 0.036);
  p.textAlign(p.CENTER, p.CENTER);
  p.text("Empezar de nuevo", b.x + b.ancho / 2, b.y + b.alto / 2);
}

export function clicEnReinicio(mx, my) {
  const b = areaBotonReinicio();
  return mx >= b.x && mx <= b.x + b.ancho && my >= b.y && my <= b.y + b.alto;
}
