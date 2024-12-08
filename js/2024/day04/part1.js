import * as aoc from '../../2020/aoc.js'
import { Grid } from '../../lib.js'

/**
 *
 * @param {Grid} grid
 * @param {{row: Number, col: Number}} pos
 * @param {Number} deltaRow
 * @param {Number} deltaCol
 */
function findLetters(grid, pos, letters, deltaRow, deltaCol) {
  var currentPos = pos
  var currentIndex = 0
  while (currentIndex < letters.length && grid.get(currentPos) == letters[currentIndex]) {
    currentIndex++
    currentPos = { row: currentPos.row + deltaRow, col: currentPos.col + deltaCol }
  }

  return currentIndex == letters.length
}


aoc.run(async function(input) {
  const grid = new Grid(input.lines().map(line => line.split("")))
  var result = 0

  for (let row = 0; row < grid.rowsCount; row++) {
    for (let col = 0; col < grid.colsCount; col++) {
      const letter = grid.get({ row, col })
      if (letter == "X") {
        for (const pos of grid.neighbors8({ row, col })) {
          if (findLetters(grid, pos, "MAS", pos.row - row, pos.col - col)) {
            result++
          }
        }
      }
    }
  }

  return result
})
// 49076