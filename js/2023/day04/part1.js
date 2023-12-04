import * as aoc from '../../2020/aoc.js'
import { parseLine } from './lib.js'

aoc.run(function(input) {
    const cards = input.lines().map(parseLine)
    var result = 0

    for (const card of cards) {
      const matchingCards = aoc.Sets.intersect(card.winningNumbers, card.numbers)

      if (matchingCards.size > 0) {
        result += Math.pow(2, matchingCards.size - 1)
      }
    }

  return result
})
