export function instalarCanvasResponsive(p, canvas, config, tipoControles = "simple") {
  const elemento = canvas.elt || canvas;
  elemento.classList.add("game-canvas");
  document.body.dataset.gameControls = tipoControles;

  const ajustar = () => ajustarCanvas(elemento, config, tipoControles);
  requestAnimationFrame(ajustar);

  window.addEventListener("resize", ajustar, { passive: true });
  window.addEventListener("orientationchange", () => setTimeout(ajustar, 250), { passive: true });
  window.addEventListener("game-controls-ready", () => requestAnimationFrame(ajustar));
  window.visualViewport?.addEventListener("resize", ajustar, { passive: true });
  window.visualViewport?.addEventListener("scroll", ajustar, { passive: true });

  p.windowResized = ajustar;
}

function ajustarCanvas(canvas, config, tipoControles) {
  const viewport = window.visualViewport;
  const anchoViewport = viewport?.width || window.innerWidth;
  const altoViewport = viewport?.height || window.innerHeight;
  const movil = esMovilTactil();
  const safe = leerSafeAreas();
  const pad = leerVariablePx("--pad", movil ? 10 : 24);
  const margenHorizontal = maximo(pad, safe.left) + maximo(pad, safe.right);
  const margenVerticalBase = maximo(pad, safe.top) + maximo(pad, safe.bottom);
  const reserva = movil ? medirReservaControles(tipoControles, altoViewport, safe, pad) : 0;

  const anchoDisponible = Math.max(120, anchoViewport - margenHorizontal);
  const altoDisponible = Math.max(120, altoViewport - margenVerticalBase - reserva);
  const escala = Math.min(anchoDisponible / config.ancho, altoDisponible / config.alto, 1);
  const anchoCss = Math.max(1, Math.floor(config.ancho * escala));
  const altoCss = Math.max(1, Math.floor(config.alto * escala));

  document.documentElement.style.setProperty("--viewport-height", `${altoViewport}px`);
  document.documentElement.style.setProperty("--canvas-css-width", `${anchoCss}px`);
  document.documentElement.style.setProperty("--canvas-css-height", `${altoCss}px`);
  document.documentElement.style.setProperty("--controls-reserve", `${reserva}px`);
  canvas.style.setProperty("width", `${anchoCss}px`, "important");
  canvas.style.setProperty("height", `${altoCss}px`, "important");
}

function medirReservaControles(tipoControles, altoViewport, safe, pad) {
  const controles = document.querySelector(`.mobile-controls[data-controls="${tipoControles}"]`);
  if (!controles) return 0;

  const landscape = window.matchMedia("(orientation: landscape)").matches;
  if (landscape) return 0;

  const elementos = controles.querySelectorAll(".mobile-dpad, .mobile-fire, .mobile-start, .mobile-player");
  let bordeSuperior = altoViewport;

  for (const elemento of elementos) {
    const rect = elemento.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) bordeSuperior = Math.min(bordeSuperior, rect.top);
  }

  if (bordeSuperior === altoViewport) return 0;
  return Math.ceil(Math.max(0, altoViewport - bordeSuperior - safe.bottom + pad));
}

function leerSafeAreas() {
  const probe = document.createElement("div");
  probe.style.cssText = `
    position: fixed;
    inset: auto;
    visibility: hidden;
    pointer-events: none;
    padding-top: env(safe-area-inset-top, 0px);
    padding-right: env(safe-area-inset-right, 0px);
    padding-bottom: env(safe-area-inset-bottom, 0px);
    padding-left: env(safe-area-inset-left, 0px);
  `;
  document.body.appendChild(probe);
  const estilos = getComputedStyle(probe);
  const safe = {
    top: parseFloat(estilos.paddingTop) || 0,
    right: parseFloat(estilos.paddingRight) || 0,
    bottom: parseFloat(estilos.paddingBottom) || 0,
    left: parseFloat(estilos.paddingLeft) || 0,
  };
  probe.remove();
  return safe;
}

function leerVariablePx(nombre, fallback) {
  const probe = document.createElement("div");
  probe.style.cssText = `
    position: fixed;
    visibility: hidden;
    pointer-events: none;
    width: var(${nombre});
  `;
  document.body.appendChild(probe);
  const valor = parseFloat(getComputedStyle(probe).width) || fallback;
  probe.remove();
  return valor;
}

function maximo(a, b) {
  return Math.max(a || 0, b || 0);
}

function esMovilTactil() {
  return (
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0 ||
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}
