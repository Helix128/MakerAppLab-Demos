# MakerAppLab — 3 demos de juegos en p5.js

Tres juegos sencillos hechos con [p5.js](https://p5js.org/) pensados como
material de aprendizaje. Cada demo es un proyecto Node independiente, con la
lógica separada en archivos pequeños para que sea fácil entender **dónde** y
**qué** modificar.

## Demos

| Carpeta                     | Juego                | Idea                                                            |
|-----------------------------|----------------------|----------------------------------------------------------------|
| `01-recolectar-esquivar/`   | Recolectar y esquivar| Recoge objetos buenos (suman puntos), esquiva enemigos (restan vida). |
| `02-disparar-esquivar/`     | Disparar y esquivar  | Muévete y dispara a los enemigos; esquiva sus choques.         |
| `03-duelo/`                 | Duelo 2 jugadores    | Dos jugadores en el mismo teclado se disparan entre sí.        |

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

Otros archivos según el juego: `enemy.js`, `collectible.js`, `bullet.js`,
`spawner.js`.

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
