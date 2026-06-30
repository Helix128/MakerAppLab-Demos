// ============================================================
//  CONTROLES MÓVILES
//  Botones táctiles para jugar sin teclado.
// ============================================================

import { cambiarControl } from "./input.js";

export function crearControlesMoviles({ empezar }) {
  const controles = document.createElement("div");
  controles.className = "mobile-controls mobile-controls-shooter";
  controles.innerHTML = `
    <div class="mobile-dpad" aria-label="Movimiento">
      <button class="mobile-btn mobile-up" data-control="arriba" aria-label="Arriba">▲</button>
      <button class="mobile-btn mobile-left" data-control="izquierda" aria-label="Izquierda">◀</button>
      <button class="mobile-btn mobile-right" data-control="derecha" aria-label="Derecha">▶</button>
      <button class="mobile-btn mobile-down" data-control="abajo" aria-label="Abajo">▼</button>
    </div>
    <button class="mobile-btn mobile-fire" data-control="disparar" aria-label="Disparar">●</button>
    <button class="mobile-btn mobile-start" type="button">Empezar</button>
  `;

  document.body.appendChild(controles);

  for (const boton of controles.querySelectorAll("[data-control]")) {
    conectarBoton(boton, (activo) => cambiarControl(boton.dataset.control, activo));
  }

  const botonEmpezar = controles.querySelector(".mobile-start");
  botonEmpezar.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    empezar();
  });
}

function conectarBoton(boton, cambiar) {
  boton.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    boton.setPointerCapture(e.pointerId);
    cambiar(true);
  });
  boton.addEventListener("pointerup", (e) => {
    e.preventDefault();
    cambiar(false);
  });
  boton.addEventListener("pointercancel", () => cambiar(false));
  boton.addEventListener("lostpointercapture", () => cambiar(false));
}
