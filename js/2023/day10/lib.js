/**
 * @param {string[][]} grid
 * @param {string} symbol
 * @returns {null|{row: number, col: number}}
 */
export function find(grid, symbol) {
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const element = row[c];
      if (element == symbol) {
        return { row: r, col: c }
      }
    }
  }

  return null
}

const symbols = [
  { char: "|", west: false, east: false, south: true , north: true  },
  { char: "-", west: true , east: true , south: false, north: false },
  { char: "L", west: false, east: true , south: false, north: true  },
  { char: "J", west: true , east: false, south: false, north: true  },
  { char: "7", west: true , east: false, south: true , north: false },
  { char: "F", west: false, east: true , south: true , north: false },
  { char: "S", west: true , east: true , south: true , north: true  },
  { char: ".", west: false, east: false, south: false, north: false },
]

/** @type {Map<string,{char:string,west:boolean,east:boolean,north:boolean,south:boolean}>} */
const symbolsMap = new Map()
for (const s of symbols) {
  symbolsMap.set(s.char, s)
}

function get(grid, pos) {
  const row = grid[pos.row]
  if (!row) { return null }
  return row[pos.col]
}

function canConnectTo(symbol, direction) {
  if (!symbol) { return false }
  const pipe = symbolsMap.get(symbol)
  return pipe[direction]
}

/**
 * @param {{ row: number; col: number; }} pos
 * @param {string[][]} grid
 */
export function findConnection(pos, grid) {
  const connections = []
  const posSymbol = get(grid, pos)

  const up = get(grid, { row: pos.row - 1, col: pos.col })
  if (canConnectTo(posSymbol, "north") && canConnectTo(up, "south")) {
    connections.push({ row: pos.row - 1, col: pos.col })
  }

  const down = get(grid, { row: pos.row + 1, col: pos.col })
  if (canConnectTo(posSymbol, "south") && canConnectTo(down, "north")) {
    connections.push({ row: pos.row + 1, col: pos.col })
  }

  const west = get(grid, { row: pos.row, col: pos.col - 1 })
  if (canConnectTo(posSymbol, "west") && canConnectTo(west, "east")) {
    connections.push({ row: pos.row, col: pos.col - 1 })
  }

  const east = get(grid, { row: pos.row, col: pos.col + 1 })
  if (canConnectTo(posSymbol, "east") && canConnectTo(east, "west")) {
    connections.push({ row: pos.row, col: pos.col + 1 })
  }

  return connections
}
