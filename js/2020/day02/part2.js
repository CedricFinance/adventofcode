import * as aoc from '../aoc.js'

function parseEntry(str) {
    const [policy, password] = str.split(":").map(str => str.trim())
    const [repetitions, letter] = policy.split(" ")
    const indexes = repetitions.split("-").map(str => parseInt(str, 10))
    return {
        policy: { indexes, letter },
        password
    }
}

function isValid(password, policy) {
    const letters = password.split("")
    const count = policy.indexes.filter(index => letters[index-1] == policy.letter).length
    return count == 1
}

aoc.run(function(input) {
    const entries = input.lines().map(parseEntry)
    const validPasswords = entries.filter(entry => isValid(entry.password, entry.policy))
    return validPasswords.length
})