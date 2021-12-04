import * as aoc from '../../2020/aoc.js'

function win(grid) {
    for (const row of grid) {
        if (row.every(num => num.marked)) {
            return true
        }
    }

    for (let index = 0; index < grid[0].length; index++) {
        if (grid.map(row => row[index]).every(num => num.marked) ) {
            return true
        }
    }

    return false
}

function unmarkedSum(grid) {
    var result = 0;

    for (const row of grid) {
        for (const num of row) {
            if (!num.marked) {
                result += num.value
            }
        }
    }

    return result
}

aoc.run(function(input) {
    const blocks = input.blocks()

    const numbers = blocks.shift().split(",").map(str => parseInt(str, 10))

    const grids = []
    for (const block of blocks) {
        grids.push(
            block.split("\n")
                 .map(line => line.trim()
                                  .replace(/ +/g, " ")
                                  .split(" ")
                                  .map(str => ({
                                      value: parseInt(str.trim(), 10),
                                      marked: false
                                  }))
                 )
        )
    }

    var result = 0

    outter:
    for (const number of numbers) {

        for (const grid of grids) {

            for (const row of grid) {
                for (const num of row) {
                    if (num.value == number) {
                        num.marked = true
                        break;
                    }
                }
            }

            if (win(grid)) {
                return number * unmarkedSum(grid)
            }
        }

    }

    return result
})

