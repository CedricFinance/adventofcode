import * as aoc from '../../2020/aoc.js'
import { compareHand, countCards, parseHand } from './lib.js'

/**
 * @param {string[]} hand
 */
function evaluateHand(hand) {
  const counts = countCards(hand)
  var entries = Array.from(counts.entries()).sort((left, right) => (right[1] - left[1]))

  if (entries[0][1] == 5) { return 7 }
  if (entries[0][1] == 4) { return 6 }
  if (entries[0][1] == 3 && entries[1][1] == 2) { return 5 }
  if (entries[0][1] == 3) { return 4 }
  if (entries[0][1] == 2 && entries[1][1] == 2) { return 3 }
  if (entries[0][1] == 2) { return 2 }

  return 1
}

aoc.run(function(input) {
  const hands = input.lines().map(parseHand).map(hand => ({ ...hand, strength: evaluateHand(hand.cards) }));
  var result = 0

  const cardsOrder = "23456789TJQKA"
  hands.sort(compareHand(cardsOrder))

  var index = 1
  for (const hand of hands) {
    result += hand.bid * index
    index++
  }

  return result
})
