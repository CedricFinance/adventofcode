import * as aoc from '../../2020/aoc.js'

aoc.run(function(input) {
    var horizontal = 0
    var depth = 0
    var aim = 0

    const instructions = input.lines()

    for (const instruction of instructions) {
        var [command, amountStr] = instruction.split(" ")
        const amount = parseInt(amountStr, 10)

        switch (command) {
            case "forward":
                horizontal += amount
                depth += aim * amount
                break;

            case "up":
                aim -= amount
                break;

            case "down":
                aim += amount

            default:
                break;
        }
    }

  return horizontal * depth
})
