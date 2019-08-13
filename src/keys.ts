let up: boolean;
let left: boolean;
let down: boolean;
let right: boolean;
let esc: boolean;

function handlePress(key: number, isDown: boolean) {
  // console.log("Key down:", key);
  if (key === 87 || key === 38) up = isDown; // w and up arrow
  if (key === 65 || key === 37) left = isDown; // a and left arrow
  if (key === 83 || key === 40) down = isDown; // s and down arrow
  if (key === 68 || key === 39) right = isDown; // d and right arrow
  if (key === 27) esc = isDown; // escape
}

document.onkeydown = (ev: KeyboardEvent) => handlePress(ev.keyCode, true);
document.onkeyup = (ev: KeyboardEvent) => handlePress(ev.keyCode, false);

export const isPressed = {
  get up() {
    return up;
  },
  get left() {
    return left;
  },
  get down() {
    return down;
  },
  get right() {
    return right;
  },
  get esc() {
    return esc;
  },
};
