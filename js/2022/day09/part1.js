import * as aoc from '../../2020/aoc.js'

function moveTail(head, tail) {
  const deltaX = Math.abs(head.x-tail.x)
  const deltaY = Math.abs(head.y-tail.y)

  if (deltaX <= 1 && deltaY <= 1) {
    return
  }

  if (deltaX === 0) {
    tail.y += Math.sign(head.y-tail.y)
    return
  }

  if (deltaY === 0) {
    tail.x += Math.sign(head.x-tail.x)
    return
  }

  tail.x += Math.sign(head.x-tail.x)
  tail.y += Math.sign(head.y-tail.y)
}

aoc.run(function(input) {
    const instructions = input.lines().map(line => line.split(" "))

    const positions = new Set()

    var result = 0

    var head = { x: 0, y: 0 }
    var tail = { x: 0, y: 0 }

    positions.add(`${tail.x},${tail.y}`)
    for (const instruction of instructions) {
      const direction = instruction[0]
      const count = parseInt(instruction[1], 10)

      for (let c = 0; c < count; c++) {
        switch (direction) {
          case "U":
            head.y += 1
            moveTail(head, tail)
            break;
        
          case "D":
            head.y -= 1
            moveTail(head, tail)    
            break;
  
          case "L":
            head.x -= 1
            moveTail(head, tail)
            break;
  
          case "R":
            head.x += 1
            moveTail(head, tail)
            break;
      
          default:
            break;
        }
        console.log(`head: ${head.x},${head.y} tail: ${tail.x},${tail.y}`)

        positions.add(`${tail.x},${tail.y}`)
      }

    }

    console.log(positions);
    
  return positions.size
})
