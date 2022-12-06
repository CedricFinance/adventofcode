import * as aoc from '../../2020/aoc.js'

/**
 * @param {string} content
 * @param {number} messageLength
 */
function findMarker(content, messageLength) {
  for (let index = messageLength; index <= content.length; index++) {
    const set = new Set(content.slice(index - messageLength, index).split(""))
    
    if (set.size == messageLength) {
      return index
    }
  }
  return -1
}

aoc.run(function(input) {
  const content = input.content()

  return findMarker(content, 4)
})
