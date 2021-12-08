import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    const lines = input.lines()

    const d = []
    for (const line of lines) {
        const [left, right] = line.split(" | ")
        d.push({
            left: left.split(" "),
            right: right.split(" ")
        })
    }

    var result = 0
    for (const line of d) {
        for (const str of line.right) {
            if ( (str.length >= 2 && str.length <= 4) || str.length == 7) {
                result ++
            }
        }
    }

    return result
})

