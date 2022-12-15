import * as aoc from '../../2020/aoc.js'

function manhattanDistance(pointA, pointB) {
  return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)
}

function intersects(firstInterval, secondInterval) {
  if (firstInterval[1] < secondInterval[0] - 1) {
    return false
  }

  if (firstInterval[0] > secondInterval[1] + 1) {
    return false
  }

  return true
}

function union(firstInterval, secondInterval) {
  return [
    Math.min(firstInterval[0], secondInterval[0]),
    Math.max(firstInterval[1], secondInterval[1])
  ]
}

function merge(intervals, newInterval) {
  intervals.push(newInterval)
  intervals.sort((a, b) => a[0] - b[0])

  var result = []

  var pushed = false
  var current = intervals.shift()
  while(intervals.length > 0) {
    pushed = false

    const newInterval = intervals.shift()
    if (intersects(current, newInterval)) {
      current = union(current, newInterval)
    } else {
      result.push(current)
      current = newInterval
      pushed = true
    }
  }

  result.push(current)

  return result
}

function blockedSpaces(lines, targetY, minX, maxX) {
  var intervals = []
  for (const { sensor, beacon, d } of lines) {
    if (sensor.y - d <= targetY && targetY <= sensor.y + d) {
      const diff = Math.abs(sensor.y - targetY)
      const startX = Math.max(sensor.x - (d - diff), minX)
      const endX = Math.min(sensor.x + (d - diff), maxX)
      intervals = merge(intervals, [startX, endX])
      if (intervals.length == 1 && intervals[0][0] === 0 && intervals[0][1] == maxX) {
        return intervals
      }
    }
  }

  return intervals
}
aoc.run(function(input) {
    const lines = input.lines().map(line => {
      // Sensor at x=3772068, y=2853720: closest beacon is at x=4068389, y=2345925
      const parts = line.split(" ")
      const sensorX = parseInt(parts[2].split("=")[1], 10)
      const sensorY = parseInt(parts[3].split("=")[1], 10)
      const beaconX = parseInt(parts[8].split("=")[1], 10)
      const beaconY = parseInt(parts[9].split("=")[1], 10)
      return {
        sensor: { x: sensorX, y: sensorY },
        beacon: { x: beaconX, y: beaconY },
        d: manhattanDistance({ x: sensorX, y: sensorY }, { x: beaconX, y: beaconY })
      }
    })

    const maxCoordinate = input.name() === "input.txt" ? 4000000 : 20

    lines.sort((a, b) => a.sensor.x - b.sensor.x)

    for (let y = 0; y <= maxCoordinate; y++) {
      if (y % 100000 === 0) {
        console.log(y);
      }
      const blocked= blockedSpaces(lines, y, 0, maxCoordinate)
      if (blocked.length === 1 && blocked[0][0] === 0 && blocked[0][1] == maxCoordinate) {
        continue
      }

      var x
      if (blocked.length === 1) {
        if (blocked[0][0] === 0) {
          x = blocked[0][1] + 1
        } else {
          x = 0
        }
      } else {
        blocked.sort((a,b) => a[0] - b[0])
        x = blocked[0][1]+1
      }
      return 4000000 * x + y
    }

    return 0
})
