import * as fs from 'fs'

const numbers = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => parseInt(line, 10))

const target = 373803594

function findContiguousSum(target, numbers, minLength = 2) {
    let sum = 0
    let startIndex = 0
    let endIndex = 0

    for (let index = 0; index < numbers.length; index++) {
        let number = numbers[index]
        sum += number

        while(sum > target && index - startIndex + 1 > minLength) {
            sum -= numbers[startIndex]
            startIndex++
        }

        if (sum === target && startIndex != index) {
            endIndex = index
            break
        }
    }

    return {
        start: startIndex,
        end: endIndex
    }
}

const { start, end } = findContiguousSum(target, numbers)

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

console.log("Found contiguous sum [%d, %d]", start, end);

const { min, max } = minMax(numbers, start, end)
console.log("Min=%d, Max=%d, Answer=%d", min, max, min + max);