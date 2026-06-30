// ============================================================
//  BALA
//  Sale del jugador y sube por la pantalla. Cuando se va por
//  arriba, se borra.
// ============================================================

import { CONFIG } from "./config.js";
import { assets } from "./assets.js";

export class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamano = CONFIG.balaTamano;
    this.velocidad = CONFIG.balaVelocidad;
  }

  update() {
    this.y -= this.velocidad; // sube
  }

  // true cuando salió por arriba de la pantalla.
  estaFuera() {
    return this.y < -this.tamano;
  }

  draw(p) {
    // Sprite fijo de la bala, con figura de respaldo si no cargó.
    if (assets.bala) {
      const escala = CONFIG.sprites.bala.escala;
      assets.bala.draw(p, this.x, this.y, escala, escala);
      return;
    }
    p.noStroke();
    p.fill(CONFIG.colorBala);
    p.circle(this.x, this.y, this.tamano);
  }
}
