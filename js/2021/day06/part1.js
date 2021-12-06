import * as aoc from '../../2020/aoc.js'

/**
 *
 * @param {number[]} fishes
 */
function simulate(fishes) {
    const count = fishes.length

    for (let index = 0; index < count; index++) {
        var fishTimer = fishes[index]
        if (fishTimer == 0) {
            fishTimer = 6
            fishes.push(8)
        } else {
            fishTimer--
        }
        fishes[index] = fishTimer
    }
}

aoc.run(function(input) {
    const fishes = input.content().split(",").map(str => parseInt(str, 10))

    for (let day = 1; day <= 80; day++) {
        simulate(fishes)
    }

    return fishes.length
})

