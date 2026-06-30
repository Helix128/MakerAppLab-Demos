// ============================================================
//  ENEMIGO
//  Aparece arriba y baja por la pantalla. Tiene 3 formas de
//  moverse (patrones). El patrón se elige al crearlo.
// ============================================================

import { CONFIG } from "./config.js";
import { assets } from "./assets.js";

// Los 3 patrones de movimiento disponibles.
export const PATRONES = ["recto", "zigzag", "seno"];

export class Enemy {
  constructor(patron) {
    this.tamano = CONFIG.enemigoTamano;
    this.patron = patron;
    this.velocidad = CONFIG.enemigoVelocidad;

    // Posición inicial: arriba, en una columna al azar.
    const margen = this.tamano;
    this.x = margen + Math.random() * (CONFIG.ancho - margen * 2);
    this.y = -this.tamano;

    // Guardamos la x inicial para el patrón "seno".
    this.xInicial = this.x;
    // Dirección horizontal para el zigzag (1 = derecha, -1 = izquierda).
    this.direccion = Math.random() < 0.5 ? 1 : -1;
    // Cuenta de cuadros vividos (la usa el patrón "seno").
    this.tiempo = 0;
  }

  update() {
    this.tiempo++;
    this.y += this.velocidad; // todos bajan

    if (this.patron === "zigzag") {
      this.x += this.direccion * CONFIG.enemigoAmplitudZigzag;
      // Si toca un borde, rebota.
      const radio = this.tamano / 2;
      if (this.x < radio || this.x > CONFIG.ancho - radio) {
        this.direccion *= -1;
      }
    } else if (this.patron === "seno") {
      // Onda suave de lado a lado.
      this.x =
        this.xInicial + Math.sin(this.tiempo * 0.05) * CONFIG.enemigoAmplitudSeno;
    }
    // "recto" no cambia la x.
  }

  // true cuando salió por abajo de la pantalla.
  estaFuera() {
    return this.y > CONFIG.alto + this.tamano;
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
    p.circle(this.x, this.y, this.tamano);
  }
}
