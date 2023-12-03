export function isGearSymbol(grid, rowIndex, colIndex) {
    if (rowIndex < 0 || rowIndex > grid.length - 1 || colIndex < 0 || colIndex > grid[0].length - 1) { return false }
    const str = grid[rowIndex][colIndex]
    return str == '*'
  }

/**
 * @param {string} str
 */
export function isDigit(str) {
    return str >= '0' && str <= '9'
  }

/**
 * @param {string[][]} grid
 * @param {number} rowIndex
 * @param {number} colIndex
 */
export function isSymbol(grid, rowIndex, colIndex) {
    if (rowIndex < 0 || rowIndex > grid.length - 1 || colIndex < 0 || colIndex > grid[0].length - 1) {
        return false
    }

    const str = grid[rowIndex][colIndex]
    return str != '.' && !isDigit(str)
}
