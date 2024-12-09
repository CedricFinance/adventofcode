import * as aoc from '../../2020/aoc.js'

/**
 * @param {string} disk
 */
function decompress(disk) {
  var result = []

  var nextFileId = 0
  var isFile = true
  for (const digit of disk) {
    var element
    if (isFile) {
      element = nextFileId
      nextFileId++
    } else {
      element = "."
    }

    for (let i = 0; i < Number(digit); i++) {
      result.push(element)

    }

    isFile = !isFile
  }

  return result
}

/**
 *
 * @param {(string | number)[]} diskArray
 */
function checksum(diskArray) {
  var result = 0

  for (let i = 0; i < diskArray.length; i++) {
    if (diskArray[i] == ".") { break }
    result += Number(diskArray[i]) * i
  }

  return result
}

aoc.run(async function(input) {
  const content = input.content()
  var result = 0

  const decompressed = decompress(content)

  var start = 0
  var end = decompressed.length - 1
  while(true) {
    while(decompressed[start] != ".") { start++ }
    while(decompressed[end] == ".") { end-- }

    if ( start > end ) { break }

    decompressed[start] = decompressed[end]
    decompressed[end] = "."
  }

  return checksum(decompressed)
})
