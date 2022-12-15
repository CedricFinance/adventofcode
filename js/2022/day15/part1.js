import * as aoc from '../../2020/aoc.js'

function manhattanDistance(pointA, pointB) {
  return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)
}

aoc.run(function(input) {
  const lines = input.lines().map(line => {
    // Sensor at x=3772068, y=2853720: closest beacon is at x=4068389, y=2345925
    const parts = line.split(" ")
    const sensorX = parseInt(parts[2].split("=")[1], 10)
    const sensorY = parseInt(parts[3].split("=")[1], 10)
    const beaconX = parseInt(parts[8].split("=")[1], 10)
    const beaconY = parseInt(parts[9].split("=")[1], 10)
    return { sensor: { x: sensorX, y: sensorY }, beacon: { x: beaconX, y: beaconY }}
  })

  var result = new Set()
  const targetY = input.name() === "input.txt" ? 2000000 : 10

  for (const { sensor, beacon } of lines) {
    const d = manhattanDistance(sensor, beacon)
    if (sensor.y - d <= targetY && targetY <= sensor.y + d) {
      const diff = Math.abs(sensor.y - targetY)
      const startX = sensor.x - (d - diff)
      const endX = sensor.x + (d - diff)
      for (let i = startX; i <= endX; i++) {
        result.add(i)
      }
    }
  }
    
  for (const { sensor, beacon } of lines) {
    if (sensor.y == targetY) {
      result.delete(sensor.x)
    }
    if (beacon.y == targetY) {
      result.delete(beacon.x)
    }
  }

  return result.size
})
