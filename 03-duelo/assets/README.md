# Carpeta de imágenes (assets)

Aquí van los PNG del juego. Live Server sirve esta carpeta junto a `index.html`,
así que un archivo `mi_imagen.png` se usa con la ruta `./assets/mi_imagen.png`.

Este juego usa **tres** imágenes:

- `player_duel.png` → el **mazo** de cada jugador. Es una **imagen fija**
  (un solo cuadro).
- `ball_spin.png` → la **pelota**. Es una **tira animada** (parece girar).
- `bg_rink.png` → el **fondo** (pista de hielo). Es una **imagen fija**
  del tamaño del canvas (800×500). Las líneas y los arcos los dibuja el
  juego por encima, así que el fondo es solo el hielo.

## Cómo cambiar el mazo (jugador)

1. Reemplazá `player_duel.png` por tu propio PNG (mismo nombre = no
   tocás nada más), **o** poné otro nombre y actualizá la `ruta` del
   sprite `jugador` en `src/config.js`.
2. Es una imagen fija, así que cualquier PNG cuadrado sirve.
3. `escala` (en `config.js`) controla qué tan grande se ve.

## Cómo cambiar la pelota

1. Reemplazá `ball_spin.png` por tu propia tira animada (mismo nombre),
   **o** poné otro nombre y actualizá la `ruta` del sprite `pelota`.
2. Si tus cuadros tienen otro tamaño o cantidad, ajustá en `config.js`
   `frameAncho`, `frameAlto` y `frames` del sprite `pelota`.
3. `fps` controla la velocidad del giro.

## Formato del spritesheet (pelota)

- PNG con **fondo transparente**.
- Todos los cuadros en **una sola fila** (tira horizontal).
- Cada cuadro del mismo tamaño.

Ejemplo: 4 cuadros de 32×32 → imagen de **128×32 px** (4 × 32 = 128).

```
[ cuadro0 ][ cuadro1 ][ cuadro2 ][ cuadro3 ]
   32px       32px       32px       32px
```

En `config.js` eso sería: `frameAncho: 32`, `frameAlto: 32`, `frames: 4`.

## Consejos

- Empezá con cuadros de **32×32**: tamaño cómodo para principiantes.
- `escala` controla qué tan grande se ve en pantalla (no cambia el PNG).
- El look pixel nítido ya está activado con `noSmooth()` en `main.js`.
