import * as aoc from '../../2020/aoc.js'

var cycles = [ 20, 60, 100, 140, 180, 220 ]

var X = 1
var cycle = 0
var result = 0

function nextCycle() {
  cycle++
  if (cycles.includes(cycle)) {
    result += cycle * X
  }
}

aoc.run(function(input) {
  const lines = input.lines()

  for (const line of lines) {
    if (line == "noop") {
      nextCycle()
    } else {
      nextCycle()
      nextCycle()

      const arg = parseInt(line.split(" ")[1])
      X += arg
    }
  }
    
  return result
})
