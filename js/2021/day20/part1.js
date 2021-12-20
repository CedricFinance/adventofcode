import * as aoc from '../../2020/aoc.js'

function getPixel(image, row, col, fill) {
    if (row < 0 || row >= image.length) {
        return fill
    }
    if (col < 0 || col >= image[0].length) {
        return fill
    }

    return image[row][col]
}

function getData(image, row, col, fill) {
    var result = ""
    result += getPixel(image, row - 1, col - 1, fill)
    result += getPixel(image, row - 1, col    , fill)
    result += getPixel(image, row - 1, col + 1, fill)
    result += getPixel(image, row    , col - 1, fill)
    result += getPixel(image, row    , col    , fill)
    result += getPixel(image, row    , col + 1, fill)
    result += getPixel(image, row + 1, col - 1, fill)
    result += getPixel(image, row + 1, col    , fill)
    result += getPixel(image, row + 1, col + 1, fill)

    return result
}

function enhanceImage(inputImage, imageEnhancementAlgorithm, fill) {
    const ouputImage = []
    ouputImage.push(new Array(inputImage[0].length + 6).fill(fill))
    ouputImage.push(new Array(inputImage[0].length + 6).fill(fill))
    ouputImage.push(new Array(inputImage[0].length + 6).fill(fill))
    for (let row = 0; row < inputImage.length; row++) {
        const imageRow = new Array(inputImage[0].length + 6).fill(fill)
        ouputImage.push(imageRow)
        for (let col = 0; col < inputImage[0].length; col++) {
            const data = getData(inputImage, row, col)
            imageRow[col + 3] = inputImage[row][col]
        }
    }
    ouputImage.push(new Array(inputImage[0].length + 6).fill(fill))
    ouputImage.push(new Array(inputImage[0].length + 6).fill(fill))
    ouputImage.push(new Array(inputImage[0].length + 6).fill(fill))

    for (let row = 0; row < ouputImage.length; row++) {
        for (let col = 0; col < ouputImage[0].length; col++) {
            const data = getData(inputImage, row - 3, col - 3, fill)
            ouputImage[row][col] = imageEnhancementAlgorithm[parseInt(data, 2)]
        }
    }

    return ouputImage
}

function display(image) {
    for (const row of image) {
        console.log(row.map(c => c == "0" ? " " : "#").join(""))
    }
    console.log()
}
aoc.run(function(input) {
    const [first, second] = input.blocks()

    const imageEnhancementAlgorithm = first.split("").map(c => c == "#" ? "1" : "0")

    const inputImage = second.split("\n").map(line => line.split("").map(c => c == "#" ? "1" : "0"))

    let image = inputImage
    let count = 2
    display(image)
    let fill = "0"
    while(count > 0) {
        image = enhanceImage(image, imageEnhancementAlgorithm, fill)
        display(image)
        count --
        fill = imageEnhancementAlgorithm[parseInt(new Array(9).fill(fill).join(""), 2)]
    }


    var result = 0

    for (let row = 0; row < image.length; row++) {
        for (let col = 0; col < image[row].length; col++) {
            const pixel = image[row][col];
            if (pixel == "1") { result++ }
        }
    }

    return result
})
