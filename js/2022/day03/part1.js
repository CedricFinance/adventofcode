import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
  const lines = input.lines()

  var result = 0

  for (const line of lines) {
    const first = new Set(line.substring(0, line.length / 2).split(""))
    const second = new Set(line.substring(line.length / 2, line.length).split(""))
    for (const item of first) {
      if (second.has(item)) {
        if (item >= 'a' && item <= 'z') {
          result += item.codePointAt(0) - 'a'.codePointAt(0) + 1
        } else {
          result += item.codePointAt(0) - 'A'.codePointAt(0) + 1
          result += 26
        }
        break;
      }
    }
  }

  return result
})
