// ============================================================
//  JUEGO (CEREBRO)
//  Maneja los estados (inicio, jugando, fin) y las reglas:
//  disparar, destruir enemigos, perder vidas, ganar o perder.
// ============================================================

import { CONFIG } from "./config.js";
import { assets } from "./assets.js";
import { Player } from "./player.js";
import { Spawner } from "./spawner.js";
import { circulosColisionan } from "./collisions.js";
import {
  dibujarInicio,
  dibujarVictoria,
  dibujarDerrota,
  clicEnReinicio,
} from "./screens.js";

export const ESTADOS = {
  INICIO: "inicio",
  JUGANDO: "jugando",
  GANASTE: "ganaste",
  PERDISTE: "perdiste",
};

export class Game {
  constructor() {
    this.estado = ESTADOS.INICIO;
    this.spawner = new Spawner();
    this.reiniciarPartida();
  }

  reiniciarPartida() {
    this.player = new Player();
    this.balas = [];
    this.enemigos = [];
    this.puntos = 0;
    this.vidas = CONFIG.vidasIniciales;
    this.spawner.reiniciar();
  }

  empezar() {
    this.reiniciarPartida();
    this.estado = ESTADOS.JUGANDO;
  }

  update() {
    if (this.estado !== ESTADOS.JUGANDO) return;

    this.player.update();

    // Disparar si corresponde.
    const balaNueva = this.player.intentarDisparar();
    if (balaNueva) this.balas.push(balaNueva);

    this.spawner.update(this.enemigos);

    this.actualizarBalas();
    this.actualizarEnemigos();
    this.revisarFinDelJuego();
  }

  actualizarBalas() {
    for (let i = this.balas.length - 1; i >= 0; i--) {
      const bala = this.balas[i];
      bala.update();
      if (bala.estaFuera()) this.balas.splice(i, 1);
    }
  }

  actualizarEnemigos() {
    for (let i = this.enemigos.length - 1; i >= 0; i--) {
      const enemigo = this.enemigos[i];
      enemigo.update();

      // ¿Alguna bala le pegó?
      if (this.enemigoFueDisparado(enemigo)) {
        this.puntos += CONFIG.puntosPorEnemigo;
        this.enemigos.splice(i, 1);
        continue;
      }

      // ¿Chocó con el jugador?
      if (circulosColisionan(this.player, enemigo)) {
        this.vidas--;
        this.enemigos.splice(i, 1);
        continue;
      }

      // ¿Se fue por abajo?
      if (enemigo.estaFuera()) {
        this.enemigos.splice(i, 1);
      }
    }
  }

  // Revisa si alguna bala toca al enemigo. Si sí, borra la bala.
  enemigoFueDisparado(enemigo) {
    for (let j = this.balas.length - 1; j >= 0; j--) {
      if (circulosColisionan(this.balas[j], enemigo)) {
        this.balas.splice(j, 1);
        return true;
      }
    }
    return false;
  }

  revisarFinDelJuego() {
    if (this.puntos >= CONFIG.puntosParaGanar) {
      this.estado = ESTADOS.GANASTE;
    } else if (this.vidas <= 0) {
      this.estado = ESTADOS.PERDISTE;
    }
  }

  draw(p) {
    if (this.estado === ESTADOS.INICIO) {
      dibujarInicio(p);
      return;
    }
    if (this.estado === ESTADOS.GANASTE) {
      dibujarVictoria(p, this.puntos);
      return;
    }
    if (this.estado === ESTADOS.PERDISTE) {
      dibujarDerrota(p, this.puntos);
      return;
    }

    // Estado JUGANDO
    p.background(CONFIG.colorFondo);
    // Fondo con imagen (si cargó); si no, queda el color de fondo.
    if (assets.fondo) {
      assets.fondo.draw(p, CONFIG.ancho / 2, CONFIG.alto / 2, CONFIG.ancho, CONFIG.alto);
    }
    for (const bala of this.balas) bala.draw(p);
    for (const enemigo of this.enemigos) enemigo.draw(p);
    this.player.draw(p);
    this.dibujarMarcador(p);
  }

  dibujarMarcador(p) {
    p.fill(CONFIG.colorTexto);
    p.noStroke();
    p.textSize(20);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Puntos: " + this.puntos + " / " + CONFIG.puntosParaGanar, 16, 16);
    p.textAlign(p.RIGHT, p.TOP);
    p.text("Vidas: " + this.vidas, CONFIG.ancho - 16, 16);
  }

  presionarEnter() {
    if (
      this.estado === ESTADOS.INICIO ||
      this.estado === ESTADOS.GANASTE ||
      this.estado === ESTADOS.PERDISTE
    ) {
      this.empezar();
    }
  }

  hacerClic(mx, my) {
    if (
      (this.estado === ESTADOS.GANASTE || this.estado === ESTADOS.PERDISTE) &&
      clicEnReinicio(mx, my)
    ) {
      this.empezar();
    }
  }
}
