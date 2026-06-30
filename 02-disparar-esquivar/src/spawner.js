// ============================================================
//  GENERADOR (SPAWNER)
//  Cuenta los cuadros y crea enemigos nuevos, eligiendo un
//  patrón de movimiento al azar cada vez.
// ============================================================

import { CONFIG } from "./config.js";
import { Enemy, PATRONES } from "./enemy.js";

export class Spawner {
  constructor() {
    this.contador = 0;
  }

  reiniciar() {
    this.contador = 0;
  }

  update(enemigos) {
    this.contador++;
    if (this.contador >= CONFIG.spawnEnemigoCada) {
      this.contador = 0;
      const patron = PATRONES[Math.floor(Math.random() * PATRONES.length)];
      enemigos.push(new Enemy(patron));
    }
  }
}
