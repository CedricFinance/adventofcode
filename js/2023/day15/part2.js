import * as aoc from '../../2020/aoc.js'
import { hash } from './lib.js';

/**
 * @param {string} str
 * @returns {{label: string, operation: string, focalLength: number?}}
 */
function parseInstruction(str) {
  const { label, operation, focalLength } = str.match(/(?<label>[^-=]+)(?<operation>[-=])(?<focalLength>[1-9])?/).groups
  return {
    label,
    operation,
    focalLength: focalLength ? parseInt(focalLength, 10) : null
  }
}

aoc.run(function(input) {
  const instructions = input.content().trim().split(",").map(parseInstruction);

  /** @type {{ slots: {label: string, focalLength: number}[]}[]} */
  const boxes = new Array(256)
  for (let i = 0; i < boxes.length; i++) {
    boxes[i] = {
      slots: []
    }
  }

  var result = 0
  for (let i = 0; i < instructions.length; i++) {
    const { label, operation, focalLength } = instructions[i]
    const boxIndex = hash(label)
    const box = boxes[boxIndex]
  
    if (operation == "-") {
      box.slots = box.slots.filter(lens => lens.label != label )
    } else {
      const existing = box.slots.find(lens => lens.label == label)
      if (existing) {
        existing.focalLength = focalLength
      } else {
        box.slots.push({
          label,
          focalLength: focalLength
        })
      }
    }
  }

  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    for (let boxIndex = 0; boxIndex < box.slots.length; boxIndex++) {
      const lens = box.slots[boxIndex];
      const focusingPower = (i+1) * (boxIndex+1) * lens.focalLength
      result += focusingPower
    }
  }

  return result
})
