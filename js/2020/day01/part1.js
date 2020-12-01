fs = require('fs')

const report = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(x => parseInt(x, 10))
const numbers = new Set()

report.forEach(d => numbers.add(d))

report.forEach(d => {
  if (numbers.has(2020-d)) { console.log(d * (2020 - d)) }
})