import * as aoc from '../../2020/aoc.js'

/**
 * @param {string} str
 */
function parseNumberList(str) {
  return str.split(" ").map(s => parseInt(s, 10))
}

aoc.run(function(input) {
    const blocks = input.blocks();
    var min = Number.MAX_SAFE_INTEGER

    const seeds = parseNumberList(blocks.shift().split(": ")[1])
    const seedsIntervals = []
    for (let i = 0; i < seeds.length; i+=2) {
      seedsIntervals.push({
        start: seeds[i],
        length: seeds[i+1],
        end: seeds[i]+seeds[i+1]-1
      })
    }

    const mappings = []
    for (const block of blocks) {
      const lines = block.split("\n")
      const name = lines.shift().split(" ")[0]
      const mappingsR = lines.map(line => {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = parseNumberList(line)
        return {
          destinationRangeStart,
          sourceRangeStart,
          rangeLength
        }
      })
      mappings.push({
        name,
        mappings: mappingsR
      })
    }

  /**
   * @param {number} value
   * @param {{ name: string; mappings: { destinationRangeStart: number; sourceRangeStart: number; rangeLength: number; }[]; }} mapping
   */
    function map(value, mapping) {
      for (const entry of mapping.mappings) {
        if (value >= entry.sourceRangeStart && value <= entry.sourceRangeStart + entry.rangeLength - 1) {
          return entry.destinationRangeStart + (value - entry.sourceRangeStart)
        }
      }
      return value
    }

    for (const interval of seedsIntervals) {
      for(let seed = interval.start; seed <= interval.end; seed++) {
        var value = seed
        for (const mapping of mappings) {
          value = map(value, mapping)
        }
        if (value < min) { min = value}
      }
    }

  return min
})
