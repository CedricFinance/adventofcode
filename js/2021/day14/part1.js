import * as aoc from '../../2020/aoc.js'

/**
 *
 * @param {string} molecule
 * @param {Map<string,string>} rules
 */
function process(molecule, rules) {
    let result = ""

    for (let index = 0; index < molecule.length; index++) {
        const pair = molecule.slice(index, index + 2)
        result += molecule[index]
        if (rules.has(pair)) {
            result += rules.get(pair)
        }
    }

    return result
}

aoc.run(function(input) {
    const [ template, rulesBlock ] = input.blocks()

    /** @type Map<string,string> */
    const rules = new Map()
    rulesBlock.split("\n").map(line => {
        const [left, right] = line.split(" -> ")
        rules.set(left, right)
    })

    var molecule = template
    for (let index = 0; index < 10; index++) {
        molecule = process(molecule, rules)
    }

    /** @type Map<string,number> */
    const counts = new Map()

    for (const letter of molecule) {
        const count = counts.get(letter) || 0
        counts.set(letter, count + 1)
    }

    const [min, max] = minMax(counts.values())

    return max - min
})

/**
 *
 * @param {Iterable<number>} arr
 * @returns [number, number]
 */
function minMax(arr) {
    var min= Number.MAX_VALUE
    var max= Number.MIN_VALUE

    for (const c of arr) {
        if (c > max) { max = c }
        if (c < min) { min = c }
    }

    return [min, max]
}

