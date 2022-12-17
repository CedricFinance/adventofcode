import { exit } from 'process'
import * as aoc from '../../2020/aoc.js'

const rocks = [
  [ "####" ],
  [ ".#.", "###", ".#." ],
  [ "..#", "..#", "###" ],
  [ "#", "#", "#", "#" ],
  [ "##", "##" ]

]

function displayRoom(room) {
  for (let index = room.length - 1; index >= 0; index--) {
    console.log(room[index].join(""))
  }
  console.log()
}

function canMoveLeft(currentRock, room) {
  if (currentRock.x === 0) {
    return false
  }

  for (let yOffset = 0; yOffset < currentRock.data.length; yOffset++) {
    var xOffset = 1
    for (let i = 0; i < currentRock.data[yOffset].length; i++) {
      if (currentRock.data[yOffset][i] === '#') {
        break
      }
      xOffset--
    }

    if (room[currentRock.y - yOffset][currentRock.x - xOffset] === '#') {
      return false
    }
  }

  return true
}

function canMoveRight(currentRock, room) {
  if (currentRock.x + currentRock.data[0].length === room[0].length) {
    return false
  }

  for (let yOffset = 0; yOffset < currentRock.data.length; yOffset++) {
    var xOffset = 1 + (currentRock.data[0].length - 1)
    for (let i = currentRock.data[yOffset].length - 1; i >= 0; i--) {
      if (currentRock.data[yOffset][i] === '#') {
        break
      }
      xOffset--
    }

    if (room[currentRock.y - yOffset][currentRock.x + xOffset] === '#') {
      return false
    }
  }

  return true
}

function canFall(currentRock, room) {
  for (let xOffset = 0; xOffset < currentRock.data[0].length; xOffset++) {
    var yOffset = 1 + currentRock.data.length - 1
    for (let i = currentRock.data.length - 1; i >= 0 ; i--) {
      if (currentRock.data[i][xOffset] === '#') {
        break
      }
      yOffset--
    }
    
    if (currentRock.y - yOffset < 0 || room[currentRock.y - yOffset][currentRock.x + xOffset] === '#') {
      return false
    }
  }

  return true
}

aoc.run(function(input) {
  const windDirections = input.content()

  var maxFall = 0
  var prev = {
    index: 0,
    maxHeight: 0,
    pieceIndex: 0,
    windIndex: 0,
    maxHeightDeltas: []
  }

  var windIndex = 0

  var room = new Array()

  const rocksCount = 1000000000000

  var maxHeight = -1
  for (let i = 0; i < rocksCount; i++) {
    if (i%1000000 === 0) {
      console.log(i);
    }
    
    const pieceIndex = i % rocks.length
    const currentRockData = rocks[pieceIndex]

    var currentRock = {
      x: 2,
      y: maxHeight + 3 + currentRockData.length,
      data: currentRockData,
    } 

    const linesToAdd = currentRock.y + 1 - room.length
    for (let h = 0; h < linesToAdd; h++) {
      room.push(new Array(7).fill("."))
    }

    const startY = currentRock.y
    while(true) {

      // apply wind
      const wind = windDirections[windIndex % windDirections.length]
      windIndex = (windIndex + 1) % windDirections.length
      if (wind === '>') {
        if (canMoveRight(currentRock, room)) {
          currentRock.x++
        }
      } else {
        if (canMoveLeft(currentRock, room)) {
          currentRock.x--
        }
      }

      // fall down
      if (canFall(currentRock, room)) {
        currentRock.y--
      } else {
        break
      }
    }

    const prevMaxHeight = maxHeight
    maxHeight = Math.max(currentRock.y, maxHeight)

    const falled = startY - currentRock.y
    if (falled > maxFall) {
      maxFall = falled
      prev.index = i
      prev.reachedCount = 0
      prev.maxHeight = maxHeight
      prev.pieceIndex = pieceIndex
      prev.windIndex = windIndex
      prev.maxHeightDeltas = []
      console.log(`${i}, new max ${maxFall}`);
    } else if (falled === maxFall) {
      console.log(`${i} (count=${i-prev.index}, maxHeightDelta=${maxHeight-prev.maxHeight}, piece=${pieceIndex}, wind=${windIndex}), reached max ${maxFall}`);

      const cycleLength = (i-prev.index)
      const cycleHeighDelta = (maxHeight-prev.maxHeight)
      const inputMax = input.name() === "input.txt" ? 39 : 12 // example1.txt
      if (maxFall == inputMax && prev.reachedCount == 1) { // 12, 39
        // fast forward
        const X = Math.floor((rocksCount - i) / cycleLength)
        i += cycleLength * X
        maxHeight += cycleHeighDelta * X

        while(true) {
          i++
          if (i >= rocksCount) {
            break
          }
          maxHeight += prev.maxHeightDeltas.shift()
        }

        return maxHeight + 1
      }

      prev.index = i
      prev.maxHeight = maxHeight
      prev.pieceIndex = pieceIndex
      prev.windIndex = windIndex
      prev.maxHeightDeltas = []
      prev.reachedCount++
    } else {
      prev.maxHeightDeltas.push(maxHeight - prevMaxHeight)
    }

    
    for (let yOffset = 0; yOffset < currentRock.data.length; yOffset++) {
      for (let xOffset = 0; xOffset < currentRock.data[yOffset].length; xOffset++) {
        const data = currentRock.data[yOffset][xOffset];
        if (data === '#') {
          room[currentRock.y - yOffset][currentRock.x + xOffset] = '#'
        }
      }
    }

    //displayRoom(room)
  }

  return maxHeight + 1
})
