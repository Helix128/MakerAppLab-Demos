// ============================================================
//  ASSETS (imágenes del juego)
//  Aquí se cargan los sprites una sola vez al arrancar.
//  Si en config.js está apagado o falta un PNG, el juego usa
//  las figuras de siempre, así que nunca se rompe.
// ============================================================

import { CONFIG } from "./config.js";
import { Sprite } from "./sprite.js";

// Aquí quedan guardados los sprites ya cargados.
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
      assets.jugador = new Sprite(img);
    },
    () => {
      console.warn("No se pudo cargar el sprite del jugador:", j.ruta);
    }
  );

  // --- Enemigo (imagen fija) ---
  const e = CONFIG.sprites.enemigo;
  p.loadImage(
    e.ruta,
    (img) => {
      assets.enemigo = new Sprite(img);
    },
    () => {
      console.warn("No se pudo cargar el sprite del enemigo:", e.ruta);
    }
  );

  // --- Objeto beneficioso (imagen fija) ---
  const o = CONFIG.sprites.objeto;
  p.loadImage(
    o.ruta,
    (img) => {
      assets.objeto = new Sprite(img);
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
