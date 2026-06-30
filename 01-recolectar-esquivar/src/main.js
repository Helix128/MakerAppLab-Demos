// ============================================================
//  PUNTO DE ARRANQUE
//  Conecta p5.js con nuestro juego. Normalmente no hace falta
//  modificar este archivo: la lógica está en los otros.
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
    crearControlesMoviles({ empezar: () => game.presionarEnter() });
  };

  p.draw = () => {
    game.update();
    game.draw(p);
  };

  // p5 nos pasa el evento del navegador (e). Usamos e.code porque
  // identifica la tecla física sin importar mayúsculas ni idioma.
  p.keyPressed = (e) => {
    if (e.code === "Enter") game.presionarEnter();
    teclaPresionada(e.code);
  };

  p.keyReleased = (e) => {
    teclaSoltada(e.code);
  };

  p.mousePressed = () => {
    game.hacerClic(p.mouseX, p.mouseY);
  };
};

new window.p5(sketch);
