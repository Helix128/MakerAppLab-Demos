const TIPOS_CONTROLES = {
  simple: { portrait: 190, landscape: 24 },
  shooter: { portrait: 224, landscape: 24 },
  duel: { portrait: 190, landscape: 24 },
};

export function instalarCanvasResponsive(p, canvas, config, tipoControles = "simple") {
  const elemento = canvas.elt || canvas;
  elemento.classList.add("game-canvas");

  const ajustar = () => ajustarCanvas(elemento, config, tipoControles);
  ajustar();

  window.addEventListener("resize", ajustar, { passive: true });
  window.visualViewport?.addEventListener("resize", ajustar, { passive: true });
  window.visualViewport?.addEventListener("scroll", ajustar, { passive: true });

  p.windowResized = ajustar;
}

function ajustarCanvas(canvas, config, tipoControles) {
  const viewport = window.visualViewport;
  const anchoViewport = viewport?.width || window.innerWidth;
  const altoViewport = viewport?.height || window.innerHeight;
  const movil = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const landscape = anchoViewport > altoViewport;
  const margen = movil ? 10 : 24;
  const reserva = movil
    ? (TIPOS_CONTROLES[tipoControles] || TIPOS_CONTROLES.simple)[landscape ? "landscape" : "portrait"]
    : 0;

  const anchoDisponible = Math.max(220, anchoViewport - margen * 2);
  const altoDisponible = Math.max(220, altoViewport - margen * 2 - reserva);
  const escala = Math.min(anchoDisponible / config.ancho, altoDisponible / config.alto, 1);
  const anchoCss = Math.floor(config.ancho * escala);
  const altoCss = Math.floor(config.alto * escala);

  canvas.style.width = `${anchoCss}px`;
  canvas.style.height = `${altoCss}px`;
  canvas.style.maxWidth = "calc(100vw - 20px)";
  canvas.style.maxHeight = movil ? `calc(100dvh - ${reserva + margen * 2}px)` : "calc(100dvh - 48px)";

  document.documentElement.style.setProperty("--canvas-css-width", `${anchoCss}px`);
  document.documentElement.style.setProperty("--canvas-css-height", `${altoCss}px`);
  document.documentElement.style.setProperty("--controls-reserve", `${reserva}px`);
}
