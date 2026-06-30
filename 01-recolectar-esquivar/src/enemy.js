// ============================================================
//  ENEMIGO
//  Aparece desde un borde y cruza la pantalla. Si toca al
//  jugador, le quita una vida.
// ============================================================

import { CONFIG } from "./config.js";
import { assets } from "./assets.js";

export class Enemy {
  constructor() {
    this.tamano = CONFIG.enemigoTamano;

    // Velocidad al azar entre el mínimo y el máximo.
    const vel =
      CONFIG.enemigoVelocidadMin +
      Math.random() * (CONFIG.enemigoVelocidadMax - CONFIG.enemigoVelocidadMin);

    // Aparece desde un lado al azar y se mueve hacia el opuesto.
    const desdeIzquierda = Math.random() < 0.5;
    if (desdeIzquierda) {
      this.x = -this.tamano;
      this.vx = vel;
    } else {
      this.x = CONFIG.ancho + this.tamano;
      this.vx = -vel;
    }
    this.y = this.tamano + Math.random() * (CONFIG.alto - this.tamano * 2);
    this.vy = 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  // true cuando ya salió de la pantalla y se puede borrar.
  estaFuera() {
    return this.x < -this.tamano * 2 || this.x > CONFIG.ancho + this.tamano * 2;
  }

  draw(p) {
    // Sprite animado del enemigo, con figura de respaldo si no cargó.
    if (assets.enemigo) {
      const escala = CONFIG.sprites.enemigo.escala;
      assets.enemigo.draw(p, this.x, this.y, escala, escala);
      return;
    }
    p.noStroke();
    p.fill(CONFIG.colorEnemigo);
    p.rectMode(p.CENTER);
    p.square(this.x, this.y, this.tamano, 6);
  }
}
