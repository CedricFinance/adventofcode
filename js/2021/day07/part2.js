import * as aoc from '../../2020/aoc.js'

// 1  1
// 2  3
// 3  6
function computeFuel(numbers, position) {
    var result = 0
    for (const n of numbers) {
        const diff = Math.abs(n - position)
        result += diff * (diff + 1) / 2
    }

    return result
}

aoc.run(function(input) {
    const numbers = input.content().split(",").map(str => parseInt(str, 10))

    var result = 0

    numbers.sort((a, b) => a - b)

    var p = numbers[0]
    var min = computeFuel(numbers, p)

    while(true) {
        const v = computeFuel(numbers, p)
        if (v > min) {
            break
        } else {
            min = v
        }
        p++
    }

    return min
})

