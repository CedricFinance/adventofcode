import * as aoc from '../../2020/aoc.js'
import { MinHeap } from '../../2021/day15/heap.js'

var max = 0

/**
 * @param {Map<any, any>} valves
 * @param {number} currentTime
 * @param {{ flowRate: number; name: any; tunnels: string[]; opened: boolean }} currentValveMe
 * @param {{ flowRate: number; name: any; tunnels: string[]; opened: boolean }} currentValveElephant
 * @param {number} pressureReleased
 * @param {number} totalReleased
 * @param {Set<string>} opened
 * @param {Map<string,Map<string,number>>} distances
 * @param {string[]} valvesToOpen
 */
function findMaxPressureReleasable(valves, currentTime, currentValveMe, meTravelTime, currentValveElephant, elephantTravelTime, pressureReleased, totalReleased, opened, distances, valvesToOpen) {
  //console.log(JSON.stringify(arguments));
  if (opened.size == valvesToOpen.length) {
    return (30 - currentTime + 1) * pressureReleased
  }
  //console.log(`In room ${currentValve.name}`);
  if (currentTime === 30) {
    if (totalReleased + pressureReleased > max) {
      max = totalReleased + pressureReleased
      console.log(`${new Date()}: new max: ${max}`);
    }
    return pressureReleased
  }

  if (meTravelTime == 0 && elephantTravelTime == 0) {
    if (currentValveMe.flowRate > 0 && !opened.has(currentValveMe.name) &&
        currentValveElephant.flowRate > 0 && !opened.has(currentValveElephant.name) &&
        currentValveMe != currentValveElephant) {
      opened.add(currentValveMe.name)
      opened.add(currentValveElephant.name)
      const releasable = findMaxPressureReleasable(
        valves,
        currentTime + 1,
        currentValveMe,
        0,
        currentValveElephant,
        0,
        pressureReleased + currentValveMe.flowRate + currentValveElephant.flowRate,
        totalReleased + pressureReleased,
        opened,
        distances,
        valvesToOpen
      )
      opened.delete(currentValveMe.name)
      opened.delete(currentValveElephant.name)
      return releasable + pressureReleased
    } else if (currentValveMe.flowRate > 0 && !opened.has(currentValveMe.name)) {
      opened.add(currentValveMe.name)
      const releasable = findMaxPressureReleasable(
        valves,
        currentTime + 1,
        currentValveMe,
        0,
        currentValveElephant,
        elephantTravelTime - 1,
        pressureReleased + currentValveMe.flowRate,
        totalReleased + pressureReleased,
        opened,
        distances,
        valvesToOpen
      )
      opened.delete(currentValveMe.name)
      return releasable + pressureReleased
    } else if (currentValveElephant.flowRate > 0 && !opened.has(currentValveElephant.name)) {
      opened.add(currentValveElephant.name)
      const releasable = findMaxPressureReleasable(
        valves,
        currentTime + 1,
        currentValveMe,
        meTravelTime - 1,
        currentValveElephant,
        0,
        pressureReleased + currentValveElephant.flowRate,
        totalReleased + pressureReleased,
        opened,
        distances,
        valvesToOpen
      )
      opened.delete(currentValveElephant.name)
      return releasable + pressureReleased
    }

    var maxReleasable = (30 - currentTime + 1) * pressureReleased
    const openableValves = valvesToOpen.filter(valveName => !opened.has(valveName))
    for (let i = 0; i < openableValves.length; i++) {
      const firstValveName = openableValves[i];
      for (let j = 0; j < openableValves.length; j++) {
        const secondValveName = openableValves[j];

        const timeToTravelMe = distances.get(currentValveMe.name).get(firstValveName)
        const timeToTravelElephant = distances.get(currentValveElephant.name).get(secondValveName)

        if (currentTime + timeToTravelMe > 30 && currentTime + timeToTravelElephant > 30) {
          continue
        }
  
        const timeTraveled = Math.min(timeToTravelMe, timeToTravelElephant)
        if (currentTime + timeToTravelElephant > 30) {
          var releasable = findMaxPressureReleasable(
            valves,
            currentTime + timeTraveled,
            valves.get(firstValveName),
            timeToTravelMe - timeTraveled,
            valves.get(secondValveName),
            timeToTravelElephant - timeTraveled,
            pressureReleased,
            totalReleased + pressureReleased * timeTraveled,
            opened,
            distances,
            valvesToOpen
          )
          if (releasable + pressureReleased * timeTraveled > maxReleasable) {
            maxReleasable = releasable + pressureReleased * timeTraveled
          }    
        } else if (currentTime + timeToTravelMe > 30) {
          var releasable = findMaxPressureReleasable(
            valves,
            currentTime + timeTraveled,
            valves.get(firstValveName),
            timeToTravelMe - timeTraveled,
            valves.get(secondValveName),
            timeToTravelElephant - timeTraveled,
            pressureReleased,
            totalReleased + pressureReleased * timeTraveled,
            opened,
            distances,
            valvesToOpen
          )
          if (releasable + pressureReleased * timeTraveled > maxReleasable) {
            maxReleasable = releasable + pressureReleased * timeTraveled
          }
    
        } else {
          const timeTraveled = Math.min(timeToTravelMe, timeToTravelElephant)
          var releasable = findMaxPressureReleasable(
            valves,
            currentTime + timeTraveled,
            valves.get(firstValveName),
            timeToTravelMe - timeTraveled,
            valves.get(secondValveName),
            timeToTravelElephant - timeTraveled,
            pressureReleased,
            totalReleased + pressureReleased * timeTraveled,
            opened,
            distances,
            valvesToOpen
          )
          if (releasable + pressureReleased * timeTraveled > maxReleasable) {
            maxReleasable = releasable + pressureReleased * timeTraveled
          }
        }
      }
    }

    return maxReleasable

  } else if (meTravelTime == 0) {
    if (currentValveMe.flowRate > 0 && !opened.has(currentValveMe.name)) {
      opened.add(currentValveMe.name)
      const releasable = findMaxPressureReleasable(
        valves,
        currentTime + 1,
        currentValveMe,
        0,
        currentValveElephant,
        elephantTravelTime - 1,
        pressureReleased + currentValveMe.flowRate,
        totalReleased + pressureReleased,
        opened,
        distances,
        valvesToOpen
      )
      opened.delete(currentValveMe.name)
      return releasable + pressureReleased
    }

    var maxReleasable = (30 - currentTime + 1) * pressureReleased
    for (const valveName of valvesToOpen.filter(valveName => !opened.has(valveName))) {
      const timeToTravelMe = distances.get(currentValveMe.name).get(valveName)
      if (currentTime + timeToTravelMe > 30) {
        continue
      }

      const timeTraveled = Math.min(timeToTravelMe, elephantTravelTime)
      var releasable = findMaxPressureReleasable(
        valves,
        currentTime + timeTraveled,
        valves.get(valveName),
        timeToTravelMe - timeTraveled,
        currentValveElephant,
        elephantTravelTime - timeTraveled,
        pressureReleased,
        totalReleased + pressureReleased * timeTraveled,
        opened,
        distances,
        valvesToOpen
      )
      if (releasable + pressureReleased * timeTraveled > maxReleasable) {
        maxReleasable = releasable + pressureReleased * timeTraveled
      }
    }

    return maxReleasable
  } else if (elephantTravelTime == 0) {
    if (currentValveElephant.flowRate > 0 && !opened.has(currentValveElephant.name)) {
      opened.add(currentValveElephant.name)
      const releasable = findMaxPressureReleasable(
        valves,
        currentTime + 1,
        currentValveMe,
        meTravelTime - 1,
        currentValveElephant,
        0,
        pressureReleased + currentValveElephant.flowRate,
        totalReleased + pressureReleased,
        opened,
        distances,
        valvesToOpen
      )
      opened.delete(currentValveElephant.name)
      return releasable + pressureReleased
    }

    var maxReleasable = (30 - currentTime + 1) * pressureReleased
    for (const valveName of valvesToOpen.filter(valveName => !opened.has(valveName))) {
      const timeToTravelElephant = distances.get(currentValveElephant.name).get(valveName)
      if (currentTime + timeToTravelElephant > 30) {
        continue
      }

      const timeTraveled = Math.min(timeToTravelElephant, meTravelTime)
      var releasable = findMaxPressureReleasable(
        valves,
        currentTime + timeTraveled,
        currentValveMe,
        meTravelTime - timeTraveled,
        valves.get(valveName),
        timeToTravelElephant - timeTraveled,
        pressureReleased,
        totalReleased + pressureReleased * timeTraveled,
        opened,
        distances,
        valvesToOpen
      )
      if (releasable + pressureReleased * timeTraveled > maxReleasable) {
        maxReleasable = releasable + pressureReleased * timeTraveled
      }
    }

    return maxReleasable
  }

  console.log("test");
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
  var currentTime = 5
  var opened = new Set()

  const valvesToOpen = Array.from(valves.values()).filter(valve => valve.flowRate != 0).map(valve => valve.name)

  console.log(valvesToOpen);
  
  const distances = new Map()
  distances.set("AA", computeDistances(valves, "AA"))
  for (const valveName of valvesToOpen) {
    distances.set(valveName, computeDistances(valves, valveName))
  }

  var result = findMaxPressureReleasable(valves, currentTime, currentValve, 0, currentValve, 0, 0, 0, opened, distances, valvesToOpen)

  return result
})
// 2475 too low
// 2580 too low
// 2581 too low