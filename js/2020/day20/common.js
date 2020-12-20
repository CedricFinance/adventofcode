/**
 * @param {string} str
 */
export function parseImage(str) {
    str = str.replace(/#/g, "1").replace(/\./g, "0")
    const [idStr, ...data] = str.split("\n")

    const [_, id] = idStr.slice(0, idStr.length - 1).split(" ")

    return { id: parseInt(id, 10), data }
}

export function getBorders(data) {
    const b = data.length - 1

    const left = data.map(r => r[0])
    const right = data.map(r => r[b])

    const borders = {
        topBorder: parseInt(data[0], 2),
        topBorderFlipped: parseInt(data[0].split("").reverse().join(""), 2),

        bottomBorder: parseInt(data[b], 2),
        bottomBorderFlipped: parseInt(data[b].split("").reverse().join(""), 2),

        leftBorder: parseInt(left.join(""), 2),
        leftBorderFlipped: parseInt(Array.from(left).reverse().join(""), 2),

        rightBorder: parseInt(right.join(""), 2),
        rightBorderFlipped: parseInt(Array.from(right).reverse().join(""), 2)

    }

    return borders
}
