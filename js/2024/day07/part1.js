import * as aoc from '../../2020/aoc.js'

function parseLine(line) {
  const [totalPart, numbersPart] = line.split(": ")

  return {
    total: Number(totalPart),
    numbers: numbersPart.split(" ").map(Number)
  }
}

/**
 *
 * @param {Number} total
 * @param {Number[]} numbers
 */
function evaluate(total, numbers) {
  if (numbers.length == 1) {
    return total == numbers[0]
  }

  if (numbers.length == 2) {
    return total == numbers[0] + numbers[1] || total == numbers[0] * numbers[1]
  }

  const sum = numbers[0] + numbers[1]
  if (sum <= total) {
    if (evaluate(total, [sum, ...numbers.slice(2)])) {
      return true
    }
  }

  const product = numbers[0] * numbers[1]
  if (product <= total) {
    if (evaluate(total, [product, ...numbers.slice(2)])) {
      return true
    }
  }

  return false
}

function canBeMadeTrue(equation) {
  return evaluate(equation.total, equation.numbers)
}

aoc.run(async function(input) {
  const equations = input.lines().map(parseLine)
  var result = 0

  for (const equation of equations) {
    if (canBeMadeTrue(equation)) {
      result += equation.total
    }
  }

  return result
})
