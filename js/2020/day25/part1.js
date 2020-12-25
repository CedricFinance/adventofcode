import * as aoc from '../aoc.js'

function transform(subjetNumber, loopSize) {
    let value = 1

    for (let index = 0; index < loopSize; index++) {
        value *= subjetNumber
        value = value % 20201227
    }

    return value
}

function guessLoopSize(publicKey) {
    let loopSize = 0

    let value = 1

    let v
    do {
        loopSize++

        value *= 7
        value = value % 20201227

    } while(value !== publicKey)

    return loopSize
}


aoc.run(function(input) {
    const numbers = input.numbers()

    const subjectNumber = 7

    const [ cardPublicKey, doorPublicKey ] = numbers

    const cardLoopSize = guessLoopSize(cardPublicKey)

    return transform(doorPublicKey, cardLoopSize)
})
