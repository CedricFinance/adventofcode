import * as aoc from '../../2020/aoc.js'

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

    var result = 0

    const grid = new Array(50 * 2 + 1)
    for (let xIndex = 0; xIndex < grid.length; xIndex++) {
        grid[xIndex] = new Array(50 * 2 + 1)
        for (let yIndex = 0; yIndex < grid.length; yIndex++) {
            grid[xIndex][yIndex] = new Array(50 * 2 + 1)
            grid[xIndex][yIndex].fill(false)
        }
    }

    for (const inst of data) {
        const state = inst.onOff == "on"
        for (let xIndex = inst.range.x[0]; xIndex <= inst.range.x[1]; xIndex++) {
            if (xIndex < -50) {
                continue
            }
            if (xIndex > 50) {
                break
            }
            for (let yIndex = inst.range.y[0]; yIndex <= inst.range.y[1]; yIndex++) {
                if (yIndex < -50) {
                    continue
                }
                if (yIndex > 50) {
                    break
                }
                    for (let zIndex = inst.range.z[0]; zIndex <= inst.range.z[1]; zIndex++) {
                        if (zIndex < -50) {
                            continue
                        }
                        if (zIndex > 50) {
                            break
                        }

                        grid[xIndex + 50][yIndex + 50][zIndex + 50] = state
                }
            }
        }
    }

    for (const xRow of grid) {
        for (const yRow of xRow) {
            for (const cell of yRow) {
                if (cell) {
                    result++
                }
            }
        }
    }
    return result
})

