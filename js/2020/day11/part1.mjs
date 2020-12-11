import * as fs from 'fs'

const FLOOR = "."
const EMPTY = "L"
const OCCUPIED = "#"

const seats = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(line => line.split(""))

function isOccupied(seats, rowIndex, colIndex) {
    if (rowIndex < 0 || colIndex < 0) {
        return false
    }

    if (rowIndex >= seats.length || colIndex >= seats[0].length) {
        return false
    }

    return seats[rowIndex][colIndex] == OCCUPIED
}

function countOccupied(seats, rowIndex, colIndex) {
    let count = 0
    count += isOccupied(seats, rowIndex - 1, colIndex - 1)
    count += isOccupied(seats, rowIndex - 1, colIndex    )
    count += isOccupied(seats, rowIndex - 1, colIndex + 1)

    count += isOccupied(seats, rowIndex    , colIndex - 1)
    count += isOccupied(seats, rowIndex    , colIndex + 1)

    count += isOccupied(seats, rowIndex + 1, colIndex - 1)
    count += isOccupied(seats, rowIndex + 1, colIndex    )
    count += isOccupied(seats, rowIndex + 1, colIndex + 1)

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
            if (element == OCCUPIED && occupiedSeats >= 4) {
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

let roundCount = 0;

while(true) {
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