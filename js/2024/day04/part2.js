import * as aoc from '../../2020/aoc.js'
import { Grid } from '../../lib.js'

/**
 *
 * @param {Grid} grid
 * @param {*} row
 * @param {*} col
 * @param {*} deltaRow
 * @param {*} deltaCol
 */
function foundMAS(grid, row, col, deltaRow, deltaCol) {
  const firstCell = { row: row + deltaRow, col: col + deltaCol }
  const firstLetter = grid.get(firstCell)

  const secondCell = { row: row - deltaRow, col: col - deltaCol }
  const secondLetter = grid.get(secondCell)

  return (firstLetter == "M" && secondLetter == "S") || (firstLetter == "S" && secondLetter == "M")
}

aoc.run(async function(input) {
  const grid = new Grid(input.lines().map(line => line.split("")))
  var result = 0

  for (let row = 0; row < grid.rowsCount; row++) {
    for (let col = 0; col < grid.colsCount; col++) {
      const letter = grid.get({ row, col })
      if (letter == "A") {
        if (foundMAS(grid, row, col, 1, 1) && foundMAS(grid, row, col, 1, -1)) {
          result++
        }
      }
    }
  }

  return result
})
// 49076