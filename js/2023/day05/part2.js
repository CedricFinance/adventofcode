import * as aoc from '../../2020/aoc.js'

/**
 * @param {string} str
 */
function parseNumberList(str) {
  return str.split(" ").map(s => parseInt(s, 10))
}

/**
 * @param {string[]} blocks
 */
function parseInput(blocks) {
  const seeds = parseNumberList(blocks.shift().split(": ")[1])
  const seedsIntervals = []
  for (let i = 0; i < seeds.length; i+=2) {
    seedsIntervals.push({ start: seeds[i], end: seeds[i]+seeds[i+1]-1 })
  }

  const maps = []
  for (const block of blocks) {
    const lines = block.split("\n")
    const name = lines.shift().split(" ")[0]
    const mappings = lines.map(line => {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = parseNumberList(line)
      return {
        destinationRangeStart,
        sourceRangeStart,
        rangeLength
      }
    })
    maps.push({ name, mappings })
  }

  return { seedsIntervals, maps }
}

/**
 * @param {{ start: number; end: number; }} interval
 * @param {{ start: number; end: number; }} anotherInterval
 */
function intersectIntervals(interval, anotherInterval) {
  // Case 1: No intersection
  if (interval.end < anotherInterval.start || interval.start > anotherInterval.end) {
    return { intersection: null, remaining: [ interval ] }
  }

  // Case 2: Intersection
  const intersection = {
    start: Math.max(interval.start, anotherInterval.start),
    end: Math.min(interval.end, anotherInterval.end)
  }

  const remaining = []

  if (interval.start < intersection.start) {
    remaining.push({ start: interval.start, end: intersection.start - 1 })
  }

  if (interval.end > intersection.end) {
    remaining.push({ start: intersection.end + 1, end: interval.end })
  }

  return { intersection, remaining }
}

/**
 * @param {{ start: number; end: number; }} interval
 * @param {{ destinationRangeStart: number; sourceRangeStart: number; rangeLength: number; }} mapping
 */
function applyMappingOnSingleInterval(interval, mapping) {
  const { intersection, remaining } = intersectIntervals(interval, { start: mapping.sourceRangeStart, end: mapping.sourceRangeStart + mapping.rangeLength - 1 })
  if (!intersection) {
    return {
      mapped: null,
      remaining
    }
  }

  const delta = mapping.destinationRangeStart - mapping.sourceRangeStart
  return {
    mapped: { start: intersection.start + delta, end: intersection.end + delta },
    remaining
  }
}

/**
 * @param {{ start: number; end: number; }[]} intervals
 * @param {{ destinationRangeStart: number; sourceRangeStart: number; rangeLength: number; }} mapping
 */
function applyMappingOnIntervals(intervals, mapping) {
  const mapped = []

  /** @type {{start: number; end: number}[]} */
  var remaining = []
  for (const interval of intervals) {
    const res = applyMappingOnSingleInterval(interval, mapping)
    if (res.mapped) {
      mapped.push(res.mapped)
    }
    remaining = remaining.concat(res.remaining)
  }
  // Simplify intervals?
  return {
    mapped, 
    remaining
  }
}

/**
 * @param {{ start: number; end: number; }[]} intervals
 * @param {{ name: string; mappings: { destinationRangeStart: number; sourceRangeStart: number; rangeLength: number; }[]; }} map
 */
function applyMap(intervals, map) {
  var remaining = [...intervals]
  var newIntervals = []

  var result = null
  for (const mapping of map.mappings) {
    result = applyMappingOnIntervals(remaining, mapping)
    remaining = result.remaining
    newIntervals = newIntervals.concat(result.mapped)
  }

  newIntervals = newIntervals.concat(result.remaining)
  return newIntervals
}

aoc.run(function(input) {
  const blocks = input.blocks();
  const { seedsIntervals, maps } = parseInput(blocks)

  const intervals = maps.reduce(applyMap, seedsIntervals)

  return Math.min(...intervals.map(interval => interval.start))
})
