/**
 * @param {string} str
 */
function parseNumberList(str) {
  return str.trim().split(/ +/).map(s => parseInt(s, 10))
}

/**
 * @param {string} line
 */
export function parseLine(line) {
  //  Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  const [cardStr, numbersStr] = line.split(": ")
  const cardNum = parseInt(cardStr.split(" ")[1], 10)
  const [winningNumbers, numbers] = numbersStr.split(" | ").map(parseNumberList)

  return {
      num: cardNum,
      winningNumbers: new Set(winningNumbers),
      numbers: new Set(numbers)
  }
}
