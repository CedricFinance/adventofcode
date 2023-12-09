/**
 * @param {number[]} list
 */
function differences(list) {
  const result = []

  for (let i = 0; i < list.length - 1; i++) {
    result.push(list[i+1] - list[i])
  }

  return result
}

/**
 * @param {number[]} history
 */
export function generateSequences(history) {
  const results = [history]

  var currentHistory = [...history]
  while(!currentHistory.every(e => e == 0)) {
    currentHistory = differences(currentHistory)
    results.push(currentHistory)
  }

  return results
}