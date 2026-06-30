// ============================================================
//  JUEGO (CEREBRO)
//  Maneja los estados (inicio, jugando, fin) y las reglas:
//  sumar puntos, perder vidas, ganar o perder.
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

// Los estados posibles del juego.
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

  // Deja todo listo para una partida nueva.
  reiniciarPartida() {
    this.player = new Player();
    this.objetos = [];
    this.enemigos = [];
    this.puntos = 0;
    this.vidas = CONFIG.vidasIniciales;
    this.spawner.reiniciar();
  }

  empezar() {
    this.reiniciarPartida();
    this.estado = ESTADOS.JUGANDO;
  }

  // Se llama una vez por cuadro desde main.js.
  update() {
    if (this.estado !== ESTADOS.JUGANDO) return;

    this.player.update();
    this.spawner.update(this.objetos, this.enemigos);

    this.actualizarObjetos();
    this.actualizarEnemigos();
    this.revisarFinDelJuego();
  }

  actualizarObjetos() {
    // Recorremos al revés para poder borrar sin romper la lista.
    for (let i = this.objetos.length - 1; i >= 0; i--) {
      const objeto = this.objetos[i];
      objeto.update();
      if (circulosColisionan(this.player, objeto)) {
        this.puntos += CONFIG.puntosPorObjeto;
        this.objetos.splice(i, 1);
      }
    }
  }

  actualizarEnemigos() {
    for (let i = this.enemigos.length - 1; i >= 0; i--) {
      const enemigo = this.enemigos[i];
      enemigo.update();

      if (circulosColisionan(this.player, enemigo)) {
        this.vidas--;
        this.enemigos.splice(i, 1);
      } else if (enemigo.estaFuera()) {
        this.enemigos.splice(i, 1);
      }
    }
  }

  revisarFinDelJuego() {
    if (this.puntos >= CONFIG.puntosParaGanar) {
      this.estado = ESTADOS.GANASTE;
    } else if (this.vidas <= 0) {
      this.estado = ESTADOS.PERDISTE;
    }
  }

  // Dibuja todo según el estado actual.
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
    for (const objeto of this.objetos) objeto.draw(p);
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

  // ---- Eventos del jugador ----

  presionarEnter() {
    if (this.estado === ESTADOS.INICIO) {
      this.empezar();
    } else if (
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
