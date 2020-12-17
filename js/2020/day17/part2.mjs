import * as fs from 'fs'

const grid = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(s => s.split("").map(c => c === '#'))

let activeCells = new Set()

function cellKey(point) {
    const [x, y, z, w] = point
    return `${x}|${y}|${z}|${w}`
}

function decodeKey(str) {
    return str.split("|").map(s => parseInt(s, 10))
}

for (let row = 0; row < grid.length; row++) {
    const r = grid[row];
    for (let col = 0; col < r.length; col++) {
        const cubeStatus = r[col];
        if (cubeStatus) {
            activeCells.add(cellKey([col, row, 0, 0]))
        }
    }
}

function getNeighboors(point) {
    const [x, y, z, w] = point
    const result = []

    const offsets = [-1, 0, 1]

    for (const xOffset of offsets) {
        for (const yOffset of offsets) {
            for (const zOffset of offsets) {
                for (const wOffset of offsets) {
                    if (xOffset == 0 && yOffset == 0 && zOffset == 0 && wOffset == 0) {
                        continue
                    }
                    result.push([ x + xOffset, y + yOffset, z + zOffset, w + wOffset ])
                }
            }
        }
    }

    return result
}

function nextCycle(activeCells) {
    const coordinates = new Set()
    for (const cell of activeCells) {
        const c = decodeKey(cell)
        coordinates.add(c)
        getNeighboors(c).forEach(n => coordinates.add(n))
    }

    const newActiveCells = new Set()

    for (const point of coordinates) {
        const actives = getNeighboors(point).map(p => activeCells.has(cellKey(p))).filter(active => active).length
        if (activeCells.has(cellKey(point))) {
            if (actives === 2 || actives === 3) {
                newActiveCells.add(cellKey(point))
            }
        } else {
            if (actives === 3) {
                newActiveCells.add(cellKey(point))
            }
        }
    }

    return newActiveCells
}

for (let cycle = 0; cycle < 6; cycle++) {
    console.log("cycle:", cycle);
    activeCells = nextCycle(activeCells)
}

console.log(activeCells.size);