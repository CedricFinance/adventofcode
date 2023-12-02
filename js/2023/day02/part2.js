import * as aoc from '../../2020/aoc.js'
import { parseLine } from './lib.js'

function minCubes(game) {
  const min = { red: 0, green: 0, blue: 0 }

  for(var set of game.sets) {
    if (set.red > min.red) {
      min.red = set.red
    }
    if (set.green > min.green) {
      min.green = set.green
    }
    if (set.blue > min.blue) {
      min.blue = set.blue
    }
  }

  return min
}

function power(cubes) {
  return cubes.red * cubes.green * cubes.blue
}

aoc.run(function(input) {
    const games = input.lines().map(parseLine)
    var result = 0

    for (const game of games) {
      const min = minCubes(game)
      result += power(min)
    }

  return result
})
