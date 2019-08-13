import { isPressed } from "./keys";

const FPS = 1000 / 60;
const width = window.innerWidth;
const height = window.innerHeight;

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
  // render dat boy
  context.fillStyle = "green";
  context.fillRect(pos.x, pos.y, 64, 64);
}

(function main() {
  animFrame = window.requestAnimationFrame(main);
  const now = performance.now();
  const elapsed = now - prevFrame;

  if (elapsed >= FPS) {
    console.log("elapsed", elapsed);
    updateSquareBoy();
    drawSquareBoy();
    prevFrame = now;
  }

  if (isPressed.esc) {
    window.cancelAnimationFrame(animFrame);
  }
})();
