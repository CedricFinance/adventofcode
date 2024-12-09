import { log } from 'console'
import * as aoc from '../../2020/aoc.js'

/**
 * @param {string} disk
 */
function decompress(disk) {
  var result = []

  var nextFileId = 0
  var isFile = true
  var freespaces = []

  for (const digit of disk) {
    var element
    if (isFile) {
      element = nextFileId
      nextFileId++
    } else {
      freespaces.push({ start: result.length, length: Number(digit) })
      element = "."
    }

    for (let i = 0; i < Number(digit); i++) {
      result.push(element)
    }

    isFile = !isFile
  }

  return {
    decompressed: result,
    freespaces
  }
}

/**
 *
 * @param {(string | number)[]} diskArray
 */
function checksum(diskArray) {
  var result = 0

  for (let i = 0; i < diskArray.length; i++) {
    if (diskArray[i] == ".") { continue }
    result += Number(diskArray[i]) * i
  }

  return result
}

aoc.run(async function(input) {
  const content = input.content()
  var result = 0

  var lastFileId = Number.MAX_SAFE_INTEGER
  const decompressedResult = decompress(content)
  const decompressed = decompressedResult.decompressed
  const freespaces = decompressedResult.freespaces

  var end = decompressed.length - 1
  while(end > 0) {
    while(decompressed[end] == "." || decompressed[end] >= lastFileId) { end-- }

    var length = 1
    const fileId = decompressed[end]
    while(decompressed[end-1] == fileId) {
      end--
      length++
    }

    const freespace = freespaces.find(freeSpace => freeSpace.length >= length)

    if (freespace && freespace.start < end) {
      for (let i = 0; i < length; i++) {
        decompressed[freespace.start+i] = fileId
        decompressed[end+i] = "."
      }

      freespace.start += length
      freespace.length -= length
    } else {
      end--
    }

    lastFileId = Number(fileId)
  }

  return checksum(decompressed)
})
