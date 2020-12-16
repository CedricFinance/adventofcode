import * as fs from 'fs'

const blocks = fs.readFileSync("input.txt", "utf-8").trim().split("\n\n")

function parseInterval(str) {
    const [min, max] = str.split("-").map(s => parseInt(s, 10))
    return { min, max }
}

function parseRule(str) {
    const [name, intervalsStr] = str.split(": ")

    const intervals = intervalsStr.split(" or ").map(parseInterval)

    return {
        name,
        intervals
    }
}

const rules = blocks[0].split("\n").map(parseRule);

const nearbyTickets = blocks[2].split("\n").slice(1).map(line => line.split(",").map(p => parseInt(p, 10)));

function isValid(number, rules) {
    for (const rule of rules) {
        for (const { min, max} of rule.intervals) {
            if (number >= min && number <= max) {
                return true
            }
        }
    }

    return false
}


let result = 0
for (const ticket of nearbyTickets) {
    for (const number of ticket) {
        if (!isValid(number, rules)) {
            result += number
        }
    }
}

console.log("result:", result);