import * as aoc from '../../2020/aoc.js'
import { MinHeap } from '../../2021/day15/heap.js'
import * as lib from '../../lib.js'

aoc.run(function(input) {
  var start, end
  const elevations = input.lines().map((line, rowIndex) => line.split("").map(function(c, colIndex) {
    var current = c
    if (current === 'S') {
      start = { row: rowIndex, col: colIndex }
      current = 'a'
    } else if (current == 'E') {
      end = { row: rowIndex, col: colIndex }
      current = 'z'
    }
    return current.charCodeAt(0) - 'a'.charCodeAt(0)
  }))

  var grid = new lib.Grid(elevations)
  var result = 0

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

    const currentElevation = grid.get(min)

    for (const n of grid.neighbors4(min)) {
        if (grid.get(n) - currentElevation > 1) {
          continue
        }
        if (marked.has(`${n.row},${n.col}`)) {
            continue
        }
        heap.insert({ ...n, value: min.value + 1 })
        marked.add(`${n.row},${n.col}`)
    }
  }

})
