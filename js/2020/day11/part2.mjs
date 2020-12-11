import * as fs from 'fs'

const FLOOR = "."
const EMPTY = "L"
const OCCUPIED = "#"

const seats = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => line.split(""))

function isValid(seats, rowIndex, colIndex) {
    if (rowIndex < 0 || colIndex < 0) {
        return false
    }

    if (rowIndex >= seats.length || colIndex >= seats[0].length) {
        return false
    }

    return true
}

function isOccupied(seats, rowIndex, colIndex) {
    if (!isValid(seats, rowIndex, colIndex)) {
        return false
    }
    return seats[rowIndex][colIndex] == OCCUPIED
}


function cacheKey(rowIndex, colIndex) {
    return ""+rowIndex+"-"+colIndex
}

function findFirstSeat(seats, rowIndex, colIndex, dirX, dirY) {
    let pos = { rowIndex: rowIndex + dirX, colIndex: colIndex + dirY }
    while(isValid(seats, pos.rowIndex, pos.colIndex)) {
        if (seats[pos.rowIndex][pos.colIndex] !== FLOOR) {
            return pos
        }

        pos = { rowIndex: pos.rowIndex + dirX, colIndex: pos.colIndex + dirY }
    }

    return null
}

const visibleSeatsCache = new Map()
function getVisibleSeats(seats, rowIndex, colIndex) {
    const key = cacheKey(rowIndex, colIndex)
    if (visibleSeatsCache.has(key)) {
        return visibleSeatsCache.get(key)
    }

    const visibleSeats = []

    let seat
    seat = findFirstSeat(seats, rowIndex, colIndex, -1, -1)
    if (seat) { visibleSeats.push(seat) }
    seat = findFirstSeat(seats, rowIndex, colIndex, -1,  0)
    if (seat) { visibleSeats.push(seat) }
    seat = findFirstSeat(seats, rowIndex, colIndex, -1,  1)
    if (seat) { visibleSeats.push(seat) }

    seat = findFirstSeat(seats, rowIndex, colIndex,  0, -1)
    if (seat) { visibleSeats.push(seat) }
    seat = findFirstSeat(seats, rowIndex, colIndex,  0,  1)
    if (seat) { visibleSeats.push(seat) }

    seat = findFirstSeat(seats, rowIndex, colIndex,  1, -1)
    if (seat) { visibleSeats.push(seat) }
    seat = findFirstSeat(seats, rowIndex, colIndex,  1,  0)
    if (seat) { visibleSeats.push(seat) }
    seat = findFirstSeat(seats, rowIndex, colIndex,  1,  1)
    if (seat) { visibleSeats.push(seat) }

    visibleSeatsCache.set(key, visibleSeats)

    return visibleSeats
}

function countOccupied(seats, rowIndex, colIndex) {
    const visibleSeats = getVisibleSeats(seats, rowIndex, colIndex)

    let count = 0
    for (const { rowIndex, colIndex } of visibleSeats) {
        count += isOccupied(seats, rowIndex, colIndex)
    }

    return count
}

function updateSeats(seats) {
    const changes = []
    for (let rowIndex = 0; rowIndex < seats.length; rowIndex++) {
        const row  = seats[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const element = row[colIndex];
            if (element == FLOOR) {
                continue
            }

            const occupiedSeats = countOccupied(seats, rowIndex, colIndex)
            if (element == EMPTY && occupiedSeats == 0) {
                changes.push({
                    value: OCCUPIED,
                    rowIndex,
                    colIndex
                })
            }
            if (element == OCCUPIED && occupiedSeats >= 5) {
                changes.push({
                    value: EMPTY,
                    rowIndex,
                    colIndex
                })
            }
        }
    }

    for (const change of changes) {
        seats[change.rowIndex][change.colIndex] = change.value
    }

    return changes.length
}

function display(seats) {
    for (const row of seats) {
        console.log(row.join(""));
    }
    console.log();
}

let roundCount = 0;

while(true) {
    //display(seats)
    const modifiedSeats = updateSeats(seats)
    roundCount++
    if (modifiedSeats == 0) {
        break
    }
}

console.log("rounds", roundCount);

let count = 0
for (let rowIndex = 0; rowIndex < seats.length; rowIndex++) {
    const row  = seats[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const element = row[colIndex];
        if (element == OCCUPIED) {
            count++
        }
    }
}
console.log(count);
// 3037 too high