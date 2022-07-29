import { RazerDeviceAnimation } from './animation';

const KEY_MAPPING = {
  0: [3, 1],
  1: [3, 2],
  2: [3, 3],
  3: [3, 4],
  4: [3, 6],
  5: [3, 5],
  6: [4, 2],
  7: [4, 3],
  8: [4, 4],
  9: [4, 5],
  10: [1, 0],
  11: [4, 6],
  12: [2, 1],
  13: [2, 2],
  14: [2, 3],
  15: [2, 4],
  16: [2, 6],
  17: [2, 5],
  18: [1, 1],
  19: [1, 2],
  20: [1, 3],
  21: [1, 4],
  22: [1, 6],
  23: [1, 5],
  24: [1, 12],
  25: [1, 9],
  26: [1, 7],
  27: [1, 11],
  28: [1, 8],
  29: [1, 10],
  30: [2, 12],
  31: [2, 9],
  32: [2, 7],
  33: [2, 11],
  34: [2, 8],
  35: [2, 10],
  36: [3, 13],
  37: [3, 9],
  38: [3, 7],
  39: [3, 11],
  40: [3, 8],
  41: [3, 10],
  42: [3, 12],
  43: [4, 9],
  44: [4, 11],
  45: [4, 7],
  46: [4, 8],
  47: [4, 10],
  48: [2, 0],
  49: [5, 6],
  50: [4, 1],
  51: [1, 13],
  53: [0, 0],
  55: [5, 2],
  56: [4, 0],
  59: [5, 0],
  60: [4, 13],
  61: [5, 10],
  62: [5, 13],
  96: [0, 6],
  97: [0, 7],
  98: [0, 8],
  99: [0, 4],
  100: [0, 9],
  101: [0, 10],
  103: [0, 12],
  105: [0, 14],
  107: [0, 15],
  109: [0, 11],
  110: [5, 12],
  111: [0, 13],
  113: [0, 16],
  114: [1, 14],
  115: [1, 15],
  116: [1, 16],
  117: [2, 14],
  118: [0, 5],
  119: [2, 15],
  120: [0, 3],
  121: [2, 16],
  122: [0, 2],
  123: [5, 14],
  124: [5, 16],
  125: [5, 15],
  126: [4, 15]
};

export class RazerAnimationReactiveWaves extends RazerDeviceAnimation {

  constructor(device, featureConfiguration, color, backgroundColor = [0, 0, 0]) {
    super();
    this.effectInterval = null;

    this.device = device;
  
    this.color = color;
    this.backgroundColor = backgroundColor != null ? backgroundColor : [0, 0, 0];

    this.device = device;
    this.ioHook = require('iohook');

    /** @type {[number, number, number][]} */
    this.pressedKeys = [];

    this.ioHook.on('keydown', this.handleKeyDown.bind(this));

    this.nRows = featureConfiguration.rows;
    this.nCols = featureConfiguration.cols;
  }

  handleKeyDown(event) {
    const key = KEY_MAPPING[event.rawcode];
    if (key)
      this.pressedKeys.push([...key, 0]);
  }

  start() {
    const refreshRate = 0.1; // in seconds
    this.ioHook.start();

    // initialization
    let matrix = Array(this.nRows)
      .fill()
      .map(() => Array(this.nCols).fill([0, 0, 0]));
    
    this.effectInterval = setInterval(() => {

      // set color
      for (let i = 0; i < this.nRows; i++) {
        for (let j = 0; j < this.nCols; j++) {

          let color = this.backgroundColor;

          for (const key of this.pressedKeys) {
            const age = key[2];
            const dist = Math.sqrt(Math.abs(key[0] - i) ** 2 + Math.abs(key[1] - j) ** 2);
            const diff = Math.abs(age - dist);
            if (diff > 1) continue;
            
            color = this.color;
            break;
          }

          matrix[i][j] = color;
        }
      }
      
      // set reactive waves effect
      for (let i = 0; i < this.nRows; i++) {
        let row = [i, 0, this.nCols - 1, ...matrix[i].flat()];
        this.device.setCustomFrame(new Uint8Array(row))
      }
      this.device.setModeCustom();

      // increase key's age
      for (let i in this.pressedKeys) {
        this.pressedKeys[i][2]++;
        if (this.pressedKeys[i][2] > this.nRows + this.nCols) this.pressedKeys.splice(i, 1);
      }

    }, refreshRate * 1000);
  }

  stop() {
    clearInterval(this.effectInterval);
    this.ioHook.stop();
  }

  destroy() {
    this.stop();
  }
}