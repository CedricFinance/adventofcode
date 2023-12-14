import * as aoc from '../../2020/aoc.js'

function isRowReflection(grid, rowIndex, col) {
  var left = col - 1
  var right = col
  var diffs = 0
  while(left >= 0 && right <= grid[0].length - 1) {
    if (grid[rowIndex][left] != grid[rowIndex][right]) {
      diffs++
    }
    left--
    right++
  }

  return diffs
}

function isColReflection(grid, colIndex, row) {
  var up = row - 1
  var down = row
  var diffs = 0
  while(up >= 0 && down <= grid.length - 1) {
    if (grid[up][colIndex] != grid[down][colIndex]) {
      diffs++
    }
    up--
    down++
  }

  return diffs
}

/**
 * @param {string[][]} grid
 */
function findReflection(grid) {
  var row, col

  for (let c = 1; c < grid[0].length; c++) {
    col = c
    var smudgeFound = false
    for (let r = 0; r < grid.length; r++) {
      const diffs = isRowReflection(grid, r, c)
      if ((smudgeFound && diffs == 1) || (diffs > 1)) {
        col = undefined
        break
      }
      if (diffs == 1) {
        smudgeFound = true
      }
    }
    if (col && smudgeFound) {
      return { col }
    }
  }

  for (let r = 1; r < grid.length; r++) {
    row = r
    var smudgeFound = false
    for (let c = 0; c < grid[0].length; c++) {
      const diffs = isColReflection(grid, c, r)
      if ((smudgeFound && diffs == 1) || (diffs > 1)) {
        row = undefined
        break
      }
      if (diffs == 1) {
        smudgeFound = true
      }
    }
    if (row && smudgeFound) {
      return { row }
    }
  }
}

aoc.run(function(input) {
  const blocks = input.blocks().map(block => block.split("\n").map(line => line.split("")));

  var rows = 0
  var cols = 0
  var index = 0
  for (const block of blocks) {
    const res = findReflection(block)
    if (res.row) {
      rows += res.row
    } else if (res.col) {
      cols += res.col
    }

    index++
  }

  return 100 * rows + cols
})
