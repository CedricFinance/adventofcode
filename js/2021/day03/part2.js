import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    const lines = input.lines()

    var zeroCounts = []
    var oneCounts = []

    var bitIndex = 0
    for (const line of lines) {
        const element = line[bitIndex];
        if (element == "0") {
            zeroCounts[bitIndex] = (zeroCounts[bitIndex] || 0) + 1
        } else {
            oneCounts[bitIndex] = (oneCounts[bitIndex] || 0) + 1
        }
    }

    var m = lines
    while(m.length > 1) {
        var expectedBit = oneCounts[bitIndex] >= zeroCounts[bitIndex] ? "1" : "0"
        m = m.filter(line => line[bitIndex] == expectedBit)   
        bitIndex++

        zeroCounts = []
        oneCounts = []

        for (const line of m) {
            const element = line[bitIndex];
            if (element == "0") {
                zeroCounts[bitIndex] = (zeroCounts[bitIndex] || 0) + 1
            } else {
                oneCounts[bitIndex] = (oneCounts[bitIndex] || 0) + 1
            }
        }
    }
    const oxygen = parseInt(m[0], 2)
    console.log(oxygen);

    bitIndex = 0
    for (const line of lines) {
        const element = line[bitIndex];
        if (element == "0") {
            zeroCounts[bitIndex] = (zeroCounts[bitIndex] || 0) + 1
        } else {
            oneCounts[bitIndex] = (oneCounts[bitIndex] || 0) + 1
        }
    }

    var m = lines
    while(m.length > 1) {
        var expectedBit = zeroCounts[bitIndex] <= oneCounts[bitIndex] ? "0" : "1"
        m = m.filter(line => line[bitIndex] == expectedBit)   
        bitIndex++

        zeroCounts = []
        oneCounts = []
    
        for (const line of m) {
            const element = line[bitIndex];
            if (element == "0") {
                zeroCounts[bitIndex] = (zeroCounts[bitIndex] || 0) + 1
            } else {
                oneCounts[bitIndex] = (oneCounts[bitIndex] || 0) + 1
            }
        }
    }

    const co2 = parseInt(m[0], 2)
    console.log(co2);

    return oxygen * co2
})
