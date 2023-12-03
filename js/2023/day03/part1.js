import * as aoc from '../../2020/aoc.js'
import { isDigit, isSymbol } from './lib.js'

aoc.run(function(input) {
  const grid = input.lines().map(line => line.split(""))
  var result = 0

  var acc = 0
  var closeToSymbol = false

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex]

    acc = 0
    closeToSymbol = false

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const element = row[colIndex];

      if (isDigit(element)) {
        acc = acc * 10 + parseInt(element, 10)

        if (!closeToSymbol) {
          if (isSymbol(grid, rowIndex-1, colIndex-1)) { closeToSymbol = true }
          if (isSymbol(grid, rowIndex-1, colIndex  )) { closeToSymbol = true }
          if (isSymbol(grid, rowIndex-1, colIndex+1)) { closeToSymbol = true }
          if (isSymbol(grid, rowIndex  , colIndex-1)) { closeToSymbol = true }
          if (isSymbol(grid, rowIndex  , colIndex+1)) { closeToSymbol = true }
          if (isSymbol(grid, rowIndex+1, colIndex-1)) { closeToSymbol = true }
          if (isSymbol(grid, rowIndex+1, colIndex  )) { closeToSymbol = true }
          if (isSymbol(grid, rowIndex+1, colIndex+1)) { closeToSymbol = true }
        }
      } else {
        if (acc != 0) {
          if (closeToSymbol) { result += acc }
          acc = 0
          closeToSymbol = false
        }
      }

    }

    if (acc != 0) {
      if (closeToSymbol) { result += acc }
      acc = 0
      closeToSymbol = false
    }
  }

  if (acc != 0) {
    if (closeToSymbol) { result += acc }
    acc = 0
    closeToSymbol = false
  }

  return result
})
