import * as aoc from '../../2020/aoc.js'

/**
 *
 * @param {{x: number, y: number}} coords
 * @param {{xRange: [number, number], yRange: [number, number]}} target
 * @returns
 */
 function targetReached(coords, { xRange, yRange }) {
    return (coords.x >= xRange[0] && coords.x <= xRange[1])
        && (coords.y >= yRange[0] && coords.y <= yRange[1])
}

/**
 *
 * @param {{x: number, y: number}} coords
 * @param {{xRange: [number, number], yRange: [number, number]}} target
 * @returns
 */
 function targetUnreachable(coords, { xRange, yRange }) {
    return coords.x > xRange[1] || coords.y < yRange[0]
 }

/**
 *
 * @param {number} xVelocity
 * @param {number} yVelocity
 * @param {{xRange: [number, number], yRange: [number, number]}} target
 */
function simulate(xVelocity, yVelocity, target) {
    var coords = { x: 0, y: 0 }
    var maxY = 0
    while( !targetReached(coords, target) ) {

        coords.x += xVelocity
        coords.y += yVelocity

        if (xVelocity > 0) { xVelocity-- }
        else if (xVelocity < 0) { xVelocity++ }

        yVelocity--

        if (coords.y > maxY) {
            maxY = coords.y
        }

        if (targetUnreachable(coords, target)) {
            return { success: false, maxY }
        }
    }

    return { success: true, maxY }
}

aoc.run(function(input) {
    const content = input.content()
    const [, data] = content.split(": ")
    const [xStr, yStr] = data.split(", ").map(str => str.split("="))
    const xRange = xStr[1].split("..").map(s => parseInt(s, 10))
    const yRange = yStr[1].split("..").map(s => parseInt(s, 10))


    var results = new Set()

    var maxY = 0
    for (let xVelocity= 0; xVelocity <= xRange[1]; xVelocity++) {
        for (let yVelocity = yRange[0]; yVelocity < 100; yVelocity++) {
            const { success } = simulate(xVelocity, yVelocity, { xRange, yRange })

            if (success) {
                results.add(`${xVelocity},${yVelocity}`)
            }
        }

    }

    return results.size
})
