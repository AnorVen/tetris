const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 600;
const ROW_NUMBERS = 20;
const COL_NUMBERS = 10;
const CANVAS_BG = '#e2e2e2';
const PADDING = 2;
const DOWN_TIME = 1000;
const START_BLOCK_NUMBERS = [1, 3, 6, 7, 10, 13, 19]
const COLORS = ['black', 'blue', 'green', 'yellow', 'red', 'pink', 'gray']

class Tetris {
  constructor(
    selector = 'canvas1',
    keyRuls = 'wasd',
    width = CANVAS_WIDTH,
    height = CANVAS_HEIGHT,
  ) {
    this.width = width;
    this.height = height;
    this.fieldWidth = this.width / COL_NUMBERS;
    this.fieldHeigth = this.height / ROW_NUMBERS;
    this.canwas = document.querySelector(`#${selector}`);
    this.context = this.canwas.getContext('2d');
    this.canwas.width = this.width;
    this.canwas.height = this.height;
    this.map = this.getMap();

    this.keyRuls = keyRuls;
    this.scope = 0;
    this.level = 1;
    this.tetrisScope = 0;
    this.downTime = this.getDownTime();
    this.blockType = () => this.getRandomFrom(START_BLOCK_NUMBERS);
    this.blockColor = () => this.getRandomFrom(COLORS);
    this.block = this.getBlock(this.blockType(), this.blockColor());
    this.selector = `#status${this.keyRuls === 'wasd' ? 1 : 2}`;
    this.element = document.querySelector(this.selector);
    this.scopeElem = this.element.querySelector('[data-role="scope"]')
    this.levelElem = this.element.querySelector('[data-role="level"]')
    this.tetrisScopeElem = this.element.querySelector('[data-role="tetris"]')
  };


  getRandomFrom = (arr = START_BLOCK_NUMBERS) => {
    return arr[Math.floor(Math.random() * (arr.length - 1))]
  };

  start = () => {
    this.bind();
    requestAnimationFrame(this.tick)
  };

  tick = (timestamp) => {
    if (timestamp >= this.downTime) {
      const blockCopy = this.block.getCopy();
      blockCopy.y = blockCopy.y + 1;
      if (this.canBlockExists(blockCopy)) {
        this.block = blockCopy
      } else {
        this.saveBlock();
        const lines = this.clearLines();
        this.setScore(lines);
        this.block = this.getBlock(
          this.blockType(),
          this.blockColor()
        )
        if (!this.canBlockExists(this.block)) {
          this.element.insertAdjacentHTML('beforeend', `<p>конец игры. всего очков ${this.scope * 100}</p>`);
          return
        }
      }
      this.downTime = timestamp + this.getDownTime()
    }
    this.cleanCanvas();
    this.drawBlock();
    this.drawState();
    requestAnimationFrame(this.tick)

  };

  getDownTime = () => {
    return (100 + DOWN_TIME / this.level)
  };


  saveBlock = () => {
    const parts = this.block.getIncludedParts();
    for (const part of parts) {
      const {x, y} = part;
      this.setField(x, y, this.block.color)
    }
  }

  setScore = (lines) => {
    this.scope += lines;
    this.level = 1 + parseInt(this.scope / 3);
    if (lines >= 4) {
      this.tetrisScope++;
      this.scope += 3
    }

    this.scopeElem.textContent = this.scope * 100;
    this.levelElem.textContent = this.level;
    this.tetrisScopeElem.textContent = this.tetrisScope;
  }

  setField = (x, y, value) => {
    if (this.map[y] === undefined || this.map[y][x] === undefined) {
      return
    }
    return this.map[y][x] = value
  }

  clearLines = () => {
    let lines = 0;
    for (let y = ROW_NUMBERS - 1; y >= 0; y--) {
      let flag = true;
      for (let x = 0; x < COL_NUMBERS; x++) {
        if (!this.getField(x, y)) {
          flag = false;
          break;
        }
      }
      if (flag) {
        lines++;
        for (let t = y; t >= 1; t--) {
          for (let x = 0; x < COL_NUMBERS; x++) {
            this.map[t][x] = this.map[t - 1][x];
            this.map[t - 1][x] = null
          }
        }
        y++
      }
    }
    return lines
  }


  cleanCanvas = () => {
    this.context.fillStyle = CANVAS_BG;
    this.context.strokeStyle = 'black';
    this.context.rect(0, 0, this.width, this.height)
    // this.context.fillRect(0, 0, this.width, this.height)
    this.context.fill();
    this.context.stroke();

  };

  getMap = () => {
    const map = [];
    for (let y = 0; y < ROW_NUMBERS; y++) {
      const row = []
      for (let x = 0; x < COL_NUMBERS; x++) {
        row.push(null)
      }
      map.push(row)
    }
    return map
  };

  drawState = () => {
    for (let y = 0; y < ROW_NUMBERS; y++) {
      for (let x = 0; x < COL_NUMBERS; x++) {
        const field = this.map[y][x];
        if (field) {
          this.drawField(x, y, field)
        }
      }
    }
  };

  drawField = (x, y, color = 'red') => {
    // this.context.beginPath();
    this.context.fillStyle = color;
    this.context.fillRect(
      x * this.fieldWidth + PADDING,
      y * this.fieldHeigth + PADDING,
      this.fieldWidth - 2 * PADDING,
      this.fieldHeigth - 2 * PADDING
    )
  };

  drawBlock = () => {
    for (const part of this.block.getIncludedParts()) {
      this.drawField(part.x, part.y, this.block.color);
    }
  };


