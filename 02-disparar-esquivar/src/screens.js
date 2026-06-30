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

  p.textSize(40);
  p.text("Disparar y esquivar", CONFIG.ancho / 2, CONFIG.alto / 2 - 100);

  p.textSize(18);
  p.text(
    "Movete con las FLECHAS o WASD.\n" +
      "Dispará con la barra ESPACIADORA.\n" +
      "Destruí enemigos para sumar puntos.\n" +
      "No dejes que te choquen.",
    CONFIG.ancho / 2,
    CONFIG.alto / 2
  );

  p.textSize(22);
  p.text("Presioná ENTER para empezar", CONFIG.ancho / 2, CONFIG.alto / 2 + 100);
}

export function dibujarVictoria(p, puntos) {
  fondo(p);

  p.fill(CONFIG.colorBala);
  p.textSize(48);
  p.text("¡Ganaste!", CONFIG.ancho / 2, CONFIG.alto / 2 - 60);

  p.fill(CONFIG.colorTexto);
  p.textSize(22);
  p.text("Puntos: " + puntos, CONFIG.ancho / 2, CONFIG.alto / 2);

  dibujarBotonReinicio(p);
}

export function dibujarDerrota(p, puntos) {
  fondo(p);

  p.fill(CONFIG.colorEnemigo);
  p.textSize(48);
  p.text("Perdiste", CONFIG.ancho / 2, CONFIG.alto / 2 - 60);

  p.fill(CONFIG.colorTexto);
  p.textSize(22);
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
  p.textSize(20);
  p.textAlign(p.CENTER, p.CENTER);
  p.text("Empezar de nuevo", b.x + b.ancho / 2, b.y + b.alto / 2);
}

export function clicEnReinicio(mx, my) {
  const b = areaBotonReinicio();
  return mx >= b.x && mx <= b.x + b.ancho && my >= b.y && my <= b.y + b.alto;
}
