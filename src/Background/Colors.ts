interface rgbColor {
  r: number,
  g: number,
  b: number
}

export interface BackgroundPalette {
  background: string;
  first: string;
  second: string;
  object?: string;
  third: string;
  frontClouds: string;
  fourth: string;
  highlight?: string;
  backClouds: string;
};

export default class ColorManager {
  colorPalettes: { [name: string]:BackgroundPalette; } = {}

  constructor() {
    this.colorPalettes['first'] = {
      background:'#b5e2be',
      first:'#2c202f',
      second:'#e24234',
      third: '#ebb44b',
      frontClouds: '#ffffff',
      fourth: '#fdf6b0',
      backClouds: '#ffffff'
    }
    this.addObject(this.colorPalettes.first);
    this.addHighlight(this.colorPalettes.first, 70);

    this.colorPalettes['second'] = {
      background: '#D0CE7C',
      first: '#628395',
      second: '#96897B',
      third: '#DBAD6A',
      frontClouds: '#ffffff',
      fourth: '#CF995F',
      backClouds: '#ffffff'
    };
    this.addObject(this.colorPalettes.second);
    this.addHighlight(this.colorPalettes.second, 100);

    this.colorPalettes['third'] = {
      background: '#E59E8A',
      first: '#9799C2',
      second: '#C5BCD7',
      third: '#F4E6CC',
      frontClouds: '#F8F0E3',
      fourth: '#F1C7A3',
      backClouds: '#F8F0E3'
    };
    this.addObject(this.colorPalettes.third);
    this.addHighlight(this.colorPalettes.third, 70);
  }

  randomColor(): backgroundPalette {
    const colors = Object.keys(this.colorPalettes);
    const colorName = colors[Math.floor(Math.random() * colors.length)];
    return this.colorPalettes[colorName]
  }

  addObject(palette: backgroundPalette) {
    palette.object = palette.second
  }

  addHighlight(palette: BackgroundPalette, magnitude: number) {
    palette.highlight = this.subtractFromHex(palette.fourth, magnitude)
  }

  componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(rgbColor: rgbColor) {
    return '#' + this.componentToHex(rgbColor.r) + this.componentToHex(rgbColor.g) + this.componentToHex(rgbColor.b);
  }

  hexToRgb(hex: string): rgbColor {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) throw new Error('Cannot parse hex to rgb');
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
  }

  subtractFromRgb(rgb: rgbColor, magnitude: number) {
    return { 
      r: Math.min(255, rgb.r + magnitude), 
      g: Math.min(255, rgb.g + magnitude), 
      b: Math.min(255, rgb.b + magnitude) 
    }
  }

  subtractFromHex(hex: string, magnitude: number) {
    return this.rgbToHex(this.subtractFromRgb(this.hexToRgb(hex), magnitude));
  }
}


//export {first, second, rgbToHex, hexToRgb, subtractFromHex, subtractFromRgb}
