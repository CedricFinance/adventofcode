import * as aoc from '../aoc.js'
import { getBorders, parseImage } from './common.js'

aoc.run(function(input) {
    const blocks = input.blocks()
    const images = blocks.map(parseImage)

    const bordersMap = new Map()

    for (const image of images) {
        image.borders = getBorders(image.data)

        for (const borderName of Object.getOwnPropertyNames(image.borders)) {
            const borderValue = image.borders[borderName]
            const d = bordersMap.get(borderValue) || []
            d.push({ border: borderName, imageId: image.id })
            bordersMap.set(borderValue, d)
        }
    }

    const counts = new Map()
    for (const [id, bordersList] of bordersMap.entries()) {
        if (bordersList.length == 1) {
            counts.set(bordersList[0].imageId, (counts.get(bordersList[0].imageId) || 0) + 1)
        }
    }

    let result = 1
    for (const [imageId, count] of counts.entries()) {
        if (count === 4) {
            result *= imageId
        }
    }

    return result
})