  getBlock = (type, color = 'red', x = Math.round(COL_NUMBERS / 2 - 1), y = 0,) => {
    const block = {
      type,
      color,
      x,
      y,
    };

    const p = (dx, dy) => ({x: block.x + dx, y: block.y + dy})
    block.getIncludedParts = () => {
      switch (block.type) {
        case 1:
          return [p(0, 0), p(1, 0), p(0, 1), p(1, 1)]
        case 2:
          return [p(0, 0), p(-1, 0), p(1, 0), p(0, -1)]
        case 3:
          return [p(0, 0), p(-1, 0), p(1, 0), p(0, 1)]
        case 4:
          return [p(0, 0), p(0, 1), p(0, -1), p(1, 0)]
        case 5:
          return [p(0, 0), p(-1, 0), p(0, 1), p(0, -1)]
        case 6:
          return [p(0, 0), p(1, 0), p(0, 1), p(-1, 1)]
        case 7:
          return [p(0, 0), p(0, 1), p(1, 1), p(-1, 0)]
        case 8:
          return [p(0, 0), p(-1, 0), p(-1, -1), p(0, 1)]
        case 9:
          return [p(0, 0), p(0, -1), p(-1, 0), p(-1, 1)]
        case 10:
          return [p(0, 0), p(1, 0), p(2, 0), p(-1, 0)]
        case 11:
          return [p(0, 0), p(0, -1), p(0, 1), p(0, 2)]
        case 12:
          return [p(0, 0), p(1, 0), p(0, 1), p(0, 2)]
        case 13:
          return [p(0, 0), p(-1, 0), p(-2, 0), p(0, 1)]
        case 14:
          return [p(0, 0), p(-1, 0), p(0, -1), p(0, -2)]
        case 15:
          return [p(0, 0), p(0, -1), p(1, 0), p(2, 0)]
        case 16:
          return [p(0, 0), p(-1, 0), p(0, 1), p(0, 2)]
        case 17:
          return [p(0, 0), p(-1, 0), p(-2, 0), p(0, -1)]
        case 18:
          return [p(0, 0), p(1, 0), p(0, -1), p(0, -2)]
        case 19:
          return [p(0, 0), p(1, 0), p(2, 0), p(0, 1)]
        default:
          console.log(block.type);
          return [];
      }
    };

    block.getNextBlock = () => {
      const {type, color, x, y,} = block;
      const p = n => this.getBlock(n, color, x, y)
      switch (type) {
        case 1:
          return p(1)
        case 2:
          return p(4)
        case 3:
          return p(5)
        case 4:
          return p(3)
        case 5:
          return p(2)
        case 6:
          return p(8)
        case 7:
          return p(9)
        case 8:
          return p(6)
        case 9:
          return p(7)
        case 10:
          return p(11)
        case 11:
          return p(10)
        case 12:
          return p(13)
        case 13:
          return p(14)
        case 14:
          return p(15)
        case 15:
          return p(12)
        case 16:
          return p(17)
        case 17:
          return p(18)
        case 18:
          return p(19)
        case 19:
          return p(16)
      }
    };

    block.getCopy = () => {
      return this.getBlock(block.type, block.color, block.x, block.y,)
    };
    return block
  };


  canBlockExists = (block) => {
    const parts = block.getIncludedParts()
    for (const part of parts) {
      if (this.getField(part.x, part.y)) {
        return false
      }
    }
    return true
  };

  getField = (x, y) => {
    if (this.map[y] === undefined || this.map[y][x] === undefined) {
      return 'black'
    }
    return this.map[y][x]
  };

  bind = () => {
    const keyType = this.keyRuls === 'wasd' ? 0 : 1;
    const keyList = [
      ['KeyW', 'KeyA', 'KeyS', 'KeyD'],
      ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
      //  ['Numpad5', 'Numpad1', 'Numpad2', 'Numpad3'],
    ];
    this.listener(keyList[keyType][0], this.rotateBlock);
    this.listener(keyList[keyType][1], this.moveBlockLeft);
    this.listener(keyList[keyType][2], this.moveBlockDown);
    this.listener(keyList[keyType][3], this.moveBlockRight);
  };

  listener = (code, handler) => {
    document.body.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.code === code) {
        handler()
      }
    })
  };

  // Свдиг блока влево
  moveBlockLeft = () => {
    const blockCopy = this.block.getCopy();
    blockCopy.x = blockCopy.x - 1;
    if (this.canBlockExists(blockCopy)) {
      this.block = blockCopy
    }
  };

  // Свдиг блока вправо
  moveBlockRight = () => {
    const blockCopy = this.block.getCopy();
    blockCopy.x = blockCopy.x + 1;
    if (this.canBlockExists(blockCopy)) {
      this.block = blockCopy
    }
  };

  // Поворот блока
  rotateBlock = () => {
    const blockCopy = this.block.getNextBlock();
    if (this.canBlockExists(blockCopy)) {
      this.block = blockCopy
    }
  };

  // Свдиг блока вниз
  moveBlockDown = () => {
    const blockCopy = this.block.getCopy();
    blockCopy.y = blockCopy.y + 1;
    if (this.canBlockExists(blockCopy)) {
      this.block = blockCopy
    }
  }
}
export default Tetris;

/// TODO сделать предпоказ фигур,
// реализовать какую-нибудь комбобобму по 10 очков за точку.. подумать

//Защищённый - LcGzh32Hr7jGelqxiGfS
//Сервисный - f0a5093cf0a5093cf0a5093c4af0c395fdff0a5f0a5093cab6d8aee351e1d98f3806678





