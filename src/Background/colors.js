
/*
 * 0. background
 * 1. hills1
 * 2. hills2
 * 3. lupin
 * 4. hill3
 * 5. front clouds
 * 6. hills4 
 * 7. hills4 highlight
 * 8. back clouds
 */
//            ['bg', 'hills1', 'hills2', 'lupin', 'hills3', 'fClouds', 'hills4', 'hl', 'bclouds']

const first = ['#b5e2be', '#2c202f', '#e24234', '#ebb44b', '#ffffff', '#fdf6b0', '#ffffff']
const second = ['#D0CE7C', '#628395', '#96897B', '#DBAD6A', '#ffffff', '#CF995F', '#ffffff']

const lupinLayer = 3;
let highlightLayer = 7;

const colorList = [first, second]

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgbColor) {
  return '#' + componentToHex(rgbColor.r) + componentToHex(rgbColor.g) + componentToHex(rgbColor.b);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function subtractFromRgb(rgb, subAmount) {
  return { 
    r: Math.min(255, rgb.r + subAmount), 
    g: Math.min(255, rgb.g + subAmount), 
    b: Math.min(255, rgb.b + subAmount) 
  }
}

function subtractFromHex(hex, subRgb) {
  return rgbToHex(subtractFromRgb(hexToRgb(hex), subRgb));
}

colorList.map(colors => {
  colors.splice(lupinLayer, 0, colors[lupinLayer-1]);
  colors.splice(highlightLayer, 0, subtractFromHex(colors[highlightLayer-1], 70));
  return colors;
});

export {first, second, rgbToHex, hexToRgb, subtractFromHex, subtractFromRgb}
