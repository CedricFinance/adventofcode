import * as aoc from '../../2020/aoc.js'

const snafuValues = {
  "2": 2,
  "1": 1,
  "0": 0,
  "-": -1,
  "=": -2
}

/**
 * @param {string} str
 */
function fromSNAFU(str) {
  const parts = str.split("").map(s => snafuValues[s])
  
  var value = 0
  var power = 1
  while(parts.length > 0) {
    const digit = parts.pop()
    value += digit * power
    power *= 5
  }

  return value
}

/**
 * @param {number} number
 */
function toSNAFU(number) {
  var num = number

  var result = ''

  while(num > 0) {
    var mod = num % 5
    if (mod <= 2) {
      result = `${mod}${result}`
    } else {
      if (mod === 4) {
        result = `-${result}`
        num += 1
      }
      if (mod === 3) {
        result = `=${result}`
        num += 2
      }
    }

    num = Math.floor(num / 5)
  }

  return result
}

aoc.run(function(input) {
  const lines = input.lines()
  const sum = lines.map(fromSNAFU).reduce((acc, value) => acc + value, 0)
  return toSNAFU(sum)
})
