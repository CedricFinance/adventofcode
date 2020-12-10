import * as fs from 'fs'

const numbers = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => parseInt(line, 10))

numbers.sort((a,b) => a-b)

const numbersSet = new Set(numbers)

const max = Math.max.apply(null, numbers)
numbersSet.add(0)
numbersSet.add(max+1)

const pathCounts = new Map()
pathCounts.set(0, 1)


for (const number of numbers) {
    let count = 0
    if (numbersSet.has(number - 1)) { count += pathCounts.get(number - 1) }
    if (numbersSet.has(number - 2)) { count += pathCounts.get(number - 2) }
    if (numbersSet.has(number - 3)) { count += pathCounts.get(number - 3) }
    pathCounts.set(number, count)
}

console.log("Number of arragements: %s", pathCounts.get(max));