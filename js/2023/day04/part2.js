import * as aoc from '../../2020/aoc.js'
import { parseLine } from './lib.js'

aoc.run(function(input) {
  const cards = input.lines().map(parseLine)
  var result = 0

  const cardsCounts = new Array(cards.length).fill(1)

  let cardIndex = 0
  for (const card of cards) {
    const matchingCards = aoc.Sets.intersect(card.winningNumbers, card.numbers)

    for (let i = 0; i < matchingCards.size; i++) {
      if (cardIndex + 1 + i > cardsCounts.length) {break} 
      cardsCounts[cardIndex + 1 + i] += cardsCounts[cardIndex]
    }

    cardIndex++
  }

  result = cardsCounts.reduce((acc, value) => acc+value)
  return result
})
