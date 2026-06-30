// ============================================================
//  COLISIONES
//  Funciones para saber si dos cosas están colisionando.
// ============================================================

// Devuelve true si dos círculos colisionan.
// Cada cosa necesita: x, y (centro) y un tamaño (diámetro).
export function circulosColisionan(a, b) {
  const distancia = Math.hypot(a.x - b.x, a.y - b.y);
  const sumaRadios = a.tamano / 2 + b.tamano / 2;
  return distancia < sumaRadios;
}
