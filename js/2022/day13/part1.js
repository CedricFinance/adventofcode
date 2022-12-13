import * as aoc from '../../2020/aoc.js'

function compare(left, right) {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left === right) {
      return 0
    }

    if (left < right) {
      return -1
    }

    return 1
  } 

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length; i++) {
      const res = compare(left[i], right[i])

      if (res === 0) {
        continue
      }

      if (res === -1) {
        return -1
      }

      if (res === 1) {
        return 1
      }
    }

    if (left.length < right.length) {
      return -1
    }

    if (left.length == right.length) {
      return 0
    }

    return 1
  }

  if (Array.isArray(left) && Number.isInteger(right)) {
    return compare(left, [right])
  }

  if (Number.isInteger(left) && Array.isArray(right)) {
    return compare([left], right)
  }
}

aoc.run(function(input) {
  const blocks = input.blocks()

  var result = []

  
  for (var i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const [left, right] = block.split("\n")
    const leftD = JSON.parse(left)
    const rightD = JSON.parse(right)
      if (compare(leftD, rightD) == -1) {
      result.push(i+1)
    }
  }
  
  console.log(result);
  return result.reduce((acc, i) => acc + i, 0)
})
