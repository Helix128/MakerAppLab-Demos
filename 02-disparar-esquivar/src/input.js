// ============================================================
//  TECLADO
//  Guarda qué teclas están presionadas: movimiento y disparo.
//  Movimiento con FLECHAS o WASD, disparo con ESPACIO.
// ============================================================

export const teclas = {
  arriba: false,
  abajo: false,
  izquierda: false,
  derecha: false,
  disparar: false,
};

export function teclaPresionada(codigo) {
  cambiarTecla(codigo, true);
}

export function teclaSoltada(codigo) {
  cambiarTecla(codigo, false);
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
    case "Space":
      teclas.disparar = valor;
      break;
  }
}
