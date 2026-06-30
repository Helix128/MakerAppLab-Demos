// ============================================================
//  JUGADOR
//  El círculo que controlas. Se mueve con el teclado y no
//  puede salir de la pantalla.
// ============================================================

import { CONFIG } from "./config.js";
import { teclas } from "./input.js";
import { assets } from "./assets.js";

export class Player {
  constructor() {
    // Empieza en el centro de la pantalla.
    this.x = CONFIG.ancho / 2;
    this.y = CONFIG.alto / 2;
    this.tamano = CONFIG.jugadorTamano;
    this.velocidad = CONFIG.jugadorVelocidad;
  }

  // Mover según las teclas presionadas.
  update() {
    if (teclas.izquierda) this.x -= this.velocidad;
    if (teclas.derecha) this.x += this.velocidad;
    if (teclas.arriba) this.y -= this.velocidad;
    if (teclas.abajo) this.y += this.velocidad;

    // No dejar que se salga de la pantalla.
    const radio = this.tamano / 2;
    this.x = Math.max(radio, Math.min(CONFIG.ancho - radio, this.x));
    this.y = Math.max(radio, Math.min(CONFIG.alto - radio, this.y));
  }

  // Dibujar el jugador.
  draw(p) {
    // Dibujamos el sprite. (Si todavía no cargó la imagen, mostramos
    // un círculo simple para que nunca quede en blanco.)
    if (assets.jugador) {
      const escala = CONFIG.sprites.jugador.escala;
      assets.jugador.draw(p, this.x, this.y, escala, escala);
    } else {
      p.noStroke();
      p.fill(CONFIG.colorJugador);
      p.circle(this.x, this.y, this.tamano);
    }
  }
}
