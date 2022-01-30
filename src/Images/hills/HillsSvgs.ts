import hills1 from './hills1.svg';
import hills2 from './hills2.svg';
import hills3 from './hills3.svg';
import lupin from './lupin.svg';
import cloudsFront from './cloudsFront.svg';
import hills4Top from './hills4Top.svg';
import hills4Bottom from './hills4Bottom.svg';
import cloudsBack from './cloudsBack.svg';

export interface BackgroundSvg {
  first: any,
  second: any,
  object?: any,
  third: any,
  frontClouds: any,
  fourth: any,
  highlight?: any,
  backClouds: any
};

const hillsSvgs = {
  first: hills1,
  second: hills2,
  object: lupin,
  third: hills3,
  frontClouds: cloudsFront,
  fourth: hills4Top,
  highlight: hills4Bottom,
  backClouds: cloudsBack
}

export {hillsSvgs}
