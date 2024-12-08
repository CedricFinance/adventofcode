import * as aoc from '../../2020/aoc.js'
import { Grid } from '../../lib.js'

aoc.run(async function(input) {
  const grid = new Grid(input.lines().map(line => line.split("")))

  const antennas = new Map()
  for (const cell of grid.cells()) {
    if (cell.value != ".") {
      const value = antennas.get(cell.value) || []
      value.push({ row: cell.row, col: cell.col })
      antennas.set(cell.value, value)
    }
  }

  const antiNodes = new Set()

  for (const antennaPositions of antennas.values()) {
    for (let i = 0; i < antennaPositions.length - 1; i++) {
      for (let j = i + 1; j < antennaPositions.length; j++) {
        const first = antennaPositions[i]
        const second = antennaPositions[j]

        const firstCandidate = {
          row: first.row - (second.row - first.row),
          col: first.col - (second.col - first.col)
        }

        const secondCandidate = {
          row: second.row + (second.row - first.row),
          col: second.col + (second.col - first.col)
        }

        if (grid.get(firstCandidate)) {
          antiNodes.add(`${firstCandidate.row},${firstCandidate.col}`)
        }

        if (grid.get(secondCandidate)) {
          antiNodes.add(`${secondCandidate.row},${secondCandidate.col}`)
        }
      }
    }
  }

  return antiNodes.size
})