import * as aoc from '../aoc.js'

aoc.run(function(input) {
  const report = input.numbers()

  const numbers = new Set()

  report.forEach(d => numbers.add(d))

  for (const d of report) {
    if (numbers.has(2020-d)) {
      return d * (2020 - d)
    }
  }

  return 0
})