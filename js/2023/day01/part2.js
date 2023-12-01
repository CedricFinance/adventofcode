import * as aoc from '../../2020/aoc.js'

function extractNumbers(str) {
  const words = [
   { word: "zero", value: 0 },
   { word: "one", value: 1 },
   { word: "two", value: 2 },
   { word: "three", value: 3 },
   { word: "four", value: 4 },
   { word: "five", value: 5 },
   { word: "six", value: 6 },
   { word: "seven", value: 7 },
   { word: "eight", value: 8 },
   { word: "nine", value: 9 }
  ]

  const numbers = []

  var w = str
  while(w.length > 0) {
    if (w[0] >= '0' && w[0] <= '9') {
      numbers.push(parseInt(w[0], 10))
      w = w.substring(1)
      continue
    }

    const spelledDigit = words.find(entry => w.startsWith(entry.word))
    if (spelledDigit) {
      numbers.push(spelledDigit.value)
      w = w.substring(spelledDigit.word.length - 1)
      continue
    }

    w = w.substring(1)
  }

  return numbers
}

aoc.run(function(input) {
    const lines = input.lines()
    var result = 0

    for (const line of lines) {
      const numbers = extractNumbers(line)
      const number = 10 * numbers[0] + numbers[numbers.length-1]
      result+=number
    }

  return result
})
