import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    const blocks = input.blocks()
    var result = 0

    for (const block of blocks) {
      const numbers = block.split("\n").map(str => parseInt(str, 10))
      const sum = numbers.reduce(((acc, number) => acc + number), 0)

      if (sum > result) { result = sum }
    }

  return result
})
