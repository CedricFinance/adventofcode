import * as aoc from '../../2020/aoc.js'

const digits = [
    {
        digit: "0",
        segments: new Set(["a", "b", "c", "e", "f", "g"]) // 6
    },
    {
        digit: "1",
        segments: new Set(["c", "f"]), // 2
        easy: true
    },
    {
        digit: "2",
        segments: new Set(["a", "c", "d", "e", "g"]) // 5
    },
    {
        digit: "3",
        segments: new Set(["a", "c", "d", "f", "g"]) // 5
    },
    {
        digit: "4",
        segments: new Set(["b", "c", "d", "f"]), // 4
        easy: true
    },
    {
        digit: "5",
        segments: new Set(["a", "b", "d", "f", "g"]) // 5
    },
    {
        digit: "6",
        segments: new Set(["a", "b", "d", "e", "f", "g"]) // 6
    },
    {
        digit: "7",
        segments: new Set(["a", "c", "f"]), // 3
        easy: true
    },
    {
        digit: "8",
        segments: new Set(["a", "b", "c", "d", "e", "f", "g"]), // 7
        easy: true
    },
    {
        digit: "9",
        segments: new Set(["a", "b", "c", "d", "f", "g"]) // 6
    },
]

/**
 *
 * @param {string[]} signals
 */
function deduceMapping(signals) {

    /** @type Map<string,number> */
    var counts = new Map()
    for (const signal of signals) {
        for (const letter of signal) {
            const count = counts.get(letter) || 0
            counts.set(letter, count + 1)
        }
    }

    /** @type Map<string,string> */
    const segmentsMapping = new Map()

    /** @type Map<number,string> */
    const countToSegment = new Map()
    countToSegment.set(4, "e")
    countToSegment.set(6, "b")
    countToSegment.set(9, "f")
    // e 4
    // b 6
    // f 9
    // c 8
    // a 8
    // d 7
    // g 7

    for (const [letter, count] of counts.entries()) {
        if (countToSegment.has(count)) {
            segmentsMapping.set(letter, countToSegment.get(count))
        }
    }

    const oneSignal = signals.find(s => s.length == 2).split("")
    const c = oneSignal.find(s => !segmentsMapping.has(s))
    segmentsMapping.set(c, "c")
    const a = Array.from(counts.entries()).find(([letter, count]) => count == 8 && letter != c)[0]
    segmentsMapping.set(a, "a")

    const fourSignal = signals.find(s => s.length == 4).split("")
    const d = fourSignal.find(s => !segmentsMapping.has(s))
    segmentsMapping.set(d, "d")
    const g = Array.from(counts.entries()).find(([letter, count]) => count == 7 && letter != d)[0]
    segmentsMapping.set(g, "g")

    /** Map<string,string> */
    const reverseSegmentsMapping = new Map()
    for (const [from, to] of segmentsMapping.entries()) {
        reverseSegmentsMapping.set(to, from)
    }

    /** Map<string,string> */
    const result = new Map()
    for (const digit of digits) {
        const s = Array.from(digit.segments.values())
                       .map(letter => reverseSegmentsMapping.get(letter))
                       .sort()
                       .join("")
        result.set(s, digit.digit)
    }

    return result
}

aoc.run(function(input) {
    const lines = input.lines()

    const d = []
    for (const line of lines) {
        const [left, right] = line.split(" | ")
        d.push({
            left: left.split(" "),
            right: right.split(" ")
        })
    }

    var result = 0
    for (const line of d) {
        const mapping = deduceMapping(line.left)
        const value = line.right.map(str => mapping.get(str.split("").sort().join("")))
        result += parseInt(value.join(""), 10)
    }

    return result
})
