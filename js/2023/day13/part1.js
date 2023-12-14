import * as aoc from '../../2020/aoc.js'

function isRowReflection(grid, rowIndex, col) {
  var left = col - 1
  var right = col
  while(left >= 0 && right <= grid[0].length - 1) {
    if (grid[rowIndex][left] != grid[rowIndex][right]) {
      return false
    }
    left--
    right++
  }

  return true
}

/**
 * @param {string[][]} grid
 * @param {number} col
 */
function isRowsReflection(grid, col) {
  for (let r = 0; r < grid.length; r++) {
    if (!isRowReflection(grid, r, col)) {
      return false
    }
  }

  return true
}

function isColReflection(grid, colIndex, row) {
  var up = row - 1
  var down = row
  while(up >= 0 && down <= grid.length - 1) {
    if (grid[up][colIndex] != grid[down][colIndex]) {
      return false
    }
    up--
    down++
  }

  return true
}

/**
 * @param {string[][]} grid
 * @param {number} row
 */
function isColsReflection(grid, row) {
  for (let c = 0; c < grid[0].length; c++) {
    if (!isColReflection(grid, c, row)) {
      return false
    }
  }

  return true
}

/**
 * @param {string[][]} grid
 * @returns {number?}
 */
function findRowReflection(grid) {
  var col = null

  for (let c = 1; c < grid[0].length; c++) {
    if (isRowsReflection(grid, c)) {
      return c
    }
  }

  return col
}

/**
 * @param {string[][]} grid
 * @returns {number?}
 */
function findColReflection(grid) {
  for (let r = 1; r < grid.length; r++) {
    if (isColsReflection(grid, r)) {
      return r
    }
  }

  return null
}

aoc.run(function(input) {
  const blocks = input.blocks().map(block => block.split("\n").map(line => line.split("")));

  var rows = 0
  var cols = 0
  for (const block of blocks) {
    const column = findRowReflection(block)
    if (column) {
      cols += column
      continue
    }

    const row = findColReflection(block)
    if (row) {
      rows += row
      continue
    }
  }

  return 100 * rows + cols
})
