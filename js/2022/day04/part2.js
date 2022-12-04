import * as aoc from '../../2020/aoc.js'

function overlap(first, second) {
  if (second[0] > first[1]) {
    return false
  }

  if (first[0] > second[1]) {
    return false
  }

  return true
}

aoc.run(function(input) {
    const lines = input.lines()

    var result = 0

    for (const line of lines) {
      const [first, second] = line.split(",").map(p => p.split("-").map(n => parseInt(n, 10)))
      if (overlap(first, second)) {
        result++
      }
    }
    
  return result
})
