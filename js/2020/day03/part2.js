import * as aoc from '../aoc.js'

aoc.run(function(input) {
    const lines = input.lines()

    function countTrees(lines, slope) {
        var x = 0
        var trees = 0

        for (let i = 0; i < lines.length; i += slope.y) {
            var line = lines[i]
            if (line[x % line.length] == "#") {
                trees++
            }
            x += slope.x
        }

        return trees
    }

    const slopes = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 },
    ]

    const counts = slopes.map(slope => countTrees(lines, slope))
    const result = counts.reduce((acc, count) => acc * count, 1)

    return result
})