fs = require('fs')

const report = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(x => parseInt(x, 10))
const numbers = new Set()

report.forEach(d => numbers.add(d))

outter:
for(i = 0; i < report.length; i++) {
    first = report[i]
    for(j = 0; j < report.length; j++) {
        second = report[j]
        const third = 2020 - first - second
        if (numbers.has(third)) {
            console.log(first * second * third)
            break outter
        }
    }
}