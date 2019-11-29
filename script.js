const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 600;
const ROW_NUMBERS = 20;
const COL_NUMBERS = 10;
const CANVAS_BG = '#fff';
const PADDING = 2;

class Tetris {
  constructor(
    selector = 'canvas1',
    width = CANVAS_WIDTH,
    height = CANVAS_HEIGHT,
    keyRuls = 'wasd'
  ) {
    this.width = width;
    this.height = height
    this.fieldWidth = this.width / COL_NUMBERS;
    this.fieldHeigth = this.height / ROW_NUMBERS;
    this.canwas = document.querySelector(`#${selector}`);
    this.context = this.canwas.getContext('2d');
    this.canwas.width = this.width;
    this.canwas.height = this.height;
    this.map = this.getMap();
    this.block = this.getBlock(1) // getBlock(Math.floor(Math.random() * 10));
    this.keyRuls = keyRuls;
  };

  start = () => {
    console.log(this.block)
    this.bind();
    requestAnimationFrame(this.tick)
  };

  tick = (timestamp) => {
    this.cleanCanvas();
    this.drawBlock();
    this.drawState();
    requestAnimationFrame(this.tick)

  };


  cleanCanvas = () => {
    this.context.fillStyle = CANVAS_BG;
    this.context.strokeStyle = '#000'
    this.context.rect(0, 0, this.width, this.height)
    this.context.fillRect(0, 0, this.width, this.height)
    this.context.stroke();

  };

  getMap = () => {
    const map = [];
    for (let i = 0; i < ROW_NUMBERS; i++) {
      const row = []
      for (let j = 0; j < COL_NUMBERS; j++) {
        const col = [];
        row.push(null)
      }
      map.push(row)
    }
    return map
  };

  drawState = () => {
    for (let i = 0; i < ROW_NUMBERS; i++) {
      for (let j = 0; j < COL_NUMBERS; j++) {
        let field = this.map[i][j];
        if (field) {
          console.log(1)
          this.drawField(i, j, field)
        }
      }
    }
  };

  drawField = (x, y, color = 'red') => {
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.fillRect(
      x * this.fieldWidth + PADDING,
      y * this.fieldHeigth + PADDING,
      this.fieldWidth - 2 * PADDING,
      this.fieldHeigth - 2 * PADDING
    )
  };

  drawBlock = () => {
    for (const part of this.block.getIncludeParts()) {
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
    block.getIncludeParts = () => {

      switch (block.type) {
        case 1:
          return [
            p(0, 0),
            p(1, 0),
            p(0, 1),
            p(1, 1)
          ]
        case 2:
          console.log(block.type);
          break;
        case 3:
          console.log(block.type);
          break;
        case 4:
          console.log(block.type);
          break;
        case 5:
          console.log(block.type);
          break;
        case 6:
          console.log(block.type);
          break;
        case 7:
          console.log(block.type);
          break;
        case 8:
          console.log(block.type);
          break;
        case 9:
          console.log(block.type);
          break;
        case 10:
          return [
            p(0, 0),
            p(-1, 0),
            p(1, 0),
            p(2, 0)
          ];
        case 11:
          return [
            p(0, 0),
            p(0, -1),
            p(0, 1),
            p(0, 2)
          ];
        default:
          console.log(block.type);
          return [];
      }
    };

    block.getNextBlock = () => {
      const {type, color, x, y,} = block;
      switch (type) {
        case 1:
          return this.getBlock(type, color, x, y,)
      }
    };

    block.getCopy = () => {
      return this.getBlock(block.type, block.color, block.x, block.y,)
    };
    return block
  };

  canBlockExist = (block) => {
    const parts = block.getIncludeParts()
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
    document.body.addEventListener('keydown', (e) => {
      const keyType = this.keyRuls === 'wasd' ? 0 : 1;
      const keyList = [
        ['KeyW', 'KeyA', 'KeyS', 'KeyD'],
        ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
        ['Numpad5', 'Numpad1', 'Numpad2', 'Numpad3'],
      ];

      let blockCopy = this.block.getCopy();
      switch (e.code) {
        case  keyList[keyType][0]:
          blockCopy.y--;
          break;
        case   keyList[keyType][1]:
          blockCopy.x--;
          break;
        case keyList[keyType][2]:
          blockCopy.y++;
          break;
        case keyList[keyType][3]:
          blockCopy.x++;
          break;
      }
      if (this.canBlockExist(blockCopy)) {
        this.block = blockCopy;
      }
    })
  }

}

const tetris = new Tetris();
tetris.start();










