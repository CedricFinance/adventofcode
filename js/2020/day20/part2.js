import * as aoc from '../aoc.js'
import { getBorders, parseImage } from './common.js'

function flipHorizontally(image) {
    const newData = Array.from(image.data).reverse()
    return {
        id: image.id,
        data: newData,
        borders: getBorders(newData)
    }
}

function flipVertically(image) {
    const newData = image.data.map(row => row.split("").reverse().join(""))
    return {
        id: image.id,
        data: newData,
        borders: getBorders(newData)
    }
}

function rotateDataRight(data) {
    const b = data.length
    const newData = data.map(r => [])
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        const row = data[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            newData[rowIndex][colIndex] = data[b-colIndex-1][rowIndex]
        }
    }
    return newData.map(r => r.join(""))
}

function rotateRight(image) {
    const data = rotateDataRight(image.data)
    return {
        id: image.id,
        data: data,
        borders: getBorders(data)
    }
}

function rotateDataLeft(data) {
    const b = data.length

    const newData = data.map(_ => [])
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        const row = data[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            newData[rowIndex][colIndex] = data[colIndex][b-rowIndex-1]
        }
    }

    return newData.map(r => r.join(""))
}

function rotateLeft(image) {
    const data = rotateDataLeft(image.data)
    return {
        id: image.id,
        data: data,
        borders: getBorders(data)
    }
}

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

    const imagesMap = new Map()
    for (const image of images) {
        imagesMap.set(image.id, image)
    }

    const counts = new Map()
    for (const [id, bordersList] of bordersMap.entries()) {
        if (bordersList.length == 1) {
            counts.set(bordersList[0].imageId, (counts.get(bordersList[0].imageId) || 0) + 1)
        }
    }

    const corners = Array.from(counts.entries()).filter(([id, count]) => count == 4).map(([id, _]) => id)

    const bigImage = new Array(Math.sqrt(blocks.length))
    for (let index = 0; index < bigImage.length; index++) {
        bigImage[index] = new Array(bigImage.length)
    }

    let topCornerImageId
    for (const imageId of corners) {
        const image = imagesMap.get(imageId)
        if (bordersMap.get(image.borders.topBorder).length == 1 && bordersMap.get(image.borders.leftBorder).length == 1) {
            topCornerImageId = imageId
        }
    }

    bigImage[0][0] = imagesMap.get(topCornerImageId)

    for (let rowIndex = 0; rowIndex < bigImage.length; rowIndex++) {
        const row = bigImage[rowIndex]
        for (let colIndex = 0; colIndex < bigImage.length; colIndex++) {
            if (row[colIndex]) {
                continue
            }

            if (colIndex > 0) {
                const leftImage = row[colIndex - 1]
                const nextImageBorder = bordersMap.get(leftImage.borders.rightBorder).filter(e => e.imageId != leftImage.id)[0]

                switch(nextImageBorder.border) {
                    case "leftBorder":
                        row[colIndex] = imagesMap.get(nextImageBorder.imageId)
                        break;

                    case "leftBorderFlipped":
                        row[colIndex] = flipHorizontally(imagesMap.get(nextImageBorder.imageId))
                        break;

                    case "bottomBorder":
                        row[colIndex] = rotateRight(imagesMap.get(nextImageBorder.imageId))
                        break;

                    case "bottomBorderFlipped":
                        row[colIndex] = flipHorizontally(rotateRight(imagesMap.get(nextImageBorder.imageId)))
                        break;

                    case "topBorder":
                        row[colIndex] = flipHorizontally(rotateLeft(imagesMap.get(nextImageBorder.imageId)))
                        break;

                    case "topBorderFlipped":
                        row[colIndex] = rotateLeft(imagesMap.get(nextImageBorder.imageId))
                        break;

                    case "rightBorder":
                        row[colIndex] = flipVertically(imagesMap.get(nextImageBorder.imageId))
                        break

                    case "rightBorderFlipped":
                        row[colIndex] = flipHorizontally(flipVertically(imagesMap.get(nextImageBorder.imageId)))
                        break
                    default:
                        console.error("unexpected border", nextImageBorder.border)
                        process.exit(1)
                }
            } else {
                const upImage = bigImage[rowIndex - 1][0]
                const nextImageBorder = bordersMap.get(upImage.borders.bottomBorder).filter(e => e.imageId != upImage.id)[0]

                switch(nextImageBorder.border) {
                    case "topBorder":
                        row[colIndex] = imagesMap.get(nextImageBorder.imageId)
                        break;

                    case "topBorderFlipped":
                        row[colIndex] = flipVertically(imagesMap.get(nextImageBorder.imageId))
                        break;

                    case "leftBorder":
                        row[colIndex] = flipVertically(rotateRight(imagesMap.get(nextImageBorder.imageId)))
                        break;

                    case "leftBorderFlipped":
                        row[colIndex] = rotateRight(imagesMap.get(nextImageBorder.imageId))
                        break;

                    case "rightBorder":
                        row[colIndex] = rotateLeft(imagesMap.get(nextImageBorder.imageId))
                        break;

                    case "rightBorderFlipped":
                        row[colIndex] = flipVertically(rotateLeft(imagesMap.get(nextImageBorder.imageId)))
                        break;

                    case "bottomBorder":
                        row[colIndex] = flipHorizontally(imagesMap.get(nextImageBorder.imageId))
                        break;

                    case "bottomBorderFlipped":
                        row[colIndex] = flipVertically(flipHorizontally(imagesMap.get(nextImageBorder.imageId)))
                        break;

                    default:
                        console.error("unexpected border", nextImageBorder.border)
                        process.exit(1)
                }
            }
        }
    }

    let bigImageData = bigImage.flatMap(row => {
        const result = []
        for (let index = 1; index < row[0].data.length - 1; index++) {
            result.push(row.map(image => image.data[index].slice(1, image.data[index].length -1)).join("").replace(/0/g, ".").replace(/1/g, "#").split(""))
        }
        return result
    })

    const monster = [
      "                  # ",
      "#    ##    ##    ###",
      " #  #  #  #  #  #   "
    ]

    monster.reverse()
    const monsterOffsets = monster
      .flatMap((row, rowOffset) => row.split("").map((char, colOffset) => ({ rowOffset, colOffset, char }) ))
      .filter(d => d.char === "#")
      .map(({ rowOffset, colOffset }) => ({ xOffset: colOffset, yOffset: rowOffset }))

    const maxYOffset = Math.max(...monsterOffsets.map(({ yOffset }) => yOffset))
    const maxXOffset = Math.max(...monsterOffsets.map(({ xOffset }) => xOffset))

    function hasMonster(data, x, y, monsterOffsets) {
        for (const { xOffset, yOffset } of monsterOffsets) {
            if (data[x + xOffset][y + yOffset] === ".") {
                return false
            }
        }

        return true
    }

    function markMonster(data, x, y, monsterOffsets) {
        for (const { xOffset, yOffset } of monsterOffsets) {
            data[x + xOffset][y + yOffset] = "O"
        }
    }

    for (let rowIndex = 0; rowIndex < bigImageData.length - maxYOffset; rowIndex++) {
        for (let colIndex = 0; colIndex < bigImageData[rowIndex].length - maxXOffset; colIndex++) {
            if (hasMonster(bigImageData, colIndex, rowIndex, monsterOffsets)) {
                markMonster(bigImageData, colIndex, rowIndex, monsterOffsets)
            }
        }
    }

    console.log(bigImageData.map(row => row.join("")).join("\n"));

    let result = 0
    for (const char of bigImageData.flat()) {
        if (char === "#") {
            result ++
        }
    }
    return result
})
