import * as aoc from '../../2020/aoc.js'
import { countWaysToBeatRecord } from './lib.js';

aoc.run(function(input) {
  const [timeStr, distanceStr] = input.lines();
  const times = aoc.parseNumberList(timeStr.split(":")[1].trim())
  const distances = aoc.parseNumberList(distanceStr.split(":")[1].trim())

  var result = 1
  for (let i = 0; i < times.length; i++) {
    result *= countWaysToBeatRecord(times[i], distances[i])
  }

  return result
})
