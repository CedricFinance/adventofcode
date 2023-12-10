import * as aoc from '../../2020/aoc.js'
import { find, findConnection } from './lib.js';

aoc.run(function(input) {
  const grid = input.lines().map(line => line.split(""));

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

  return Math.ceil(loop.length/2)
})
