import * as aoc from '../../2020/aoc.js'

aoc.run(async function(input) {
  const lines = input.lines()
  var result = 0

  const multPattern = /mul\(([0-9]{1,3}),([0-9]{1,3})\)|don't\(\)|do\(\)/g

  var enabled = true
  for (const line of lines) {
    const matches = line.matchAll(multPattern)

    for (const match of matches) {
      switch (match[0]) {
        case "do()":
          enabled = true
          break;

        case "don't()":
          enabled = false
          break

        default:
          if (enabled)
            result += parseInt(match[1]) * parseInt(match[2])

          break;
      }
    }
  }

  return result
})
