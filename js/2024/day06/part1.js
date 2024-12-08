import * as aoc from '../../2020/aoc.js'
import { DOWN, LEFT, RIGHT, UP } from '../../2023/day17/direction.js'
import { Grid } from '../../lib.js'

function rotateRight(direction) {
  switch (direction) {
    case UP:
      return RIGHT

    case RIGHT:
      return DOWN

    case DOWN:
      return LEFT

    case LEFT:
      return UP
  }
}

aoc.run(async function(input) {
  const grid = new Grid(input.lines().map(line => line.split("")))

  var guard

  for (const cell of grid.cells()) {
    if (cell.value == "^") {
      guard = {
        pos: {
          row: cell.row,
          col: cell.col
        },
        direction: UP
      }
    }
  }

  const positionsVisited = new Set()
  positionsVisited.add(`${guard.pos.row},${guard.pos.col}`)

  while(true) {
    const newPos = {
      row: guard.pos.row + guard.direction.delta.rowDelta,
      col: guard.pos.col + guard.direction.delta.colDelta
    }

    const cell = grid.get(newPos)

    if (!cell) {
      break
    }

    if (cell == "#") {
      guard.direction = rotateRight(guard.direction)
      continue
    }

    guard.pos = newPos
    positionsVisited.add(`${guard.pos.row},${guard.pos.col}`)
  }

  return positionsVisited.size
})
