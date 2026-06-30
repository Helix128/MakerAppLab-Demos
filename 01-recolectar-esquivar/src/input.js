// ============================================================
//  TECLADO
//  Guarda qué teclas de movimiento están presionadas ahora.
//  Se puede usar flechas o WASD.
// ============================================================

export const teclas = {
  arriba: false,
  abajo: false,
  izquierda: false,
  derecha: false,
};

// Llamar cuando se presiona una tecla.
export function teclaPresionada(codigo) {
  cambiarTecla(codigo, true);
}

// Llamar cuando se suelta una tecla.
export function teclaSoltada(codigo) {
  cambiarTecla(codigo, false);
}

export function cambiarControl(nombre, valor) {
  teclas[nombre] = valor;
}

function cambiarTecla(codigo, valor) {
  switch (codigo) {
    case "ArrowUp":
    case "KeyW":
      teclas.arriba = valor;
      break;
    case "ArrowDown":
    case "KeyS":
      teclas.abajo = valor;
      break;
    case "ArrowLeft":
    case "KeyA":
      teclas.izquierda = valor;
      break;
    case "ArrowRight":
    case "KeyD":
      teclas.derecha = valor;
      break;
  }
}
