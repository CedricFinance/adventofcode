function isRowEmpty(grid, row) {
  return grid[row].every(e => e == ".")
}

function isColumnEmpty(grid, col) {
  for (const row of grid) {
    if (row[col] != ".") {
      return false
    }
  }
  return true
}

export function findExpandedRowsAndCols(grid) {
  const emptyRows = [];
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    if (isRowEmpty(grid, r)) {
      emptyRows.push(r)
    }
  }

  const emptyCols = [];
  for (let c = 0; c < grid[0].length; c++) {
    if (isColumnEmpty(grid, c)) {
      emptyCols.push(c)
    }
  }

  return {
    rows: emptyRows,
    cols: emptyCols
  }
}

export function findGalaxies(grid) {
  const galaxies = []
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const element = row[c];
      if (element != ".") {
        galaxies.push({ row: r, col: c })
      }
    }
  }
  return galaxies
}

export function distance(first, second, expanded, expansionFactor) {
  const minRow = Math.min(first.row, second.row)
  const maxRow = Math.max(first.row, second.row)
  const rowExpanded = expanded.rows.filter(r => r > minRow && r < maxRow).length
  const minCol = Math.min(first.col, second.col)
  const maxCol = Math.max(first.col, second.col)
  const colExpanded = expanded.cols.filter(c => c > minCol && c < maxCol).length
  const distance = maxRow - minRow + maxCol - minCol + rowExpanded * (expansionFactor - 1) + colExpanded * (expansionFactor - 1)
  return distance
}
