// ============================================================
//  GENERADOR (SPAWNER)
//  Cuenta los cuadros y decide cuándo crear un objeto nuevo
//  o un enemigo nuevo.
// ============================================================

import { CONFIG } from "./config.js";
import { Collectible } from "./collectible.js";
import { Enemy } from "./enemy.js";

export class Spawner {
  constructor() {
    this.contadorObjeto = 0;
    this.contadorEnemigo = 0;
  }

  reiniciar() {
    this.contadorObjeto = 0;
    this.contadorEnemigo = 0;
  }

  // Se llama una vez por cuadro. Agrega cosas nuevas a las listas.
  update(objetos, enemigos) {
    this.contadorObjeto++;
    if (this.contadorObjeto >= CONFIG.spawnObjetoCada) {
      this.contadorObjeto = 0;
      objetos.push(new Collectible());
    }

    this.contadorEnemigo++;
    if (this.contadorEnemigo >= CONFIG.spawnEnemigoCada) {
      this.contadorEnemigo = 0;
      enemigos.push(new Enemy());
    }
  }
}
