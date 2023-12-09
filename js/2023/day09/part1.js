import * as aoc from '../../2020/aoc.js'
import { generateSequences } from './lib.js'

/**
 * @param {number[][]} sequences
 */
function extrapolateAtEnd(sequences) {
  var currentValue = 0
  for (let i = sequences.length - 2; i >= 0; i--) {
    const sequence = sequences[i]
    currentValue = sequence[sequence.length - 1] + currentValue 
  }
  return currentValue
}

aoc.run(function(input) {
  const histories = input.lines().map(line => aoc.parseNumberList(line));
  var result = 0

  for (const history of histories) {
    const sequences = generateSequences(history)
    const value = extrapolateAtEnd(sequences)
    result+=value
  }

  return result
})
