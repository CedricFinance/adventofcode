import * as fs from 'fs'

function parseInstruction(str) {
    return {
        action: str[0],
        value: parseInt(str.slice(1), 10)
    }
}

const instructions = fs.readFileSync("input.txt", "utf-8").trim().split("\n").map(parseInstruction)


const ship = {
    facing: 0,
    position: {
        east: 0,
        north: 0
    }
}

for (const instruction of instructions) {
    console.log(ship);
    switch (instruction.action) {
        case "F":
            switch (ship.facing) {
                case 0:
                    ship.position.east += instruction.value
                    break;
                case 90:
                    ship.position.north += instruction.value
                    break;
                case 180:
                    ship.position.east -= instruction.value
                    break;
                case 270:
                    ship.position.north -= instruction.value
                    break;
                }
            break;

        case "N":
            ship.position.north += instruction.value
            break;

        case "S":
            ship.position.north -= instruction.value
            break;

        case "E":
            ship.position.east += instruction.value
            break;

        case "W":
            ship.position.east -= instruction.value
            break;

        case "L":
            ship.facing = ( ship.facing + instruction.value) % 360
            break;

        case "R":
            ship.facing = ( 360 + ship.facing - instruction.value) % 360
            break;

        }
}

console.log(ship);
console.log("result=", Math.abs(ship.position.east) + Math.abs(ship.position.north));
