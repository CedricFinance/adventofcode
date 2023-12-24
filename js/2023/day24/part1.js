import * as aoc from '../../2020/aoc.js'
import { determinant } from '../../vect.js';
import { parseHailstone } from './lib.js';

/**
 * @param {[x: number, y: number]} p0
 * @param {[vx: number, vy: number]} delta0
 * @param {[x: number, y: number]} p1
 * @param {[vx: number, vy: number]} delta1
 */
function getHalfLineIntersection(p0, delta0, p1, delta1)
{
  var s, t;
  /* find s, t verifying
   p0[0] + delta0[0] * t = p1[0] + delta1[0] * s
   p0[1] + delta0[1] * t = p1[1] + delta1[1] * s
  */

  const d = determinant(delta0, delta1)

  if (d == 0) {
    // find t verifying p1[0] + delta1[0] * t = p0[0]
    const t = (p0[0] - p1[0]) / delta1[0]
    const y = p1[1] + delta1[1] * t
  
    if (y == p0[y]) { 
      return { result: "COLINEAR" }
    } else {
      return { result: "PARALLELS"}
    }
  }

  s = (-delta0[1] * (p0[0] - p1[0]) + delta0[0] * (p0[1] - p1[1])) / d;
  t = ( delta1[0] * (p0[1] - p1[1]) - delta1[1] * (p0[0] - p1[0])) / d;

  if (s >= 0 && t >= 0)
  {
    return {
      result: "INTERSECTION",
      intersection: [ p0[0] + t * delta0[0], p0[1] + t * delta0[1] ]
    }
  }

  return {
    result: "NO_INTERSECTION"
  }
}

function inLimits(point, min, max) {
  return point[0] >= min && point[0] <= max && point[1] >= min && point[1] <= max
}

function *pairs(list) {
  for (let i = 0; i < list.length - 1; i++) {
    const first = list[i];
    for (let j = i+1; j < list.length; j++) {
      const second = list[j]
      yield [first, second]
    }
  }
}

function countIntersections(hailstones, bounds) {
  var count = 0

  for (const [first, second] of pairs(hailstones)) {
    const r = getHalfLineIntersection(first.position, first.velocity, second.position, second.velocity)

    if (r.result == "INTERSECTION" && inLimits(r.intersection, bounds.min, bounds.max)) {
      count++
    }
  }

  return count
}

aoc.run(function(input) {
  const hailstones = input.lines().map(parseHailstone);
  const bounds = input.name().startsWith("input") ? { min: 200000000000000, max: 400000000000000 } : { min: 7, max: 27 }

  return countIntersections(hailstones, bounds)
})
