import * as aoc from '../../2020/aoc.js'
import { isDigit, isGearSymbol } from './lib.js'

aoc.run(function(input) {
  const grid = input.lines().map(line => line.split(""))
  var result = 0

  var acc = 0
  var closeToSymbol = false
  var symbol = null

  const numbers = []

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex]

    acc = 0
    closeToSymbol = false

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const element = row[colIndex];

      if (isDigit(element)) {
        acc = acc * 10 + parseInt(element, 10)

        if (!closeToSymbol) {
          if (isGearSymbol(grid, rowIndex-1, colIndex-1)) { closeToSymbol = true, symbol = { value: grid[rowIndex-1][colIndex-1], pos: [ rowIndex-1, colIndex-1 ] } }
          if (isGearSymbol(grid, rowIndex-1, colIndex  )) { closeToSymbol = true, symbol = { value: grid[rowIndex-1][colIndex  ], pos: [ rowIndex-1, colIndex   ] } }
          if (isGearSymbol(grid, rowIndex-1, colIndex+1)) { closeToSymbol = true, symbol = { value: grid[rowIndex-1][colIndex+1], pos: [ rowIndex-1, colIndex+1 ] } }
          if (isGearSymbol(grid, rowIndex  , colIndex-1)) { closeToSymbol = true, symbol = { value: grid[rowIndex  ][colIndex-1], pos: [ rowIndex  , colIndex-1 ] } } 
          if (isGearSymbol(grid, rowIndex  , colIndex+1)) { closeToSymbol = true, symbol = { value: grid[rowIndex  ][colIndex-1], pos: [ rowIndex  , colIndex+1 ] } }
          if (isGearSymbol(grid, rowIndex+1, colIndex-1)) { closeToSymbol = true, symbol = { value: grid[rowIndex+1][colIndex-1], pos: [ rowIndex+1, colIndex-1 ] } }
          if (isGearSymbol(grid, rowIndex+1, colIndex  )) { closeToSymbol = true, symbol = { value: grid[rowIndex+1][colIndex  ], pos: [ rowIndex+1, colIndex   ] } }
          if (isGearSymbol(grid, rowIndex+1, colIndex+1)) { closeToSymbol = true, symbol = { value: grid[rowIndex+1][colIndex+1], pos: [ rowIndex+1, colIndex+1 ] } }
        }
      } else {
        if (acc != 0) {
          if (closeToSymbol) { numbers.push({ value: acc, symbol }) }
          closeToSymbol = false
          acc = 0
          symbol = null
        }
      }

    }

    if (acc != 0) {
      if (closeToSymbol) { numbers.push({ value: acc, symbol }) }
      closeToSymbol = false
      acc = 0
      symbol = null
    }
  }

  if (acc != 0) {
    if (closeToSymbol) { numbers.push({ value: acc, symbol }) }
    closeToSymbol = false
    acc = 0
    symbol = null
  }

  /**
   * @param {number[]} pos
   */
  function toKey(pos) {
    return `${pos[0]},${pos[1]}`
  }

  /**
   * @type {Map<string,{ value: number; symbol: { value: string; pos: number[]; }}[]>}
   */
  const bySymbol = new Map()
  for (const number of numbers.filter(n => n.symbol.value = "*")) {
    const key = toKey(number.symbol.pos)
    const prevValue = bySymbol.get(key) || []
    bySymbol.set(key, [...prevValue, number])
  }

  for (const symbolNumbers of bySymbol.values()) {
    if (symbolNumbers.length == 2) {
      result += symbolNumbers.map(s => s.value).reduce((prev, v) => prev * v, 1)
    } 
  }

  return result
})
