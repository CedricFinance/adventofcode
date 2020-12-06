import * as fs from 'fs'

const groups = fs.readFileSync("input.txt", "utf-8").trim().split("\n\n")

function countQuestions(group) {
    const questions = new Map()

    for (const answers of group) {
        for (const answer of answers) {
            let count = questions.get(answer) || 0
            questions.set(answer, count + 1)
        }
    }

    let result = 0
    for (let c of Array.from(questions.values())) {
        if (c == group.length) {
            result++
        }
    }
    return result
}

let result = 0
for (const group of groups) {
    result += countQuestions(group.split("\n"))
}
console.log(result);