# Carpeta de imágenes (assets)

Aquí van los PNG del juego. Vite sirve esta carpeta desde la raíz, así
que un archivo `mi_imagen.png` se usa con la ruta `/assets/mi_imagen.png`.

## Sprites de este juego

Ahora **todo** usa imágenes:

- `player_ship.png` → la nave del jugador (tira animada de 4 cuadros).
- `enemy_ship.png` → las naves enemigas (tira animada de 4 cuadros).
- `bullet.png` → las balas (tira animada de 4 cuadros).
- `bg_space.png` → el fondo estrellado. Es una **imagen fija** del
  tamaño del canvas (600×700). No es una tira: un solo cuadro.

Para cambiar cualquiera, reemplazá el PNG con el mismo nombre, **o**
poné otro nombre y actualizá la `ruta` correspondiente en `src/config.js`
(dentro de `sprites`). Si falta un PNG, el juego dibuja la figura simple
de siempre y no se rompe.

## Cómo cambiar el sprite del jugador

Ya hay un sprite placeholder (`player_ship.png`). Para usar el tuyo:

1. Reemplazá `player_ship.png` por tu propio PNG (mismo nombre = no
   tocás nada más), **o** poné otro nombre y actualizá la `ruta` en
   `src/config.js`.
2. Si tus cuadros tienen otro tamaño o cantidad, ajustá en `config.js`
   `frameAncho`, `frameAlto` y `frames`.
3. Listo.

## Formato del spritesheet

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
