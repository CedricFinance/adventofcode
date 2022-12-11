import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
  const blocks = input.blocks()

  const monkeys = []
  for (const block of blocks) {
    const [m, items, operation, test, ifTrue, ifFalse] = block.split("\n")

    const itemsList = items.split(":")[1]
    const operationFormula = operation.split("=")[1]
    const testParts = test.split(" ")
    const ifTrueParts = ifTrue.split(" ")
    const ifFalseParts = ifFalse.split(" ")

    const monkey = {
      items: itemsList.split(", ").map(i => parseInt(i, 10)),
      operation: operationFormula,
      test: parseInt(testParts[testParts.length - 1], 10),
      ifTrue: parseInt(ifTrueParts[ifTrueParts.length - 1], 10),
      ifFalse: parseInt(ifFalseParts[ifFalseParts.length - 1], 10),
      inspected: 0
    }

    monkeys.push(monkey)
  }

  for (let round = 0; round < 20; round++) {
    for (const monkey of monkeys) {
      const items = monkey.items
      monkey.items = []

      for (const item of items) {
        monkey.inspected++

        var newValue = eval(monkey.operation.replaceAll("old", item))
        newValue = Math.floor(newValue / 3)

        if (newValue % monkey.test === 0) {
          monkeys[monkey.ifTrue].items.push(newValue)
        } else {
          monkeys[monkey.ifFalse].items.push(newValue)
        }

      }

    }
    
  }
  
  const counts = monkeys.map(monkey => monkey.inspected)
  counts.sort((a,b) => b - a)

  return counts[0] * counts[1]
})