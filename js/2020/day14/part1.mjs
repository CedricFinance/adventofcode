import * as fs from 'fs'

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

function or(v1, v2) {
    var hi = 0x80000000;
    var low = 0x7fffffff;
    var hi1 = ~~(v1 / hi);
    var hi2 = ~~(v2 / hi);
    var low1 = v1 & low;
    var low2 = v2 & low;
    var h = hi1 | hi2;
    var l = low1 | low2;
    return h*hi + l;
}

function and(v1, v2) {
    var hi = 0x80000000;
    var low = 0x7fffffff;
    var hi1 = ~~(v1 / hi);
    var hi2 = ~~(v2 / hi);
    var low1 = v1 & low;
    var low2 = v2 & low;
    var h = hi1 & hi2;
    var l = low1 & low2;
    return h*hi + l;
}

class Mask {

    constructor(maskStr) {
        this.clearMask = 0
        this.setMask = 0

        for (let index = 0; index < maskStr.length; index++) {
            this.setMask *= 2
            this.clearMask *= 2

            const char = maskStr[index];
            const shift = 35 - index
            if (char === "1") {
                this.setMask++
            }
            if (char !== "0") {
                this.clearMask++
            }
        }
    }

    apply(state) {
        state.mask = value => {
            let val = or(value, this.setMask)
            val = and(val, this.clearMask)
            return val
        }
    }
}

class Set {

    constructor(addr, value) {
        this.addr = addr
        this.value = value
    }

    apply(state) {
        state.mem[this.addr] = state.mask(this.value)
    }
}

function parseInstructions(str) {
    const parts = str.split(" = ")

    if (parts[0] === "mask") {
        return new Mask(parts[1])
    }

    let addrStr = parts[0].split("[")[1]
    addrStr = addrStr.slice(0, addrStr.length - 1)
    return new Set(parseInt(addrStr, 10), parseInt(parts[1], 10))
}

const instructions = lines.map(parseInstructions)

const state = {
    mem: {},
    mask: null
}

console.log(instructions);

for (const inst of instructions) {
    inst.apply(state)
}

let result = 0
for(let value of Object.values(state.mem)) {
    result += value
}

console.log(state);
console.log("result:", result);