import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    const [state, moves] = input.blocks()

    const instructions = moves.split("\n").map(function(line) {
      const parts = line.split(" ")
      return {
        count: parseInt(parts[1], 10),
        from: parseInt(parts[3], 10) - 1,
        to: parseInt(parts[5], 10) - 1
      }
    })

    const lines = state.split("\n")
    lines.pop()
    const stacks = new Array()
    
    for (let column = 1; column < lines[0].length; column += 4) {
      const stack = []
      for (const line of lines) {
        const letter = line[column]
        if (letter != " ") {
          stack.unshift(letter)
        }
      }
      stacks.push(stack)
    }

    var result = ""

    for (const instruction of instructions) {
      for (let c = 0; c < instruction.count; c++) {
        const moved = stacks[instruction.from].pop()
        stacks[instruction.to].push(moved)
      }
    }

    for (const stack of stacks) {
      result += stack.pop()
    }
    console.log(result);
    
  return result
})
