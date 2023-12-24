/**
 * @param {string} line
 */
export function parseHailstone(line) {
  const [left, right] = line.split(" @ ")
  return {
    position: left.split(", ").map(s => parseInt(s, 10)),
    velocity: right.split(", ").map(s => parseInt(s, 10))
  }
}