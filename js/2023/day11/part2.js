import * as aoc from '../../2020/aoc.js'
import { distance, findExpandedRowsAndCols, findGalaxies } from './lib.js';

aoc.run(function(input) {
  const grid = input.lines().map(line => line.split(""));

  const expanded = findExpandedRowsAndCols(grid) 
  const galaxies = findGalaxies(grid)

  var counts = 0
  var result = 0
  for (let i = 0; i < galaxies.length - 1; i++) {
    const first = galaxies[i];
    for (let j = i+1; j < galaxies.length; j++) {
      const second = galaxies[j];

      counts++
      //console.log(`${counts} - distance between ${i+1} and ${j+1}: ${distance}`)
      result += distance(first, second, expanded, 1000000)
    }
  }

  return result
})
