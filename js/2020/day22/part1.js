import { fork } from 'child_process'
import * as aoc from '../aoc.js'

aoc.run(function(input) {
    const [player1str, player2str] = input.blocks()

    const player1 = player1str.split("\n").slice(1).map(s => parseInt(s, 10))
    const player2 = player2str.split("\n").slice(1).map(s => parseInt(s, 10))

    let result = 0


    while(player1.length != 0 && player2.length != 0) {
        const player1card = player1.shift()
        const player2card = player2.shift()

        if (player1card > player2card) {
            player1.push(player1card)
            player1.push(player2card)
        } else {
            player2.push(player2card)
            player2.push(player1card)
        }
    }

    const winning = (player1.length == 0) ? player2 : player1

    let mult = winning.length
    for (const card of winning) {
        result += card * mult
        mult--
    }
    return result
})
