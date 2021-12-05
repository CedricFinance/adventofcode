import * as aoc from '../../2020/aoc.js'

function parsePoint(str) {
    const [x, y] = str.split(",").map(s => parseInt(s, 10))
    return { x, y }
}

aoc.run(function(input) {
    const lines = input.lines()

    const d = []
    for (const line of lines) {
        const [left, right] = line.split(" -> ")
        const start = parsePoint(left)
        const end = parsePoint(right)
        d.push({
            start,
            end
        })
    }

    var result = 0

    const points = new Map()
    for(const line of d) {
        if (line.start.x == line.end.x) {
            const s = Math.min(line.start.y, line.end.y)
            const e = Math.max(line.start.y, line.end.y)
            for (let y = s; y <= e; y++) {
                var count = points.get(`${line.start.x},${y}`) || 0
                count++
                points.set(`${line.start.x},${y}`, count)
            }
        } else if (line.start.y == line.end.y) {
            const s = Math.min(line.start.x, line.end.x)
            const e = Math.max(line.start.x, line.end.x)
            for (let x = s; x <= e; x++) {
                var count = points.get(`${x},${line.start.y}`) || 0
                count++
                points.set(`${x},${line.start.y}`, count)
            }
        } else {
            const incrX = Math.sign(line.end.x - line.start.x)
            const incrY = Math.sign(line.end.y - line.start.y)

            var sX = line.start.x
            var sY = line.start.y
            for (let i = 0; i < Math.abs(line.end.x - line.start.x) + 1; i++) {
                var count = points.get(`${sX},${sY}`) || 0
                count++
                points.set(`${sX},${sY}`, count)
                sX += incrX
                sY += incrY
            }
        }
    }

    for (const count of points.values()) {
        if (count > 1) {
            result++
        }
    }

    return result
})

