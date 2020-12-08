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

function run(program) {
    const executed = new Set()

    const state = {
        pc: 0,
        acc: 0
    }

    while(state.pc < program.length) {
        if (executed.has(state.pc)) {
            return {
                status: "infiniteloop",
                state,
                executed
            }
        }
        
        executed.add(state.pc)

        program[state.pc].opcode(program[state.pc], state)
    }    

    return {
        status: "stopped",
        state,
        executed
    }
}

const { executed } = run(program)

const corruptedJmpCandidates = new Set()
const corruptedNopCandidates = new Set()
for(let pc of executed) {
    if (program[pc].opcode == opcode_jmp && !executed.has(pc+1)) {
        corruptedJmpCandidates.add(pc)
    }

    if (program[pc].opcode == opcode_nop && !executed.has(pc+program[pc].arg)) {
        corruptedNopCandidates.add(pc)
    }
}

for (const candidate of corruptedJmpCandidates) {
    program[candidate].opcode = opcode_nop
    console.log("Fixing jmp at %d", candidate);
    const result = run(program)
    if (result.status == "stopped") {
        console.log("Program stopped", result.state);
        break
    }
    program[candidate].opcode = opcode_jmp
}

for (const candidate of corruptedNopCandidates) {
    program[candidate].opcode = opcode_jmp
    console.log("Fixing nop at %d", candidate);
    const result = run(program)
    if (result.status == "stopped") {
        console.log("Program stopped", result.state);
        break
    }
    program[candidate].opcode = opcode_nop
}
