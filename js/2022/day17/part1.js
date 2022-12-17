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

  var result = 0
  var windIndex = 0

  var room = new Array()

  var maxHeight = -1
  for (let i = 0; i < 2022; i++) {
    const currentRockData = rocks[i % rocks.length]

    var currentRock = {
      x: 2,
      y: maxHeight + 3 + currentRockData.length,
      data: currentRockData,
    } 

    const linesToAdd = currentRock.y + 1 - room.length
    for (let h = 0; h < linesToAdd; h++) {
      room.push(new Array(7).fill("."))
    }

    while(true) {

      // apply wind
      const wind = windDirections[windIndex % windDirections.length]
      windIndex++
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

    maxHeight = Math.max(currentRock.y, maxHeight)
    
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
