import * as fs from 'fs'

function parseInstruction(str) {
    return {
        action: str[0],
        value: parseInt(str.slice(1), 10)
    }
}

const instructions = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(parseInstruction)


const ship = {
    waypoint: {
        east: 10,
        north: 1
    },
    position: {
        east: 0,
        north: 0
    }
}

for (const instruction of instructions) {
    console.log(ship);
    let east
    let north

    switch (instruction.action) {
        case "F":
            ship.position.east += instruction.value * ship.waypoint.east
            ship.position.north += instruction.value * ship.waypoint.north
            break;

        case "N":
            ship.waypoint.north += instruction.value
            break;

        case "S":
            ship.waypoint.north -= instruction.value
            break;

        case "E":
            ship.waypoint.east += instruction.value
            break;

        case "W":
            ship.waypoint.east -= instruction.value
            break;

        case "L":
            switch (instruction.value) {
                case 90:
                    east = - ship.waypoint.north
                    north = ship.waypoint.east
                    ship.waypoint.east = east
                    ship.waypoint.north = north
                    break;

                case 180:
                    east = - ship.waypoint.east
                    north = - ship.waypoint.north
                    ship.waypoint.east = east
                    ship.waypoint.north = north
                    break;

                case 270:
                    east = ship.waypoint.north
                    north = - ship.waypoint.east
                    ship.waypoint.east = east
                    ship.waypoint.north = north
                    break;
            }
            break;

        case "R":
            switch (instruction.value) {
                case 90:
                    east = ship.waypoint.north
                    north = - ship.waypoint.east
                    ship.waypoint.east = east
                    ship.waypoint.north = north
                    break;

                case 180:
                    east = - ship.waypoint.east
                    north = - ship.waypoint.north
                    ship.waypoint.east = east
                    ship.waypoint.north = north
                    break;

                case 270:
                    east = - ship.waypoint.north
                    north = ship.waypoint.east
                    ship.waypoint.east = east
                    ship.waypoint.north = north
                    break;
            }
            break;

        }
}

console.log(ship);
console.log("result=", Math.abs(ship.position.east) + Math.abs(ship.position.north));
