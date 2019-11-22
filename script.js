const CANVAS_WIDTH = 300
const CANVAS_HEIGHT = 600
const ROW_NUMBERS = 20;
const COL_NUMBERS = 10
const CANVAS_BG = '#000'
const PADDING = 2

let map = getMap();
const fieldWidth = CANVAS_WIDTH / COL_NUMBERS
const fieldHeigth = CANVAS_HEIGHT / ROW_NUMBERS

const canwas1 = document.querySelector('#canvas1')
const context = canwas1.getContext('2d');

canwas1.width = CANVAS_WIDTH
canwas1.height = CANVAS_HEIGHT
const start = () => {
  requestAnimationFrame(tick)
}
const tick = (timestamp) => {
  cleanCanvas();
  drawState();
  requestAnimationFrame(tick)

}


const cleanCanvas = () => {
  context.fillStyle = CANVAS_BG;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

}

function getMap() {
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
}

const draftState = () => {
  for (let i = 0; i < ROW_NUMBERS; i++) {
    for (let j = 0; j < COL_NUMBERS; j++) {
      let field = map[i][j];
      if (field) {
        drawField(i, j, field = 'red')
      }
    }
  }
}
const drawField = (x, y, color) => {
  context.beginPath()
  context.fillStyle = color
  context.fillRect(
    x * fieldWidth + PADDING,
    y * fieldHeigth + PADDING,
    fieldWidth - 2 * PADDING,
    fieldHeigth - 2 * PADDING
  )
}

const drawBlock = ()=>{
  const = block.getIncludeParts()
}


const getBlock = (type, color, x, y,) => {
  const block = {
    type,
    x,
    y,
    color
  }

  block.getIncludeParts = () => {
    switch (block.type) {
      case 1:
        return [
          {x: block.x, y: block.y},
          {x: block.x + 1, y: block.y},
          {x: block.x, y: block.y + 1},
          {x: block.x + 1, y: block.y + 1}
        ];
        break;
      default:
        return [];
    }
  }

  block.getNextBlock = () => {
    const {type, x, y, color} = block
    switch (type) {
      case 1:
        return getBlock(type, x, y, color)
    }
  }
  block.getCopy = () => {
    return getBlock(block.type, block.x, block.y, block.color)
  }
  return block
};

