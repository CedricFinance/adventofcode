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

while(turn <= 2020) {
    console.log("last spoken", lastNumber);
    let spoken = spokenNumbers.get(lastNumber)
    if (spoken.length === 1) {
        lastNumber = 0
    } else {
        lastNumber = spoken[spoken.length-1] - spoken[spoken.length-2]
    }
    const newSpoken = spokenNumbers.get(lastNumber) || []
    newSpoken.push(turn)
    spokenNumbers.set(lastNumber, newSpoken)

    turn++
}

console.log(lastNumber);