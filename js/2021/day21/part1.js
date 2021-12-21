import * as aoc from '../../2020/aoc.js'

var diceNextValue = 1
var count = 0

function roll() {
    count++
    const result = diceNextValue
    diceNextValue++
    diceNextValue = (diceNextValue - 1) % 100 + 1
    return result
}

aoc.run(function(input) {
    const playersPositions = input.lines().map(line => parseInt(line.split(": ")[1], 10))

    const scores = [ 0, 0 ]

    let player = 0
    while(scores[0] < 1000 && scores[1] < 1000) {
        const moves = roll() + roll() + roll()
        const newPosition = (playersPositions[player] - 1 + moves) % 10 + 1
        playersPositions[player] = newPosition
        scores[player] += newPosition

        player = (player + 1) % 2
    }

    if (scores[0] >= 1000) {
        return scores[1] * count
    }

    return scores[0] * count
})

// 663336

