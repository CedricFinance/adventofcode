import * as fs from 'fs'

const groups = fs.readFileSync("input.txt", "utf-8").trim().split("\n\n")

function countQuestions(group) {
    const questions = new Set()
    for (const answers of group) {
        for (const answer of answers) {
            questions.add(answer)
        }
    }
    return questions.size
}

let result = 0
for (const group of groups) {
    result += countQuestions(group.split("\n"))
}
console.log(result);