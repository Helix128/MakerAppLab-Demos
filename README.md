# MakerAppLab — 3 demos de juegos en p5.js

Tres juegos sencillos hechos con [p5.js](https://p5js.org/) pensados como
material de aprendizaje. Cada demo es un proyecto Node independiente, con la
lógica separada en archivos pequeños para que sea fácil entender **dónde** y
**qué** modificar.

## Demos

| Carpeta                     | Juego                | Idea                                                            |
|-----------------------------|----------------------|----------------------------------------------------------------|
| `01-recolectar-esquivar/`   | Recolectar y esquivar| Recoge objetos buenos (suman puntos), esquiva enemigos (restan vida). Llega a los puntos para ganar. |
| `02-disparar-esquivar/`     | Disparar y esquivar  | Mueve la nave y dispara a los enemigos; esquiva sus choques. Suma puntos para ganar. |
| `03-duelo/`                 | Duelo 2 jugadores    | Hockey/fútbol de mesa: dos jugadores en el mismo teclado golpean la pelota e intentan hacer goles en el arco contrario. |

## Cómo ejecutar una demo

Cada demo se instala y corre por separado. Entra en su carpeta y ejecuta:

```bash
cd 01-recolectar-esquivar   # o la demo que quieras
npm install                 # solo la primera vez
npm run dev                 # abre el servidor de desarrollo
```

Abre la URL que muestra la terminal (normalmente `http://localhost:5173`).

Otros comandos:

```bash
npm run build     # genera la versión final en dist/
npm run preview   # sirve la versión de dist/ para probarla
```

## Cómo está organizado cada juego

Las tres demos comparten la **misma estructura de archivos** a propósito: si
entiendes una, entiendes las otras.

| Archivo             | Para qué sirve                                                  |
|---------------------|----------------------------------------------------------------|
| `index.html`        | Página que carga el juego.                                      |
| `src/main.js`       | Punto de arranque. Conecta p5.js con el juego.                  |
| `src/config.js`     | **Panel de ajustes.** Empieza a experimentar cambiando aquí.   |
| `src/game.js`       | Cerebro del juego: estados (inicio, jugando, fin) y reglas.     |
| `src/player.js`     | El o los jugadores.                                             |
| `src/input.js`      | Lectura del teclado.                                            |
| `src/collisions.js` | Detección de choques.                                           |
| `src/screens.js`    | Pantallas de inicio, victoria y derrota.                        |
| `src/sprite.js`     | Dibujo y animación de sprites (tiras de imágenes).             |
| `src/assets.js`     | Carga de imágenes (sprites y fondo).                           |

Archivos propios de cada juego:

- `01-recolectar-esquivar/`: `enemy.js`, `collectible.js`, `spawner.js`.
- `02-disparar-esquivar/`: `enemy.js`, `bullet.js`, `spawner.js`.
- `03-duelo/`: `ball.js` (la pelota). No usa `spawner.js`.

### Controles

- **01 y 02:** mover con flechas o `WASD`.
- **03 (duelo):** Jugador 1 con `W` `A` `S` `D`, Jugador 2 con las flechas.
  Los códigos de tecla se cambian en `src/config.js` (`jugador1` y `jugador2`).

### Estados del juego

Todos siguen el mismo flujo:

```
INICIO  ──(empezar)──►  JUGANDO  ──(ganar/perder)──►  GANASTE / PERDISTE
   ▲                                                        │
   └──────────────────(empezar de nuevo)───────────────────┘
```

## ¿Por dónde empiezo a tocar?

1. Abre `src/config.js` y cambia números (velocidad, vidas, puntos para ganar).
   Es la forma más rápida y segura de ver cómo cambia el juego.
2. Cambia colores y tamaños en las clases (`player.js`, `enemy.js`, ...).
3. Cuando te sientas cómodo, agrega un nuevo tipo de enemigo o una regla nueva
   en `game.js`.
