import * as aoc from '../../2020/aoc.js'

function parseYellingMonkey(line) {
  const [name, operationStr] = line.split(": ")
  const operationParts = operationStr.split(" ")

  if (operationParts.length === 1) {
    if (name === "humn") {
      return {
        type: "variable",
        name
      }
    }

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

function disp(expr) {
  if (expr.type === "value") {
    return expr.value
  }

  if (expr.type === "variable") {
    return expr.name
  }

  return `(${disp(expr.left)} ${expr.operation} ${disp(expr.right)})`
}

function solve(expr, value) {
  var currentExpr = expr
  var goal = value

  while(true) {
    if (currentExpr.type === "variable") {
      console.log(`${currentExpr.value} = ${goal}`);
      return goal
    }
  
    if (currentExpr.left === "operation" && currentExpr.right === "operation") {
      throw "error"
    }
  
    var newExpr
    var number

    console.log(`${disp(currentExpr.left)} ${currentExpr.operation} ${disp(currentExpr.right)} = ${goal}`);

    switch(currentExpr.operation) {
      case "+":
        if (currentExpr.left.type === "value") {
          number = currentExpr.left.value
          newExpr = currentExpr.right
        } else {
          number = currentExpr.right.value
          newExpr = currentExpr.left
        }
        goal -= number
        break
  
      case "-":
        if (currentExpr.left.type === "value") {
          number = currentExpr.left.value
          newExpr = currentExpr.right

          // num - expr = goal
          // expr = num - goal
          goal = number - goal
        } else {
          number = currentExpr.right.value
          newExpr = currentExpr.left

          // expr - num = goal
          // expr = goal + num
          goal += number
        }    
        break
  
      case "*":
        if (currentExpr.left.type === "value") {
          number = currentExpr.left.value
          newExpr = currentExpr.right
        } else {
          number = currentExpr.right.value
          newExpr = currentExpr.left
        }    
        goal /= number
        break
  
      case "/":
        if (currentExpr.left.type === "value") {
          number = currentExpr.left.value
          newExpr = currentExpr.right

          // num / expr = goal
          // expr = num / goal
          goal = number / goal
        } else {
          number = currentExpr.right.value
          newExpr = currentExpr.left

          // expr / num = goal
          // expr = goal * num
          goal *= number
        }    
        break
    }
  
    currentExpr = newExpr  
  }
}

function buildFormula(monkeys, name) {
  const monkey = monkeys.get(name)

  if (monkey.type === "variable" || monkey.type === "value") {
    return monkey
  }

  const left = buildFormula(monkeys, monkey.left)
  const right = buildFormula(monkeys, monkey.right)

  return {
    type: "operation",
    operation: monkey.operation,
    left,
    right
  }
}

function simplify(expr) {
  if (expr.type === "variable" || expr.type === "value") {
    return expr
  }

  const left = simplify(expr.left)
  const right = simplify(expr.right)

  if (left.type === "value" && right.type === "value") {
    var value
    switch (expr.operation) {
      case "+":
        value = left.value + right.value
        break
  
      case "-":
        value = left.value - right.value
        break
  
      case "/":
        value = left.value / right.value
        break
  
      case "*":
        value = left.value * right.value
        break
    }
  
    return {
      type: "value",
      value
    }
  }

  return {
    type: "operation",
    left,
    operation: expr.operation,
    right
  }
}

aoc.run(function(input) {
  const monkeys = new Map()
  for (const monkey of input.lines().map(parseYellingMonkey)) {
    monkeys.set(monkey.name, monkey)
  }

  var result = 0

  var left = buildFormula(monkeys, monkeys.get("root").left)
  var right = buildFormula(monkeys, monkeys.get("root").right)
  left = simplify(left);
  right = simplify(right);

  if (right.type === "value") {
    result = solve(left, right.value)
  } else {
    result = solve(right, left.value)
  }
    
  return result
})
