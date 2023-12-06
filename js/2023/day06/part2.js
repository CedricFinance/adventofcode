import * as aoc from '../../2020/aoc.js'
import { countWaysToBeatRecord } from './lib.js';

aoc.run(function(input) {
  const [timeStr, distanceStr] = input.lines();
  const time = parseInt(timeStr.split(":")[1].trim().replace(/ /g, ""), 10)
  const distance = parseInt(distanceStr.split(":")[1].trim().replace(/ /g, ""), 10)

  const result = countWaysToBeatRecord(time, distance)

  return result
})
