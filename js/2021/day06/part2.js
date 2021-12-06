import * as aoc from '../../2020/aoc.js'

/**
 *
 * @param {number[]} fishes
 */
function simulate(fishes) {
    const expiredTimers = fishes.shift()
    fishes.push(expiredTimers)
    fishes[6] += expiredTimers
}

aoc.run(function(input) {
    const fishes = input.content().split(",").map(str => parseInt(str, 10))
    const timers = new Array(9)
    timers.fill(0)

    for (const fishTimer of fishes) {
        timers[fishTimer]++
    }

    for (let day = 1; day <= 256; day++) {
        simulate(timers)
    }

    console.log(timers);
    return timers.reduce((acc, n) => acc + n, 0)
})

