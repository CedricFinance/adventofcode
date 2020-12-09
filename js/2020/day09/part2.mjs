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


const target = 373803594

let sum = 0
let startIndex = 0
let endIndex = 0

for (let index = 0; index < numbers.length; index++) {
    let number = numbers[index]
    sum += number
    if (sum === target && startIndex != index) {
        endIndex = index
        break
    } else {
        while(sum > target && startIndex < index) {
            sum -= numbers[startIndex]
            startIndex++
        }
        if (sum === target && startIndex != index) {
            endIndex = index
            break
        }
    }
}

function minMax(numbers, start, end) {
    var min = numbers[start]
    var max = numbers[end]
    for (let index = start + 1; index <= end; index++) {
        const element = numbers[index];
        if (element < min) { min = element }
        if (element > max) { max = element }
    }
    return {
        min,
        max
    }   
}

console.log(sum, startIndex, endIndex);

const { min, max } = minMax(numbers, startIndex, endIndex)
console.log(min, max, min + max);