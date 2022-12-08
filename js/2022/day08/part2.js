import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
  const grid = input.lines().map(line => line.split("").map(c => parseInt(c, 10)))

  var max = 0

  var result = isVisible(grid, 3, 2)

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      var value = isVisible(grid, rowIndex, colIndex)
      if (value > max) {
        max = value
      }
    }
  }

  return max
})

function isVisible(grid, rowIndex, colIndex) {
  if (rowIndex === 0 || colIndex === 0 || rowIndex === grid.length - 1 || colIndex === grid[0].length - 1) {
    return 0
  }

  var result = 1

  // up
  var viewLength = 0
  var currentHeight = grid[rowIndex][colIndex]
  for (let neighbourRow = rowIndex - 1; neighbourRow >= 0; neighbourRow--) {
    viewLength++
    if (grid[neighbourRow][colIndex] >= currentHeight) {
      break
    }
  }
  result *= viewLength

  // down
  var viewLength = 0
  var currentHeight = grid[rowIndex][colIndex]
  for (let neighbourRow = rowIndex + 1; neighbourRow < grid.length; neighbourRow++) {
    viewLength++
    if (grid[neighbourRow][colIndex] >= currentHeight) {
      break
    }
  }
  result *= viewLength

  // left
  var viewLength = 0
  var currentHeight = grid[rowIndex][colIndex]
  for (let neighbourCol = colIndex - 1; neighbourCol >= 0; neighbourCol--) {
    viewLength++
    if (grid[rowIndex][neighbourCol] >= currentHeight) {
      break
    }
  }
  result *= viewLength

  // right
  var viewLength = 0
  var currentHeight = grid[rowIndex][colIndex]
  for (let neighbourCol = colIndex + 1; neighbourCol < grid[0].length; neighbourCol++) {
    viewLength++
    if (grid[rowIndex][neighbourCol] >= currentHeight) {
      break
    }
  }
  result *= viewLength

  return result
}

