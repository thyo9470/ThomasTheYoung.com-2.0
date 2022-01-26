import './Background.css';
import { colorReplace, hills1Url, hills2Url, hills3Url, hills4HighlightUrl, hills4Url, lupinUrl, cloudsFrontUrl, cloudsBackUrl } from '../Images/hills/svg/Hills.js'
import * as colors from './colors.js';

const rootElement = document.getElementById("root");
const renderOrder = [hills1Url, hills2Url, lupinUrl, hills3Url, cloudsFrontUrl, hills4Url, hills4HighlightUrl, cloudsBackUrl];

const getColors = (newColors) => {
  return renderOrder.map((url, i) => url.replace(colorReplace, newColors[i+1]));
}

const applyColors = (newColors) => {
  rootElement.style.backgroundColor = newColors[0];
  rootElement.style.backgroundImage = getColors(newColors);
}

applyColors(colors.second);

const getBackgroundPosX = () => {
  const rootStyle = window.getComputedStyle(rootElement);
  const rootBackgroundPosition = rootStyle.getPropertyValue('background-position-x').replace(/%/g, '').split(', ');
  return rootBackgroundPosition.map((xVal, i) => parseInt(xVal));
}

let backgroundPosX = getBackgroundPosX();
const speedXDiv = 75;
const speedXMod = [ 1, .3, .3, .1, .1, .05, .05, .02 ];
let backgroundPosY = [ 80, 80, 80, 80, 80, 80, 80, 80 ];
let minY = 70;
let maxY = 90;

const nonScrolling = ['art', 'about_me'];

const getXChange = (speedX, index) => {
  return speedX * speedXMod[index];
}

const getYChange = (curY, speedY, index) => {
  const yCeil = Math.min(maxY, curY + speedY/(index+1))
  const yFloor = Math.max(minY, yCeil)
  return yFloor;
}

const moveBackground = (event, isScrolling) => {
  if (!isScrolling) return;

  const speedX = -event.movementX/speedXDiv;
  const speedY = 0;

  if (!isFinite(speedX) || Number.isNaN(speedX) ||
      !isFinite(speedY) || Number.isNaN(speedY)) {
    return;
  }

  backgroundPosX = backgroundPosX.map((x, i) => x + getXChange(speedX, i));
  rootElement.style.backgroundPositionX = backgroundPosX.map(x => `${x}%`);

  /*backgroundPosY = backgroundPosY.map((y, i) => getYChange(y, speedY, i));
  root.style.backgroundPositionY = backgroundPosY.map(y => `${y}%`);*/
}

export { nonScrolling, moveBackground }
