import * as aoc from '../../2020/aoc.js'
import { isPointInsidePolygon } from '../../algos.js';
import { find, findConnection } from './lib.js';

aoc.run(function(input) {
  const grid = input.lines().map(line => line.split(""));
  var result = 0

  const start = find(grid, "S")

  var currentPosition = {
    row: start.row,
    col: start.col
  }

  /** @type {Set<string>} */
  const marked = new Set()
  const loop = [ currentPosition ]
  while(true) {
    marked.add(`${currentPosition.row},${currentPosition.col}`)
    const connections = findConnection(currentPosition, grid)
    currentPosition = connections.filter(c => !marked.has(`${c.row},${c.col}`))[0]
    if (!currentPosition) {
      break
    }
    loop.push(currentPosition)
  }

  /** @type {[x: number, y: number][]} */
  const loopCoords = loop.map(e => [e.row, e.col])

  /** @type {Set<string>} */
  const loopSet = new Set()
  for (const pos of loop) {
    loopSet.add(`${pos.row},${pos.col}`)
  }

  var result = 0
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      if (loopSet.has(`${r},${c}`)) { continue }

      if (isPointInsidePolygon([r, c], loopCoords)) { result++ }
    }
  }

  return result
})

