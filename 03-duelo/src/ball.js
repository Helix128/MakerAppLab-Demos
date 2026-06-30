// ============================================================
//  PELOTA
//  Se mueve sola, rebota en los bordes de arriba y abajo, y
//  rebota cuando un jugador (mazo) la toca. Si entra en un
//  arco, alguien metió un gol.
// ============================================================

import { CONFIG } from "./config.js";
import { assets } from "./assets.js";

export class Ball {
  constructor() {
    this.tamano = CONFIG.pelota.tamano;
    // Mientras está congelada, espera el saque del jugador goleado.
    this.congelada = false;
    this.reiniciar();
  }

  // Saca desde el centro en una dirección al azar (arranque de partida).
  // hacia: -1 saca hacia la izquierda, 1 hacia la derecha, 0 al azar.
  reiniciar(hacia = 0) {
    this.x = CONFIG.ancho / 2;
    this.y = CONFIG.alto / 2;
    this.congelada = false;

    const dirX = hacia !== 0 ? hacia : Math.random() < 0.5 ? -1 : 1;
    // Ángulo suave (no demasiado vertical) para que se vea el saque.
    const angulo = (Math.random() - 0.5) * (Math.PI / 3); // ±30°
    const v = CONFIG.pelota.velocidad;
    this.vx = Math.cos(angulo) * v * dirX;
    this.vy = Math.sin(angulo) * v;
  }

  // Deja la pelota quieta en la mitad del jugador goleado, esperando
  // a que ese jugador la golpee para sacar.
  prepararSaque(jugador) {
    this.y = CONFIG.alto / 2;
    this.x =
      jugador.mitad === "izquierda" ? CONFIG.ancho * 0.3 : CONFIG.ancho * 0.7;
    this.vx = 0;
    this.vy = 0;
    this.congelada = true;
  }

  update() {
    if (this.congelada) return; // espera el saque

    this.x += this.vx;
    this.y += this.vy;

    // Rebote en las paredes de arriba y abajo.
    const radio = this.tamano / 2;
    if (this.y - radio < 0) {
      this.y = radio;
      this.vy = Math.abs(this.vy);
    } else if (this.y + radio > CONFIG.alto) {
      this.y = CONFIG.alto - radio;
      this.vy = -Math.abs(this.vy);
    }
  }

  normalContra(jugador) {
    let nx = this.x - jugador.x;
    let ny = this.y - jugador.y;
    const dist = Math.hypot(nx, ny);

    if (dist > 0) {
      return { nx: nx / dist, ny: ny / dist };
    }

    const rvx = this.vx - (jugador.vx || 0);
    const rvy = this.vy - (jugador.vy || 0);
    const relDist = Math.hypot(rvx, rvy);
    if (relDist > 0) {
      return { nx: -rvx / relDist, ny: -rvy / relDist };
    }

    return { nx: 1, ny: 0 };
  }

  seAcercaA(jugador) {
    const { nx, ny } = this.normalContra(jugador);
    const rvx = this.vx - (jugador.vx || 0);
    const rvy = this.vy - (jugador.vy || 0);
    return rvx * nx + rvy * ny < 0;
  }

  // Rebote contra un jugador: reflejamos la velocidad relativa a la
  // superficie del mazo y después devolvemos su movimiento a la pelota.
  rebotarCon(jugador) {
    const { nx, ny } = this.normalContra(jugador);
    const jugadorVx = jugador.vx || 0;
    const jugadorVy = jugador.vy || 0;

    const minDist = this.tamano / 2 + jugador.tamano / 2;
    this.x = jugador.x + nx * minDist;
    this.y = jugador.y + ny * minDist;

    let nuevoVx;
    let nuevoVy;

    if (this.congelada) {
      nuevoVx = nx * CONFIG.pelota.velocidad + jugadorVx;
      nuevoVy = ny * CONFIG.pelota.velocidad + jugadorVy;
    } else {
      const rvx = this.vx - jugadorVx;
      const rvy = this.vy - jugadorVy;
      const normalVel = rvx * nx + rvy * ny;

      if (normalVel >= 0) return false;

      nuevoVx = rvx - 2 * normalVel * nx + jugadorVx;
      nuevoVy = rvy - 2 * normalVel * ny + jugadorVy;
    }

    let magnitud = Math.hypot(nuevoVx, nuevoVy);
    if (magnitud === 0) {
      nuevoVx = nx;
      nuevoVy = ny;
      magnitud = 1;
    }

    const nuevaVel = Math.min(
      Math.max(magnitud, CONFIG.pelota.velocidad) *
        (this.congelada ? 1 : CONFIG.pelota.aceleracion),
      CONFIG.pelota.velocidadMax
    );

    this.vx = (nuevoVx / magnitud) * nuevaVel;
    this.vy = (nuevoVy / magnitud) * nuevaVel;
    this.congelada = false;

    return true;
  }

  // ¿Entró en el arco izquierdo? (gol del jugador derecho)
  golIzquierda() {
    return this.x - this.tamano / 2 < 0 && this.estaEnHuecoArco();
  }

  // ¿Entró en el arco derecho? (gol del jugador izquierdo)
  golDerecha() {
    return this.x + this.tamano / 2 > CONFIG.ancho && this.estaEnHuecoArco();
  }

  estaEnHuecoArco() {
    const mitad = CONFIG.golAlto / 2;
    return (
      this.y > CONFIG.alto / 2 - mitad && this.y < CONFIG.alto / 2 + mitad
    );
  }

  // Si pegó en un costado pero fuera del arco, rebota.
  rebotarCostados() {
    if (this.estaEnHuecoArco()) return;

    const radio = this.tamano / 2;
    if (this.x - radio < 0) {
      this.x = radio;
      this.vx = Math.abs(this.vx);
    } else if (this.x + radio > CONFIG.ancho) {
      this.x = CONFIG.ancho - radio;
      this.vx = -Math.abs(this.vx);
    }
  }

  draw(p) {
    if (assets.pelota) {
      const escala = CONFIG.sprites.pelota.escala;
      assets.pelota.draw(p, this.x, this.y, escala, escala);
    } else {
      p.noStroke();
      p.fill(CONFIG.colorTexto);
      p.circle(this.x, this.y, this.tamano);
    }
  }
}
