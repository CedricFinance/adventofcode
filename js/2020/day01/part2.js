import * as aoc from '../aoc.js'

aoc.run(function(input) {
    const report = input.numbers()

    const numbers = new Set()

    report.forEach(d => numbers.add(d))

    for(let i = 0; i < report.length; i++) {
        const first = report[i]
        for(let j = 0; j < report.length; j++) {
            const second = report[j]
            const third = 2020 - first - second
            if (numbers.has(third)) {
                return first * second * third
            }
        }
    }

    return 0
})