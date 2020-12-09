import * as fs from 'fs'

const numbers = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => parseInt(line, 10))

const previousNumbers = new Set()
for (let index = 0; index < 25; index++) {
    const number = numbers[index];
    previousNumbers.add(number)
}

function isSumOfPreviousNumbers(number, numbers) {
    for (const first of numbers) {
        if (numbers.has(number - first)) {
            return true
        }
    }

    return false
}

for (let index = 25; index < numbers.length; index++) {
    const number = numbers[index];
    if (!isSumOfPreviousNumbers(number, previousNumbers)) {
        console.log("found number %d", number);
        break
    }
    previousNumbers.delete(numbers[index - 25])
    previousNumbers.add(numbers[index])
}