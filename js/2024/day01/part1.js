import * as aoc from '../../2020/aoc.js'

aoc.run(async function(input) {
  const lists = input.lines().map(line => line.split(/ +/, 2).map(part => parseInt(part, 10)) )
  var result = 0

  const firstList = []
  const secondList = []

  for (const pair of lists) {
    firstList.push(pair[0])
    secondList.push(pair[1])
  }

  firstList.sort((a,b) => a - b)
  secondList.sort((a,b) => a - b)

  for (let i = 0; i < firstList.length; i++) {
    result += Math.abs(firstList[i] - secondList[i])
  }

  return result
})
