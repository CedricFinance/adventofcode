import * as aoc from '../../2020/aoc.js'

/**
 *
 * @param {Grid} grid
 * @returns
 */
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

/**
 *
 * @param {Grid} grid
 * @returns
 */
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

    /** @type Grid[] */
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

    var results = []


    for (const number of numbers) {

        var gridIndex = 0
        for (const grid of grids) {
            if (grid == null) {
                gridIndex++
                continue
            }

            outter:
            for (const row of grid) {

                for (const num of row) {
                    if (num.value == number) {
                        num.marked = true
                        break outter;
                    }
                }
            }

            if (win(grid)) {
                results.push(number * unmarkedSum(grid))
                grids[gridIndex] = null
            }

            gridIndex++
        }

    }

    return results[results.length-1]
})

