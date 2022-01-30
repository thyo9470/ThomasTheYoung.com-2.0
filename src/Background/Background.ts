import './Background.css';
import {hillsSvgs, BackgroundSvg} from '../Images/hills/HillsSvgs';
import ColorManager, {BackgroundPalette} from './Colors'

const rootElement: HTMLElement | null = document.getElementById("root");

const yMargin = 30;

let isScrolling = true;

export default class BackgroundMovement {
  backgroundPosX: number[];
  readonly speedXDiv: number = 10;
  readonly speedXMod: number[] = [ 1, .3, .3, .1, .1, .05, .05, .02 ];

  backgroundPosY: number[];
  readonly speedYDiv: number = 200;
  readonly speedYMod: number[] = [ 1, .3, .3, .1, .1, .05, .05, .02 ];
  readonly minY: number;
  readonly maxY: number;

  readonly nonScrolling: string[] = ['art', 'about_me'];

  constructor() {
    this.backgroundPosX = this.getBackgroundPosX();
    this.backgroundPosY = this.getBackgroundPosY();

    this.minY = this.backgroundPosY[0] - yMargin;
    this.maxY = this.backgroundPosY[0] + yMargin;

    document.body.addEventListener('mousemove', event => this.move(event));

    const colorManager = new ColorManager();
    this.loadBackground(hillsSvgs, colorManager.randomColor());
  }

  loadBackground(backgroundSvgs: BackgroundSvg, palette: BackgroundPalette) {
    document.body.style.backgroundColor = `${palette.background}`;
    const promises: any = [];
    const formattedHills: string[] = new Array(Object.keys(hillsSvgs).length);

    Object.keys(backgroundSvgs).map((layerName: string, index: number) => {
      const layerSvg: any = backgroundSvgs[layerName];
      const layerColor: string = palette[layerName];
      const layerPromise: Promise<any> = fetch(layerSvg)
        .then((res: string) => res.text())
        .then((text: string) => {
          const formattedSvg: string = text.replace('\n', '').replace(/fill="#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/, `fill="${layerColor}`);
          const backgroundUrl = `url('data:image/svg+xml;base64,${btoa(formattedSvg)}')`;
          formattedHills[index] = backgroundUrl;
        });
        promises.push(layerPromise);
    });

    Promise.all(promises).then((values) => {
      rootElement.style.backgroundImage = formattedHills;
    });
  }

  setIsScrolling(newIsScrolling: boolean) {
    isScrolling = newIsScrolling;
  }

  getBackgroundPosX(): number[] {
    if (rootElement == null) throw new Error('cannot get background x positions');
    const rootStyle: any = window.getComputedStyle(rootElement);
    const rootBackgroundPosition: any = rootStyle.getPropertyValue('background-position-x').replace(/%/g, '').split(', ');
    return rootBackgroundPosition.map((xVal: string, i: number) => parseInt(xVal));
  }

  getBackgroundPosY(): number[] {
    if (rootElement == null) throw new Error('cannot get background y positions');
    const rootStyle = window.getComputedStyle(rootElement);
    const rootBackgroundPosition = rootStyle.getPropertyValue('background-position-y').replace(/%/g, '').split(', ');
    return rootBackgroundPosition.map((yVal: string, i: number) => parseInt(yVal));
  }

  getXChange(speedX: number, index: number): number {
    return speedX * this.speedXMod[index];
  }

  getYChange(speedY: number, index: number): number {
    const curY = this.backgroundPosY[index];
    const yCeil = Math.min(this.maxY, curY + (speedY * this.speedYMod[index]))
    const yFloor = Math.max(this.minY, yCeil)
    return yFloor;
  }

  move(event: any) {
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
