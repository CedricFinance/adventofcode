import * as aoc from '../../2020/aoc.js'

/**
 * @template T
 *
 * @param {T} key
 * @param {Number} value
 * @param {Map<T,Number>} counts
 */
function increment(counts, key, value = 1) {
    counts.set(key, value + (counts.get(key) || 0) )
}

/**
 *
 * @param {Map<string,number>} pairs
 * @param {Map<string,string>} rules
 */
function process(pairs, rules) {
    const newPairs = new Map(pairs)

    for (const [left, right] of rules.entries()) {
        if (pairs.has(left)) {
            const c = pairs.get(left)

            const newCount = newPairs.get(left)
            if (newCount == c) {
                newPairs.delete(left)
            } else {
                newPairs.set(left, newCount - c)
            }

            increment(newPairs, left[0]+right, c)
            increment(newPairs, right+left[1], c)
        }
    }

    return newPairs
}

aoc.run(function(input) {
    const [ template, rulesBlock ] = input.blocks()

    /** @type Map<string,string> */
    const rules = new Map()
    rulesBlock.split("\n").map(line => {
        const [left, right] = line.split(" -> ")
        rules.set(left, right)
    })

    /** @type Map<string,number> */
    var pairs = new Map()
    for (let index = 0; index < template.length - 1; index++) {
        const pair = template.slice(index, index + 2)
        increment(pairs, pair)
    }

    for (let index = 0; index < 40; index++) {
        pairs = process(pairs, rules)
    }

    /** @type Map<string,number> */
    const counts = new Map()

    for (const [pair, count] of pairs.entries()) {
        increment(counts, pair[0], count)
    }

    // Update the count for the last letter
    increment(counts, template[template.length - 1])

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
