const { listenerCount } = require('process')

fs = require('fs')

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

var x = 0
var trees = 0

for (const line of lines) {
    if (line[x % line.length] == "#") {
        trees++
    }
    x += 3
}

console.log(trees)