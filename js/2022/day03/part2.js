import * as aoc from '../../2020/aoc.js'

function priority(item) {
  if (item >= 'a' && item <= 'z') {
    return item.codePointAt(0) - 'a'.codePointAt(0) + 1
  } else {
    return 26 + item.codePointAt(0) - 'A'.codePointAt(0) + 1

  }
}

function intersection(a, b) {
  const result = new Set()
  for (const item of a) {
    if (b.has(item)) {
      result.add(item)
    }
  }
  return result
}

aoc.run(function(input) {
  const lines = input.lines()

  var result = 0

  var bags = []
  for (const line of lines) {
    const bag = new Set(line.split(""))
    bags.push(bag)
  }

  for (let i = 0; i < bags.length / 3; i++) {
    const first = bags[3 * i]
    const second = bags[3 * i + 1]
    const third = bags[3 * i + 2]

    const badge = intersection(intersection(first, second), third)
    result += priority(badge.keys().next().value)
  }

  return result
})
