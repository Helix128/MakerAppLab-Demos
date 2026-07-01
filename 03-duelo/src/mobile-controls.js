// ============================================================
//  CONTROLES MÓVILES
//  Dos crucetas táctiles: una para cada jugador.
// ============================================================

import { CONFIG } from "./config.js";
import { presionarVirtual, soltarVirtual } from "./input.js";

export function crearControlesMoviles({ empezar }) {
  const controles = document.createElement("div");
  controles.className = "mobile-controls mobile-controls-duel";
  controles.dataset.controls = "duel";
  controles.innerHTML = `
    ${crearDpad("mobile-player-1", CONFIG.jugador1)}
    <button class="mobile-btn mobile-start" type="button">Empezar</button>
    ${crearDpad("mobile-player-2", CONFIG.jugador2)}
  `;

  document.body.appendChild(controles);

  for (const boton of controles.querySelectorAll("[data-key]") ) {
    conectarBoton(boton, boton.dataset.key);
  }

  const botonEmpezar = controles.querySelector(".mobile-start");
  botonEmpezar.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    empezar();
  });

  window.dispatchEvent(new Event("game-controls-ready"));
}

function crearDpad(clase, jugador) {
  return `
    <div class="mobile-player ${clase}">
      <div class="mobile-name" style="color: ${jugador.color}">${jugador.nombre}</div>
      <div class="mobile-dpad" aria-label="${jugador.nombre}">
        <button class="mobile-btn mobile-up" type="button" data-key="${jugador.arriba}" aria-label="Arriba">▲</button>
        <button class="mobile-btn mobile-left" type="button" data-key="${jugador.izquierda}" aria-label="Izquierda">◀</button>
        <button class="mobile-btn mobile-right" type="button" data-key="${jugador.derecha}" aria-label="Derecha">▶</button>
        <button class="mobile-btn mobile-down" type="button" data-key="${jugador.abajo}" aria-label="Abajo">▼</button>
      </div>
    </div>
  `;
}

function conectarBoton(boton, codigo) {
  boton.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    boton.setPointerCapture(e.pointerId);
    presionarVirtual(codigo);
  });
  boton.addEventListener("pointerup", (e) => {
    e.preventDefault();
    soltarVirtual(codigo);
  });
  boton.addEventListener("pointercancel", () => soltarVirtual(codigo));
  boton.addEventListener("lostpointercapture", () => soltarVirtual(codigo));
}
