import * as aoc from '../../2020/aoc.js'

function toKey(face) {
  return face.join(",")
}

function getFaces([x, y, z]) {
  return [
    [ x - 0.5, y, z ],
    [ x + 0.5, y, z ],
    [ x, y - 0.5, z ],
    [ x, y + 0.5, z ],
    [ x, y, z - 0.5 ],
    [ x, y, z + 0.5 ],
  ]
}

aoc.run(function(input) {
  const droplets = input.lines().map(line => line.split(",").map(s => parseInt(s, 10)))

  var result = 0

  var faces = new Map()

  for (const droplet of droplets) {
    const dropletFaces = getFaces(droplet)
    for (const face of dropletFaces) {
      const key = toKey(face)
      const count = faces.get(key) || 0
      faces.set(key, count + 1)
    }
  }

  for (const [key, count] of faces.entries()) {
    if (count === 1) {
      result++
    }
  }
    
  return result
})
