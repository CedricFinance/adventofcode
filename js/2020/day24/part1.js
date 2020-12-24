import * as aoc from '../aoc.js'

const directions = [
    { dir: "se", apply: ({x,y}) => ({ x: x+0.5, y: y-1}) },
    { dir: "sw", apply: ({x,y}) => ({ x: x-0.5, y: y-1}) },
    { dir: "nw", apply: ({x,y}) => ({ x: x-0.5, y: y+1}) },
    { dir: "ne", apply: ({x,y}) => ({ x: x+0.5, y: y+1}) },
    { dir: "e", apply: ({x,y}) => ({ x: x+1, y}) },
    { dir: "w", apply: ({x,y}) => ({ x: x-1, y}) },
]

function parseDirections(str) {
    let result = []
    let remainingStr = str
    while(remainingStr !== "") {
        for (const d of directions) {
            if (remainingStr.startsWith(d.dir)) {
                result.push(d)
                remainingStr = remainingStr.slice(d.dir.length)
                break
            }
        }
    }
    return result
}

function getCoords(start, flip) {
    let coords = start
    for (const f of flip) {
        coords = f.apply(coords)
    }
    return coords
}

aoc.run(function(input) {
    const flips = input.lines().map(parseDirections)

    const blackTiles = new Set()

    for (const flip of flips) {
        const coords = getCoords({x:0,y:0}, flip)
        const key = JSON.stringify(coords)
        if (blackTiles.has(key)) {
            blackTiles.delete(key)
        } else {
            blackTiles.add(key)
        }
    }

    return blackTiles.size
})
