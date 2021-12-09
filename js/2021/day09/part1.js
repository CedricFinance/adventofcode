import * as aoc from '../../2020/aoc.js'

/**
 *
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} col
 * @returns
 */
function isLower(grid, row, col) {
    if (row > 0) {
        if (grid[row][col] >= grid[row - 1][col]) { return false }
    }
    if (col > 0) {
        if (grid[row][col] >= grid[row][col - 1]) { return false }
    }
    if (row < grid.length - 1) {
        if (grid[row][col] >= grid[row + 1][col]) { return false }
    }
    if (col < grid[0].length - 1) {
        if (grid[row][col] >= grid[row][col + 1]) { return false }
    }

    return true
}

aoc.run(function(input) {
    const lines = input.lines()

    const grid = lines.map(line => line.split("").map(c => parseInt(c, 10)))

    var result = 0

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (isLower(grid, row, col)) {
                result += grid[row][col] + 1
            }
        }
    }

    return result
})

