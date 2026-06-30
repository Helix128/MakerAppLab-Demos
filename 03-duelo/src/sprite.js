// ============================================================
//  SPRITES
//  Herramientas para dibujar imágenes (PNG) en el juego.
//
//  - Sprite: una imagen fija (no se mueve por dentro).
//  - AnimatedSprite: una tira de cuadros (spritesheet) que se
//    anima sola. La tira es horizontal: todos los cuadros en
//    una sola fila, uno al lado del otro.
//
//  Las dos se dibujan igual: sprite.draw(p, x, y, ancho, alto)
//  donde (x, y) es el CENTRO, igual que las figuras del juego.
// ============================================================

// --- Imagen fija ---
export class Sprite {
  constructor(imagen) {
    this.imagen = imagen;
  }

  draw(p, x, y, ancho, alto) {
    p.push();
    p.imageMode(p.CENTER);
    p.image(this.imagen, x, y, ancho, alto);
    p.pop();
  }
}

// --- Imagen animada (spritesheet horizontal) ---
export class AnimatedSprite {
  // imagen: el PNG con todos los cuadros en una fila.
  // frameAncho, frameAlto: tamaño de UN cuadro.
  // frames: cuántos cuadros tiene la tira.
  // fps: cuántos cuadros por segundo se muestran (velocidad de la animación).
  constructor(imagen, frameAncho, frameAlto, frames, fps) {
    this.imagen = imagen;
    this.frameAncho = frameAncho;
    this.frameAlto = frameAlto;
    this.frames = frames;
    this.fps = fps;
  }

  draw(p, x, y, ancho, alto) {
    // Elegimos el cuadro según el tiempo, no según los FPS del
    // juego. Así la animación va siempre a la misma velocidad.
    const cuadro = Math.floor((p.millis() / 1000) * this.fps) % this.frames;
    const sx = cuadro * this.frameAncho; // posición del cuadro dentro del PNG

    p.push();
    p.imageMode(p.CENTER);
    p.image(
      this.imagen,
      x,
      y,
      ancho,
      alto, // dónde y de qué tamaño se dibuja en pantalla
      sx,
      0,
      this.frameAncho,
      this.frameAlto // qué parte del PNG se recorta
    );
    p.pop();
  }
}
