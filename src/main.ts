import { isPressed } from "./keys";

const FPS = 1000 / 60;
const width = window.innerWidth;
const height = window.innerHeight;
const PIXEL_SIZE = 10;

// prettier-ignore
// tslint-ignore
const simpleTile = [
  0,0,0,0,1,1,0,1,
  0,0,2,2,0,1,1,0,
  0,2,1,0,0,2,1,0,
  0,2,2,0,0,0,1,0
]

const numTiles = 10;
let map = new Array();
for (let i = 0; i <= numTiles; i++) {
  map.push(shuffle(simpleTile));
}
console.log(map);

const getIndex = (row: number, column: number) => row * 8 + column;
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
enum PixelType {
  EMPTY = 0,
  DEEP = 1,
  NEAR = 2,
}

const drawPixels = (tile, index: number, type: PixelType) => {
  for (let row = 0; row < 4; row++) {
    const rowOffset = index === 0 ? 0 : 4 * index;
    // simpleTile rows
    for (let col = 0; col < 8; col++) {
      // simpleTile cols
      const idx = getIndex(row, col);
      if (tile[idx] !== type) {
        continue;
      }
      const colOffset = index === 0 ? 0 : 8 * index;
      console.log("ROWOFFSET in draw: ", rowOffset);
      context.fillRect(
        col * (PIXEL_SIZE + colOffset),
        row * (PIXEL_SIZE + rowOffset),
        PIXEL_SIZE,
        PIXEL_SIZE
      );
    }
  }
};

const drawSatellite = () => {
  context.fillStyle = "grey";
  for (let i = 0; i < 10; i++) {
    for (let row = 0; row < 4; row++) {
      const rowOffset = i === 0 ? 0 : 4 * i;
      // simpleTile rows
      for (let col = 0; col < 6; col++) {
        const colOffset = i === 0 ? 0 : 6 * i;
        //console.log(colOffset, rowOffset, index);
        // (row + rowOffset - col) * PIXEL_SIZE, cool 3d effect maybe use for space-ship animation
        context.fillRect(
          (col + colOffset) * PIXEL_SIZE,
          (row + rowOffset - col) * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    }
  }
};

// Create a canvas.
const canvas = document.createElement("canvas");
const context: CanvasRenderingContext2D = canvas.getContext("2d");

// @todo: This needs to update on resize.
canvas.width = width;
canvas.height = height;
canvas.style.background = "#000";

document.body.appendChild(canvas);

// Instantiate our main loop.
let animFrame: number = 0;
let prevFrame: number = performance.now();

const pos = { x: width / 2, y: height / 2 };

// @temporary testing stuffs
function updateSquareBoy() {
  const speed = 30;
  if (isPressed.left) pos.x -= speed;
  if (isPressed.right) pos.x += speed;
  if (isPressed.down) pos.y += speed;
  if (isPressed.up) pos.y -= speed;
}

function drawSpace() {
  context.clearRect(0, 0, width, height);
  // NOT GREAT CHANGING FILL STYLE SO OFTEN
  // Maybe put everything in drawPixels?
  map.forEach((tile, index) => {
    context.fillStyle = "#2F3939";
    drawPixels(shuffle(tile), index, PixelType.EMPTY);
    context.fillStyle = "#182141";
    drawPixels(shuffle(tile), index, PixelType.DEEP);
    context.fillStyle = "#1E2852";
    drawPixels(shuffle(tile), index, PixelType.NEAR);
  });
}

function drawPlanet() {
  context.fillStyle = "#ffe884";
  context.arc(width / 4, height, 240, Math.PI, 0);
  context.fill();
}
drawSpace();
drawPlanet();
drawSatellite();

// let travelling = true;
// setTimeout(() => { travelling = false;
//   drawPlanet();
// }, 2000);

// go
(function main() {
  animFrame = window.requestAnimationFrame(main);
  const now = performance.now();
  const elapsed = now - prevFrame;
  // if (travelling) {
  //   drawSpace();
  // }

  if (elapsed >= FPS) {
    updateSquareBoy();
    prevFrame = now;
  }

  if (isPressed.esc) {
    window.cancelAnimationFrame(animFrame);
  }
})();
