import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    const blocks = input.blocks()
    var results = []

    for (const block of blocks) {
      const numbers = block.split("\n").map(str => parseInt(str, 10))
      const sum = numbers.reduce(((acc, number) => acc + number), 0)

      results.push(sum)
    }

    results.sort((a,b) => b- a)
    const result = results[0] + results[1] + results[2]

  return result
})
