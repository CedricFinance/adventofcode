import * as aoc from '../../2020/aoc.js'
import { parseScanners } from './index.js'

/**
 *
 * @param {Set<string>} firstSet
 * @param {Set<string>} secondSet
 */
function intersection(firstSet, secondSet) {
    const result = []
    for (const value of firstSet.values()) {
        if (secondSet.has(value)) {
            result.push(value)
        }
    }
    return result
}

/**
 *
 * @param {[number, number, number]} param0
 */
function pointRotationsZ([ x, y, z]) {
    return [
        [  x,  y,  z],
        [  y, -x,  z],
        [ -x, -y,  z],
        [ -y,  x,  z]
    ]
}

/**
 *
 * @param {[number, number, number]} param0
 */
 function pointRotationsY([ x, y, z]) {
    return [
        [  x,  y,  z],
        [ -z,  y,  x],
        [ -x,  y, -z],
        [  z,  y, -x]
    ]
}

/**
 *
 * @param {[number, number, number]} param0
 */
 function pointRotationsX([ x, y, z]) {
    return [
        [  x,  y,  z],
        [  x, -z,  y],
        [  x, -y, -z],
        [  x,  z, -y]
    ]
}

/**
 *
 * @param {[number, number, number]} param0
 */
function computeRotations([x, y, z]) {
    const result = []

    // Z
    result.push(...pointRotationsZ([  x,  y,  z]))
    result.push(...pointRotationsZ([  y,  x,  -z]))

    // Y
    result.push(...pointRotationsY([  y,  z,  x]))
    result.push(...pointRotationsY([  x, -z,  y]))

    // X
    result.push(...pointRotationsX([  z,  x,  y]))
    result.push(...pointRotationsX([ -z,  y,  x]))

    return result
}

function diff(first, second) {
    return first.map((v, index) => v - second[index])
}

function add(first, second) {
    return first.map((v, index) => v + second[index])
}

aoc.run(function(input) {
    const scanners = parseScanners(input)

    scanners.forEach(scanner => {
        const rotations = new Array(24)
        for (let index = 0; index < rotations.length; index++) {
            rotations[index] = []
        }
        for (const pos of scanner.positions) {
            const rotatedPositions = computeRotations(pos)
            rotatedPositions.forEach((rotatedPosition, i) => {
                rotations[i].push(rotatedPosition)
            })
        }
        scanner.rotations = rotations

        scanner.deltas = []
        for (const positions of scanner.rotations) {
            const deltasSet = new Map()
            for (let firstIndex = 0; firstIndex < positions.length; firstIndex++) {
                const firstPos = positions[firstIndex];
                for (let secondIndex = 0; secondIndex < positions.length; secondIndex++) {
                    if (secondIndex == firstIndex) {
                        continue
                    }
                    const secondPos = positions[secondIndex];
                    const d = diff(firstPos, secondPos)
                    if (deltasSet.has(JSON.stringify(d))) {
                        console.log(`Scanner ${scanner.id}: collision: ${d} (diff ${d})`);
                        throw new Error("colision")
                    }
                    deltasSet.set(JSON.stringify(d), [firstIndex, secondIndex])

                }
            }
            scanner.deltas.push(deltasSet)
        }

    })

    const stack = []
    stack.push(scanners[0])

    scanners[0].deltasMap = scanners[0].deltas[0]
    scanners[0].position = [0,0,0]

    while(stack.length > 0) {
        const firstScanner = stack.pop()

        console.log(`Looking for a pair with scanner ${firstScanner.id}`);

        for (let index = 0; index < scanners.length; index++) {
            const secondScanner = scanners[index];
            if (secondScanner.id == firstScanner.id || secondScanner.position) {
                continue
            }

            for (let secondDeltasIndex = 0; secondDeltasIndex < secondScanner.deltas.length; secondDeltasIndex++) {
                const deltas = secondScanner.deltas[secondDeltasIndex]
                const common = intersection(new Set(firstScanner.deltasMap.keys()), new Set(deltas.keys()))

                if (common.length >= 12*11) {
                    console.log(`  Found ${common.length} deltas in common between scanner ${firstScanner.id} and scanner ${secondScanner.id} (${secondDeltasIndex})`);
                    const scannerPositionCandidates = new Set()

                    common.forEach(delta => {
                        const firstPoints = firstScanner.deltasMap.get(delta).map(i => firstScanner.positions[i])
                        const otherPoints = deltas.get(delta).map(i => secondScanner.rotations[secondDeltasIndex][i])
                        scannerPositionCandidates.add(JSON.stringify(diff(firstPoints[0], otherPoints[0])))
                        scannerPositionCandidates.add(JSON.stringify(diff(firstPoints[1], otherPoints[1])))
                    })

                    secondScanner.position = JSON.parse(scannerPositionCandidates.values().next().value)
                    console.log(`  Scanner ${secondScanner.id} position is ${secondScanner.position}`);

                    secondScanner.deltasMap = deltas
                    secondScanner.positions = secondScanner.rotations[secondDeltasIndex]

                    for (let ii = 0; ii < secondScanner.positions.length; ii++) {
                        secondScanner.positions[ii] = add(secondScanner.positions[ii], secondScanner.position)
                    }

                    stack.push(secondScanner)
                    break
                }
            }

        }
    }

    const beacons = new Set()
    for (const scanner of scanners) {
        for (const pos of scanner.positions) {
            beacons.add(pos.join())
        }
    }

    return beacons.size
})
