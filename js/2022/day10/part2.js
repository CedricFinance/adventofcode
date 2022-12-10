import * as aoc from '../../2020/aoc.js'

var X = 1
var cycle = 0
var result = ""

function nextCycle() {
  cycle++

  if ( (cycle-1) % 40 === 0) {
    result += "\n"
  }

  var pixel = ( (cycle-1)%40 >= X-1 && (cycle-1)%40 <= X+1) ? "#" : "."
  result += pixel;
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

    result += "\n"

    return result
})
