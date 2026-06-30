// ============================================================
//  JUGADOR (LA NAVE)
//  Se mueve con el teclado y dispara balas hacia arriba.
// ============================================================

import { CONFIG } from "./config.js";
import { teclas } from "./input.js";
import { Bullet } from "./bullet.js";
import { assets } from "./assets.js";

export class Player {
  constructor() {
    this.x = CONFIG.ancho / 2;
    this.y = CONFIG.alto - 60; // empieza cerca de abajo
    this.tamano = CONFIG.jugadorTamano;
    this.velocidad = CONFIG.jugadorVelocidad;

    // Para no disparar todos los cuadros: contamos cuánto falta
    // para poder volver a disparar.
    this.esperaDisparo = 0;
  }

  update() {
    if (teclas.izquierda) this.x -= this.velocidad;
    if (teclas.derecha) this.x += this.velocidad;
    if (teclas.arriba) this.y -= this.velocidad;
    if (teclas.abajo) this.y += this.velocidad;

    // No salir de la pantalla.
    const radio = this.tamano / 2;
    this.x = Math.max(radio, Math.min(CONFIG.ancho - radio, this.x));
    this.y = Math.max(radio, Math.min(CONFIG.alto - radio, this.y));

    if (this.esperaDisparo > 0) this.esperaDisparo--;
  }

  // Si se puede disparar, devuelve una bala nueva. Si no, null.
  intentarDisparar() {
    if (teclas.disparar && this.esperaDisparo === 0) {
      this.esperaDisparo = CONFIG.balaCadencia;
      return new Bullet(this.x, this.y - this.tamano / 2);
    }
    return null;
  }

  draw(p) {
    // Dibujamos el sprite. (Si todavía no cargó la imagen, mostramos
    // un triángulo simple para que nunca quede en blanco.)
    if (assets.jugador) {
      const escala = CONFIG.sprites.jugador.escala;
      assets.jugador.draw(p, this.x, this.y, escala, escala);
      return;
    }

    p.noStroke();
    p.fill(CONFIG.colorJugador);
    // Un triángulo que apunta hacia arriba (como una nave).
    const r = this.tamano / 2;
    p.triangle(
      this.x,
      this.y - r,
      this.x - r,
      this.y + r,
      this.x + r,
      this.y + r
    );
  }
}
