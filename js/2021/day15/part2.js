import * as aoc from '../../2020/aoc.js'
import * as lib from '../../lib.js'
import { MinHeap } from './heap.js'

class BiggerGrid extends lib.Grid {

    constructor(grid) {
        super(grid)
    }

    get rowsCount() {
        return super.rowsCount * 5
    }

    get colsCount() {
        return super.rowsCount * 5
    }

    get(coords) {
        if (coords.row < super.rowsCount && coords.col < super.colsCount) {
            return super.get(coords)
        }

        const row = coords.row % super.rowsCount
        const col = coords.col % super.colsCount

        const value = super.get({row, col})

        const newValue = value + Math.floor(coords.row / super.rowsCount) + Math.floor(coords.col / super.colsCount)
        const newValueFixed = ((newValue - 1) % 9) + 1

        return newValueFixed
    }
}

/**
 *
 * @param {lib.Grid} grid
 * @param {GridCoords} start
 * @param {GridCoords} end
 */
function lowestRisk(grid, start, end) {
    /** @type GridCoords[] */
    const stack = []

    const heap = new MinHeap((left, right) => left.value > right.value)

    heap.insert({ ...start, value: 0})

    /** @type Set<string> */
    const marked = new Set()
    marked.add(`${start.row},${start.col}`)
    while(true) {
        const min = heap.remove()

        if (min.row == end.row && min.col == end.col) {
            return min.value
        }

        for (const n of grid.neighbors4(min)) {
            if (marked.has(`${n.row},${n.col}`)) {
                continue
            }
            heap.insert({ ...n, value: min.value + grid.get(n) })
            marked.add(`${n.row},${n.col}`)
        }
    }
}

aoc.run(function(input) {
    const grid = new BiggerGrid(input.lines().map(line => line.split("").map(s => parseInt(s, 10))))

    return lowestRisk(grid, {row: 0, col: 0}, {row: grid.rowsCount-1, col: grid.colsCount-1})
})

