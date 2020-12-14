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

function getCombinaisons(numbers) {
    let result = []

    for (let index = 0; index <= numbers.length; index++) {
        result = result.concat(getCombinaisonsLength(numbers, index))
    }

    return result
}

function sum(numbers) {
    return numbers.reduce((acc, v) => acc + v, 0)
}

function getCombinaisonsLength(numbers, length) {
    if (length == 0) {
        return [[]]
    }
    if (length == numbers.length) {
        return [ numbers ]
    }

    let result = []

    result = result.concat(getCombinaisonsLength(numbers.slice(1), length - 1).map(c => [numbers[0]].concat(c)))
    result = result.concat(getCombinaisonsLength(numbers.slice(1), length))

    return result
}



class Mask {

    constructor(maskStr) {
        this.str = maskStr
        this.unchangedMask = 0
        this.setMask = 0
        this.floating = []

        for (let index = 0; index < maskStr.length; index++) {
            this.setMask *= 2
            this.unchangedMask *= 2
            this.floating = this.floating.map(f => f * 2)

            const char = maskStr[index];
            const shift = 35 - index
            if (char === "1") {
                this.setMask++
            }
            if (char === "0") {
                this.unchangedMask++
            }
            if (char === "X") {
                this.floating.push(1)
            }
        }

        this.floatingOffsets = getCombinaisons(this.floating).map(sum)
    }

    apply(state) {
        state.mask = value => {
            let val = and(value, this.unchangedMask)
            val = or(val, this.setMask)

            return this.floatingOffsets.map(offset => offset + val)
        }
    }
}

class Set {

    constructor(addr, value) {
        this.addr = addr
        this.value = value
    }

    apply(state) {
        const addresses = state.mask(this.addr)
        for(let address of addresses) {
            state.mem[address] = this.value
        }
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

for (const inst of instructions) {
    inst.apply(state)
}

let result = 0
for(let value of Object.values(state.mem)) {
    result += value
}

console.log("result:", result);