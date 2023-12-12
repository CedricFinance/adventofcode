import * as aoc from '../../2020/aoc.js'

/**
 * @param {string} line
 */
function parseLine(line) {
  const [left, right] = line.split(" ")

  const singleCounts = right.split(",").map(s => parseInt(s, 10))
  const chars = left.split("")

  return {
    state: [ ...chars, "?", ...chars, "?", ...chars, "?", ...chars, "?", ...chars],
    counts: [ ...singleCounts, ...singleCounts, ...singleCounts, ...singleCounts, ...singleCounts ]
  }
}

/**
 * @param {number} left
 * @param {number} right
 */
function sum(left, right) {
  return left + right
}

/** @type {Map<string,number>} */
const memo = new Map()

function toKey() {
  return JSON.stringify(arguments)
}

/**
 * @param {string[]} state
 * @param {number[]} counts
 */
function countArrangements(state, counts) {
  var currentState = [...state]
  while(currentState[0] == ".") {
    currentState.shift()
  }

  const key = toKey(currentState, counts)
  if (memo.has(key)) { return memo.get(key) }

  if (counts.length == 0) {
    if (currentState.some(s => s == "#")) {
      memo.set(key, 0)
      return 0
    } 
    memo.set(key, 1)
    return 1
  }

  if (currentState.length == 0) {
    memo.set(key, 0)
    return 0
  }

  if (counts.reduce(sum) + counts.length - 1 > state.length) {
    memo.set(key, 0)
    return 0
  }

  if (currentState[0] == "#") {
    currentState.shift()
    var count = counts[0] - 1

    while(count > 0) {
      if (currentState[0] == "." || currentState.length == 0) {
        memo.set(key, 0)
        return 0
      }
      currentState.shift()
      count--
    }

    if (currentState[0] == "#") {
      memo.set(key, 0)
      return 0
    }
    currentState.shift()

    const c = countArrangements(currentState, counts.slice(1))
    memo.set(key, c)
    return c
  }

  var arrangements = 0

  // if ? is .
  arrangements += countArrangements(currentState.slice(1), counts)

  // if ? is #
  arrangements += countArrangements(["#", ...currentState.slice(1)], counts)

  memo.set(key, arrangements)
  return arrangements
}

aoc.run(function(input) {
  const lines = input.lines().map(parseLine);

  var result = 0

  for (const line of lines) {
    const count = countArrangements(line.state, line.counts)
    result+=count
  }

  return result
})
