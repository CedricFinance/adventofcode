import * as fs from 'fs'

const numbers = fs.readFileSync("input.txt", "utf-8").trim().split(",").map(s => parseInt(s, 10))

const spokenNumbers = new Map()

let turn = 1
let lastNumber
for(let number of numbers) {
    lastNumber = number
    console.log(turn, lastNumber, spokenNumbers);

    spokenNumbers.set(number, [turn])
    turn++
}

while(turn <= 30_000_000) {
    console.log(turn);
    //console.log("last spoken", lastNumber);
    let spoken = spokenNumbers.get(lastNumber)
    if (spoken.length === 1) {
        lastNumber = 0
    } else {
        lastNumber = spoken[1] - spoken[0]
    }
    let newSpoken = spokenNumbers.get(lastNumber) || []
    newSpoken.push(turn)
    if (newSpoken.length > 2) {
        newSpoken = newSpoken.slice(1)
    }
    spokenNumbers.set(lastNumber, newSpoken)

    turn++
}

console.log(lastNumber);