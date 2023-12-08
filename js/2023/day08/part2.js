import * as aoc from '../../2020/aoc.js'
import { parseInput } from './lib.js'

aoc.run(function(input) {
  const { instructions, nodesMap } = parseInput(input) 
  const startingNodes = Array.from(nodesMap.keys()).filter(name => name.endsWith("A"))

  const cycles = []
  for (const startingNode of startingNodes) {
    const result = aoc.algos.floydCycleDetection(
      ({node, index}) => {
        const instr = instructions[index]
        const n = nodesMap.get(node)
        const newNode = (instr == "L") ? n.left : n.right
        return {
          node: newNode,
          index: (index+1) % instructions.length
        }
      },
      { node: startingNode, index: 0 },
      (a, b) => a.node == b.node && a.index == b.index
    )
    cycles.push(result)
  }

  let multiple = 1;
  const multiples = []
  for(let cycle of cycles) {
      multiple = aoc.math.lcm(multiple, cycle.lam)
      multiples.push(multiple)
  }

  // As in today's problem, the cycle length is equal to the offset to the end node.
  // The LCM is the answer
  return multiples[multiples.length-1]

  // More general code
  function findEndNode(startingNode, instructions, nodeMap) {
    var index = 0

    var currentNode = startingNode
    while(!currentNode.endsWith("Z")) {
      const instr = instructions[index % instructions.length]
      if (instr == "L") {
        currentNode = nodeMap.get(currentNode).left
      } else {
        currentNode = nodeMap.get(currentNode).right
      }
      index++
    }
  
    return index  
  }

  const starts = []
  for (const startingNode of startingNodes) {
    const result = findEndNode(startingNode, instructions, nodesMap)
    starts.push(result)
  }

  var currentSteps = starts[0]
  for (let i = 1; i < startingNodes.length; i++) {
    while((currentSteps - starts[i]) % cycles[i].lam != 0) {
      currentSteps += multiples[i-1]
    }
  }


  return currentSteps
})
