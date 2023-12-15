import * as aoc from '../../2020/aoc.js'

function moveNorth(grid, row, col) {
  while(row > 0 && grid[row-1][col] == ".") {
    grid[row][col] = "."
    grid[row-1][col] = "O"
    row--
  }
}

function moveWest(grid, row, col) {
  while(col > 0 && grid[row][col-1] == ".") {
    grid[row][col] = "."
    grid[row][col-1] = "O"
    col--
  }
}

function moveSouth(grid, row, col) {
  while(row < grid.length - 1 && grid[row+1][col] == ".") {
    grid[row][col] = "."
    grid[row+1][col] = "O"
    row++
  }
}

function moveEast(grid, row, col) {
  while(col < grid[0].length - 1 && grid[row][col+1] == ".") {
    grid[row][col] = "."
    grid[row][col+1] = "O"
    col++
  }
}

function cycle(grid) {
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const element = row[c];
      if (element == "O") {
        moveNorth(grid, r, c)
      }
    }    
  }

  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const element = row[c];
      if (element == "O") {
        moveWest(grid, r, c)
      }
    }    
  }

  for (let r = grid.length-1; r >= 0; r--) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const element = row[c];
      if (element == "O") {
        moveSouth(grid, r, c)
      }
    }    
  }

  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = row.length-1; c >= 0; c--) {
      const element = row[c];
      if (element == "O") {
        moveEast(grid, r, c)
      }
    }    
  }
}

function display(grid) {
  for (const line of grid) {
    console.log(line.join(""))
  }
  console.log()
}

const memo = new Map()

aoc.run(function(input) {
  const grid = input.lines().map(line => line.split(""));

  const max = 1000000000
  for (let i = 1; i <= max ; i++) {
    const key = JSON.stringify(grid)
    if (memo.has(key)) {
      const remaingCycles = 1000000000 - i
      const alreadySeenAt = memo.get(key)
      const periodicity = i - alreadySeenAt
      const fastForward = remaingCycles - (remaingCycles % periodicity)
      if (fastForward != 0) {
        console.log(`fast forwarding ${fastForward} cycle(s)`)
        i += fastForward
      }
    }

    cycle(grid)

    memo.set(key, i)
    //display(grid)
  }

  var result = 0
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const element = row[c];
      if (element == "O") {
        result += grid.length - r
      }
    }
  }
  
  return result
})
