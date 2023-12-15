import * as aoc from '../../2020/aoc.js'

/**
 * @param {string[][]} grid
 * @param {number} row
 * @param {number} col
 */
function moveNorth(grid, row, col) {
  while(row > 0 && grid[row-1][col] == ".") {
    grid[row][col] = "."
    grid[row-1][col] = "O"
    row-1
  }
}

aoc.run(function(input) {
  const grid = input.lines().map(line => line.split(""));

  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const element = row[c];
      if (element == "O") {
        moveNorth(grid, r, c)
      }
    }
  }

  var result = 0
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const element = row[c];
      if (element == "O") {
        result += grid.length - r
      }
    }
  }
  
  return result
})
