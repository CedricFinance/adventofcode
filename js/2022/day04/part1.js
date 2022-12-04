import * as aoc from '../../2020/aoc.js'

function contains(first, second) {
  return first[0] <= second[0] && first[1] >= second[1]
}

aoc.run(function(input) {
    const lines = input.lines()

    var result = 0

    for (const line of lines) {
      const [first, second] = line.split(",").map(p => p.split("-").map(n => parseInt(n, 10)))
      if (contains(first, second) || contains(second, first)) {
        result++
      }
    }
    
  return result
})
