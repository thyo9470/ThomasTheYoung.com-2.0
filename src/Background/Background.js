import './Background.css';
import * as colors from './colors.js';
import hillsSvgs, {hills4HighlightIndex} from '../Images/hills/HillsSvgs.js';

const rootElement = document.getElementById("root");

const nonScrolling = ['art', 'about_me'];

let isScrolling = true;

export default class BackgroundMovement {
  constructor() {
    this.backgroundPosX = this.getBackgroundPosX();
    this.speedXDiv = 10;
    this.speedXMod = [ 1, .3, .3, .1, .1, .05, .05, .02 ];
    this.backgroundPosY = this.getBackgroundPosY();
    this.speedYDiv = 200;
    this.speedYMod = [ 1, .3, .3, .1, .1, .05, .05, .02 ];
    this.minY = 40;
    this.maxY = 60;
    this.nonScrolling = ['art', 'about_me'];

    document.body.addEventListener('mousemove', event => this.move(event));

    this.loadHills(colors.second);
  }

  loadHills(colors) {
    document.body.style.backgroundColor = `${colors[0]}`;
    const promises = [];
    const formattedHills = new Array(hillsSvgs.length);
    hillsSvgs.map((hills, index) => {
    const hillPromise = fetch(hills)
      .then(r => r.text())
      .then(text => {
        const formattedSvg = text.replace('\n', '').replace(/fill="#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/, `fill="${colors[index+1]}`);
        const backgroundUrl = `url('data:image/svg+xml;base64,${btoa(formattedSvg)}')`;
        formattedHills[index] = backgroundUrl;
      })
      .catch(error => {
        formattedHills[index] = null;
      });
      promises.push(hillPromise); 
    });
    Promise.all(promises).then((values) => {
      if (formattedHills.includes(null)) return;
      rootElement.style.backgroundImage = formattedHills;
    });
  }

  setIsScrolling(newIsScrolling) {
    isScrolling = newIsScrolling;
  }

  getBackgroundPosX() {
    const rootStyle = window.getComputedStyle(rootElement);
    const rootBackgroundPosition = rootStyle.getPropertyValue('background-position-x').replace(/%/g, '').split(', ');
    return rootBackgroundPosition.map((xVal, i) => parseInt(xVal));
  }

  getBackgroundPosY() {
    const rootStyle = window.getComputedStyle(rootElement);
    const rootBackgroundPosition = rootStyle.getPropertyValue('background-position-y').replace(/%/g, '').split(', ');
    return rootBackgroundPosition.map((xVal, i) => parseInt(xVal));
  }

  getXChange(speedX, index) {
    return speedX * this.speedXMod[index];
  }

  getYChange(speedY, index) {
    const curY = this.backgroundPosY[index];
    const yCeil = Math.min(this.maxY, curY + (speedY * this.speedYMod[index]))
    const yFloor = Math.max(this.minY, yCeil)
    return yFloor;
  }

  move(event) {
    if (!isScrolling) return;
    const speedX = -event.movementX/this.speedXDiv;
    const speedY = -event.movementY/this.speedYDiv;

    if (!isFinite(speedX) || Number.isNaN(speedX) ||
        !isFinite(speedY) || Number.isNaN(speedY)) {
      return;
    }

    this.backgroundPosX = this.backgroundPosX.map((x, i) => x + this.getXChange(speedX, i));
    rootElement.style.backgroundPositionX = this.backgroundPosX.map(x => `${x}%`);

    this.backgroundPosY = this.backgroundPosY.map((y, i) => this.getYChange(speedY, i));
    rootElement.style.backgroundPositionY = this.backgroundPosY.map(y => `${y}%`);
  }

}

export {isScrolling}
