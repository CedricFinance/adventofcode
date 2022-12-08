import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
  const grid = input.lines().map(line => line.split("").map(c => parseInt(c, 10)))

  var result = 0

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (isVisible(grid, rowIndex, colIndex)) {
        result++
      }
    }
  }

  return result
})

/**
 * @param {number[][]} grid
 * @param {number} rowIndex
 * @param {number} colIndex
 */
function isVisible(grid, rowIndex, colIndex) {
  if (rowIndex === 0 || colIndex === 0 || rowIndex === grid.length - 1 || colIndex === grid[0].length - 1) {
    return true
  }

  var visibleFromDirections = 4
  const currentHeight = grid[rowIndex][colIndex]
  // up
  for (let neighbourRow = rowIndex - 1; neighbourRow >= 0; neighbourRow--) {
    if (grid[neighbourRow][colIndex] >= currentHeight) {
      visibleFromDirections--
      break
    }
  }

  // down
  for (let neighbourRow = rowIndex + 1; neighbourRow < grid.length; neighbourRow++) {
    if (grid[neighbourRow][colIndex] >= currentHeight) {
      visibleFromDirections--
      break
    }
  }

  // left
  for (let neighbourCol = colIndex - 1; neighbourCol >= 0; neighbourCol--) {
    if (grid[rowIndex][neighbourCol] >= currentHeight) {
      visibleFromDirections--
      break
    }
  }

  // right
  for (let neighbourCol = colIndex + 1; neighbourCol < grid[0].length; neighbourCol++) {
    if (grid[rowIndex][neighbourCol] >= currentHeight) {
      visibleFromDirections--
      break
    }
  }

  return visibleFromDirections > 0
}

