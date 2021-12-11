import * as aoc from '../../2020/aoc.js'

/**
 * @template T
 */
 class Grid {

    array

    /**
     * @param {T[][]} array
     */
    constructor(array) {
        this.array = array
    }

    get({row, col}) {
        return this.array[row][col]
    }

    /**
     *
     * @param {GridCoords} param0
     * @param {T} value
     */
    set({row, col}, value) {
        this.array[row][col] = value
    }

    get rowsCount() {
        return this.array.length
    }

    get colsCount() {
        return this.array[0].length
    }

    *neighbors4({row, col}) {
        if (row > 0) {
            yield { row: row - 1, col }
        }
        if (row < this.rowsCount - 1) {
            yield { row: row + 1, col }
        }
        if (col > 0) {
            yield { row, col: col - 1 }
        }
        if (col < this.colsCount - 1) {
            yield { row, col: col + 1 }
        }
    }

    *neighbors8({row, col}) {
        if (row > 0) {
            yield { row: row - 1, col }

            if (col > 0) {
                yield { row: row - 1, col: col - 1}
            }

            if (col < this.colsCount - 1) {
                yield { row: row - 1, col: col + 1 }
            }
        }
        if (row < this.rowsCount - 1) {
            yield { row: row + 1, col }

            if (col > 0) {
                yield { row: row + 1, col: col - 1}
            }

            if (col < this.colsCount - 1) {
                yield { row: row + 1, col: col + 1 }
            }

        }
        if (col > 0) {
            yield { row, col: col - 1 }
        }
        if (col < this.colsCount - 1) {
            yield { row, col: col + 1 }
        }
    }

    /**
     *
     * @param {GridCoords} coords
     */
    allNeighbors4(coords, predicate) {
        for (const n of this.neighbors4(coords)) {
            if (!predicate({...n, value: this.get(n) })) {
                return false
            }
        }
        return true
    }

    *cells() {
        for (let row = 0; row < this.rowsCount; row++) {
            for (let col = 0; col < this.colsCount; col++) {
                yield { row, col, value: this.get({row, col})}
            }
        }
    }
}

/**
 *
 * @param {Grid} grid
 */
function simulate(grid) {
    /** @type GridCoords[] */
    var flashed = []

    /** @type GridCoords[] */
    const flashCells = []

    /** @type Set<string> */
    const marked = new Set()

    for (const cell of grid.cells()) {
        const value = grid.get(cell) + 1
        grid.set(cell, value)

        if (value > 9) {
            flashCells.push(cell)
        }
    }

    for (let rowIndex = 0; rowIndex < grid.rowsCount; rowIndex++) {
        for (let colIndex = 0; colIndex < grid.colsCount; colIndex++) {
        }
    }

    while(flashCells.length > 0) {
        const cell = flashCells.pop()
        if (marked.has(`${cell.row},${cell.col}`)) {
            continue
        }
        marked.add(`${cell.row},${cell.col}`)

        flashed.push(cell)
        for (const n of grid.neighbors8(cell)) {
            const value = grid.get(n) + 1
            grid.set(n, value)

            if (value > 9) {
                flashCells.push(n)
            }

        }
    }

    for (const cell of flashed) {
        grid.set(cell, 0)
    }

    return flashed.length
}

aoc.run(function(input) {
    const grid = new Grid(input.lines().map(line => line.split("").map(s => parseInt(s, 10))))

    var count = 0
    var steps = 0
    do {
        count = simulate(grid)
        steps++
    } while (count != 100)

    return steps
})

