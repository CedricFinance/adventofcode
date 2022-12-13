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
  const packets = blocks.flatMap(block => block.split("\n").map(b => JSON.parse(b)))
  packets.push([[2]])
  packets.push([[6]])

  packets.sort(compare)

  var result = []
  for (let i = 0; i < packets.length; i++) {
    if (JSON.stringify(packets[i]) === "[[2]]") {
      result.push(i+1)
    }
    if (JSON.stringify(packets[i]) === "[[6]]") {
      result.push(i+1)
    }
  }

  return result[0] * result[1]
})
