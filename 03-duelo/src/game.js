// ============================================================
//  JUEGO (CEREBRO)
//  Maneja los estados (inicio, jugando, fin) y las reglas:
//  los jugadores golpean la pelota; si entra en una portería,
//  el otro suma un punto. El primero en llegar a la meta gana.
// ============================================================

import { CONFIG } from "./config.js";
import { Player } from "./player.js";
import { Ball } from "./ball.js";
import { assets } from "./assets.js";
import { circulosColisionan } from "./collisions.js";
import { dibujarInicio, dibujarFin, clicEnReinicio } from "./screens.js";

export const ESTADOS = {
  INICIO: "inicio",
  JUGANDO: "jugando",
  FIN: "fin",
};

export class Game {
  constructor() {
    this.estado = ESTADOS.INICIO;
    this.ganador = null;
    this.reiniciarPartida();
  }

  reiniciarPartida() {
    // Jugador 1 en la mitad izquierda.
    this.jugador1 = new Player(
      CONFIG.jugador1,
      CONFIG.ancho * 0.15,
      CONFIG.alto / 2,
      "izquierda"
    );
    // Jugador 2 en la mitad derecha.
    this.jugador2 = new Player(
      CONFIG.jugador2,
      CONFIG.ancho * 0.85,
      CONFIG.alto / 2,
      "derecha"
    );

    this.pelota = new Ball();
    this.ganador = null;
  }

  empezar() {
    this.reiniciarPartida();
    this.estado = ESTADOS.JUGANDO;
  }

  update() {
    if (this.estado !== ESTADOS.JUGANDO) return;

    this.jugador1.update();
    this.jugador2.update();

    this.pelota.update();
    this.revisarRebotesConJugadores();
    this.revisarGoles();
    this.revisarFinDelJuego();
  }

  revisarRebotesConJugadores() {
    for (const jugador of [this.jugador1, this.jugador2]) {
      if (
        circulosColisionan(this.pelota, jugador) &&
        this.pelota.seAcercaA(jugador)
      ) {
        this.pelota.rebotarCon(jugador);
      }
    }
  }

  revisarGoles() {
    if (this.pelota.golIzquierda()) {
      // Entró en la portería izquierda: punto para el jugador derecho.
      this.jugador2.puntos++;
      this.trasGol(this.jugador1); // el goleado fue el jugador 1
    } else if (this.pelota.golDerecha()) {
      this.jugador1.puntos++;
      this.trasGol(this.jugador2);
    } else {
      // Pegó en un costado pero fuera de la portería: rebota.
      this.pelota.rebotarCostados();
    }
  }

  // Tras un gol: reset de posiciones y la pelota espera el saque del
  // jugador goleado (sale cuando ese jugador la golpea).
  trasGol(goleado) {
    this.jugador1.reiniciarPosicion();
    this.jugador2.reiniciarPosicion();
    this.pelota.prepararSaque(goleado);
  }

  revisarFinDelJuego() {
    if (this.jugador1.puntos >= CONFIG.puntosParaGanar) {
      this.ganador = this.jugador1;
      this.estado = ESTADOS.FIN;
    } else if (this.jugador2.puntos >= CONFIG.puntosParaGanar) {
      this.ganador = this.jugador2;
      this.estado = ESTADOS.FIN;
    }
  }

  draw(p) {
    if (this.estado === ESTADOS.INICIO) {
      dibujarInicio(p);
      return;
    }
    if (this.estado === ESTADOS.FIN) {
      dibujarFin(p, this.ganador);
      return;
    }

    // Estado JUGANDO
    p.background(CONFIG.colorFondo);
    // Fondo de hielo con imagen (si cargó); si no, queda el color.
    if (assets.fondo) {
      assets.fondo.draw(p, CONFIG.ancho / 2, CONFIG.alto / 2, CONFIG.ancho, CONFIG.alto);
    }
    this.dibujarCancha(p);
    this.pelota.draw(p);
    this.jugador1.draw(p);
    this.jugador2.draw(p);
    this.dibujarMarcador(p);
  }

  dibujarCancha(p) {
    // Línea central.
    p.stroke(CONFIG.colorLinea);
    p.strokeWeight(3);
    p.line(CONFIG.ancho / 2, 0, CONFIG.ancho / 2, CONFIG.alto);

    // Círculo central.
    p.noFill();
    p.circle(CONFIG.ancho / 2, CONFIG.alto / 2, 120);

    // Arcos (huecos) a los costados.
    const golY = CONFIG.alto / 2 - CONFIG.golAlto / 2;
    p.stroke(CONFIG.colorTexto);
    p.strokeWeight(5);
    p.line(0, golY, 0, golY + CONFIG.golAlto);
    p.line(CONFIG.ancho, golY, CONFIG.ancho, golY + CONFIG.golAlto);

    p.noStroke();
  }

  dibujarMarcador(p) {
    p.noStroke();
    p.textSize(28);

    p.fill(this.jugador1.color);
    p.textAlign(p.LEFT, p.TOP);
    p.text(this.jugador1.puntos, 20, 16);

    p.fill(this.jugador2.color);
    p.textAlign(p.RIGHT, p.TOP);
    p.text(this.jugador2.puntos, CONFIG.ancho - 20, 16);
  }

  presionarEspacio() {
    if (this.estado === ESTADOS.INICIO || this.estado === ESTADOS.FIN) {
      this.empezar();
    }
  }

  hacerClic(mx, my) {
    if (this.estado === ESTADOS.INICIO) {
      this.empezar();
    } else if (this.estado === ESTADOS.FIN && clicEnReinicio(mx, my)) {
      this.empezar();
    }
  }
}
