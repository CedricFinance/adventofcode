import { log } from 'console'
import { parse } from 'path'
import * as aoc from '../aoc.js'

/**
 * @param {string} str
 */
function parseImage(str) {
    str = str.replace(/#/g, "1").replace(/\./g, "0")
    const [idStr, ...data] = str.split("\n")

    const [_, id] = idStr.slice(0, idStr.length - 1).split(" ")

    return { id: parseInt(id, 10), data }
}



aoc.run(function(input) {
    const blocks = input.blocks()

    const images = blocks.map(parseImage)
    console.log(images[0]);

    const b = images[0].data.length - 1

    const bordersMap = new Map()

    for (const image of images) {

        const left = image.data.map(r => r[0])
        const right = image.data.map(r => r[b])

        const borders = {
            topBorder: parseInt(image.data[0], 2),
            topBorderFlipped: parseInt(image.data[0].split("").reverse().join(""), 2),

            bottomBorder: parseInt(image.data[b], 2),
            bottomBorderFlipped: parseInt(image.data[b].split("").reverse().join(""), 2),

            leftBorder: parseInt(left.join(""), 2),
            leftBorderReversed: parseInt(Array.from(left).reverse().join(""), 2),

            rightBorder: parseInt(right.join(""), 2),
            rightBorderReversed: parseInt(Array.from(right).reverse().join(""), 2)

        }

        for (const borderName of Object.getOwnPropertyNames(borders)) {
            const borderValue = borders[borderName]
            const d = bordersMap.get(borderValue) || []
            d.push({ border: borderName, imageId: image.id })
            bordersMap.set(borderValue, d)
        }

    }

//    console.log(bordersMap);
    const counts = new Map()
    for (const [id, bordersList] of bordersMap.entries()) {
        if (bordersList.length == 1) {
            counts.set(bordersList[0].imageId, (counts.get(bordersList[0].imageId) || 0) + 1)
        }
    }

    console.log(counts);

    let result = 1
    for (const [imageId, count] of counts.entries()) {
        if (count === 4) {
            result *= imageId
        }
    }

    return result
})
