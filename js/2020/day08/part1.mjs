import * as fs from 'fs'

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

function opcode_acc(instr, state) {
  state.acc += instr.arg
  state.pc++
}

function opcode_jmp(instr, state) {
    state.pc += instr.arg
}
  
function opcode_nop(instr, state) {
    state.pc++
}


const opcodes = {
    "nop": opcode_nop,
    "acc": opcode_acc,
    "jmp": opcode_jmp
}

function parseOpcode(str) {
    const [ opcodeStr, arg ] = str.split(" ")
    return {
        opcode: opcodes[opcodeStr], arg: parseInt(arg)
    }
}

const program = lines.map(parseOpcode)

const executed = new Set()

let state = {
  pc: 0,
  acc: 0
}

while(true) {
    if (executed.has(state.pc)) {
        break
    }
    
    executed.add(state.pc)

    program[state.pc].opcode(program[state.pc], state)
}

console.log(state.acc);