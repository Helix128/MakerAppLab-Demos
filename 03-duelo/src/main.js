// ============================================================
//  PUNTO DE ARRANQUE
//  Conecta p5.js con el juego. Normalmente no hace falta
//  modificar este archivo.
// ============================================================

import { CONFIG } from "./config.js";
import { Game } from "./game.js";
import { teclaPresionada, teclaSoltada } from "./input.js";
import { cargarAssets } from "./assets.js";
import { crearControlesMoviles } from "./mobile-controls.js";

const sketch = (p) => {
  let game;

  // preload carga las imágenes antes de que empiece el juego.
  p.preload = () => {
    cargarAssets(p);
  };

  p.setup = () => {
    const canvas = p.createCanvas(CONFIG.ancho, CONFIG.alto);
    canvas.parent("app");
    p.noSmooth(); // mantén los píxeles nítidos (look retro)
    game = new Game();
    crearControlesMoviles({ empezar: () => game.presionarEspacio() });
  };

  p.draw = () => {
    game.update();
    game.draw(p);
  };

  // p5 nos pasa el evento del navegador (e). Usamos e.code porque
  // identifica la tecla física sin importar mayúsculas ni idioma.
  p.keyPressed = (e) => {
    // La barra espaciadora empieza / reinicia la partida.
    if (e.code === "Space") game.presionarEspacio();
    teclaPresionada(e.code);
    // Evita que ESPACIO o las FLECHAS muevan el scroll de la página.
    if (
      e.code === "Space" ||
      e.code === "ArrowUp" ||
      e.code === "ArrowDown" ||
      e.code === "ArrowLeft" ||
      e.code === "ArrowRight"
    ) {
      return false;
    }
  };

  p.keyReleased = (e) => {
    teclaSoltada(e.code);
  };

  p.mousePressed = () => {
    game.hacerClic(p.mouseX, p.mouseY);
  };
};

new window.p5(sketch);
