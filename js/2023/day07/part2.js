import * as aoc from '../../2020/aoc.js'
import { compareHand, countCards, parseHand } from './lib.js'

/**
 * @param {string[]} hand
 */
function evaluateHandWithJokers(hand) {
  const counts = countCards(hand)
  var entries = Array.from(counts.entries()).sort((left, right) => (right[1] - left[1]))

  const jokers = entries.find(entry => entry[0] == "J")
  const jokersCount = jokers ? jokers[1] : 0

  entries = entries.filter(entry => entry[0] != "J")

  if (jokersCount >= 4) { return 7 }

  if (entries[0][1] + jokersCount == 5) { return 7 }
  if (entries[0][1] + jokersCount == 4) { return 6 }
  if (3 - entries[0][1] + 2 - entries[1][1] == jokersCount) { return 5 }
  if (entries[0][1] + jokersCount == 3 ) { return 4 }
  if (2 - entries[0][1] + 2 - entries[1][1] == jokersCount) { return 3 }
  if (2 - entries[0][1] == jokersCount) { return 2 }

  return 1
}

aoc.run(function(input) {
  const hands = input.lines().map(parseHand).map(hand => ({ ...hand, strength: evaluateHandWithJokers(hand.cards) }));;
  var result = 0

  // J is now weaker
  const cardsOrder = "J23456789TQKA"
  hands.sort(compareHand(cardsOrder))

  var index = 1
  for (const hand of hands) {
    result += hand.bid * index
    index++
  }

  return result
})
