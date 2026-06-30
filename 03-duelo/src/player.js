// ============================================================
//  JUGADOR (MAZO)
//  La misma clase sirve para los dos jugadores. Lo que cambia
//  (teclas, color, mitad del campo) llega como parámetro.
//  Cada jugador se mueve libremente pero dentro de su mitad.
// ============================================================

import { CONFIG } from "./config.js";
import { estaPresionada } from "./input.js";
import { assets } from "./assets.js";

export class Player {
  // controles: objeto de config.js (jugador1 o jugador2)
  // x, y: posición inicial
  // mitad: "izquierda" o "derecha" (dónde puede moverse)
  constructor(controles, x, y, mitad) {
    this.controles = controles;
    this.nombre = controles.nombre;
    this.color = controles.color;
    this.mitad = mitad;

    this.x = x;
    this.y = y;
    this.inicioX = x; // posición de saque (para volver tras un gol)
    this.inicioY = y;
    this.tamano = CONFIG.jugadorTamano;
    this.velocidad = CONFIG.jugadorVelocidad;
    this.vx = 0;
    this.vy = 0;
    this.puntos = 0;
  }

  // Vuelve a la posición inicial (se usa tras cada gol).
  reiniciarPosicion() {
    this.x = this.inicioX;
    this.y = this.inicioY;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    const anteriorX = this.x;
    const anteriorY = this.y;
    const c = this.controles;

    if (estaPresionada(c.izquierda)) this.x -= this.velocidad;
    if (estaPresionada(c.derecha)) this.x += this.velocidad;
    if (estaPresionada(c.arriba)) this.y -= this.velocidad;
    if (estaPresionada(c.abajo)) this.y += this.velocidad;

    this.limitarAMitad();
    this.vx = this.x - anteriorX;
    this.vy = this.y - anteriorY;
  }

  // El jugador no puede salir de su mitad del campo.
  limitarAMitad() {
    const radio = this.tamano / 2;
    const centro = CONFIG.ancho / 2;

    let minX, maxX;
    if (this.mitad === "izquierda") {
      minX = radio;
      maxX = centro - radio;
    } else {
      minX = centro + radio;
      maxX = CONFIG.ancho - radio;
    }

    this.x = Math.max(minX, Math.min(maxX, this.x));
    this.y = Math.max(radio, Math.min(CONFIG.alto - radio, this.y));
  }

  draw(p) {
    // Sprite fijo del mazo (los dos comparten el mismo por ahora).
    // Si todavía no cargó, mostramos el círculo de siempre.
    if (assets.jugador) {
      const escala = CONFIG.sprites.jugador.escala;
      assets.jugador.draw(p, this.x, this.y, escala, escala);
    } else {
      p.noStroke();
      p.fill(this.color);
      p.circle(this.x, this.y, this.tamano);
    }

    // Aro de color para distinguir a cada jugador.
    p.noFill();
    p.stroke(this.color);
    p.strokeWeight(3);
    p.circle(this.x, this.y, this.tamano);
    p.noStroke();
  }
}
