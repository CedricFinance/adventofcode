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

function fixUpdate(pageOrderingRules, pageUdate) {
  const pageUpdateRulesBefore = new Map()
  const pages = new Set(pageUdate)

  for (const rule of pageOrderingRules) {
    if (pages.has(rule[0]) && pages.has(rule[1])) {
      const beforeValue = pageUpdateRulesBefore.get(rule[0]) || []
      beforeValue.push(rule)
      pageUpdateRulesBefore.set(rule[0], beforeValue)
    }
  }


  const result = []

  while(pageUpdateRulesBefore.size > 0) {
    const diff = pages.difference(new Set(Array.from(pageUpdateRulesBefore.keys())))
    var v = [...diff][0]
    result.unshift(v)
    pageUpdateRulesBefore.delete(v)
    pages.delete(v)

    for (const entry of pageUpdateRulesBefore.entries()) {
      const newValue = entry[1].filter(rule => rule[0] !== v && rule[1] !== v)
      if (newValue.length == 0) {
        pageUpdateRulesBefore.delete(entry[0])
      } else {
        pageUpdateRulesBefore.set(entry[0], newValue)
      }
    }
  }

  result.unshift([...pages][0])

  return result
}

aoc.run(async function(input) {
  const [ pageOrderingStr, pageNumbersStr ] = input.blocks()
  const pageOrdering = pageOrderingStr.split("\n").map(line => line.split("|").map(Number))
  const pageUdates = pageNumbersStr.split("\n").map(line => line.split(",").map(Number))
  var result = 0

  for (const pageUdate of pageUdates) {
    if (!isCorrect(pageOrdering, pageUdate)) {
      const fixed = fixUpdate(pageOrdering, pageUdate)
      const middle = fixed[ ((fixed.length - 1) / 2) ]

      result += middle
    }
  }

  return result
})
