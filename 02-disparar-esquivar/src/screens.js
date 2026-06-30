// ============================================================
//  PANTALLAS
//  Dibuja las pantallas de inicio, victoria y derrota.
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
  p.textSize(base * 0.058);
  p.text("Disparar y esquivar", CONFIG.ancho / 2, CONFIG.alto / 2 - 104);

  p.textSize(base * 0.028);
  p.text(
    "Muévete con FLECHAS o WASD.\n" +
      "Dispara con ESPACIO o botón táctil.\n" +
      "Destruye enemigos y evita choques.",
    CONFIG.ancho / 2,
    CONFIG.alto / 2 - 8
  );

  p.textSize(base * 0.034);
  p.text("ENTER o toca para empezar", CONFIG.ancho / 2, CONFIG.alto / 2 + 112);
}

export function dibujarVictoria(p, puntos) {
  fondo(p);

  const base = Math.min(CONFIG.ancho, CONFIG.alto);
  p.fill(CONFIG.colorBala);
  p.textSize(base * 0.072);
  p.text("¡Ganaste!", CONFIG.ancho / 2, CONFIG.alto / 2 - 60);

  p.fill(CONFIG.colorTexto);
  p.textSize(base * 0.034);
  p.text("Puntos: " + puntos, CONFIG.ancho / 2, CONFIG.alto / 2);

  dibujarBotonReinicio(p);
}

export function dibujarDerrota(p, puntos) {
  fondo(p);

  const base = Math.min(CONFIG.ancho, CONFIG.alto);
  p.fill(CONFIG.colorEnemigo);
  p.textSize(base * 0.072);
  p.text("Perdiste", CONFIG.ancho / 2, CONFIG.alto / 2 - 60);

  p.fill(CONFIG.colorTexto);
  p.textSize(base * 0.034);
  p.text("Puntos: " + puntos, CONFIG.ancho / 2, CONFIG.alto / 2);

  dibujarBotonReinicio(p);
}

export function areaBotonReinicio() {
  const ancho = 240;
  const alto = 54;
  return {
    x: CONFIG.ancho / 2 - ancho / 2,
    y: CONFIG.alto / 2 + 60,
    ancho,
    alto,
  };
}

function dibujarBotonReinicio(p) {
  const b = areaBotonReinicio();
  p.noStroke();
  p.fill(CONFIG.colorJugador);
  p.rectMode(p.CORNER);
  p.rect(b.x, b.y, b.ancho, b.alto, 10);

  p.fill("#0f1020");
  p.textSize(Math.min(CONFIG.ancho, CONFIG.alto) * 0.032);
  p.textAlign(p.CENTER, p.CENTER);
  p.text("Empezar de nuevo", b.x + b.ancho / 2, b.y + b.alto / 2);
}

export function clicEnReinicio(mx, my) {
  const b = areaBotonReinicio();
  return mx >= b.x && mx <= b.x + b.ancho && my >= b.y && my <= b.y + b.alto;
}
