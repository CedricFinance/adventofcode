import * as aoc from '../../2020/aoc.js'
import * as lib from '../../lib.js'
import { MinHeap } from './heap.js'

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
    const grid = new lib.Grid(input.lines().map(line => line.split("").map(s => parseInt(s, 10))))

    return lowestRisk(grid, {row: 0, col: 0}, {row: grid.rowsCount-1, col: grid.colsCount-1})
})

