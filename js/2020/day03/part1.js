import * as aoc from '../aoc.js'

aoc.run(function(input) {
    const lines = input.lines()

    var x = 0
    var trees = 0

    for (const line of lines) {
        if (line[x % line.length] == "#") {
            trees++
        }
        x += 3
    }

    return trees
})
