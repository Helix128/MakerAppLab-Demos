// ============================================================
//  TECLADO COMPARTIDO
//  Los dos jugadores usan el mismo teclado. Guardamos qué
//  códigos de tecla están presionados ahora mismo, y cada
//  jugador consulta los suyos (definidos en config.js).
// ============================================================

// Conjunto de códigos de tecla presionados en este momento.
const presionadas = new Set();

export function teclaPresionada(codigo) {
  presionadas.add(codigo);
}

export function teclaSoltada(codigo) {
  presionadas.delete(codigo);
}

export function presionarVirtual(codigo) {
  presionadas.add(codigo);
}

export function soltarVirtual(codigo) {
  presionadas.delete(codigo);
}

// true si esa tecla está presionada ahora.
export function estaPresionada(codigo) {
  return presionadas.has(codigo);
}
