import * as aoc from '../../2020/aoc.js'

function intersect1D(firstRange, secondRange) {
    const start = Math.max(firstRange[0], secondRange[0])
    const end = Math.min(firstRange[1], secondRange[1])

    if (start <= end) {
        return [start, end]
    }

    return null
}

function intersection(firstCube, secondCube) {
    const xIntersection = intersect1D(firstCube.x, secondCube.x)
    if (!xIntersection) { return null}

    const yIntersection = intersect1D(firstCube.y, secondCube.y)
    if (!yIntersection) { return null}

    const zIntersection = intersect1D(firstCube.z, secondCube.z)
    if (!zIntersection) { return null}

    return {
        x: xIntersection,
        y: yIntersection,
        z: zIntersection
    }
}

function cubeSize({ x, y, z }) {
    return (x[1] - x[0] + 1) * (y[1] - y[0] + 1) * (z[1] - z[0] + 1)
}

aoc.run(function(input) {
    const lines = input.lines()
    const data = lines.map(line => {
        const [onOff, coordsStr ] = line.split(" ")
        const [x, y, z] = coordsStr.split(",").map(s => {
            const [, range ] = s.split("=")
            return range.split("..").map(str => parseInt(str, 10))
        })
        return { onOff, range: { x, y, z } }
    })

    const previousInsts = []

    for (let index = 0; index < data.length; index++) {
        const inst = data[index];
        const intersects = []
        for (const otherInst of previousInsts) {
            const range = intersection(inst.range, otherInst.range)
            if (range) {
                intersects.push({ onOff: otherInst.onOff == "on" ? "off" : "on", range })
            }
        }
        previousInsts.push(...intersects)
        if (inst.onOff == "on") {
            previousInsts.push(inst)
        }
    }

    var result = 0
    for (const inst of previousInsts) {
        const size = cubeSize(inst.range)
        if (inst.onOff == "on") {
            result += size
        } else {
            result -= size
        }
    }
    return result
})

