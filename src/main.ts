import { isPressed } from "./keys";

const FPS = 1000 / 60;
const width = window.innerWidth;
const height = window.innerHeight;
const PIXEL_SIZE = 10;

// prettier-ignore
// tslint-ignore
const simpleTile = [
  0,0,0,0,1,1,1,1,
  0,2,2,0,0,1,1,0,
  0,2,2,0,0,1,1,0,
  0,2,2,0,0,0,1,0
]

const getIndex = (row: number, column: number) => row * 8 + column;

enum PixelType {
  GRASS = 0,
  WATER = 1,
  DIRT = 2,
}

const drawPixels = (type: PixelType) => {
  for (let row = 0; row < 4; row++) {
    // simpleTile rows
    for (let col = 0; col < 8; col++) {
      // simpleTile cols
      const idx = getIndex(row, col);
      if (simpleTile[idx] !== type) {
        continue;
      }

      context.fillRect(
        col * PIXEL_SIZE,
        row * PIXEL_SIZE,
        PIXEL_SIZE,
        PIXEL_SIZE
      );
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

function drawSquareBoy() {
  context.clearRect(0, 0, width, height);
  context.fillStyle = "green";
  drawPixels(PixelType.GRASS);
  context.fillStyle = "blue";
  drawPixels(PixelType.WATER);
  context.fillStyle = "brown";
  drawPixels(PixelType.DIRT);
  // render dat boy
  // context.fillStyle = "green";
  // context.fillRect(pos.x, pos.y, 64, 64);
}

(function main() {
  animFrame = window.requestAnimationFrame(main);
  const now = performance.now();
  const elapsed = now - prevFrame;

  if (elapsed >= FPS) {
    updateSquareBoy();
    drawSquareBoy();
    prevFrame = now;
  }

  if (isPressed.esc) {
    window.cancelAnimationFrame(animFrame);
  }
})();
