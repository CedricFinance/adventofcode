import * as fs from 'fs'

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

const minTimestamp = parseInt(lines[0], 10)

const busIDs = lines[1].split(",").filter(s => s != "x").map(s => parseInt(s, 10))

const waitTimes = busIDs.map(busID => ({ minWait: busID - (minTimestamp % busID), busID }))

let min = waitTimes[0]

for (let waitTime of waitTimes) {
    if (waitTime.minWait < min.minWait) {
        min = waitTime
    }
}

console.log(min.minWait * min.busID);
