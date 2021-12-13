import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    const [lines, inst] = input.blocks()

    const points = lines
       .split("\n")
       .map(line => {
           const [x, y] = line.split(",")
                              .map(s => parseInt(s, 10))
            return { x, y }
       })

    const instr = inst.split("\n").map(line => {
        const [axe, valueStr] =line.split(" ")[2].split("=")
        return { axe, value: parseInt(valueStr, 10) }
    })

    var result = 0

    const fold = instr[0]
    if (fold.axe == "x") {
        for (const point of points) {
            if (point.x > fold.value) {
                point.x = 2 * fold.value - point.x
            }
        }
    } else {
        for (const point of points) {
            if (point.y > fold.value) {
                point.y = 2 * fold.value - point.y
            }
        }
    }

    const set = new Set()
    for (const point of points) {
        set.add(`${point.x},${point.y}`)
    }

    return set.size
})

