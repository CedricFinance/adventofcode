import * as aoc from '../aoc.js'

let games = 0

function getStateKey(p1, p2) {
    return `${p1.join(",")}|${p2.join(",")}`
}

const gamesCache = new Map()

function noop(str, ...args) {
}

function play(player1, player2, log = noop) {
    games++
    const gameCount = games
    if (games % 1000 == 0) {
        log(`=== Game %d ===`, gameCount);
    }
    const gameKey = getStateKey(player1, player2)
    if (gamesCache.has(gameKey)) {
        return gamesCache.get(gameKey)
    }

    const previousRounds = new Set()

    let round = 0

    while(player1.length != 0 && player2.length != 0) {
        round ++

        const key = getStateKey(player1, player2)
        if (previousRounds.has(key)) {
            const result = {
                winning: 1,
                cards: player1
            }
            gamesCache.set(gameKey, result)
            return result
        }
        previousRounds.add(key)

        log()
        log(`-- Round ${round} (Game ${gameCount}) --`);
        log(`Player 1's deck: ${player1.join(", ")}`)
        log(`Player 2's deck: ${player2.join(", ")}`)

        const player1card = player1.shift()
        const player2card = player2.shift()

        log(`Player 1 plays: ${player1card}`);
        log(`Player 2 plays: ${player2card}`);

        if (player1.length >= player1card && player2.length >= player2card) {
            log("Playing a sub-game to determine the winner...");
            log();
            const { winning } = play(player1.slice(0, player1card), player2.slice(0, player2card), log)

            if (winning == 1) {
                player1.push(player1card)
                player1.push(player2card)
            } else {
                player2.push(player2card)
                player2.push(player1card)
            }
        } else {
            if (player1card > player2card) {
                log(`Player 1 wins round ${round} of game ${gameCount}!`)
                player1.push(player1card)
                player1.push(player2card)
            } else {
                log(`Player 2 wins round ${round} of game ${gameCount}!`)
                player2.push(player2card)
                player2.push(player1card)
            }
        }
    }

    let result
    if (player1.length == 0) {
        result = {
            winning: 2,
            cards: player2
        }
    } else {
        result = {
            winning: 1,
            cards: player1
        }
    }

    gamesCache.set(gameKey, result)
    return result
}

aoc.run(function(input) {
    const [player1str, player2str] = input.blocks()

    const player1 = player1str.split("\n").slice(1).map(s => parseInt(s, 10))
    const player2 = player2str.split("\n").slice(1).map(s => parseInt(s, 10))


    const { cards } = play(player1.slice(0), player2.slice(0))

    let result = 0
    let mult = cards.length
    for (const card of cards) {
        result += card * mult
        mult--
    }


    return result
})
