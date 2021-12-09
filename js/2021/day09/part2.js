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

/**
 *
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} col
 */
function baseInSize(grid, row, col) {
    /** @type Point[] */
    const cells = []

    /** @type Set<string> */
    const markedCells = new Set()

    cells.push({ col, row })

    var size = 0
    while(cells.length > 0) {
        const { row, col } = cells.pop()
        if (markedCells.has(`${row},${col}`)) {
            continue
        }
        markedCells.add(`${row},${col}`)
        size++

        if (row > 0) {
            if (grid[row - 1][col] < 9 && grid[row - 1][col] >= grid[row][col]) {
                cells.push({ row: row - 1, col: col })
            }
        }
        if (col > 0) {
            if (grid[row][col - 1] < 9 && grid[row][col - 1] >= grid[row][col]) {
                cells.push({ row: row, col: col - 1 })
            }
        }
        if (row < grid.length - 1) {
            if (grid[row + 1][col] < 9 && grid[row + 1][col] >= grid[row][col]) {
                cells.push({ row: row + 1, col: col })
            }
        }
        if (col < grid[0].length - 1) {
            if (grid[row][col + 1] < 9 && grid[row][col + 1] >= grid[row][col]) {
                cells.push({ row: row, col: col + 1 })
            }
        }
    }

    return size
}

aoc.run(function(input) {
    const lines = input.lines()

    const grid = lines.map(l => l.split("").map(c => parseInt(c, 10)))

    /** @type number[] */
    var baseInSizes = []

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (isLower(grid, row, col)) {
                baseInSizes.push(baseInSize(grid, row, col))
            }
        }
    }

    baseInSizes.sort((a, b) => a - b)

    const len = baseInSizes.length

    return baseInSizes[len - 1] * baseInSizes[len - 2] * baseInSizes[len - 3]
})

