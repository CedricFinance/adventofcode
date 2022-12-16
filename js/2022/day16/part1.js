import * as aoc from '../../2020/aoc.js'
import { MinHeap } from '../../2021/day15/heap.js'

var max = 0

/**
 * @param {Map<any, any>} valves
 * @param {number} currentTime
 * @param {{ flowRate: number; name: any; tunnels: string[]; opened: boolean }} currentValve
 * @param {number} pressureReleased
 * @param {number} totalReleased
 * @param {Set<string>} opened
 * @param {Map<string,Map<string,number>>} distances
 * @param {string[]} valvesToOpen
 */
function findMaxPressureReleasable(valves, currentTime, currentValve, pressureReleased, totalReleased, opened, distances, valvesToOpen) {
  if (opened.size == valvesToOpen.length) {
    return (30 - currentTime + 1) * pressureReleased
  }
  //console.log(`In room ${currentValve.name}`);
  if (currentTime === 30) {
    if (totalReleased + pressureReleased > max) {
      max = totalReleased + pressureReleased
      console.log(`new max: ${max}`);
    }
    return pressureReleased
  }

  if (currentValve.flowRate > 0 && !opened.has(currentValve.name)) {
    opened.add(currentValve.name)
    const releasable = findMaxPressureReleasable(
      valves,
      currentTime + 1,
      currentValve,
      pressureReleased + currentValve.flowRate,
      totalReleased + pressureReleased,
      opened,
      distances,
      valvesToOpen
    )
    opened.delete(currentValve.name)
    return releasable + pressureReleased
  }

  var maxReleasable = (30 - currentTime + 1) * pressureReleased
  for (const valveName of valvesToOpen.filter(valveName => !opened.has(valveName))) {
    const timeToTravel = distances.get(currentValve.name).get(valveName)
    if (currentTime + timeToTravel > 30) {
      continue
    }

    var releasable = findMaxPressureReleasable(
      valves,
      currentTime + timeToTravel,
      valves.get(valveName),
      pressureReleased,
      totalReleased + pressureReleased * timeToTravel,
      opened,
      distances,
      valvesToOpen
    )
    if (releasable + pressureReleased * timeToTravel > maxReleasable) {
      maxReleasable = releasable + pressureReleased * timeToTravel
    }
  }

  return maxReleasable
}

function computeDistances(valves, source) {
  const heap = new MinHeap((a, b) => a.value > b.value)
  heap.insert({ name: source, value: 0 })

  const distances = new Map()
  while(true) {
    const min = heap.remove()

    if (min === null) {
      break
    }

    const valve = valves.get(min.name)

    for (const otherName of valve.tunnels) {
      if (distances.has(otherName)) {
        continue
      }

      distances.set(otherName, min.value + 1)
      heap.insert({ name: otherName, value: min.value + 1 })
    }
  }

  return distances
}

aoc.run(function(input) {
  const lines = input.lines().map(line => {
    //Valve AV has flow rate=0; tunnels lead to valves AX, PI
    const [valveStr, tunnelsStr] = line.split("; ")
    const valveParts = valveStr.split(" ")
    const valveName = valveParts[1]
    const flowRate = parseInt(valveParts[4].split("=")[1], 10)

    const tunnels = (tunnelsStr.replace(/,/g, "").split(" "))
    tunnels.shift()
    tunnels.shift()
    tunnels.shift()
    tunnels.shift()

    return {
      name: valveName,
      flowRate,
      opened: false,
      tunnels
    }
  })
  const valves = new Map()
  for (const line of lines) {
    valves.set(line.name, line)
  }

  var result = 0

  var currentValve = valves.get("AA")
  var currentTime = 1
  var opened = new Set()

  const valvesToOpen = Array.from(valves.values()).filter(valve => valve.flowRate != 0).map(valve => valve.name)

  console.log(valvesToOpen);
  
  const distances = new Map()
  distances.set("AA", computeDistances(valves, "AA"))
  for (const valveName of valvesToOpen) {
    distances.set(valveName, computeDistances(valves, valveName))
  }
  console.log(distances);

  var result = findMaxPressureReleasable(valves, currentTime, currentValve, 0, 0, opened, distances, valvesToOpen)

  return result
})
