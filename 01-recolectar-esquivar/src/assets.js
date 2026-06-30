// ============================================================
//  ASSETS (imágenes del juego)
//  Aquí se cargan los sprites una sola vez al arrancar.
//  Si en config.js está apagado o falta un PNG, el juego usa
//  las figuras de siempre, así que nunca se rompe.
// ============================================================

import { CONFIG } from "./config.js";
import { Sprite, AnimatedSprite } from "./sprite.js";

// Acá quedan guardados los sprites ya cargados.
// Empiezan en null (todavía sin imagen).
export const assets = {
  jugador: null,
  enemigo: null,
  objeto: null,
  fondo: null,
};

// Se llama desde preload() en main.js (antes de que empiece el juego).
export function cargarAssets(p) {
  const j = CONFIG.sprites.jugador;
  // loadImage descarga el PNG. El segundo callback evita que el
  // juego se caiga si la imagen no existe todavía.
  p.loadImage(
    j.ruta,
    (img) => {
      assets.jugador = new AnimatedSprite(
        img,
        j.frameAncho,
        j.frameAlto,
        j.frames,
        j.fps
      );
    },
    () => {
      console.warn("No se pudo cargar el sprite del jugador:", j.ruta);
    }
  );

  // --- Enemigo (tira animada) ---
  const e = CONFIG.sprites.enemigo;
  p.loadImage(
    e.ruta,
    (img) => {
      assets.enemigo = new AnimatedSprite(
        img,
        e.frameAncho,
        e.frameAlto,
        e.frames,
        e.fps
      );
    },
    () => {
      console.warn("No se pudo cargar el sprite del enemigo:", e.ruta);
    }
  );

  // --- Objeto beneficioso (tira animada) ---
  const o = CONFIG.sprites.objeto;
  p.loadImage(
    o.ruta,
    (img) => {
      assets.objeto = new AnimatedSprite(
        img,
        o.frameAncho,
        o.frameAlto,
        o.frames,
        o.fps
      );
    },
    () => {
      console.warn("No se pudo cargar el sprite del objeto:", o.ruta);
    }
  );

  // --- Fondo (imagen fija) ---
  const f = CONFIG.sprites.fondo;
  p.loadImage(
    f.ruta,
    (img) => {
      assets.fondo = new Sprite(img);
    },
    () => {
      console.warn("No se pudo cargar el fondo:", f.ruta);
    }
  );
}
