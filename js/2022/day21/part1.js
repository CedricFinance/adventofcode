import * as aoc from '../../2020/aoc.js'

function add(left, right) { return left + right }
function sub(left, right) { return left - right }
function mult(left, right) { return left * right }
function div(left, right) { return left / right }

const operations = {
  "+": add,
  "-": sub,
  "*": mult,
  "/": div
}

function parseYellingMonkey(line) {
  const [name, operationStr] = line.split(": ")
  const operationParts = operationStr.split(" ")

  if (operationParts.length === 1) {
    return {
      type: "value",
      name,
      value: parseInt(operationParts[0], 10) 
    }
  }

  return {
    type: "operation",
    name,
    left: operationParts[0],
    operation: operationParts[1],
    right: operationParts[2],
  }
}

function evaluate(monkeys, name) {
  const monkey = monkeys.get(name)

  if (monkey.type === "value") {
    return monkey.value
  }

  const left = evaluate(monkeys, monkey.left)
  const right = evaluate(monkeys, monkey.right)

  const result = operations[monkey.operation](left, right)

  return result
}

aoc.run(function(input) {
  const monkeys = new Map()
  for (const monkey of input.lines().map(parseYellingMonkey)) {
    monkeys.set(monkey.name, monkey)
  }

  var result = evaluate(monkeys, "root")

  return result
})
