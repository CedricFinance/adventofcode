import * as aoc from '../../2020/aoc.js'

/**
 *
 * @param {*} xVelocity
 * @param {*} yVelocity
 * @param {*} xRange
 * @param {*} yRange
 */
function simulate(xVelocity, yVelocity, xRange, yRange) {
    var coords = { x: 0, y: 0 }
    var maxY = 0
    while( (coords.x < xRange[0] || coords.x > xRange[1]) || (coords.y < yRange[0] || coords.y > yRange[1]) ) {

        coords.x += xVelocity
        coords.y += yVelocity

        if (xVelocity > 0) { xVelocity-- }
        else if (xVelocity < 0) { xVelocity++ }

        yVelocity--

        if (coords.y > maxY) {
            maxY = coords.y
        }

        if (coords.x > xRange[1] || coords.y < yRange[0]) {
            /** @type [boolean, number] */
            const result = [false, maxY]
            return result
        }

      /*  if (xVelocity == 0 && yVelocity == 0) {
            /** @type [boolean, number] * /
            const result = [false, maxY]
            return result
        }
        */
    }

    /** @type [boolean, number] */
    const r = [true, maxY]

    return r
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
            const [ok, maxYReached] = simulate(xVelocity, yVelocity, xRange, yRange)

            if (ok) {
                results.add(`${xVelocity},${yVelocity}`)
            }
        }

    }

    return results.size
})

// 1078