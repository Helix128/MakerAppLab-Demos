// ============================================================
//  OBJETO
//  Aparece en una posición al azar. Si el jugador lo toca,
//  suma puntos y desaparece.
// ============================================================

import { CONFIG } from "./config.js";
import { assets } from "./assets.js";

export class Collectible {
  constructor() {
    this.tamano = CONFIG.objetoTamano;
    // Posición al azar dentro de la pantalla (sin pegarse a los bordes).
    const margen = this.tamano;
    this.x = margen + Math.random() * (CONFIG.ancho - margen * 2);
    this.y = margen + Math.random() * (CONFIG.alto - margen * 2);
  }

  // Los objetos no se mueven, pero dejamos update() para que
  // todas las entidades funcionen igual.
  update() {}

  draw(p) {
    // Sprite fijo de la gema, con figura de respaldo si no cargó.
    if (assets.objeto) {
      const escala = CONFIG.sprites.objeto.escala;
      assets.objeto.draw(p, this.x, this.y, escala, escala);
      return;
    }
    p.noStroke();
    p.fill(CONFIG.colorObjeto);
    // Una estrellita simple: un cuadrado girado se ve como diamante.
    p.push();
    p.translate(this.x, this.y);
    p.rotate(p.QUARTER_PI);
    p.rectMode(p.CENTER);
    p.square(0, 0, this.tamano * 0.8, 4);
    p.pop();
  }
}
