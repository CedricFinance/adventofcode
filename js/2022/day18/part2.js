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

function isInBounds(position, bounds) {
  if (position[0] < bounds.min[0]) { return false }
  if (position[1] < bounds.min[1]) { return false }
  if (position[2] < bounds.min[2]) { return false }
  if (position[0] > bounds.max[0]) { return false }
  if (position[1] > bounds.max[1]) { return false }
  if (position[2] > bounds.max[2]) { return false }

  return true
}

function getBounds(droplets) {
  const result = {
    min: [...droplets[0]],
    max: [...droplets[0]]
  }

  for (const droplet of droplets) {
    if (droplet[0] > result.max[0]) {
      result.max[0] = droplet[0]
    }
    if (droplet[1] > result.max[1]) {
      result.max[1] = droplet[1]
    }
    if (droplet[2] > result.max[2]) {
      result.max[2] = droplet[2]
    }
    if (droplet[0] < result.min[0]) {
      result.min[0] = droplet[0]
    }
    if (droplet[1] < result.min[1]) {
      result.min[1] = droplet[1]
    }
    if (droplet[2] < result.min[2]) {
      result.min[2] = droplet[2]
    }
  }

  return result
}

function neighboors6([x, y, z], bounds) {
  const result = []

  if (isInBounds([ x+1, y, z ], bounds)) { result.push( [ x+1, y, z ])}
  if (isInBounds([ x-1, y, z ], bounds)) { result.push( [ x-1, y, z ])}
  if (isInBounds([ x, y+1, z ], bounds)) { result.push( [ x, y+1, z ])}
  if (isInBounds([ x, y-1, z ], bounds)) { result.push( [ x, y-1, z ])}
  if (isInBounds([ x, y, z-1 ], bounds)) { result.push( [ x, y, z-1 ])}
  if (isInBounds([ x, y, z+1 ], bounds)) { result.push( [ x, y, z+1 ])}

  return result
}

aoc.run(function(input) {
  const droplets = input.lines().map(line => line.split(",").map(s => parseInt(s, 10)))

  const faces = new Set()
  const cubes = new Set()

  for (const droplet of droplets) {
    const dropletFaces = getFaces(droplet)
    cubes.add(toKey(droplet))
    for (const face of dropletFaces) {
      faces.add(toKey(face))
    }
  }

  const bounds = getBounds(droplets)

  const biggerBounds = {
    min: bounds.min.map(v => v - 1),
    max: bounds.max.map(v => v + 1)
  }  

  var start = biggerBounds.min

  var cooled = new Set()
  var explored = new Set()
  var stack = [ start ]

  while(stack.length > 0) {
    const position = stack.pop()
    const positionKey = toKey(position)

    if (explored.has(positionKey)) {
      continue
    }

    if (cubes.has(positionKey)) {
      continue
    }

    const facesInContact = getFaces(position)

    explored.add(positionKey)

    for (const face of facesInContact) {
      const key = toKey(face)
      if (faces.has(key)) {
        cooled.add(key)
      }
    }

    stack.push(...neighboors6(position, biggerBounds))
  }

  return cooled.size
})
