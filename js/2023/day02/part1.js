import * as aoc from '../../2020/aoc.js'
import { parseLine } from './lib.js'

function isPossible(set, cubes) {
  return set.red <= cubes.red && set.green <= cubes.green && set.blue <= cubes.blue
}

aoc.run(function(input) {
    const games = input.lines().map(parseLine)
    var result = 0

    for (const game of games) {
      if (game.sets.every(set => isPossible(set, { red: 12, green: 13, blue: 14 }))) {
        result += game.id
      }
    }

  return result
})
