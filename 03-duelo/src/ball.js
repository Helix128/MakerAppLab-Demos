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
    // Último jugador que la golpeó: no puede volver a golpearla hasta
    // que la pelota toque un muro o el otro jugador.
    this.ultimoGolpeador = null;
    // Mientras está congelada, espera el saque del jugador goleado.
    this.congelada = false;
    this.reiniciar();
  }

  // Saca desde el centro en una dirección al azar (arranque de partida).
  // hacia: -1 saca hacia la izquierda, 1 hacia la derecha, 0 al azar.
  reiniciar(hacia = 0) {
    this.x = CONFIG.ancho / 2;
    this.y = CONFIG.alto / 2;
    this.ultimoGolpeador = null;
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
    this.ultimoGolpeador = null;
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
      this.ultimoGolpeador = null; // tocó un muro: se libera el golpe
    } else if (this.y + radio > CONFIG.alto) {
      this.y = CONFIG.alto - radio;
      this.vy = -Math.abs(this.vy);
      this.ultimoGolpeador = null;
    }
  }

  // Rebote contra un jugador: reflejamos la velocidad según la
  // línea que va del jugador a la pelota (como un mazo de hockey),
  // y aceleramos un poco hasta un tope.
  rebotarCon(jugador) {
    let nx = this.x - jugador.x;
    let ny = this.y - jugador.y;
    const dist = Math.hypot(nx, ny) || 1;
    nx /= dist;
    ny /= dist;

    // Reposicionar la pelota justo afuera del jugador para que no
    // se quede pegada.
    const minDist = this.tamano / 2 + jugador.tamano / 2;
    this.x = jugador.x + nx * minDist;
    this.y = jugador.y + ny * minDist;

    // Si estaba esperando el saque, ahora arranca.
    // En el saque usamos la velocidad base; si no, mantenemos y
    // aceleramos un poco hasta el tope.
    const base = this.congelada
      ? CONFIG.pelota.velocidad
      : Math.hypot(this.vx, this.vy) * CONFIG.pelota.aceleracion;
    const nuevaVel = Math.min(base, CONFIG.pelota.velocidadMax);
    this.vx = nx * nuevaVel;
    this.vy = ny * nuevaVel;

    this.congelada = false;
    this.ultimoGolpeador = jugador;
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
    const radio = this.tamano / 2;
    if (this.x - radio < 0) {
      this.x = radio;
      this.vx = Math.abs(this.vx);
      this.ultimoGolpeador = null; // tocó un muro: se libera el golpe
    } else if (this.x + radio > CONFIG.ancho) {
      this.x = CONFIG.ancho - radio;
      this.vx = -Math.abs(this.vx);
      this.ultimoGolpeador = null;
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
