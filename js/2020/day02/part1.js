fs = require('fs')

function parseEntry(str) {
    const [policy, password] = str.split(":").map(str => str.trim())
    const [repetitions, letter] = policy.split(" ")
    const [min, max] = repetitions.split("-").map(str => parseInt(str, 10))
    return {
        policy: { min, max, letter },
        password
    }
}

function isValid(password, policy) {
    const letters = password.split("")
    const count = letters.filter(letter => letter == policy.letter).length
    return count >= policy.min && count <= policy.max
}

const entries = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(parseEntry)
const validPasswords = entries.filter(entry => isValid(entry.password, entry.policy))
console.log(validPasswords.length)