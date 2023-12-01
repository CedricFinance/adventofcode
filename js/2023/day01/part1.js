import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    const lines = input.lines()
    var result = 0

    for (const line of lines) {
      const numbers = line.split("").filter(c => c >= "0" && c <= "9").map(c => parseInt(c, 10))
      const number = 10 * numbers[0] + numbers[numbers.length-1]
      result+=number
    }

  return result
})
