import * as aoc from '../../2020/aoc.js'

const PLUS = "plus"
const MULT = "mult"
const SQUARE = "square"

class Item {
  value
  operations = []
  cacheOperationIndex = new Map() 

  constructor(value) {
    this.value = value
  }

  addOperation(op) {
    this.operations.push(op)
  }

  mod(n) {
    var result = this.value

    var startIndex = 0
    const cached = this.cacheOperationIndex.get(n)
    if (cached != null) {
      startIndex = cached.index + 1
      result = cached.result
    }

    for (var i = startIndex; i < this.operations.length; i++) {
      const operation = this.operations[i]
      switch (operation[0]) {
        case PLUS:
          result = (result + (operation[1] % n)) % n
          break;

        case MULT:
          result = (result * (operation[1] % n)) % n        
          break;
        
        case SQUARE:
          result = (result * result) % n        
          break;

        default:
          break;
      }
    }

    this.cacheOperationIndex.set(n, {
      index: this.operations.length - 1,
      result
    })

    return result
  }

}

aoc.run(function(input) {
  const blocks = input.blocks()

  const monkeys = []
  for (const block of blocks) {
    const [m, items, rawOperation, test, ifTrue, ifFalse] = block.split("\n")

    const itemsList = items.split(":")[1]
    const operationFormula = rawOperation.split("= ")[1]
    const testParts = test.split(" ")
    const ifTrueParts = ifTrue.split(" ")
    const ifFalseParts = ifFalse.split(" ")

    const [_, operator, right] = operationFormula.split(" ")

    var operation
    if (operationFormula === "old * old") {
      operation = [SQUARE]
    } else if (operator === "*") {
      operation = [MULT, parseInt(right, 10)]
    } else if (operator == "+") {
      operation = [PLUS, parseInt(right, 10)]
    } else {
      throw `error: ${operator} not supported`
    }

    const monkey = {
      items: itemsList.split(", ").map(i => new Item(parseInt(i, 10))),
      operation: operation,
      test: parseInt(testParts[testParts.length - 1], 10),
      ifTrue: parseInt(ifTrueParts[ifTrueParts.length - 1], 10),
      ifFalse: parseInt(ifFalseParts[ifFalseParts.length - 1], 10),
      inspected: 0
    }

    monkeys.push(monkey)
  }

  for (let round = 0; round < 10000; round++) {
    for (const monkey of monkeys) {
      const items = monkey.items
      monkey.items = []

      for (const item of items) {
        monkey.inspected++

        item.addOperation(monkey.operation)

        if (item.mod(monkey.test) === 0) {
          monkeys[monkey.ifTrue].items.push(item)
        } else {
          monkeys[monkey.ifFalse].items.push(item)
        }

      }

    }

  }

  const counts = monkeys.map(monkey => monkey.inspected)
  counts.sort((a,b) => b - a)

  return counts[0] * counts[1]
})
