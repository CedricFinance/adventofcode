import { AocInput } from "../../2020/aoc.js";

/**
 * @param {string} line
 */
function parseNode(line) {
  const [ name, next ] = line.replace(/[()]/g,"").split(" = ")

  const [ left, right ] = next.split(", ")

  return {
    name,
    left,
    right
  }
}

/**
 * 
 * @param {AocInput} input 
 * @returns 
 */
export function parseInput(input) {
  const [ instructionsStr, nodesBlock ] = input.blocks();

  const instructions = instructionsStr.split("")

  const nodes = nodesBlock.split("\n").map(parseNode)

  /** @type {Map<string,{name: string, left: string, right: string}>} */
  const nodesMap = new Map()
  for (const node of nodes) {
    nodesMap.set(node.name, node)
  }

  return {
    instructions,
    nodesMap
  }

}