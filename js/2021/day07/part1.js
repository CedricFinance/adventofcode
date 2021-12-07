import * as aoc from '../../2020/aoc.js'

function computeFuel(numbers, position) {
    var result = 0
    for (const n of numbers) {
        result += Math.abs(n - position)
    }

    return result
}

aoc.run(function(input) {
    const numbers = input.content().split(",").map(str => parseInt(str, 10))

    var result = 0

    numbers.sort((a, b) => a - b)

    const median = numbers[numbers.length / 2]
    console.log(median);

    return computeFuel(numbers, median)
})

