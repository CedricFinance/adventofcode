import * as aoc from '../../2020/aoc.js'

/**
 * @param {string} line
 */
function parseLine(line) {
  const [left, right] = line.split(" ")

  return {
    state: left.split(""),
    counts: right.split(",").map(s => parseInt(s, 10))
  }
}

/**
 * @param {string[]} state
 * @param {number[]} counts
 */
function countArrangements(state, counts) {
  if (counts.length == 0) {
    if (state.some(s => s == "#")) {
      return 0
    } 
     return 1
  }

  var currentState = [...state]
  while(currentState[0] == ".") {
    currentState.shift()
  }

  if (currentState.length == 0) {
    return 0
  }

  if (currentState[0] == "#") {
    currentState.shift()
    var count = counts[0] - 1

    while(count > 0) {
      if (currentState[0] == "." || currentState.length == 0) {
        return 0
      }
      currentState.shift()
      count--
    }

    if (currentState[0] == "#") {
      return 0
    }
    currentState.shift()

     return countArrangements(currentState, counts.slice(1))
  }

  var arrangements = 0

  // if ? is .
  arrangements += countArrangements(currentState.slice(1), counts)

  // if ? is #
  arrangements += countArrangements(["#", ...currentState.slice(1)], counts)
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
