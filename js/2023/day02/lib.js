function parseColor(str) {
    const [countStr, color] = str.split(" ")
    const count = parseInt(countStr, 10)
  
    return {
      color,
      count
    }
  
  }
  
  function parseSet(str) {
    return str.split(", ").map(parseColor).reduce((prev, req) => { prev[req.color] += req.count; return prev; }, { red: 0, green: 0, blue: 0 })
  }
  
  export function parseLine(line) {
    const [left, right] = line.split(": ")
    const gameNum = parseInt(left.split(" ")[1], 10)
  
    const sets = right.split("; ").map(parseSet)
  
    return { id: gameNum, sets }
  }