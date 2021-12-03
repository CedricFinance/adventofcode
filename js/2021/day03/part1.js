import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    const lines = input.lines()

    const zeroCounts = []
    const oneCounts = []

    for (const line of lines) {
        for (let index = 0; index < line.length; index++) {
            const element = line[index];
            if (element == "0") {
                zeroCounts[index] = (zeroCounts[index] || 0) + 1
            } else {
                oneCounts[index] = (oneCounts[index] || 0) + 1
            }
        }
    }

    var result = 0

    const gamma = []
    const epsilon = []

    for (let i = 0; i < zeroCounts.length; i++) {
        if (zeroCounts[i] > oneCounts[i]) {
            gamma.push("0")
            epsilon.push("1")
        } else {
            gamma.push("1")
            epsilon.push("0")
        }
    }

    const gammaNum = parseInt(gamma.join(""), 2)
    const epsilonNum = parseInt(epsilon.join(""), 2)

    return gammaNum * epsilonNum
})
