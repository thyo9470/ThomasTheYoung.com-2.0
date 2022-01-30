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

  readonly colorManager: ColorManager = new ColorManager();

  constructor() {
    this.backgroundPosX = this.getBackgroundPosX();
    this.backgroundPosY = this.getBackgroundPosY();

    this.minY = this.backgroundPosY[0] - yMargin;
    this.maxY = this.backgroundPosY[0] + yMargin;

    document.body.addEventListener('mousemove', event => this.move(event));

    this.loadBackground(hillsSvgs, this.colorManager.getRandomColor());
  }

  loadBackground(backgroundSvgs: BackgroundSvg, palette: string[]) {
    const promises: any = [];
    const formattedHills: string[] = new Array(Object.keys(hillsSvgs).length);

    Object.entries(backgroundSvgs).map(([layerName, layerSvg]: [string, any], index: number) => {
      const layerColor: string = palette[index+1];
      console.log('test ', layerColor, index)
      const layerPromise: Promise<any> = fetch(layerSvg)
        .then((res: any) => res.text())
        .then((text: string) => {
          const formattedSvg: string = text.replace('\n', '').replace(/fill="#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/, `fill="${layerColor}`);
          const backgroundUrl = `url('data:image/svg+xml;base64,${btoa(formattedSvg)}')`;
          formattedHills[index] = backgroundUrl;
        });
        promises.push(layerPromise);
    });

    Promise.all(promises).then((values) => {
      if (rootElement == null) throw new Error('RootElement missing - Cannot set background images');
      document.body.style.backgroundColor = `${palette[0]}`;
      rootElement.style.backgroundImage = formattedHills.join(', ');
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
    if (rootElement == null) throw new Error('RootElement missing - Cannot move background images');
    if (!isScrolling) return;
    const speedX = -event.movementX/this.speedXDiv;
    const speedY = -event.movementY/this.speedYDiv;

    if (!isFinite(speedX) || Number.isNaN(speedX) ||
        !isFinite(speedY) || Number.isNaN(speedY)) {
      return;
    }

    this.backgroundPosX = this.backgroundPosX.map((x, i) => x + this.getXChange(speedX, i));
    rootElement.style.backgroundPositionX = this.backgroundPosX.map(x => `${x}%`).join(', ');

    this.backgroundPosY = this.backgroundPosY.map((y, i) => this.getYChange(speedY, i));
    rootElement.style.backgroundPositionY = this.backgroundPosY.map(y => `${y}%`).join(', ');
  }
}

export {isScrolling}
