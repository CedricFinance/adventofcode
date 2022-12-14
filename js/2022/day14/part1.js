import * as aoc from '../../2020/aoc.js'


/**
 *
 * @param {Iterable<number>} arr
 * @returns [number, number]
 */
 function minMax(arr) {
  var min= Number.MAX_VALUE
  var max= Number.MIN_VALUE

  for (const c of arr) {
      if (c > max) { max = c }
      if (c < min) { min = c }
  }

  return [min, max]
}

 /**
 * @typedef {Object} Cell
 * @property {number} row
 * @property {number} col
 */

/**
 * @template T
 * @callback DefaultValueCallback
 * @param {Cell} cell
 * @returns {T}
 */

/**
 * @template T
 */
class SparseGrid {
  /**
   * @type {Map<number,Map<number,T>>}
   */
  content = new Map()

  /**
   * @type {DefaultValueCallback<T>}
   */
  defaultValueCallback

  /**
   *
   * @param {DefaultValueCallback<T>} defaultValueCallback
   */
  constructor(defaultValueCallback) {
    this.defaultValueCallback = defaultValueCallback
  }

  /**
   * @param {Cell} cell
   * @returns {T}
   */
  get(cell) {
    const itemRow = this.content.get(cell.row)

    if (itemRow === undefined) {
      return this.defaultValueCallback(cell)
    }

    const item = itemRow.get(cell.col)

    if (item === undefined) {
      return this.defaultValueCallback(cell)
    }

    return item
  }

  /**
   * @param {Cell} cell
   * @param {T} value
   */
  set(cell, value) {
    var itemRow = this.content.get(cell.row)

    if (itemRow === undefined) {
      itemRow = new Map()
      this.content.set(cell.row, itemRow)
    }

    itemRow.set(cell.col, value)
  }

  /**
   * @param {Cell} cell
   */
  remove(cell) {
    var itemRow = this.content.get(cell.row)

    if (itemRow === undefined) {
      return
    }

    itemRow.delete(cell.col)
  }

  range() {
    const [minRow, maxRow] = minMax(this.content.keys())
    const rowsMinMaxs = [...this.content.values()].map(row => minMax(row.keys()))
    const minCol = Math.min(...rowsMinMaxs.map(([min, max]) => min))
    const maxCol = Math.max(...rowsMinMaxs.map(([min, max]) => max))

    return { minRow, minCol, maxRow, maxCol }
  }

  getRange(range) {
    const result = []
    for (let row = range.minRow; row <= range.maxRow; row++) {
      const rowItems = []
      result.push(rowItems)
      for (let col = range.minCol; col <= range.maxCol; col++) {
        rowItems.push(this.get({ row, col }))
      }
    }
    return result
  }
}

function display(grid, range) {
  for (const line of grid.getRange(range)) {
    console.log(line.join(""))
  }
  console.log()
}

/**
 * @param {string} str
 * @returns {Cell}
 */
function parseCell(str) {
  const [col, row] = str.split(",").map(s => parseInt(s, 10))
  return { row, col }
}

aoc.run(function(input) {
  const lines = input.lines().map(line => line.split(" -> ").map(parseCell))

  var grid = new SparseGrid(() => '.')

  for (const line of lines) {
    const currentPoint = {...line[0]}
    grid.set(currentPoint, "#")
    for (let i = 1; i < line.length; i++) {
      const destinationPoint = line[i];

      while(currentPoint.row != destinationPoint.row || currentPoint.col != destinationPoint.col) {
        currentPoint.row += Math.sign(destinationPoint.row - currentPoint.row)
        currentPoint.col += Math.sign(destinationPoint.col - currentPoint.col)
        grid.set(currentPoint, "#")
      }

    }
  }

  var { minCol, maxCol, minRow, maxRow } = grid.range()
  console.log(`min: (${minCol}, ${minRow}) max: (${maxCol}, ${maxRow})`);

  const displayRange = {
    minRow: 0,
    minCol: minCol - 1,
    maxRow,
    maxCol: maxCol + 1,
  }

  display(grid, displayRange)
  var count = 0

  const sandStartRow = 0;
  const sandStartCol = 500;

  while(true) {
    var sand = { row: sandStartRow, col: sandStartCol }

    while(true) {
      grid.set(sand, "o")
      //display(grid, displayRange)

      if (sand.row >= maxRow) {
        display(grid, displayRange)
        return count
      }

      const previousPosition = {...sand}
      if (grid.get({ row: sand.row+1, col: sand.col }) == ".") {
        sand.row++
      } else if (grid.get({ row: sand.row+1, col: sand.col-1 }) == ".") {
        sand.row++
        sand.col--
      } else if (grid.get({ row: sand.row+1, col: sand.col+1 }) == ".") {
        sand.row++
        sand.col++
      } else {
        break
      }

      grid.remove(previousPosition)
    }

    count++
  }
})
