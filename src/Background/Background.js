import './Background.css';

let timestamp = null;
let lastMouseX = null;
let lastMouseY = null;
let backgroundPosX = [ 0, 0, 0, 0, 0, 0];
let backgroundPosY = [ 80, 80, 80, 80, 80, 80];
let minY = 70;
let maxY = 90;

const nonScrolling = ['art', 'about_me'];

const getMouseSpeed = (event) => {
  if (timestamp === null) {
    timestamp = Date.now();
    lastMouseX = event.screenX;
    lastMouseY = event.screenY;
    return 0;
  }

  var now = Date.now();
  var dt =  now - timestamp;
  var dx = event.screenX - lastMouseX;
  var dy = event.screenY - lastMouseY;
  var speedX = Math.round(dx / dt * 100);
  var speedY = Math.round(dy / dt * 100);

  timestamp = now;
  lastMouseX = event.screenX;
  lastMouseY = event.screenY;

  return [speedX, speedY];
}

const getXChange = (speedX, index) => {
  return (speedX)/(index+1);
}

const getYChange = (curY, speedY, index) => {
  const yCeil = Math.min(maxY, curY + speedY/(index+1))
  const yFloor = Math.max(minY, yCeil)
  return yFloor;
}

const moveBackground = (event, isScrolling) => {
  if (!isScrolling) return;
  var root = document.getElementById("root");

  const speedVals = getMouseSpeed(event);
  const speedX = speedVals[0]/50;
  const speedY = speedVals[1]/300;

  if (!isFinite(speedX) || Number.isNaN(speedX) ||
      !isFinite(speedY) || Number.isNaN(speedY)) {
    return;
  }

  backgroundPosX = backgroundPosX.map((x, i) => x + getXChange(speedX, i));
  root.style.backgroundPositionX = backgroundPosX.map(x => `${x}%`);

  backgroundPosY = backgroundPosY.map((y, i) => getYChange(y, speedY, i));
  root.style.backgroundPositionY = backgroundPosY.map(y => `${y}%`);
}

export { nonScrolling, moveBackground }
