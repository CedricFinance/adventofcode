import * as fs from 'fs'

const numbers = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => parseInt(line, 10))

numbers.sort((a,b) => a-b)

let currentJoltage = 0
let joltageDiffs = [ 0, 0, 0, 0 ]

for (const number of numbers) {
    console.log(number);
    joltageDiffs[number - currentJoltage] ++
    currentJoltage = number
}

joltageDiffs[3]++

console.log(joltageDiffs);
console.log(joltageDiffs[1] * joltageDiffs[3]);