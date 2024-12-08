import * as aoc from '../../2020/aoc.js'

function isCorrect(pageOrderingRules, pageUpdate) {
  const pageUpdatesIndex = new Map(pageUpdate.map((page, index) => [page, index]))

  for (const rule of pageOrderingRules) {
    if (pageUpdatesIndex.get(rule[0]) > pageUpdatesIndex.get(rule[1])) {
      return false
    }
  }

  return true
}

aoc.run(async function(input) {
  const [ pageOrderingStr, pageNumbersStr ] = input.blocks()
  const pageOrdering = pageOrderingStr.split("\n").map(line => line.split("|").map(Number))
  const pageUdates = pageNumbersStr.split("\n").map(line => line.split(",").map(Number))
  var result = 0

  for (const pageUdate of pageUdates) {
    if (isCorrect(pageOrdering, pageUdate)) {
      const middle = pageUdate[ ((pageUdate.length - 1) / 2) ]
      result += middle
    }
  }
  return result
})