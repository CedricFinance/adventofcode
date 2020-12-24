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

    let blackTiles = new Set()

    for (const flip of flips) {
        const coords = getCoords({x:0,y:0}, flip)
        const key = JSON.stringify(coords)
        if (blackTiles.has(key)) {
            blackTiles.delete(key)
        } else {
            blackTiles.add(key)
        }
    }

    function neighbours(c) {
        const {x, y} = c
        return [
            { x: x + 1, y },
            { x: x - 1, y },
            { x: x + 0.5, y: y - 1 },
            { x: x + 0.5, y: y + 1 },
            { x: x - 0.5, y: y - 1 },
            { x: x - 0.5, y: y + 1 }
        ]
    }

    function countBlackNeightbours(c, blackTiles) {
        let result = 0
        for (const n of neighbours(c)) {
            if (blackTiles.has(JSON.stringify(n))) {
                result++
            }
        }
        return result
    }

    function flipTiles(blackTiles) {
        const coords = Array.from(blackTiles.keys()).map(s => JSON.parse(s))

        const newBlackTiles = new Set()

        for (const c of coords) {
            const count = countBlackNeightbours(c, blackTiles)
            if (count == 0 || count > 2) {
            } else {
                newBlackTiles.add(JSON.stringify(c))
            }
        }

        for (const c of coords) {
            for (const n of neighbours(c)) {
                const key = JSON.stringify(n)
                if (!blackTiles.has(key)) {
                    if (countBlackNeightbours(n, blackTiles) == 2) {
                        newBlackTiles.add(key)
                    }
                }
            }
        }

        return newBlackTiles
    }

    let day = 0
    while(day < 100) {
        blackTiles = flipTiles(blackTiles)
        day++
    }

    return blackTiles.size
})
