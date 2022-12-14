import * as aoc from '../../2020/aoc.js'

function displayMap(map) {
  for (const line of map) {
    console.log(line.join(""))
  }
  console.log()
}

aoc.run(function(input) {
    const lines = input.lines().map(line => line.split(" -> ").map(part => part.split(",").map(s => parseInt(s, 10))))

    var result = 0

    console.log(result);
    
    const sandStartX = 500;
    const sandStartY = 0;

    var minX, maxX, minY, maxY
    minX = maxX = lines[0][0][0]
    minY = maxY = lines[0][0][1]
    for (const line of lines) {
      for (const point of line) {
        if (point[0] < minX) {
          minX = point[0]
        }
        if (point[1] < minY) {
          minY = point[1]
        }
        if (point[0] > maxX) {
          maxX = point[0]
        }
        if (point[1] > maxY) {
          maxY = point[1]
        }
      }
    }

    console.log(`min: (${minX}, ${minY}, max: ${maxX}, ${maxY})`);

    var map = new Array(maxY+1);
    for (let i = 0; i < map.length; i++) {
      const row = new Array(maxX-minX+1+1)
      row.fill('.')
      map[i] = row
    }

    for (const line of lines) {
      const currentPoint = [...line[0]]
      map[currentPoint[1]][currentPoint[0]-minX+1] = "#"
      for (let i = 1; i < line.length; i++) {
        const destinationPoint = line[i];

        while(currentPoint[0] != destinationPoint[0] || currentPoint[1] != destinationPoint[1]) {
          currentPoint[0] += Math.sign(destinationPoint[0] - currentPoint[0])
          currentPoint[1] += Math.sign(destinationPoint[1] - currentPoint[1])
          map[currentPoint[1]][currentPoint[0]-minX+1] = "#"
        }
        
      }
    }

    displayMap(map)
    var count = 0
    while(true) {
      var sand = [ sandStartX, sandStartY ]

      while(true) {
        map[sand[1]][sand[0]-minX+1] = "o"
        //displayMap(map)

        if (sand[1] >= maxY) {
          return count
        }

        if (map[sand[1]+1][sand[0]-minX+1] == ".") {
          map[sand[1]][sand[0]-minX+1] = "."
          sand[1]++
        } else if (map[sand[1]+1][sand[0]-minX+1-1] == ".") {
          map[sand[1]][sand[0]-minX+1] = "."
          sand[1]++
          sand[0]--
        } else if (map[sand[1]+1][sand[0]-minX+1+1] == ".") {
          map[sand[1]][sand[0]-minX+1] = "."
          sand[1]++
          sand[0]++
        } else {
          break
        }
      }

      count++
    }
  return result
})
