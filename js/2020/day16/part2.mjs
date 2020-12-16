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

function isValidTicket(ticket, rules) {
    for (const number of ticket) {
        if (!isValid(number, rules)) {
            return false
        }
    }

    return true
}

function validRules(number, rules) {
    const valid = new Set()

    for (const rule of rules) {
        for (const { min, max} of rule.intervals) {
            if (number >= min && number <= max) {
                valid.add(rule.name)
            }
        }
    }

    return valid
}

function getFieldsCandidates(ticket, rules) {
    const fields = []

    for (const number of ticket) {
        const valid = validRules(number, rules)
        fields.push(valid)
    }

    return fields
}

const validTickets = []

for (const ticket of nearbyTickets) {
    if (isValidTicket(ticket, rules)) {
        validTickets.push(ticket)
    }
}

console.log("%d tickets, %d valid tickets", nearbyTickets.length, validTickets.length);

const fieldsCandidates = []
for (const ticket of validTickets) {
    const candidates = getFieldsCandidates(ticket, rules)
    fieldsCandidates.push(candidates)
}

function intersection(firstSet, secondSet) {
    const result = new Set()
    for (const value of firstSet) {
        if (secondSet.has(value)) {
            result.add(value)
        }
    }
    return result
}

const commonCandidates = fieldsCandidates[0].map(s => new Set(s))
for (const candidates of fieldsCandidates) {
    for (let index = 0; index < candidates.length; index++) {
        const candidate = candidates[index];
        commonCandidates[index] = intersection(commonCandidates[index], candidate)
    }
}

//console.log("common", commonCandidates);

const fields = new Map()

while(fields.size < rules.length) {
    for (let index = 0; index < commonCandidates.length; index++) {
        const candidate = commonCandidates[index];
        if (candidate.size == 1) {
            const fieldName = candidate.keys().next().value
            fields.set(fieldName, index)
            console.log("found", index, fieldName);
            for (const c of commonCandidates) {
                c.delete(fieldName)
            }
            break
        }
    }
}

const myTicket = blocks[1].split("\n")[1].split(",").map(s => parseInt(s, 10))
console.log("myTicket", myTicket);

let result = 1
console.log(fields)
for (const [field, index] of fields.entries()) {
    if (field.startsWith("departure")) {
        result *= myTicket[index]
    }
}

console.log("result", result);