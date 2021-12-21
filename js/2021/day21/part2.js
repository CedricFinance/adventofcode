import * as aoc from '../../2020/aoc.js'

function countWins(playersPositions, scores, player) {
    const key = playersPositions.join()+scores.join()+player
    if (winsMemo.has(key)) {
        return winsMemo.get(key)
    }
    if (scores[0] >= 21) {
        return [1, 0]
    }
    if (scores[1] >= 21) {
        return [0, 1]
    }

    const nextPlayer = (player + 1) % 2

    const wins = [0, 0]

    for (const [moves, count] of countsByValues.entries()) {

        const newPosition = (playersPositions[player] - 1 + moves) % 10 + 1
        const newPlayersPositions = [...playersPositions]
        const newScores = [...scores]

        newPlayersPositions[player] = newPosition
        newScores[player] += newPosition


        const [wins0, wins1] = countWins(newPlayersPositions, newScores, nextPlayer)
        wins[0] += count * wins0
        wins[1] += count * wins1
    }

    winsMemo.set(key, wins)
    return wins
}

/** @type Map<number,number> */
var countsByValues = new Map()

for (let first = 1; first <= 3; first++) {
    for (let second = 1; second <= 3; second++) {
        for (let third = 1; third <= 3; third++) {
            const count = countsByValues.get(first+second+third) || 0
            countsByValues.set(first+second+third, count + 1)
        }
    }
}


const winsMemo = new Map()

aoc.run(function(input) {
    const playersPositions = input.lines().map(line => parseInt(line.split(": ")[1], 10))

    const scores = [ 0, 0 ]
    const player = 0

    const universeCounts = countWins(playersPositions, scores, player)

    return Math.max(...universeCounts)
})


