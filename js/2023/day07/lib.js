/**
 * @param {string} line
 */
export function parseHand(line) {
  const [cardsStr, bidStr] = line.split(" ")
  const cards = cardsStr.split("")

  return {
    cards,
    bid: parseInt(bidStr, 10)
  }
}

/**
 * @param {string[]} cards
 */
export function countCards(cards) {
  /** @type {Map<string,number>} */
  const counts = new Map()
  for (const card of cards) {
    const prev = counts.get(card) || 0
    counts.set(card, prev + 1)
  }
  return counts
}

function compareCards(first, second, cardsOrder) {
  for (let i = 0; i < first.length; i++) {
    const firstCard = first[i]
    const secondCard = second[i]
    const firstStrength = cardsOrder.indexOf(firstCard)
    const secondStrength = cardsOrder.indexOf(secondCard)
    if (firstStrength != secondStrength) {
      return firstStrength - secondStrength
    }
  }
  return 0
}

/**
 * @param {string} cardsOrder
 */
export function compareHand(cardsOrder) {
  return function(first, second) {
    if (first.strength < second.strength) {
      return -1
    }
    if (first.strength > second.strength) {
      return 1
    }
    return compareCards(first.cards, second.cards, cardsOrder)  
  }
}
