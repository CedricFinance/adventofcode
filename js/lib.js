/**
 * @template T
 */
export class Grid {

    array

    /**
     * @param {T[][]} array
     */
    constructor(array) {
        this.array = array
    }

    get({row, col}) {
        return this.array[row][col]
    }

    /**
     *
     * @param {GridCoords} param0
     * @param {T} value
     */
    set({row, col}, value) {
        this.array[row][col] = value
    }

    get rowsCount() {
        return this.array.length
    }

    get colsCount() {
        return this.array[0].length
    }

    *neighbors4({row, col}) {
        if (row > 0) {
            yield { row: row - 1, col }
        }
        if (row < this.rowsCount - 1) {
            yield { row: row + 1, col }
        }
        if (col > 0) {
            yield { row, col: col - 1 }
        }
        if (col < this.colsCount - 1) {
            yield { row, col: col + 1 }
        }
    }

    *neighbors8({row, col}) {
        if (row > 0) {
            yield { row: row - 1, col }

            if (col > 0) {
                yield { row: row - 1, col: col - 1}
            }

            if (col < this.colsCount - 1) {
                yield { row: row - 1, col: col + 1 }
            }
        }
        if (row < this.rowsCount - 1) {
            yield { row: row + 1, col }

            if (col > 0) {
                yield { row: row + 1, col: col - 1}
            }

            if (col < this.colsCount - 1) {
                yield { row: row + 1, col: col + 1 }
            }

        }
        if (col > 0) {
            yield { row, col: col - 1 }
        }
        if (col < this.colsCount - 1) {
            yield { row, col: col + 1 }
        }
    }

    /**
     *
     * @param {GridCoords} coords
     */
    allNeighbors4(coords, predicate) {
        for (const n of this.neighbors4(coords)) {
            if (!predicate({...n, value: this.get(n) })) {
                return false
            }
        }
        return true
    }

    *cells() {
        for (let row = 0; row < this.rowsCount; row++) {
            for (let col = 0; col < this.colsCount; col++) {
                yield { row, col, value: this.get({row, col})}
            }
        }
    }
}