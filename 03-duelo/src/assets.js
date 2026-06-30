// ============================================================
//  ASSETS (imágenes del juego)
//  Aquí se cargan los sprites una sola vez al arrancar.
//  Si falta un PNG, el juego usa las figuras de siempre, así
//  que nunca se rompe.
// ============================================================

import { CONFIG } from "./config.js";
import { Sprite } from "./sprite.js";

// Acá quedan guardados los sprites ya cargados.
// Empiezan en null (todavía sin imagen).
export const assets = {
  jugador: null, // imagen fija (mazo)
  pelota: null, // imagen fija
  fondo: null, // imagen fija (pista de hielo)
};

// Se llama desde preload() en main.js (antes de que empiece el juego).
export function cargarAssets(p) {
  // --- Jugador (mazo): imagen fija ---
  const j = CONFIG.sprites.jugador;
  p.loadImage(
    j.ruta,
    (img) => {
      assets.jugador = new Sprite(img);
    },
    () => {
      console.warn("No se pudo cargar el sprite del jugador:", j.ruta);
    }
  );

  // --- Pelota: imagen fija ---
  const b = CONFIG.sprites.pelota;
  p.loadImage(
    b.ruta,
    (img) => {
      assets.pelota = new Sprite(img);
    },
    () => {
      console.warn("No se pudo cargar el sprite de la pelota:", b.ruta);
    }
  );

  // --- Fondo (pista de hielo): imagen fija ---
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
