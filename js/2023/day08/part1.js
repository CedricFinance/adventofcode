import * as aoc from '../../2020/aoc.js'
import { parseInput } from './lib.js';

aoc.run(function(input) {
  const { instructions, nodesMap } = parseInput(input);

  var index = 0

  var currentNodeName = "AAA"
  while(currentNodeName != "ZZZ") {
    const instr = instructions[index % instructions.length]
    const currentNode = nodesMap.get(currentNodeName)
    if (instr == "L") {
      currentNodeName = currentNode.left
    } else {
      currentNodeName = currentNode.right
    }
    index++
  }

  return index
})
