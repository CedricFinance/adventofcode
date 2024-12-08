import * as aoc from '../../2020/aoc.js'
import { DOWN, LEFT, RIGHT, UP } from '../../2023/day17/direction.js'
import { Grid } from '../../lib.js'
import { format } from 'util'

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
  const positionsVisitedDir = new Set()

  const startingPosition = guard.pos
  const obstructions = new Set()

  while(true) {
    positionsVisited.add(`${guard.pos.row},${guard.pos.col}`)
    positionsVisitedDir.add(`${guard.pos.row},${guard.pos.col},${guard.direction.name}`)

    var testPos = {...guard.pos}
    var testDir = rotateRight(guard.direction)
    const visitedTest = new Set()

    const obstaclePos = {
      row: guard.pos.row + guard.direction.delta.rowDelta,
      col: guard.pos.col + guard.direction.delta.colDelta
    }
    if (!(obstaclePos.row == startingPosition.row && obstaclePos.col == startingPosition.col) && grid.get(obstaclePos) == ".") {
      grid.set(obstaclePos, "#")
      while(true) {

        if (positionsVisitedDir.has(`${testPos.row},${testPos.col},${testDir.name}`) || visitedTest.has(`${testPos.row},${testPos.col},${testDir.name}`)) {
          if (positionsVisited.has(`${obstaclePos.row},${obstaclePos.col}`)) {
            break
          }
          if (!grid.get(obstaclePos)) {
            break
          }

          obstructions.add(`${obstaclePos.row},${obstaclePos.col}`)
          break
        }

        const newPos = {
          row: testPos.row + testDir.delta.rowDelta,
          col: testPos.col + testDir.delta.colDelta
        }

        const value = grid.get(newPos)
        if (!value) {
          break
        }

        if (value == "#") {
          testDir = rotateRight(testDir)
          continue
        }

        visitedTest.add(`${testPos.row},${testPos.col},${testDir.name}`)

        testPos = newPos
      }
      grid.set(obstaclePos, ".")
    }

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
  }

  return obstructions.size
})
